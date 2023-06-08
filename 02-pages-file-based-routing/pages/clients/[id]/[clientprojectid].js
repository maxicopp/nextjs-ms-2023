import { useRouter } from 'next/router';

function SelectedClientProjectPage() {
  const router = useRouter();
  const { id, clientprojectid } = router.query;

  console.log({ id, clientprojectid });

  return (
    <div>
      <h1>The Project Page for a Specific Project for a Selected Client</h1>
    </div>
  );
}

export default SelectedClientProjectPage;
