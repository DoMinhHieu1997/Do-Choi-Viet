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
    console.log(productInfo);

    useEffect(() => {
        axiosInstance
        .get(`/products/detail/${id}`)
        .then((res) => {
            const result = res.data;

            if (result.messageCode === 0) {
                console.log(result.data);
                // setProductInfo(result.data[0]);
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
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="ratio ratio-4x3 bg-primary"></div>
                        </div>
                        <div className="carousel-item">
                            <div className="ratio ratio-4x3 bg-secondary"></div>
                        </div>
                        <div className="carousel-item">
                            <div className="ratio ratio-4x3 bg-warning"></div>
                        </div>
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
            </div>
        </div>
    </Container>
}

export default Detail;