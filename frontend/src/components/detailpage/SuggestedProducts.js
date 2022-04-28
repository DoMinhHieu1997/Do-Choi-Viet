import { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { Skeleton, Card, Grid, Container, Button, Typography, Chip } from "@mui/material";
import ProductCard from '../productpage/ProductItem';

const SuggestedProduct = (props) => {

    const [list, setList] = useState([]);

    useEffect(() => {
        axiosInstance
        .get(`/products/suggestions`,
            {
                productId: props.productId
            }
        )
        .then((res) => {
            const result = res.data;

            if (result.messageCode === 0) {
                setList(result.data);
            }
        });
    }, [props.productId]);

    return <div>
        <div className="d-flex mt-5 mb-3">
            <div className="me-2" style={{width:"3px", backgroundColor:"#f79207"}}></div>
            <Typography variant="h4" fontWeight={"bold"}>Sản phẩm khác</Typography>
        </div>
        <div className="row">
            {
                list.length === 0
                    && 
                        Array(4).fill(0).map((item,index) => {
                            return <div key={index+'-another'} className="col-md-3 col-12">
                                <div className="rounded border ratio ratio-4x3" style={{backgroundColor:'rgba(0, 0, 0, 0.11)'}}></div>
                            </div>
                        })   
            }
        </div>
        <Grid container spacing={2}>
            {
                list.length > 0 && 
                    list.map((item, index) => {
                        return <ProductCard key={index+'pc'} infor={item}/>
                    })
            }
        </Grid>
    </div>
}

export default SuggestedProduct;