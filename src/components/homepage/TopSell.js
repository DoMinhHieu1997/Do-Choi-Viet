import { useState, useEffect } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Skeleton
} from '@mui/material';
import axiosInstance from '../../axios';
import ProductCard from '../productpage/ProductItem';

const TopSell = () => {

  const [topSell, setTopSell] = useState([]);

  useEffect(() => {
    axiosInstance
        .get(`/products/suggestions`,
            {
                productId: 0
            }
        )
        .then((res) => {
            const result = res.data;

            if (result.messageCode === 0) {
              setTopSell(result.data);
            }
        });
  }, []);

  return <>
    <Typography variant="h4" textAlign="center" mb={2} mt={5} fontWeight="bold">Sản phẩm bán chạy</Typography>
    <div className='mx-auto mb-4' style={{ height:"3px", width:"5rem", backgroundColor:"#f79207" }}></div>
    <Grid container spacing={3}>
      {
        topSell.length === 0 
          ? 
            Array(8).fill(0).map((item, index) => {
              return <ItemSkeleton key={index}/>
            })
          :
            topSell.map((item, index) => {
              return <ProductCard key={index} infor={item}/>
            })
      }
    </Grid>
  </>
}

const TopSellItem = (infor) => {

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
    </Card>
  </Grid>
}

const ItemSkeleton = () => {
  return <Grid item xs={6} md={3} mb={2}>
        <Skeleton className="rounded" sx={{ height: "12rem" }} animation="wave" variant="rectangular" />
        <Skeleton sx={{ mt:2 }}/>
        <Skeleton/>
        <Skeleton/>
        <Skeleton/>
  </Grid>
}

export default TopSell;