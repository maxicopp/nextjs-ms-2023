import Link from 'next/link';

function EventItem({ title, image, date, location, id }) {
  const readableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const formattedAddress = location.replace(', ', '\n');
  const exploreLink = `/events/${id}`;

  return (
    <li>
      <img src={`/${image}`} alt={title} />
      <div>
        <h2>{title}</h2>
        <time>{readableDate}</time>
        <address>{formattedAddress}</address>
        <Link href={exploreLink}>Explore Event</Link>
      </div>
    </li>
  );
}

export default EventItem;
