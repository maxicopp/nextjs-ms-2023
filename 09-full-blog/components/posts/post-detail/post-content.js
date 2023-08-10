import PostHeader from './post-header';
import classes from './post-content.module.css';

const DUMMY_POST = {
  title: 'Getting Started with Next.js',
  image: 'getting-started-nextjs.png',
  date: '2020-01-01',
  slug: 'getting-started-with-nextjs',
  content: '# This is a first post',
};

function PostContent() {
  const imagePath = `/images/posts/${DUMMY_POST.slug}/${DUMMY_POST.image}`;

  return (
    <article className={classes.content}>
      <PostHeader title={DUMMY_POST.title} image={imagePath} />
      {DUMMY_POST.content}
    </article>
  );
}

export default PostContent;
