const EVENTS_API_URL =
  'https://nextjs-course-56c57-default-rtdb.firebaseio.com/events.json';

async function fetchData() {
  const response = await fetch(EVENTS_API_URL);
  const data = await response.json();
  return data;
}

export async function getFeaturedEvents() {
  const data = await fetchData();

  const featuredEvents = Object.entries(data)
    .filter(([_, event]) => event.isFeatured)
    .map(([id, event]) => ({ id, ...event }));

  return featuredEvents;
}

export async function getAllEvents() {
  const data = await fetchData();

  const events = Object.entries(data).map(([id, event]) => ({ id, ...event }));

  return events;
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  const data = await fetchData();

  const events = Object.entries(data).map(([id, event]) => ({ id, ...event }));

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

export async function getEventById(id) {
  const data = await fetchData();

  const event = Object.entries(data)
    .filter(([eventId]) => eventId === id)
    .map(([id, event]) => ({ id, ...event }))
    .pop();

  return event;
}

export async function getAllEventIds() {
  const data = await fetchData();

  const eventIds = Object.keys(data);

  return eventIds;
}
