import { useState, useEffect } from "react";
import {
    Box, 
    Typography, 
    Select, 
    FormControl, 
    InputLabel, 
    TextField,
    Button,
    Grid
} from "@mui/material";

const Login = () => {
    const [usernameIsEmpty, setUsernameIsEmpty] = useState(false);
    const [passwordIsEmpty, setPasswordIsEmpty] = useState(false);

    const handleUserNameChange = () => {

    }

    const handlePasswordChange = () => {

    }

    const handleLogin = () => {

    }

    return <div className="mt-5 position-relative" style={{height:"75vh"}}>
        <div className="position-absolute h-100 w-100 login-page-background classify-icon"></div>
        <div className="position-absolute top-50 w-100 translate-middle-y col d-flex justify-content-center">
            <div className="col-lg-4 col-11 border rounded shadow px-3 py-4" style={{backgroundColor:"white"}}>
                <div className="mt-4">
                    <TextField
                        className="w-100"
                        error={usernameIsEmpty}
                        helperText={usernameIsEmpty ? "Tên đăng nhập chưa được nhập" : ""}
                        id="outlined-basic" 
                        label="Tên đăng nhập" 
                        variant="outlined" 
                        onChange={handleUserNameChange}
                    />
                </div>
                <div className="mt-4">
                    <TextField
                        className="w-100"
                        error={passwordIsEmpty}
                        helperText={passwordIsEmpty ? "Mật khẩu chưa được nhập" : ""}
                        id="outlined-basic" 
                        label="Mật khẩu" 
                        variant="outlined" 
                        onChange={handlePasswordChange}
                    />
                </div>
                <div className="mt-5 text-center">
                    <Button variant="contained" onClick={handleLogin}>Đăng nhập</Button>
                </div>
            </div>
        </div>
    </div>
}

export default Login;