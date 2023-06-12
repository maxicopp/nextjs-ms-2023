import EventList from '../../components/events/event-list';
import { getAllEvents } from '../../dummy-data';

function AllEventsPage() {
  const allEvents = getAllEvents();

  return <EventList items={allEvents} />;
}

export default AllEventsPage;
