import { Fragment } from 'react';
import { useRouter } from 'next/router';

import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';
import { getEventById, getAllEventIds } from '../../helpers/api-util';

function EventDetailPage({ event }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <ErrorAlert>
        <p>Loading...</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticPaths() {
  const eventIds = await getAllEventIds();

  const paths = eventIds.map((eventId) => ({
    params: { eventId },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  let event = null;
  try {
    const eventId = context.params.eventId;
    event = await getEventById(eventId);
    if (!event) {
      throw new Error('Event not found');
    }
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      event,
    },
  };
}

export default EventDetailPage;
