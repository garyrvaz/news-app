import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import { withRouter } from 'next/router'
import Link from 'next/link'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import MUIContainer from '@material-ui/core/Container'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import theme from '@/components/theme'
import '@/assets/styles/style.sass'
import { CATEGORIES } from '@/constants/index'

class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render() {
    const { Component, pageProps, router } = this.props
    const { category: routeCategory, title } = router.query

    return (
      <Container>
        <Head>
          <title>{title}</title>
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <AppBar position="static" color="default" elevation={1}>
            <Toolbar className="app-bar">
              <Link href="/">
                <Typography variant="h6" color="primary" noWrap>
                  News Digest
                </Typography>
              </Link>
            </Toolbar>
          </AppBar>
          <MUIContainer maxWidth="xl">
            <nav style={{ margin: '17px 0' }}>
              {CATEGORIES.map(category => (
                <Link key={category} href={`/${category}`} prefetch>
                  <Button
                    className="app-bar__link"
                    color={category === routeCategory ? 'primary' : 'default'}
                  >
                    {category}
                  </Button>
                </Link>
              ))}
            </nav>
            <Component {...pageProps} router={router} />
          </MUIContainer>
        </ThemeProvider>
      </Container>
    )
  }
}

export default withRouter(MyApp)
