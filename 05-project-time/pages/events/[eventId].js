import { Fragment } from 'react';
import { useRouter } from 'next/router';

import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import { getEventById, getFeaturedEvents } from '../../helpers/api-util';

function EventDetailPage({ event }) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="center">
        <p>No event found!</p>
      </div>
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
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths,
    fallback: 'blocking',
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
    revalidate: 30,
  };
}

export default EventDetailPage;
