function UserIdPage(props) {
  return <h1>{props.id}</h1>;
}

export default UserIdPage;

export async function getServerSideProps({ params: { uid } }) {
  const id = `userid-${uid}`;

  return { props: { id } };
}
