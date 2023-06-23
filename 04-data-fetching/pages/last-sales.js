import { useEffect, useState } from 'react';
import useSWR from 'swr';

function LastSalesPage() {
  const [sales, setSales] = useState([]);
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error } = useSWR(
    'https://nextjs-course-56c57-default-rtdb.firebaseio.com/sales.json',
    fetcher
  );

  useEffect(() => {
    if (data) {
      setSales(Object.values(data));
    }
  }, [data]);

  if (error) {
    return <p>Failed to load.</p>;
  }

  return (
    <>
      {!data ? (
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
