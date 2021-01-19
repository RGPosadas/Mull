import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Event } from '../entities';
import { EventService } from './event.service';
import { CreateEventInput, UpdateEventInput } from './inputs/event.input';

@Resolver(() => Event)
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  @Query(/* istanbul ignore next */ () => [Event])
  async events() {
    return this.eventService.getAllEvents();
  }

  @Query(/* istanbul ignore next */ () => Event)
  async event(@Args('id', { type: /* istanbul ignore next */ () => Int }) id: number) {
    return this.eventService.getEvent(id);
  }

  @Query(/* istanbul ignore next */ () => [Event])
  async hostEvents(@Args('hostId', { type: /* istanbul ignore next */ () => Int }) hostId: number) {
    return this.eventService.getEventsHostedByUser(hostId);
  }

  @Query(/* istanbul ignore next */ () => [Event])
  async coHostEvents(
    @Args('coHostId', { type: /* istanbul ignore next */ () => Int }) coHostId: number
  ) {
    return this.eventService.getEventsCoHostedByUser(coHostId);
  }

  @Query(/* istanbul ignore next */ () => [Event])
  async participantEvents(
    @Args('userId', { type: /* istanbul ignore next */ () => Int }) userId: number
  ) {
    return this.eventService.getEventsAttendedByUser(userId);
  }

  @Query(/* istanbul ignore next */ () => Boolean)
  async isParticipant(
    @Args('eventId', { type: /* istanbul ignore next */ () => Int }) eventId: number,
    @Args('userId', { type: /* istanbul ignore next */ () => Int }) userId: number
  ) {
    return this.eventService.isUserAttendingEvent(eventId, userId);
  }

  @Query(/* istanbul ignore next */ () => [Event])
  async discoverEvents(
    @Args('userId', { type: /* istanbul ignore next */ () => Int }) userId: number
  ) {
    return this.eventService.getEventsRecommendedToUser(userId);
  }

  @Mutation(/* istanbul ignore next */ () => Event)
  async createEvent(@Args('event') event: CreateEventInput) {
    return this.eventService.createEvent(event);
  }

  @Mutation(/* istanbul ignore next */ () => Event)
  async updateEvent(@Args('event') event: UpdateEventInput) {
    return this.eventService.updateEvent(event);
  }

  @Mutation(/* istanbul ignore next */ () => Event)
  async deleteEvent(@Args('id', { type: /* istanbul ignore next */ () => Int }) id: number) {
    return this.eventService.deleteEvent(id);
  }

  @Mutation(() => Boolean)
  async joinEvent(
    @Args('eventId', { type: /* istanbul ignore next */ () => Int }) eventId: number,
    @Args('userId', { type: /* istanbul ignore next */ () => Int }) userId: number
  ) {
    this.eventService.addEventParticipant(eventId, userId);
    return true;
  }

  @Mutation(() => Boolean)
  async leaveEvent(
    @Args('eventId', { type: /* istanbul ignore next */ () => Int }) eventId: number,
    @Args('userId', { type: /* istanbul ignore next */ () => Int }) userId: number
  ) {
    this.eventService.removeEventParticipant(eventId, userId);
    return true;
  }
}
