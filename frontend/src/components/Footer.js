import {
    Container,
    Grid
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import Logo from '../images/logo.png';

const AppFooter = () => {
    const pages = [
        {text:'Trang chủ',link:'/'}, 
        {text:'Cờ vua',link:'/san-pham/co-vua'},
        {text:'Cá ngựa',link:'/san-pham/ca-ngua'},
        {text:'Cờ tướng',link:'/san-pham/co-tuong'},
        {text:'Xếp hình',link:'/san-pham/xep-hinh'},
        {text:'Ngoài trời',link:'/san-pham/ngoai-troi'},
        {text:'Khác',link:'/san-pham/khac'}
    ];

    return <div className='border-top'>
        <Container>
            <Grid container sx={{py:5, alignItems:"center"}}>
                <Grid item sx={{ flexGrow:1, display:'flex', alignItems:'end' }}>
                    <img width='220rem' src={Logo}/>
                </Grid>
                <Grid>
                    <Grid className="d-none d-md-flex" container>
                        {
                            pages.map((item,index) => {
                                return <Grid mr={3} key={index} sx={{fontWeight:'600'}}>
                                    <NavLink to={item.link} className="c-606060">{item.text}</NavLink>
                                </Grid>
                            })
                        }
                    </Grid>
                    <Grid className="mt-3 d-md-none" container>
                        {
                            pages.map((item,index) => {
                                return <Grid key={index} mt={2} xs={6} item={true} sx={{fontWeight:'600', fontSize:'1.3rem'}}>
                                    <NavLink to={item.link} className="c-606060">{item.text}</NavLink>
                                </Grid>
                            })
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Container>
        <div className='text-center py-2 fw-bold text-white' style={{ backgroundColor:"#174c9c", fontSize:"0.8rem" }}>
            Bảo Trợ Bởi DMH Corp
        </div>
    </div>
}

export default AppFooter;