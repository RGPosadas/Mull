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

  findAll(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  findOne(id: number): Promise<Event> {
    return this.eventRepository.findOne(id);
  }

  findHostEvents(userId: number): Promise<Event[]> {
    return this.eventRepository.find({
      relations: ['host'],
      where: {
        host: {
          id: userId,
        },
      },
    });
  }

  findCoHostEvents(userId: number): Promise<Event[]> {
    return this.eventRepository
      .createQueryBuilder('event')
      .leftJoin('event.coHosts', 'user')
      .where('user.id = :userId', { userId })
      .getMany();
  }

  findJoinedEvents(userId: number): Promise<Event[]> {
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
  findDiscoverEvent(userId: number): Promise<Event[]> {
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

  async create(eventInput: CreateEventInput): Promise<Event> {
    return await this.eventRepository.save(eventInput);
  }

  async update(eventInput: UpdateEventInput): Promise<Event> {
    await this.eventRepository.update(eventInput.id, { ...eventInput });
    return this.findOne(eventInput.id);
  }

  async addParticipant(eventId: number, userId: number) {
    const user = new User(userId);
    const event = await this.eventRepository.findOne(eventId, { relations: ['participants'] });
    event.participants.push(user);
    return await this.eventRepository.save(event);
  }

  async removeParticipant(eventId: number, userId: number) {
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

  async delete(id: number): Promise<Event> {
    const event = await this.findOne(id);
    await this.eventRepository.delete(event.id);
    return event;
  }
}
