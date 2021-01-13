import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Event } from '../entities';
import { EventService } from './event.service';
import { CreateEventInput, UpdateEventInput } from './inputs/event.input';

@Resolver(() => Event)
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  @Query(/* istanbul ignore next */ () => [Event])
  async events() {
    return this.eventService.events();
  }

  @Query(/* istanbul ignore next */ () => Event)
  async event(@Args('id', { type: /* istanbul ignore next */ () => Int }) id: number) {
    return this.eventService.event(id);
  }

  @Query(/* istanbul ignore next */ () => [Event])
  async hostEvents(@Args('hostId', { type: /* istanbul ignore next */ () => Int }) hostId: number) {
    return this.eventService.hostEvents(hostId);
  }

  @Query(/* istanbul ignore next */ () => [Event])
  async coHostEvents(
    @Args('coHostId', { type: /* istanbul ignore next */ () => Int }) coHostId: number
  ) {
    return this.eventService.coHostEvents(coHostId);
  }

  @Query(/* istanbul ignore next */ () => [Event])
  async participantEvents(
    @Args('userId', { type: /* istanbul ignore next */ () => Int }) userId: number
  ) {
    return this.eventService.participantEvents(userId);
  }

  @Query(/* istanbul ignore next */ () => [Event])
  async discoverEvents(
    @Args('userId', { type: /* istanbul ignore next */ () => Int }) userId: number
  ) {
    return this.eventService.discoverEvents(userId);
  }

  @Mutation(/* istanbul ignore next */ () => Event)
  async createEvent(@Args('input') input: CreateEventInput) {
    return this.eventService.createEvent(input);
  }

  @Mutation(/* istanbul ignore next */ () => Event)
  async updateEvent(@Args('input') input: UpdateEventInput) {
    return this.eventService.updateEvent(input);
  }

  @Mutation(/* istanbul ignore next */ () => Event)
  async deleteEvent(@Args('id', { type: /* istanbul ignore next */ () => Int }) id: number) {
    return this.eventService.deleteEvent(id);
  }

  @Mutation(() => Boolean)
  async joinEvent(@Args('eventId') eventId: number, @Args('userId') userId: number) {
    this.eventService.joinEvent(eventId, userId);
    return true;
  }

  @Mutation(() => Boolean)
  async leaveEvent(@Args('eventId') eventId: number, @Args('userId') userId: number) {
    this.eventService.leaveEvent(eventId, userId);
    return true;
  }
}
