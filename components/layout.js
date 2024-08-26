import Head from 'next/head';
import styles from './layout.module.css';

export const siteTitle = 'Lit at Coding';

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="Lit at Coding"
          content="DSA company questions"
        />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <main>{children}</main>
    </div>
  );
}