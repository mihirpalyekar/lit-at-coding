import Head from 'next/head';
import styles from './layout.module.css';
import { Box, Button, Grid, AppBar, Toolbar, Typography  } from '@mui/material';
import CopyrightIcon from '@mui/icons-material/Copyright';
import EmailIcon from '@mui/icons-material/Email';
export const siteTitle = 'Lit at Coding';
import { Analytics } from "@vercel/analytics/react"
export default function Layout({ children, home }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="Lit at Coding"
          content="DSA company questions"
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <AppBar  position="sticky" sx={{ top: 0 }}>
        
            <Toolbar>
              <Typography className='title' variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <div style={{ display: 'flex', gap: '4px' }}>
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
              </Typography>
              <Grid >
                <Button variant="outlined" size="medium" style={{ width: 'max-content', margin: '0', background: 'white' }} color="info" target='_' href="https://www.mihirpalyekar.in/">
                  View my Portfolio
                </Button>
              </Grid>
            </Toolbar>
          </AppBar>
      <main className={styles.container} sx={{ flexGrow: 1 }}>{children}</main>
      <AppBar position="sticky" sx={{ top: 'auto', bottom: 0, backgroundColor: 'primary', boxShadow: 'none' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', padding: '1rem 0' }}>
          <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
            <Grid item>
              <Grid container alignItems="center">
                <CopyrightIcon sx={{ marginRight: '0.5rem' }} />
                <Typography>2024 All Rights Reserved.</Typography>
              </Grid>
            </Grid>
            <Grid item>
              <a href='https://www.mihirpalyekar.in/' target="_blank" rel="noreferrer">
                Made with passion and ❤️ towards tech by <span className='font-bold'>Mihir Palyekar</span>
              </a>
            </Grid>
            <Grid item>
              <Grid container alignItems="center">
                <EmailIcon sx={{ marginRight: '0.5rem' }} />
                <a href={`mailto:mihirlahu@vt.edu`} target="_blank" rel="noreferrer">
                  mihirlahu@vt.edu
                </a>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
        <Analytics/>
      </AppBar>
    </div>
  );
}