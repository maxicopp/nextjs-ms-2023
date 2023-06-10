import EventItem from './event-item';

function EventList({ items }) {
  return (
    <ul>
      {items.map(({ id, title, image, date, location }) => (
        <EventItem
          key={id}
          id={id}
          title={title}
          image={image}
          date={date}
          location={location}
        />
      ))}
    </ul>
  );
}

export default EventList;
