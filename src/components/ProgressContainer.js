import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'

function ProgressContainer() {
  return (
    <Grid container alignItems="center" justify="center" direction="column">
      <Grid item xs={12}>
        <CircularProgress color="primary" />
      </Grid>
    </Grid>
  )
}

export default ProgressContainer
