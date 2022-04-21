import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Typography, 
    FormControl, 
    InputLabel, 
    TextField,
    Button,
    OutlinedInput,
    InputAdornment,
    IconButton
} from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axiosInstance from "../../axios";

const Login = () => {
    const navigate = useNavigate();
    const [usernameIsEmpty, setUsernameIsEmpty] = useState(false);
    const [passwordIsEmpty, setPasswordIsEmpty] = useState(false);
    const [username, setUsername] = useState('');
    const [passwordInput, setPasswordInput] = useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
      });

    const handleUserNameChange = (event) => {
        const username = event.target.value;
        setUsername(username);
    }

    const handleChange = (event) => {
        setPasswordInput({ ...passwordInput, password: event.target.value });
    };
    
    const handleClickShowPassword = () => {
        setPasswordInput({
          ...passwordInput,
          showPassword: !passwordInput.showPassword,
        });
    };

    const handleLogin = () => {
        if (!username) {
            setUsernameIsEmpty(true);
        } else if (!passwordInput.password) {
            setPasswordIsEmpty(true);
        } else {
            axiosInstance
            .post(`/auth/login`, {username:username, password: passwordInput.password})
            .then((res) => {
                const result = res.data;
                if (result.messageCode === 0) {
                    localStorage.setItem('token', result.data.token);
                    navigate('/');
                } else {

                }
            });
        }
    }

    return <div className="mt-5 position-relative" style={{height:"75vh"}}>
        <div className="position-absolute h-100 w-100 login-page-background classify-icon"></div>
        <div className="position-absolute top-50 w-100 translate-middle-y col d-flex justify-content-center">
            <div className="col-lg-4 col-11 border rounded shadow px-3 py-4" style={{backgroundColor:"white"}}>
                <div className="d-flex">
                    <div className="me-2" style={{width:"4px", backgroundColor:"#f79207"}}></div>
                    <Typography id="modal-modal-title" variant="h5" className="fw-bold">
                        Đăng nhập tài khoản
                    </Typography>
                </div>
                <div className="mt-4">
                    <TextField
                        className="w-100"
                        error={usernameIsEmpty}
                        helperText={usernameIsEmpty ? "Tên đăng nhập chưa được nhập" : ""}
                        label="Tên đăng nhập" 
                        variant="outlined" 
                        onChange={handleUserNameChange}
                    />
                </div>
                <div className="mt-4">
                    <TextField
                        error={passwordIsEmpty}
                        type={passwordInput.showPassword ? "text" : "password"}
                        name="password"
                        helperText={passwordIsEmpty ? "Mật khẩu không được để trống" : ""}
                        fullWidth
                        size="large"
                        label="Mật khẩu"
                        InputProps={{
                            endAdornment: !passwordInput.showPassword ? (
                            <Visibility
                                onClick={handleClickShowPassword}
                                style={{ cursor: "pointer" }}
                            />
                            ) : (
                            <VisibilityOff
                                onClick={handleClickShowPassword}
                                style={{ cursor: "pointer" }}
                            />
                            )
                        }}
                        onChange={handleChange}
                    />
                </div>
                <Button variant="contained" className="mt-5 btn-login fw-bold" fullWidth onClick={handleLogin}>Đăng nhập</Button>
            </div>
        </div>
    </div>
}

export default Login;