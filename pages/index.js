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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Grid container display="flex" gap={2} justifyContent="space-between" paddingBottom="1rem" >
          <Grid className='title' item xs="auto" md={3} style={{ padding: '0' }} >
            <div style={{display: 'flex', gap: '4px'}}>
                Get <span style={{ color: '#ff7c04' }}>LIT</span>
              </div>
              <div className='offsetCap'>
                ^
              </div>
              <div className='offsetAt'>
                at
              </div>
              <div>
                <span style={{ color: '#ff7c04', paddingLeft: '12px' }}>Coding</span>
              </div>
          </Grid>
          <Grid item xs={12} md={2} >
            <Button variant="outlined" size="medium" style={{ width: '100%', margin: '0' }} color="info" target='_' href="https://www.mihirpalyekar.in/">
              View my Portfolio
            </Button>
          </Grid>
        </Grid>
        <QuestionTable />
      <Grid container spacing={2} marginTop="2rem" justifyContent="space-between" alignItems="center">
        <Grid item xs="auto" >
          <Grid display="flex" justifyContent="center" alignItems="center">
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
