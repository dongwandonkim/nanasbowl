import { useHistory } from 'react-router-dom';
import TextTruncate from 'react-text-truncate';
import {
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  Typography,
  Button,
  makeStyles,
  Grid,
  CircularProgress,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    minHeight: '100%',
  },
  media: {
    minHeight: '250px',
    minWidth: '100%',
  },
});

const ProductCard = (props) => {
  let history = useHistory();
  const classes = useStyles();

  const makeDateShort = (date) => {
    return new Date(date).toDateString();
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.root}>
        <CardActionArea
          onClick={() => history.push(`/products/${props.data.product_id}`)}
        >
          {props.data.signedUrl ? (
            props.data.signedUrl ? (
              <CardMedia
                className={classes.media}
                image={props.data.signedUrl && props.data.signedUrl}
                title={props.data.product_name}
              />
            ) : (
              <CircularProgress />
            )
          ) : (
            <CardMedia
              className={classes.media}
              alt="image not available"
              image="https://via.placeholder.com/400x250?text=ImageNotAvailable"
            />
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.data.product_name}
            </Typography>
            <Typography>{props.data.product_type}</Typography>
            {/* <Typography variant="body2" color="textSecondary" component="p"> */}
            <TextTruncate
              line={2}
              element="p"
              truncateText="…"
              text={props.data.product_desc}
              // textTruncateChild={<a href="#">Read on</a>}
            />
            {/* </Typography> */}
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductCard;
