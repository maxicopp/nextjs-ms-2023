import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import { getFilteredEvents } from '../../helpers/api-util';

function FilteredEventsPage() {
  const router = useRouter();

  const filterData = router.query.slug;

  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (filterData && filterData.length === 2) {
        const filteredYear = filterData[0];
        const filteredMonth = filterData[1];

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
          setIsLoading(false);
          return;
        }

        const events = await getFilteredEvents({
          year: numYear,
          month: numMonth,
        });

        setFilteredEvents(events);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [filterData]);

  if (isLoading) {
    return <p className="center">Loading...</p>;
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const date = new Date(+filteredYear, +filteredMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export default FilteredEventsPage;
