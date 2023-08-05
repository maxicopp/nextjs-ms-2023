import { createContext, useEffect, useState } from 'react';

const NotificationContext = createContext({
  notification: null,
  showNotification: ({ title, message, status }) => {},
  hideNotification: () => {},
});

function NotificationContextProvider({ children }) {
  const [activeNotification, setActiveNotification] = useState(null);

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === 'success' ||
        activeNotification.status === 'error')
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

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
