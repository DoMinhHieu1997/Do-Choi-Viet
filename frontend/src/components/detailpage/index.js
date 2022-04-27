import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Skeleton, Card, Grid, Container, Button, Typography, Chip } from "@mui/material";
import { Carousel } from "bootstrap";
import { KeyboardArrowLeftIcon, KeyboardArrowRightIcon } from '@mui/icons-material';
import axiosInstance from '../../axios';
import { getProductClassification } from '../../common';
import SuggestedProducts from '../detailpage/SuggestedProducts';

const Detail = () => {

    const {id} = useParams();
    let navigate = useNavigate();
    const [productInfo, setProductInfo] = useState(null);

    useEffect(() => {
        axiosInstance
        .get(`/products/detail/${id}`)
        .then((res) => {
            const result = res.data;

            if (result.messageCode === 0) {
                setProductInfo(result.data[0]);
            } else {
                navigate('/');
            }
        });
    }, [id]);

    return <Container sx={{ mt:15, mb:10 }}>
        <div className="row">
            <div className="col-md-6 px-0">
                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators pe-lg-2">
                        {
                            productInfo !== null
                                ?
                                    productInfo?.images
                                        && 
                                        productInfo.images.map((item,index) => {
                                            return <button type="button" key={index+"slide-btn"} data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className={index === 0 ? "active" : ""} aria-current="true" aria-label={`Slide ${index}` }>
                                                <div className="ratio ratio-4x3 bg-light classify-icon overflow-hidden rounded border" style={{backgroundImage:`url(${item})`}}></div>
                                            </button>
                                        })
                                : 
                                    null
                        }
                    </div>
                    <div className="carousel-inner rounded overflow-hidden">
                        {
                            productInfo !== null
                                ?
                                    productInfo.images.map((item,index) => {
                                        return <div className={"carousel-item " + (index === 0 ? "active" : "" )} key={index}>
                                            <div className="ratio ratio-4x3 bg-secondary classify-icon rounded border" style={{backgroundImage:`url(${item})`}}></div>
                                        </div>
                                    })
                                : 
                                    null
                        }
                    </div>
                    {/* <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button> */}
                </div>
            </div>
            <div className="col-md-6 ps-lg-4">
                {
                    productInfo !== null 
                        ?
                            <>
                                <Typography variant="h4" fontWeight={"bold"}>{productInfo.name}</Typography>
                                {/* <div className='mt-3 mb-4' style={{ height:"3px", width:"4rem", backgroundColor:"#f79207" }}></div> */}
                                <Chip sx={{backgroundColor:'rgb(247, 146, 7)', color:'white'}} className="fw-bold fs-5 p-2 mt-4" label={productInfo.type === 1 ? 'có nam châm' : 'không nam châm'}/>
                                <div className="fs-4 mt-4">
                                    <span>Phân loại:</span> <span className="fw-bold">{getProductClassification(productInfo.classify)}</span>
                                </div>
                                <div className="fs-4 mt-3">
                                    <span>Kích thước:</span> <span className="fw-bold">{productInfo.size}</span>
                                </div>
                            </>
                        : 
                            <>
                                <Skeleton height={40}/>
                                <div className='my-3' style={{ height:"3px", width:"4rem", backgroundColor:"#f79207" }}></div>
                                <Skeleton height={35} width={'80%'}/>
                                <Skeleton height={35} width={'75%'}/>
                                <Skeleton height={35} width={'65%'}/>
                                <Skeleton height={35} width={'73%'}/>
                                <Skeleton height={35} width={'74%'}/>
                                <Skeleton height={35} width={'66%'}/>
                                <Skeleton height={35} width={'78%'}/>
                                <Skeleton height={35} width={'67%'}/>
                            </>
                }
            </div>
            <div className="col-12 mt-5">
                <Typography variant="h4" fontWeight={"bold"}>Mô tả sản phẩm</Typography>
                <div className='mt-2 mb-4' style={{ height:"3px", width:"4rem", backgroundColor:"#f79207" }}></div>
                {
                    productInfo !== null
                        ? 
                            <div className="product-content" dangerouslySetInnerHTML={{__html: productInfo.content}}></div>
                        :
                            <>
                                <Skeleton height={35} width={'80%'}/>
                                <Skeleton height={35} width={'75%'}/>
                                <Skeleton height={35} width={'65%'}/>
                                <Skeleton height={35} width={'73%'}/>
                                <Skeleton height={35} width={'74%'}/>
                                <Skeleton height={35} width={'66%'}/>
                                <Skeleton height={35} width={'78%'}/>
                                <Skeleton height={35} width={'67%'}/>
                                <Skeleton height={35} width={'80%'}/>
                                <Skeleton height={35} width={'75%'}/>
                                <Skeleton height={35} width={'65%'}/>
                                <Skeleton height={35} width={'73%'}/>
                                <Skeleton height={35} width={'74%'}/>
                                <Skeleton height={35} width={'66%'}/>
                                <Skeleton height={35} width={'78%'}/>
                                <Skeleton height={35} width={'67%'}/>
                            </>
                }
            </div>
            {
                productInfo !== null
                    && <SuggestedProducts productId={productInfo._id}/>
            }
        </div>
    </Container>
}

export default Detail;