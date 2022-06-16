import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Skeleton, Card, Grid, Container, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductItem";
import axiosInstance from '../../axios';

const ProductPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [listProduct, setListProduct] = useState(null);
    const [page, setPage] = useState(1);
    const [title, setTitle] = useState('');
    const param =  useParams();

    const getProductTitle = (str) => {
        let checktitle = '';
        const titleInfo = [
            {
                alias:"co-vua",
                title:"cờ vua"
            },
            {
                alias:"ca-ngua",
                title:"cá ngựa"
            },
            {
                alias:"co-tuong",
                title:"cờ tướng"
            },
            {
                alias:"xep-hinh",
                title:"xếp hình"
            },
            {
                alias:"ngoai-troi",
                title:"ngoài trời"
            },
            {
                alias:"khac",
                title:"khác"
            },
        ];

        for (let i = 0; i < titleInfo.length; i++) {
            if (str === titleInfo[i].alias) {
                checktitle = titleInfo[i].title;
            }
        }

        if (checktitle !== '') {
            setTitle(checktitle);
        } else {
            navigate('/');
        }
    }

    const getProductList = (classify) => {
        axiosInstance
        .get(`/products/category/${classify}`)
        .then((res) => {
            const result = res.data;

            if (result.messageCode === 0) {
                setListProduct(result.data);
                setIsLoading(false);
            } else {
                navigate('/');
            }
        });
    }

    useEffect(() => {
        
    }, [])

    useEffect(() => {
        setIsLoading(true)
        getProductTitle(param.type);
        setIsLoading(false);
        getProductList(param.type);
    }, [param.type])

    return <Container sx={{mt:15, mb:10}}>
        <Typography mb={1} variant="h4" className="text-center" sx={{ fontWeight:"700" }}>Danh sách sản phẩm {title}</Typography>
        <div className='mx-auto mb-4' style={{ height:"3px", width:"5rem", backgroundColor:"#f79207" }}></div>
        <Grid container spacing={2}>
            {
                listProduct !== null
                    && listProduct.map((item, index) => {
                        return <ProductCard key={index+'pc'} infor={item}/>
                    })
            }
            {
                isLoading && Array(8).fill(0).map((item, index) => {
                    return <ProductItemSkeleton key={index}/>
                })
            }
        </Grid>
        {
            listProduct && listProduct.length === 12
                &&
                    <div className="text-center mt-5">
                        <Button variant="outlined" sx={{ fontWeight:"600" }}>Xem thêm sản phẩm</Button>
                    </div>
        }
        
    </Container>
}

const ProductItemSkeleton = () => {
    return <Grid item xs={6} md={3}>
        <Card sx={{ p:2 }}>
            <Skeleton className="rounded mb-2" variant="rectangular" height={200} />
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
        </Card>
    </Grid>
}

export default ProductPage;