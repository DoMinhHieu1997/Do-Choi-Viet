import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Skeleton, Container, Typography, Chip } from "@mui/material";
import axiosInstance from '../../axios';
import $ from 'jquery';
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

    useEffect(() => {
        if (productInfo) {
            if (productInfo.images.length) {
                const indicators = $(".carousel-indicators button");
                
                $.each(indicators, (index, item) => {
                    $(item).empty().append(
                        `<div class="ratio ratio-4x3 bg-01c classify-icon overflow-hidden rounded border" style="background-image:url(${productInfo.images[index]})"></div>`
                    )
                })
            }
        }
    }, [productInfo?.images]);

    return <Container sx={{ mt:15, mb:10 }}>

        <div className="row">
            <div className="col-md-6 px-0">
                <Carousel>
                    {
                        productInfo !== null
                            ?
                                productInfo.images.map((item,index) => {
                                    return <Carousel.Item>
                                        <div key={index} className="ratio ratio-4x3 bg-secondary classify-icon rounded border" style={{backgroundImage:`url(${item})`}}></div>
                                    </Carousel.Item>
                                })
                            : 
                                null
                    }
                </Carousel>
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