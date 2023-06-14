import { getAllEvents } from '../../dummy-data';
import { useRouter } from 'next/router';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';

function AllEventsPage() {
  const router = useRouter();
  const allEvents = getAllEvents();

  function findEventsHandler(year, month) {
    const fullPath = `events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={allEvents} />
    </>
  );
}

export default AllEventsPage;
