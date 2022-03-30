import { Grid, Typography } from "@mui/material";

const Classification = () => {
    return <>
        <Typography variant="h5" textAlign="center" mb={2} fontWeight="bold">Danh mục sản phẩm</Typography>
        <div className='mx-auto mb-5' style={{ height:"3px", width:"5rem", backgroundColor:"#f79207" }}></div>
        <Grid container spacing={3}>
            <Grid item xs={6} md={4}>
                <div className="ratio ratio-16x9 rounded border"></div>
            </Grid>
            <Grid item xs={6} md={4}>
                <div className="ratio ratio-16x9 rounded border"></div>
            </Grid>
            <Grid item xs={6} md={4}>
                <div className="ratio ratio-16x9 rounded border"></div>
            </Grid>
            <Grid item xs={6} md={4}>
                <div className="ratio ratio-16x9 rounded border"></div>
            </Grid>
            <Grid item xs={6} md={4}>
                <div className="ratio ratio-16x9 rounded border"></div>
            </Grid>
            <Grid item xs={6} md={4}>
                <div className="ratio ratio-16x9 rounded border"></div>
            </Grid>
        </Grid>
    </>
    
}

export default Classification;