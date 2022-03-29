import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid
} from '@mui/material';

const TopSell = () => {
  return <>
    <Typography variant="h5" textAlign="center" mb={2} fontWeight="bold">Sản phẩm bán chạy</Typography>
    <div className='mx-auto mb-5' style={{ height:"3px", width:"5rem", backgroundColor:"#f79207" }}></div>
    <Grid container spacing={3}>
      {
        Array(8).fill(0).map((item,index) => {
          return <TopSellItem/>
        })
      }
    </Grid>
  </>
}

const TopSellItem = () => {

  return <Grid item xs={6} md={3} mb={2}>
    <Card>
      <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  </Grid>
  
}

export default TopSell;