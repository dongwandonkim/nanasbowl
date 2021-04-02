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
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
    maxHeight: '440px',
  },
  media: {
    height: 240,
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
      {console.log(props.data)}
      <Card
        className={classes.root}
        onClick={() => history.push(`/products/${props.data.product_id}`)}
      >
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={props.data.signedUrl && props.data.signedUrl}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.data.product_name}
            </Typography>
            <Typography>{props.data.product_type}</Typography>
            {/* <Typography variant="body2" color="textSecondary" component="p"> */}
            <TextTruncate
              line={1}
              element="span"
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
