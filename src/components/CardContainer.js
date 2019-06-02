import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import LazyLoad from '@/components/common/LazyLoad'
import Typography from '@material-ui/core/Typography'
import dayjs from 'dayjs'

const useStyles = makeStyles({
  card: {
    width: '100%',
    position: 'relative',
  },
  media: {
    width: '100%',
  },
  mediaContainer: {
    height: 200,
    overflow: 'hidden',
    textAlign: 'center',
  },
})

function CardContainer({ index, headline, activeUrl, setActiveUrl }) {
  const classes = useStyles()
  const { title, urlToImage, url, content, publishedAt, author } = headline

  return (
    <div className="card-container">
      <Card
        data-testid={`card-parent-${index}`}
        className={{
          'card-inner': true,
          'card-inner__absolute': url === activeUrl,
          translucent: activeUrl && activeUrl !== url,
        }}
        raised={url === activeUrl}
      >
        {activeUrl === url && (
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                {author ? author.toUpperCase().charAt(0) : ''}
              </Avatar>
            }
            title={author}
            subheader={dayjs(publishedAt).format('D MMM, YYYY')}
          />
        )}
        <CardActionArea
          data-testid={`card-${index}`}
          onClick={() => setActiveUrl(activeUrl === url ? '' : url)}
        >
          <CardMedia className={classes.mediaContainer} src={urlToImage}>
            <LazyLoad className={classes.media} src={urlToImage ? urlToImage : undefined} />
          </CardMedia>
          <CardContent>
            <Typography
              className="block-ellipsis block-ellipsis--title"
              variant="h5"
              component="h2"
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className="block-ellipsis"
            >
              {content}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" href={url} target="_blank" color="primary">
            Read More
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default CardContainer
