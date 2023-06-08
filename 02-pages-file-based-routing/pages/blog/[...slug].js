import { useRouter } from 'next/router';

function BlogPostsPage() {
  const router = useRouter();

  const { slug } = router.query;

  console.log({ slug });

  return (
    <div>
      <h1>The Blog Posts</h1>
    </div>
  );
}

export default BlogPostsPage;
