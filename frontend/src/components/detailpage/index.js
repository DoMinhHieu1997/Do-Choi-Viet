import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Skeleton, Container, Typography, Chip } from "@mui/material";
import axiosInstance from '../../axios';
import { getProductClassification } from '../../common';
import SuggestedProducts from '../detailpage/SuggestedProducts';
import EditIcon from '@mui/icons-material/Edit';
import { getToken } from "../../common";
import Carousel from 'react-bootstrap/Carousel';

const Detail = (props) => {

    const {id} = useParams();
    let navigate = useNavigate();
    const [productInfo, setProductInfo] = useState(null);
    const [allowEdit, setAllowEdit] = useState(false);

    useEffect(() => {
        const token = getToken();
        if (token) {
            setAllowEdit(true);
        }

        axiosInstance
        .get(`/products/detail/${id}`)
        .then((res) => {
            const result = res.data;

            if (result.messageCode === 0) {
                setProductInfo(result.data[0]);
                props.setProductInfo(result.data[0]);
            } else {
                navigate('/');
            }
        });
    }, [id]);

    return <Container sx={{ mt:15, mb:10 }}>

        <div className="row">
            <div className="col-md-6 px-0">
                <Carousel>
                    {
                        productInfo !== null
                            ?
                                productInfo.images.map((item,index) => {
                                    return <Carousel.Item>
                                        <div className="ratio ratio-4x3 bg-secondary classify-icon rounded border" style={{backgroundImage:`url(${item})`}}></div>
                                    </Carousel.Item>
                                    // <div className={"carousel-item " + (index === 0 ? "active" : "" )} key={index}>
                                    //     <div className="ratio ratio-4x3 bg-secondary classify-icon rounded border" style={{backgroundImage:`url(${item})`}}></div>
                                    // </div>
                                })
                            : 
                                null
                    }
                </Carousel>
                {/* <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" data-bs-interval="1000">
                    <div className="carousel-indicators pe-lg-2">
                        {
                            productInfo !== null
                                ?
                                    productInfo?.images
                                        && 
                                        productInfo.images.map((item,index) => {
                                            return <button type="button" key={index+"slide-btn"} data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className={index === 0 ? "active" : ""} aria-current="true" aria-label={`Slide ${index}` }>
                                                <div className="ratio ratio-4x3 bg-01c classify-icon overflow-hidden rounded border" style={{backgroundImage:`url(${item})`}}></div>
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
                </div> */}
            </div>
            <div className="col-md-6 ps-lg-4">
                {
                    productInfo !== null 
                        ?
                            <>
                                <Typography variant="h4" fontWeight={"bold"}>{productInfo.name}</Typography>
                                {
                                    productInfo.classify !== 'xep-hinh'
                                        && 
                                            <Chip sx={{backgroundColor:'rgb(247, 146, 7)', color:'white'}} className="fw-bold fs-5 p-2 mt-4" label={productInfo.type === 1 ? 'có nam châm' : 'không nam châm'}/>

                                }
                                <div className="fs-4 mt-4">
                                    <span>Phân loại:</span> <span className="fw-bold">{getProductClassification(productInfo.classify)}</span>
                                </div>
                                <div className="fs-4 mt-3">
                                    <span>Kích thước:</span> <span className="fw-bold">{productInfo.size}</span>
                                </div>
                                <div hidden={!allowEdit}>
                                    <div 
                                        className="mt-4 d-inline-flex align-items-center px-3 py-1 rounded cursor-pointer"
                                        style={{border:'2px solid #606060'}}
                                        onClick={
                                            () => {
                                                props.setOpenModal(true);
                                                props.setIsCreateProduct(false);
                                                props.setProductInfo(productInfo);
                                            }
                                        }
                                    >
                                        <div className="me-1 fw-bold">Chỉnh sửa</div>
                                        <EditIcon fontSize='small'/>
                                    </div>
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
                id && <SuggestedProducts productId={id}/>
            }
        </div>
    </Container>
}

export default Detail;