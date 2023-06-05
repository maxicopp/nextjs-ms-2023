import { useEffect, useState } from 'react';
import MeetupList from '../components/meetups/MeetupList';

function AllMeetupsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    const fetchMeetups = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch meetups.');
        }
        const data = await response.json();

        const loadedMeetups = Object.entries(data).map(([id, meetupData]) => ({
          id,
          ...meetupData,
        }));

        setMeetups(loadedMeetups);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };

    fetchMeetups();
  }, []);

  return (
    <section>
      <h1>All Meetups</h1>
      {isLoading ? <p>Loading...</p> : <MeetupList meetups={meetups} />}
    </section>
  );
}

export default AllMeetupsPage;
