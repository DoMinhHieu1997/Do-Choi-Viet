import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Skeleton, Card, Grid, Container, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductItem";

const ProductPage = () => {
    const navigate = useNavigate();
    const [listProduct, setListProduct] = useState();
    const [page, setPage] = useState();
    const [title, setTitle] = useState('');
    const param =  useParams();

    if (param.type) {
        console.log(1);
    } else {
        console.log(2);
    }

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
                alias:"mo-rong",
                title:"khác"
            },
        ];

        for (let i = 0; i < titleInfo.length; i++) {
            if (str == i.alias) {
                checktitle = i.title;
            }
        }

        if (checktitle !== '') {
            navigate('/');
        } else {
            setTitle(checktitle);
        }
    }

    useEffect(() => {
        getProductTitle(param.type);
    }, [])

    return <Container sx={{mt:15, mb:10}}>
        <Typography mb={1} variant="h4" className="text-center">Danh sách sản phẩm {title}</Typography>
        <div className='mx-auto mb-4' style={{ height:"3px", width:"5rem", backgroundColor:"#f79207" }}></div>
        <Grid container spacing={2}>
            {
                Array(8).fill(0).map((item, index) => {
                    return <ProductCard key={index}/>
                })
            }
            {
                Array(8).fill(0).map((item, index) => {
                    return <ProductItemSkeleton key={index}/>
                })
            }
        </Grid>
        <div className="text-center mt-4">
            <Button variant="outlined" sx={{ fontWeight:"600" }}>Xem thêm sản phẩm</Button>
        </div>
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