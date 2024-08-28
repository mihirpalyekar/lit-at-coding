import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import QuestionTable from '../components/QuestionTable';
export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <QuestionTable />
    </Layout>
  );
}
