import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async delete(id: number): Promise<Event> {
    const event = await this.findOne(id);
    await this.eventRepository.delete(event.id);
    return event;
  }
}
