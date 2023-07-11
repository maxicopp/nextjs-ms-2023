import { useEffect, useState } from 'react';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import { getFilteredEvents } from '../../helpers/api-util';

function FilteredEventsPage(props) {
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (props.hasError) {
        setIsLoading(false);
        return;
      }

      const events = props.events;

      setFilteredEvents(events);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <p className="center">Loading...</p>;
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const [filteredYear, filteredMonth] = props.filterData;

  const date = new Date(+filteredYear, +filteredMonth - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const filterData = params.slug;
  const [filteredYear, filteredMonth] = filterData;

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: { hasError: true },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      events: filteredEvents,
      filterData: filterData,
    },
  };
}

export default FilteredEventsPage;
