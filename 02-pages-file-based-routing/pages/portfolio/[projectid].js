import { useRouter } from 'next/router';

function PortfolioProjectPage() {
  const router = useRouter();
  const { projectid } = router.query;

  console.log(router);

  return (
    <div>
      <h1>The Portfolio Project Page</h1>
      <p>Project ID: {projectid}</p>
    </div>
  );
}

export default PortfolioProjectPage;
