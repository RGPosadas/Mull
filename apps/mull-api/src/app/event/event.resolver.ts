import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthenticatedUser, AuthGuard } from '../auth/auth.guard';
import { Event, Media, User } from '../entities';
import { EventService } from './event.service';
import { CreateEventInput, UpdateEventInput } from './inputs/event.input';

@Resolver(() => Event)
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  @Query(/* istanbul ignore next */ () => [Event])
  @UseGuards(AuthGuard)
  async events() {
    return this.eventService.getAllEvents();
  }

  @Query(/* istanbul ignore next */ () => Event)
  @UseGuards(AuthGuard)
  async event(@Args('id', { type: /* istanbul ignore next */ () => Int }) id: number) {
    return this.eventService.getEvent(id);
  }

  @Query(/* istanbul ignore next */ () => [Event])
  async hostEvents(@AuthenticatedUser() hostId: number) {
    return this.eventService.getEventsHostedByUser(hostId);
  }

  @Query(/* istanbul ignore next */ () => [Event])
  async coHostEvents(@AuthenticatedUser() coHostId: number) {
    return this.eventService.getEventsCoHostedByUser(coHostId);
  }

  @Query(/* istanbul ignore next */ () => [Event])
  async participantEvents(@AuthenticatedUser() userId: number) {
    return this.eventService.getEventsAttendedByUser(userId);
  }

  @Query(/* istanbul ignore next */ () => [Event])
  async userPortfolioEvents(@AuthenticatedUser() userId: number) {
    return this.eventService.getUserEventsPortfolio(userId);
  }

  @Query(/* istanbul ignore next */ () => Boolean)
  async isParticipant(
    @Args('eventId', { type: /* istanbul ignore next */ () => Int }) eventId: number,
    @AuthenticatedUser() userId: number
  ) {
    return this.eventService.isUserAttendingEvent(eventId, userId);
  }

  @Query(/* istanbul ignore next */ () => [Event])
  async discoverEvents(@AuthenticatedUser() userId: number) {
    return this.eventService.getEventsRecommendedToUser(userId);
  }

  @Query(/* istanbul ignore next */ () => [User])
  async threeParticipant(
    @Args('eventId', { type: /* istanbul ignore next */ () => Int }) eventId: number
  ) {
    return this.eventService.getThreeRandomParticipants(eventId);
  }

  @Mutation(/* istanbul ignore next */ () => Event)
  async createEvent(@AuthenticatedUser() hostId: number, @Args('event') event: CreateEventInput) {
    return this.eventService.createEvent(hostId, event);
  }

  @Mutation(/* istanbul ignore next */ () => Event)
  @UseGuards(AuthGuard)
  async updateEvent(@Args('event') event: UpdateEventInput) {
    return this.eventService.updateEvent(event);
  }

  @Mutation(/* istanbul ignore next */ () => Event)
  @UseGuards(AuthGuard)
  async deleteEvent(@Args('id', { type: /* istanbul ignore next */ () => Int }) id: number) {
    return this.eventService.deleteEvent(id);
  }

  @Mutation(/* istanbul ignore next */ () => Boolean)
  async joinEvent(
    @Args('eventId', { type: /* istanbul ignore next */ () => Int }) eventId: number,
    @AuthenticatedUser() userId: number
  ) {
    this.eventService.addEventParticipant(eventId, userId);
    return true;
  }

  @Mutation(/* istanbul ignore next */ () => Boolean)
  async leaveEvent(
    @Args('eventId', { type: /* istanbul ignore next */ () => Int }) eventId: number,
    @AuthenticatedUser() userId: number
  ) {
    this.eventService.removeEventParticipant(eventId, userId);
    return true;
  }

  @ResolveField(/* istanbul ignore next */ () => Media)
  async image(@Parent() event: Event) {
    return this.eventService.getEventImage(event.id);
  }

  @UseGuards(AuthGuard)
  @Query(/* istanbul ignore next */ () => [Event])
  async portfolioEvents(@Args('id', { type: /* istanbul ignore next */ () => Int }) id: number) {
    return await this.eventService.getUserEventsPortfolio(id);
  }
}
