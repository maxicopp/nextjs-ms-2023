import { useContext } from 'react';
import { FavoritesContext } from '../store/favorites-context';
import MeetupList from '../components/meetups/MeetupList';

function FavoritesPage() {
  const { favorites, totalFavorites } = useContext(FavoritesContext);

  return (
    <section>
      <h1>My Favorites</h1>
      {totalFavorites > 0 ? (
        <MeetupList meetups={favorites} />
      ) : (
        <p>You got no favorites yet. Start adding some?</p>
      )}
    </section>
  );
}

export default FavoritesPage;
