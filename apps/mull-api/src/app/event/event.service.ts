import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { Event, Media, User } from '../entities';
import { CreateEventInput, UpdateEventInput } from './inputs/event.input';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>
  ) {}

  getAllEvents(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  getEvent(id: number): Promise<Event> {
    return this.eventRepository.findOne(id, {
      relations: ['location', 'location.coordinates', 'host'],
    });
  }

  getEventsHostedByUser(hostId: number): Promise<Event[]> {
    return this.eventRepository.find({
      relations: ['location', 'location.coordinates', 'host'],
      where: {
        host: {
          id: hostId,
        },
      },
    });
  }

  getEventsCoHostedByUser(coHostId: number): Promise<Event[]> {
    return this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.location', 'location')
      .leftJoinAndSelect('event.host', 'host')
      .leftJoin('event.coHosts', 'coHost')
      .where('coHost.id = :userId', { userId: coHostId })
      .getMany();
  }

  getEventsAttendedByUser(userId: number): Promise<Event[]> {
    return this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.location', 'location')
      .leftJoinAndSelect('event.host', 'host')
      .leftJoin('event.participants', 'user')
      .where('user.id = :userId', { userId })
      .getMany();
  }

  async isUserAttendingEvent(eventId: number, userId: number): Promise<boolean> {
    const event = await this.eventRepository
      .createQueryBuilder('event')
      .leftJoin('event.participants', 'participant')
      .leftJoin('event.coHosts', 'coHost')
      .where('event.id = :eventId', { eventId })
      .andWhere(
        new Brackets((qb) => {
          qb.where('coHost.id = :userId', { userId }).orWhere('participant.id = :userId', {
            userId,
          });
        })
      )
      .getOne();
    if (event) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Find all public events that the user has not joined, created or is not co-hosting
   * @param userId
   */
  async getEventsRecommendedToUser(userId: number): Promise<Event[]> {
    // subquery for events a user will participate in
    const joinedEventsQuery = this.eventRepository
      .createQueryBuilder('event')
      .select('event.id')
      .leftJoin('event.participants', 'user')
      .where('user.id = :userId');
    // subquery for events a user is co-hosting
    const coHostedEventsQuery = this.eventRepository
      .createQueryBuilder('event')
      .select('event.id')
      .leftJoin('event.coHosts', 'user')
      .where('user.id = :userId');
    // subquery for events a user is a host of
    const hostedEventsQuery = this.eventRepository
      .createQueryBuilder('event')
      .select('event.id')
      .where('event.hostId = :userId');

    return this.eventRepository
      .createQueryBuilder('event')
      .distinct(true)
      .leftJoinAndSelect('event.location', 'location')
      .leftJoinAndSelect('event.host', 'host')
      .where(`event.id NOT IN (${joinedEventsQuery.getQuery()})`)
      .andWhere(`event.id NOT IN (${coHostedEventsQuery.getQuery()})`)
      .andWhere(`event.id NOT IN (${hostedEventsQuery.getQuery()})`)
      .andWhere('event.restriction = "0"')
      .setParameter('userId', userId)
      .getMany();
  }

  async createEvent(hostId: number, input: CreateEventInput): Promise<Event> {
    return this.eventRepository.save({ ...input, host: { id: hostId } });
  }

  async updateEvent(input: UpdateEventInput): Promise<Event> {
    await this.eventRepository.update(input.id, { ...input });
    return this.getEvent(input.id);
  }

  async deleteEvent(id: number): Promise<Event> {
    const event = await this.getEvent(id);
    await this.eventRepository.delete(event.id);
    return event;
  }

  async addEventParticipant(eventId: number, userId: number) {
    const user = new User(userId);
    const event = await this.eventRepository.findOne(eventId, { relations: ['participants'] });
    event.participants.push(user);
    return this.eventRepository.save(event);
  }

  async removeEventParticipant(eventId: number, userId: number) {
    const event = await this.eventRepository.findOne(eventId, { relations: ['participants'] });
    if (event == undefined) {
      throw new Error('Event does not exist');
    }

    const user = event.participants.find((participant) => participant.id == userId);
    if (user == undefined) {
      throw new Error('User is not a participant of the event');
    } else {
      const index = event.participants.indexOf(user);
      event.participants.splice(index, 1);
      return this.eventRepository.save(event);
    }
  }

  async getEventImage(eventId: number): Promise<Media> {
    const { image } = await this.eventRepository.findOne(eventId, { relations: ['image'] });
    return image;
  }

  /**
   * Find a user's portfolio.
   * A user's portfolio is made up of participating, cohosted, and hosted events that have ended.
   * @param userId
   */
  async getUserEventsPortfolio(userId: number): Promise<Event[]> {
    const currentDateTime = new Date().toISOString().replace('T', ' ');
    return this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.location', 'location')
      .leftJoin('event.host', 'host')
      .leftJoin('event.coHosts', 'coHost')
      .leftJoin('event.participants', 'user')
      .where('host.id = :userId AND event.endDate < :currentDateTime')
      .orWhere('coHost.id = :userId AND event.endDate < :currentDateTime')
      .orWhere('user.id = :userId AND event.endDate < :currentDateTime')
      .setParameters({ userId, currentDateTime: currentDateTime })
      .getMany();
  }
}
