import { createContext } from 'react';

const NotificationContext = createContext({
  notification: null,
  showNotification: () => {},
  hideNotification: () => {},
});

function NotificationContextProvider({ children }) {
  const [notification, setNotification] = useState(null);

  function showNotification(title, message, status) {
    setNotification({ title, message, status });
  }

  function hideNotification() {
    setNotification(null);
  }

  return (
    <NotificationContext.Provider
      value={{
        notification,
        showNotification,
        hideNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export { NotificationContextProvider, NotificationContext };
