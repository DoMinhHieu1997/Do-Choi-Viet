import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Skeleton, Card, Grid, Container, Button, Typography } from "@mui/material";
import { Carousel } from "bootstrap";
import { KeyboardArrowLeftIcon, KeyboardArrowRightIcon } from '@mui/icons-material';
import axiosInstance from '../../axios';

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
            <div className="col-md-5 px-0">
                <div id="carouselExampleIndicators" className="carousel slide rounded overflow-hidden" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        {
                            productInfo !== null
                                ?
                                    productInfo.images.map((item,index) => {
                                        return <button type="button" key={index+"slide-btn"} data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className={index === 0 ? "active" : ""} aria-current="true" aria-label={`Slide ${index}` }></button>
                                    })
                                : 
                                    null
                        }
                    </div>
                    <div className="carousel-inner">
                        {
                            productInfo !== null
                                ?
                                    productInfo.images.map((item,index) => {
                                        return <div className={"carousel-item " + (index === 0 ? "active" : "" )} key={index}>
                                            <div className="ratio ratio-4x3 bg-secondary classify-icon" style={{backgroundImage:`url(${item})`}}></div>
                                        </div>
                                    })
                                : 
                                    null
                        }
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className="col-md-7 ps-lg-3">
                {
                    productInfo !== null 
                        ?
                            <>
                                <Typography variant="h5" fontWeight={"bold"}>{productInfo.name}</Typography>
                                <div className='my-3' style={{ height:"3px", width:"4rem", backgroundColor:"#f79207" }}></div>
                                <div className="d-flex fs-5">
                                    <div className="me-2">Kích thước sản phẩm:</div><div>{productInfo.size}</div>
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
            <div className="col-12 mt-4">
                <Typography variant="h5" fontWeight={"bold"}>Mô tả sản phẩm</Typography>
                <div className='my-3' style={{ height:"3px", width:"4rem", backgroundColor:"#f79207" }}></div>
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
        </div>
    </Container>
}

export default Detail;