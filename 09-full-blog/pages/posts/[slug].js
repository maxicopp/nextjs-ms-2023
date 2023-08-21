import { Fragment } from 'react';
import PostContent from '../../components/posts/post-detail/post-content';
import { getPostData, getPostsFiles } from '../../lib/posts-util';
import Head from 'next/head';

function PostDetailPage({ post }) {
  return (
    <Fragment>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <PostContent post={post} />
    </Fragment>
  );
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
