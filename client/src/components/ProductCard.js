import { useHistory } from 'react-router-dom';
import TextTruncate from 'react-text-truncate';
import {
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  Typography,
  makeStyles,
  Grid,
  CircularProgress,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    minHeight: '100%',
    textTransform: 'uppercase',
    display: 'block',
  },
  media: {
    minHeight: '190px',
    minWidth: '190px',
  },
  actionArea: {
    height: '100%',
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
          className={classes.actionArea}
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
            <Typography gutterBottom variant="h5">
              {props.data.product_name}
            </Typography>

            {/* <Typography variant="body2" color="textSecondary" component="p"> */}
            <TextTruncate
              line={3}
              element="span"
              truncateText="…"
              text={props.data.product_desc}
              // textTruncateChild={<a href="#">Read on</a>}
            />
            {/* </Typography> */}
          </CardContent>
        </CardActionArea>

        <CardActions>
          <Typography variant="body2">{props.data.product_type}</Typography>
          <Typography variant="body2">{props.data.pet_type}</Typography>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductCard;
