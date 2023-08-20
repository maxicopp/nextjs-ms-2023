import PostContent from '../../components/posts/post-detail/post-content';
import { getAllPosts, getPostData, getPostsFiles } from '../../lib/posts-util';

function PostDetailPage({ post }) {
  return <PostContent post={post} />;
}

export function getStaticProps(context) {
  const slug = context.params.slug;
  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
}

export function getStaticPaths() {
  const postsFilenames = getPostsFiles();
  const slug = postsFilenames.map((filename) => filename.replace(/\.md$/, ''));

  return {
    paths: slug.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export default PostDetailPage;
