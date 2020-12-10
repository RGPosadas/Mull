import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Event } from '../entities';
import { EventService } from './event.service';
import { CreateEventInput, UpdateEventInput } from './inputs/event.input';

@Resolver(() => Event)
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  @Query(/* istanbul ignore next */ () => [Event])
  async events() {
    return this.eventService.findAll();
  }

  @Query(/* istanbul ignore next */ () => Event)
  async event(@Args('id', { type: /* istanbul ignore next */ () => Int }) id: number) {
    return this.eventService.findOne(id);
  }

  @Query(/* istanbul ignore next */ () => [Event])
  async hostEvents(@Args('id', { type: /* istanbul ignore next */ () => Int }) id: number) {
    return this.eventService.findHostEvents(id);
  }

  @Query(/* istanbul ignore next */ () => [Event])
  async coHostsEvents(@Args('id', { type: /* istanbul ignore next */ () => Int }) id: number) {
    return this.eventService.findCoHostEvents(id);
  }

  @Query(/* istanbul ignore next */ () => [Event])
  async participatingEvents(
    @Args('id', { type: /* istanbul ignore next */ () => Int }) id: number
  ) {
    return this.eventService.findParticipantingEvents(id);
  }

  @Query(/* istanbul ignore next */ () => [Event])
  async discoverEvents(@Args('id', { type: /* istanbul ignore next */ () => Int }) id: number) {
    return this.eventService.findDiscoverEvent(id);
  }

  @Mutation(/* istanbul ignore next */ () => Event)
  async createEvent(@Args('createEventInput') createEventInput: CreateEventInput) {
    return this.eventService.create(createEventInput);
  }

  @Mutation(/* istanbul ignore next */ () => Event)
  async updateEvent(@Args('updateEventInput') updateEventInput: UpdateEventInput) {
    return this.eventService.update(updateEventInput);
  }

  @Mutation(/* istanbul ignore next */ () => Event)
  async deleteEvent(@Args('id', { type: /* istanbul ignore next */ () => Int }) id: number) {
    return this.eventService.delete(id);
  }

  @Mutation(() => Boolean)
  async addParticipantToEvent(@Args('eventId') eventId: number, @Args('userId') userId: number) {
    this.eventService.addParticipant(eventId, userId);
    return true;
  }
}
