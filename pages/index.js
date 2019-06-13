import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import { GET_ARTICLES } from '@/api'

import Typography from '@material-ui/core/Typography'

import { TOP_HEADLINES } from '@/api/endpoints'
import ProgressContainer from '@/components/ProgressContainer'
import CardContainer from '@/components/CardContainer'

function Home({ router: { query } }) {
  const [headlines, setHeadlines] = useState([])
  const [activeUrl, setActiveUrl] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  async function fetchData() {
    try {
      let articles = await GET_ARTICLES({ url: TOP_HEADLINES, category: query.category })
      articles = articles.filter( ({ urlToImage }) => urlToImage)
      setHeadlines(articles)
    } catch (e) {
      if (e.response) {
        const { message } = e.response.data
        setErrorMsg(message)
      }
    }
  }

  // Fetch data on mount
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography component="h1" variant="h1">
            Headlines
          </Typography>
        </Grid>
        {errorMsg ? (
          <Typography color="error">{errorMsg || 'Something went wrong'}</Typography>
        ) : headlines.length > 0 ? (
          <Grid container item xs={12} spacing={1} data-testid="article-container">
            {headlines.map((headline, index) => {
              const { title } = headline
              return (
                <Grid key={title} item xs={12} sm={6} md={4} lg={3} xl={2}>
                  <CardContainer
                    index={index}
                    headline={headline}
                    setActiveUrl={setActiveUrl}
                    activeUrl={activeUrl}
                  />
                </Grid>
              )
            })}
          </Grid>
        ) : (
          <ProgressContainer />
        )}
      </Grid>
    </div>
  )
}

Home.defaultProps = {
  router: {
    query: {
      category: '',
    },
  },
}

Home.propTypes = {
  router: PropTypes.object,
}

export default Home
