import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import QuestionTable from '../components/QuestionTable';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div>
      <h1>Lit at Coding Questions</h1>
      <QuestionTable />
    </div>
    </Layout>
  );
}
