import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { environment } from '../../environments/environment';
import { UserService } from '../user';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // noop
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: Request) {
    return this.authService.authLogin(req);
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth() {
    // noop
  }

  @Get('facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  facebookAuthRedirect(@Req() req: Request) {
    return this.authService.authLogin(req);
  }

  @Get('twitter')
  @UseGuards(AuthGuard('twitter'))
  async twitterAuth() {
    // noop
  }

  @Get('twitter/redirect')
  @UseGuards(AuthGuard('twitter'))
  twitterAuthRedirect(@Req() req: Request) {
    return this.authService.authLogin(req);
  }

  @Post('refresh')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const token = req.cookies['mullToken'];
    if (!token) return res.send({ ok: false, accessToken: '' });
    try {
      var { id, tokenVersion } = this.jwtService.verify(token, {
        secret: environment.jwt.refreshSecret,
      });
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: '' });
    }
    const user = await this.userService.findOne(id);

    if (!user) return res.send({ ok: false, accessToken: '' });
    if (user.tokenVersion !== tokenVersion) return res.send({ ok: false, accessToken: '' });

    this.authService.sendRefreshToken(res, this.authService.createRefreshToken(user));

    return res.send({ ok: true, accessToken: this.authService.createAccessToken(user) });
  }
}
