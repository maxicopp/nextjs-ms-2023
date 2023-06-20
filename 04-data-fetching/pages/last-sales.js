import { useEffect, useState } from 'react';

function LastSalesPage() {
  const [sales, setSales] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSales = async () => {
    setIsLoading(true);
    const response = await fetch(
      'https://nextjs-course-56c57-default-rtdb.firebaseio.com/sales.json'
    );
    const salesData = await response.json();
    setSales(Object.values(salesData));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSales();
  }, []);

  if (!sales) {
    return <p>No data yet</p>;
  }

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>Last Sales</h1>
          <ul>
            {sales.map(({ username, volume }) => (
              <li key={username}>
                {username} - ${volume}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default LastSalesPage;
