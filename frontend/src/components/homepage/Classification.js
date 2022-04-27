import { Grid, Typography, SvgIcon } from "@mui/material";
import { NavLink } from 'react-router-dom';

const Classification = () => {
    return <>
        <Typography variant="h4" textAlign="center" mb={2} fontWeight="bold">Danh mục sản phẩm</Typography>
        <div className='mx-auto mb-4' style={{ height:"3px", width:"5rem", backgroundColor:"#f79207" }}></div>
        <Grid container spacing={3}>
            <Grid item xs={6} md={4}>
                <NavLink to="/san-pham/co-vua">
                    <div className="ratio ratio-16x9 rounded shadow-hover cursor-pointer bg-antiquewhite transition-d5">
                        <div className="top-50 start-50 classify-icon translate-middle icon-chess-active"></div>
                    </div>
                </NavLink>
            </Grid>
            <Grid item xs={6} md={4}>
                <NavLink to="/san-pham/ca-ngua">
                    <div className="ratio ratio-16x9 rounded shadow-hover cursor-pointer bg-antiquewhite transition-d5">
                        <div className="top-50 start-50 classify-icon translate-middle icon-horse-chess-active"></div>
                    </div>
                </NavLink>
            </Grid>
            <Grid item xs={6} md={4}>
                <NavLink to="/san-pham/co-tuong">
                    <div className="ratio ratio-16x9 rounded shadow-hover cursor-pointer bg-antiquewhite transition-d5">
                        <div className="top-50 start-50 classify-icon translate-middle icon-chinese-chess-active"></div>    
                    </div>
                </NavLink>
            </Grid>
            <Grid item xs={6} md={4}>
                <NavLink to="/san-pham/xep-hinh">
                    <div className="ratio ratio-16x9 rounded shadow-hover cursor-pointer bg-antiquewhite transition-d5">
                        <div className="top-50 start-50 classify-icon translate-middle icon-block-active"></div>
                    </div>
                </NavLink>
            </Grid>
            <Grid item xs={6} md={4}>
                <NavLink to="/san-pham/ngoai-troi">
                    <div className="ratio ratio-16x9 rounded shadow-hover cursor-pointer bg-antiquewhite transition-d5">
                        <div className="top-50 start-50 classify-icon translate-middle icon-outside-active"></div>
                    </div>
                </NavLink>
            </Grid>
            <Grid item xs={6} md={4}>
                <NavLink to="/san-pham/khac">
                    <div className="ratio ratio-16x9 rounded shadow-hover cursor-pointer bg-antiquewhite transition-d5">
                        <div className="top-50 start-50 classify-icon translate-middle icon-dif-active"></div>
                    </div>
                </NavLink>
            </Grid>
        </Grid>
    </>
}

export default Classification;