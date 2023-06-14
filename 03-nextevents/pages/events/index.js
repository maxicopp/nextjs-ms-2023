import { getAllEvents } from '../../dummy-data';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';

function AllEventsPage() {
  const allEvents = getAllEvents();

  return (
    <>
      <EventsSearch />
      <EventList items={allEvents} />
    </>
  );
}

export default AllEventsPage;
