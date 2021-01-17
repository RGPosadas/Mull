import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { Event, User } from '../entities';
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
    return this.eventRepository.findOne(id);
  }

  getEventsHostedByUser(hostId: number): Promise<Event[]> {
    return this.eventRepository.find({
      relations: ['host'],
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
      .leftJoin('event.coHosts', 'user')
      .where('user.id = :userId', { userId: coHostId })
      .getMany();
  }

  getEventsAttendedByUser(userId: number): Promise<Event[]> {
    return this.eventRepository
      .createQueryBuilder('event')
      .leftJoin('event.participants', 'user')
      .where('user.id = :userId', { userId })
      .getMany();
  }

  findJoinedEvent(eventId: number, userId: number): Promise<Event> {
    return this.eventRepository
      .createQueryBuilder('event')
      .leftJoin('event.participants', 'user')
      .leftJoin('event.coHosts', 'coHost')
      .where(
        new Brackets((qb) => {
          qb.where('coHost.id = :userId', { userId }).orWhere('user.id = :userId', { userId });
        })
      )
      .andWhere(
        new Brackets((qb) => {
          qb.where('event.id = :eventId', { eventId });
        })
      )
      .getOne();
  }

  /**
   * Find all the events that the user has not joined, created or is not co-hosting
   * @param userId
   */
  async getEventsRecommendedToUser(userId: number): Promise<Event[]> {
    const discoverableEvents = await this.eventRepository.query(
      `
    SELECT DISTINCT id, title, startDate, endDate, description, imageId, hostId, locationId, restriction FROM event LEFT JOIN event_participants ON event.id = event_participants.eventId
    WHERE id NOT IN (SELECT event.id FROM event WHERE event.hostId = ${userId}) AND 
    id NOT IN (SELECT event_participants.eventId FROM event_participants WHERE event_participants.userId = ${userId}) AND 
    id NOT IN (SELECT event_cohosts.eventId FROM event_cohosts WHERE event_cohosts.userId = ${userId})`
    );
    return discoverableEvents;
  }

  async createEvent(input: CreateEventInput): Promise<Event> {
    return await this.eventRepository.save(input);
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
    return await this.eventRepository.save(event);
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
      return await this.eventRepository.save(event);
    }
  }
}
