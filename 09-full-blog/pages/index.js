import { Fragment } from 'react';
import Hero from '../components/home-page/hero';
import FeaturedPosts from '../components/home-page/fetured-posts';

const DUMMY_POSTS = [
  {
    title: 'Getting Started with Next.js',
    image: 'getting-started-nextjs.png',
    excerpt: 'Next.js is a React framework for server-side rendering.',
    date: '2020-01-01',
    slug: 'getting-started-with-nextjs',
  },
  {
    title: 'Getting Started with Next.js',
    image: 'getting-started-nextjs.png',
    excerpt: 'Next.js is a React framework for server-side rendering.',
    date: '2020-01-01',
    slug: 'getting-started-with-nextjs2',
  },
  {
    title: 'Getting Started with Next.js',
    image: 'getting-started-nextjs.png',
    excerpt: 'Next.js is a React framework for server-side rendering.',
    date: '2020-01-01',
    slug: 'getting-started-with-nextjs3',
  },
  {
    title: 'Getting Started with Next.js',
    image: 'getting-started-nextjs.png',
    excerpt: 'Next.js is a React framework for server-side rendering.',
    date: '2020-01-01',
    slug: 'getting-started-with-nextjs4',
  },
];

function HomePage() {
  return (
    <Fragment>
      <Hero />
      <FeaturedPosts posts={DUMMY_POSTS} />
    </Fragment>
  );
}

export default HomePage;
