import { createContext, useEffect, useState } from 'react';

export const FavoritesContext = createContext({
  favorites: [],
  totalFavorites: 0,
  addFavorite: (favoriteMeetup) => {},
  removeFavorite: (favoriteMeetupId) => {},
  itemIsFavorite: (meetupId) => {},
});

function FavoritesContextProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  function addFavoriteHandler(newFavorite) {
    setFavorites((prevFavorites) => [...prevFavorites, newFavorite]);
  }

  function removeFavoriteHandler(favoriteId) {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((favorite) => favorite.id !== favoriteId)
    );
  }

  const itemIsFavoriteHandler = (meetupId) =>
    favorites.some((favorite) => favorite.id === meetupId);

  const contextValue = {
    favorites,
    totalFavorites: favorites.length,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    itemIsFavorite: itemIsFavoriteHandler,
  };

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
}

function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default FavoritesContextProvider;
