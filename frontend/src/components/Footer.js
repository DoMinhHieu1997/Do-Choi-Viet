import {
    Container,
    Grid,
    Typography
} from '@mui/material';

const AppFooter = () => {
    return <div className='mt-5 border-top'>
        <Container>
            <Grid container sx={{py:5}}>
                <Grid item sx={{flexGrow:1}}>
                    <Typography variant='h4'>DOCHOIVIET</Typography>
                </Grid>
                <Grid item>
                    <Grid container sx={{fontWeight:"600"}}>
                        <Grid item mr={3}>Trang chủ</Grid>
                        <Grid item mr={3}>Sản phẩm</Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    </div>
}

export default AppFooter;