import { createContext } from 'react';

const NotificationContext = createContext({
  notification: null,
  showNotification: ({ title, message, status }) => {},
  hideNotification: () => {},
});

function NotificationContextProvider({ children }) {
  const [activeNotification, setActiveNotification] = useState(null);

  function showNotification({ title, message, status }) {
    setActiveNotification({ title, message, status });
  }

  function hideNotification() {
    setActiveNotification(null);
  }

  const context = {
    notification: activeNotification,
    showNotification,
    hideNotification,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
}

export { NotificationContextProvider, NotificationContext };
