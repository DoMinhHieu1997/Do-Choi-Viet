import { useState, useEffect } from 'react';
import * as React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../images/Logo.png';
import { getToken } from '../common';

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const AppMenu = (props) => {
  const pages = [
    {text:'Trang chủ',link:'/'}, 
    {text:'Cờ vua',link:'/san-pham/co-vua'},
    {text:'Cá ngựa',link:'/san-pham/ca-ngua'},
    {text:'Cờ tướng',link:'/san-pham/co-tuong'},
    {text:'Xếp hình',link:'/san-pham/xep-hinh'},
    {text:'Ngoài trời',link:'/san-pham/ngoai-troi'},
    {text:'Khác',link:'/san-pham/khac'}
  ];

  const [logged, setLogged] = useState(false);
  const notLogged = ['Login'];
  const isLogged = ['Logout'];

  useEffect(() => {
    const token = getToken();
    if (token) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  },[]);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    localStorage.removeItem('token');
    setAnchorElUser(null);
  };

  return <ElevationScroll {...props}>
    <AppBar sx={{ backgroundColor:'white', borderBottom:'1px solid #ddd' }}>
      <Container>
        <Toolbar disableGutters>
          
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr:5, alignItems:'center' }}>
            <img width='150rem' src={Logo}/>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.text + '-specified-1'} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" className='className="c-606060"'>{page.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, alignItems:'center', fontWeight:'600' }}>
            <img width="100rem" src={Logo}/>
          </Box>
          

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <input 
              placeholder="Tìm sản phẩm..." 
              className="rounded py-1 px-3" 
              style={{
                backgroundColor:"#f1effc",
                border:"none"
              }}
            />
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, mr:2 }}>
            {pages.map((page) => (
              <NavLink key={page.text + '-specified-2'} to={page.link}>
                <Button
                  onClick={handleCloseNavMenu}
                  className="c-606060"
                  sx={{ my: 2, display: 'block', textTransform: 'unset', fontWeight:"600" }}
                >
                  {page.text}
                </Button>
              </NavLink>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {
                logged
                  ? 
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">Đăng xuất</Typography>
                    </MenuItem>
                  :
                    <MenuItem onClick={handleCloseUserMenu}>
                      <NavLink className="c-606060"
                          to={`/login`}
                          onClick={() => window.scroll(0, 0)}
                      >Đăng nhập</NavLink>
                    </MenuItem>
              }
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  </ElevationScroll>
  
}

export default AppMenu;