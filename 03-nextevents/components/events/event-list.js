import EventItem from './event-item';
import classes from './event-list.module.css';

function EventList({ items }) {
  return (
    <ul className={classes.list}>
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
