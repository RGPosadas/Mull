import { EventRestriction } from '@mull/types';
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

  events(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  event(id: number): Promise<Event> {
    return this.eventRepository.findOne(id);
  }

  hostEvents(hostId: number): Promise<Event[]> {
    return this.eventRepository.find({
      relations: ['host'],
      where: {
        host: {
          id: hostId,
        },
      },
    });
  }

  coHostEvents(coHostId: number): Promise<Event[]> {
    return this.eventRepository
      .createQueryBuilder('event')
      .leftJoin('event.coHosts', 'user')
      .where('user.id = :userId', { userId: coHostId })
      .getMany();
  }

  participantEvents(userId: number): Promise<Event[]> {
    return this.eventRepository
      .createQueryBuilder('event')
      .leftJoin('event.participants', 'user')
      .where('user.id = :userId', { userId })
      .getMany();
  }

  /**
   * Find all the events that the user has not joined, created or is not co-hosting
   * @param userId
   */
  discoverEvents(userId: number): Promise<Event[]> {
    return this.eventRepository
      .createQueryBuilder('event')
      .leftJoin('event.coHosts', 'coHost')
      .leftJoin('event.participants', 'participant')
      .leftJoin('event.host', 'host')
      .where(
        new Brackets((qb) => {
          qb.where('coHost.id != :userId', { userId }).orWhere('coHost.id IS NULL');
        })
      )
      .andWhere(
        new Brackets((qb) => {
          qb.where('participant.id != :userId', { userId }).orWhere('participant.id IS NULL');
        })
      )
      .andWhere(
        new Brackets((qb) => {
          qb.where('host.id != :userId', { userId }).orWhere('host.id IS NULL');
        })
      )
      .andWhere('event.restriction = :restriction', { restriction: String(EventRestriction.NONE) })
      .getMany();
  }

  async createEvent(input: CreateEventInput): Promise<Event> {
    return await this.eventRepository.save(input);
  }

  async updateEvent(input: UpdateEventInput): Promise<Event> {
    await this.eventRepository.update(input.id, { ...input });
    return this.event(input.id);
  }

  async deleteEvent(id: number): Promise<Event> {
    const event = await this.event(id);
    await this.eventRepository.delete(event.id);
    return event;
  }

  async joinEvent(eventId: number, userId: number) {
    const user = new User(userId);
    const event = await this.eventRepository.findOne(eventId, { relations: ['participants'] });
    event.participants.push(user);
    return await this.eventRepository.save(event);
  }

  async leaveEvent(eventId: number, userId: number) {
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
