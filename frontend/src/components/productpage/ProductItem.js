import { Grid, Chip, Typography, Tooltip } from "@mui/material";
import { NavLink } from "react-router-dom";

const ProductCard = ({infor}) => {
    return <Grid item xs={6} md={3}>
        <div className="shadow-hover h-100 p-2" sx={{ p:2 }}>
            <NavLink
                to={`/chi-tiet/${infor._id}/`}
                className="rounded oveflow-hidden position-relative"
                onClick={() => window.scroll(0, 0)}
            >
                <div className="ratio ratio-1x1 rounded border">
                    <div className="classify-icon bg-01c" style={{ backgroundImage: `url(${infor.images[0]})`}}></div>
                    <div className="top-0 end-0 mt-2 text-end d-inline-block">
                        {
                            infor.type === 1
                                &&
                                    <Tooltip title="Có nam châm">
                                        <Chip label="NC" color="primary" className="me-2" sx={{ fontWeight:"bold", backgroundColor:"#174c9c" }}/>
                                    </Tooltip>
                        }
                        {
                            infor.type === 2
                                &&
                                    <Tooltip title="Không có nam châm">
                                        <Chip label="KNC" className="me-2" sx={{ fontWeight:"bold", backgroundColor:"#f79207", color:"white"  }}/>
                                    </Tooltip>
                        }
                    </div>
                </div>
                <div className='my-3' style={{ height:"2px", width:"4rem", backgroundColor:"#f79207" }}></div>
                <Typography variant="h6" mt={1} className="c-606060" sx={{fontWeight:"600"}}>{infor.name}</Typography>
            </NavLink>
        </div>
    </Grid>
}

export default ProductCard;