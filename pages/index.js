import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import QuestionTable from '../components/QuestionTable';
import { colors, Button, Grid, Chip, Avatar } from '@mui/material';
import CopyrightIcon from '@mui/icons-material/Copyright';
import EmailIcon from '@mui/icons-material/Email';
export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div>
        <Grid container spacing={2} padding={2} >
          <Grid xs>

            <div className='title'>
              <div>
                Let's get <span style={{ color: '#ff7c04' }}>LIT</span>
              </div>
              <div className='offsetCap'>
                ^
              </div>
              <div className='offsetAt'>
                at
              </div>
              <div>
                <span style={{ color: '#ff7c04' }}>Coding</span>
              </div>
            </div>
          </Grid>
          <Grid display="flex" justifyContent="end">
            <Button variant="outlined" color="info" target='_' href="https://www.mihirpalyekar.in/">
              View my Portfolio
            </Button>
          </Grid>
        </Grid>
        <QuestionTable />
      </div>
      <Grid container spacing={2} marginTop="2rem" justifyContent="space-between" alignItems="center">
  <Grid item xs="auto" >
    <Grid  display="flex" justifyContent="center" alignItems="center">
      <CopyrightIcon className="mr-1 text-base" />
      <span>2024 All Rights Reserved.</span>
    </Grid>
  </Grid>

  <Grid item xs="auto">
    <Grid >
      <a href='https://www.fiverr.com/codeworthy' target="_blank" rel="noreferrer">
        Made with passion and ❤️ towards tech by <span className='font-bold'>Mihir Palyekar</span>
      </a>
    </Grid>
  </Grid>

  <Grid item xs="auto">
    <Grid display="flex" justifyContent="center" alignItems="center">
      <EmailIcon className="mr-1 text-base" />
      <span>mihirlahu@vt.edu</span>
    </Grid>
  </Grid>
</Grid>
    </Layout>
  );
}
