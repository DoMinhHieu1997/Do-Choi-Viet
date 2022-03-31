import { Card, Grid, Chip, Typography, Tooltip } from "@mui/material";
import { NavLink } from "react-router-dom";

const ProductCard = () => {
    return <Grid item xs={6} md={3}>
        <Card sx={{ p:2 }}>
            <div className="ratio ratio-1x1 rounded border">
                <div className="top-0 end-0 mt-2 text-end d-inline-block">
                    <Tooltip title="Có nam châm">
                        <Chip label="NC" color="primary" className="me-2" sx={{ fontWeight:"bold", backgroundColor:"#174c9c" }}/>
                    </Tooltip>
                    <Tooltip title="Không có nam châm">
                        <Chip label="KNC" className="me-2" sx={{ fontWeight:"bold", backgroundColor:"#f79207", color:"white"  }}/>
                    </Tooltip>
                </div>
            </div>
            <Typography variant="h6" mt={1} sx={{fontWeight:"600"}}>Tiêu đề sản phẩm</Typography>
            <div className='mt-2 mb-3' style={{ height:"2px", width:"4rem", backgroundColor:"#f79207" }}></div>
            <Typography>Mô tả sản phẩm</Typography>
        </Card>
    </Grid>
}

export default ProductCard;