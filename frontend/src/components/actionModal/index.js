import { 
    Modal, 
    Box, 
    Typography, 
    Select, 
    FormControl, 
    InputLabel, 
    MenuItem, 
    TextField,
    TextareaAutosize,
    Button,
    Grid,
    Snackbar,
    Alert,
    LinearProgress
} from "@mui/material";
import { styled } from '@mui/material/styles';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useState } from "react";
import { storage } from "../../firebase";
import {
    getDownloadURL,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import PropTypes from 'prop-types';

const Input = styled('input') ({
    display: 'none',
});

const ActionModal = (props) => {

    function LinearProgressWithLabel(props) {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
              <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography variant="body2" color="text.secondary">{`${Math.round(
                props.value,
              )}%`}</Typography>
            </Box>
          </Box>
        );
    }

    LinearProgressWithLabel.propTypes = {
        value: PropTypes.number.isRequired,
    };

    const [imageListPrev, setImageListPrev] = useState([]);
    const [progress, setProgress] = useState(0);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    let imageUploadArray = [];

    const handleOpen = () => props.setOpenModal(true);

    const handleClose = () => {
        props.setOpenModal(false);
        setImageListPrev([]);
        setProgress(0);
    }

    const handleCloseSnackBar = () => {
        setOpenSnackBar(false);
    }

    const handleImageUpload = (e) => {
        const file = e.target.files;
        
        for (let i = 0; i < file.length; i++) {
            console.log(file[i].type);
            if (file[i].type === "image/png" || file[i].type ==="image/gif" || file[i].type ==="image/jpeg") {
                console.log(1);
                setImageListPrev(prev => [...prev,file[i]]);
            } else {
                console.log(2);
                setOpenSnackBar(true);
            }
        }
    }

    const uploadFiles = async (file) => {
        if (!file) return;
        const storageRef = ref(storage, `/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        await uploadTask.on("state_changed", 
            (snapshot) => {
                const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(prog);
            }, 
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                .then(url => {
                    imageUploadArray.push(url);
                    console.log(imageUploadArray);
                });
            }
        )
    }

    const handleRemoveImage = (imageLink) => {
        const list = [...imageListPrev];
        const index = list.indexOf(imageLink);
        if (index > -1) {
            list.splice(index,1);
            setImageListPrev(list);
        }
    }

    const handleModalAction = () => {
        if (imageListPrev.length > 0) {
            imageListPrev.map(file => {
                uploadFiles(file);
            })
        } else {
            setOpenSnackBar(true);
        }
    }

    return <>
        <Snackbar open={openSnackBar} autoHideDuration={3000} onClose={handleCloseSnackBar}>
            <Alert onClose={() => setOpenSnackBar(false)} severity="error" sx={{ width: '100%' }}>
                Ảnh chưa đúng định dạng!
            </Alert>
        </Snackbar>
        <Modal
            open={props.openModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className="top-50 start-50 translate-middle bg-white p-4 position-absolute">
                <Typography id="modal-modal-title" variant="h5" className="fw-bold">
                    Tạo bài viết giới thiệu sản phẩm
                </Typography>
                <FormControl fullWidth sx={{ mt:3 }}>
                    <InputLabel id="demo-simple-select-label">Loại sản phẩm</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={age}
                        label="Loại sản phẩm"
                        // onChange={handleChange}
                    >
                        <MenuItem>Cờ vua</MenuItem>
                        <MenuItem>Cá ngựa</MenuItem>
                        <MenuItem>Cờ tướng</MenuItem>
                        <MenuItem>Xếp hình</MenuItem>
                        <MenuItem>Ngoài trời</MenuItem>
                        <MenuItem>Khác</MenuItem>
                    </Select>
                </FormControl>
                <h4>{progress}</h4>
                <Typography id="modal-modal-title" variant="h6" className="fw-bold" sx={{ mt:3, mb:1 }}>
                    Tải ảnh sản phẩm lên
                </Typography>
                <label htmlFor="contained-button-file">
                    <Input accept="image/*" id="contained-button-file" type="file" multiple onChange={handleImageUpload}/>
                    <Button variant="contained" component="span" className="py-1" sx={{ py:0, px:1 }}>
                        <span>Upload</span>
                        <AddAPhotoIcon fontSize="small" sx={{ml:1, mb:1}}/>
                    </Button>
                </label>
                <Box sx={{ width: '100%' }}>
                    <LinearProgressWithLabel value={progress} />
                </Box>
                <Grid container sx={{ mt:3 }}>
                    {
                        imageListPrev.length > 0 && imageListPrev.map((item,index) => {
                            return <Grid key={item.name} sx={{ p:2 }} item xs={6} md={4} lg={3} className="position-relative">
                                <img 
                                    alt={item.name}
                                    className="w-100" 
                                    src={URL.createObjectURL(item)}
                                />
                                <CancelOutlinedIcon className="position-absolute cursor-pointer" style={{ bottom:"95%", left:"95%" }} onClick={() => handleRemoveImage(item)}/>
                            </Grid>
                        })
                    }
                </Grid>
                <TextField id="outlined-basic" label="Kích thước" variant="outlined" sx={{ mt:3 }}/>
                <TextareaAutosize
                    aria-label="empty textarea"
                    placeholder="Mô tả sản phẩm"
                    className="mt-4 rounded"
                    minRows={3}
                    style={{ width: '100%' }}
                />
                <div className="mt-3 text-end">
                    <Button variant="contained" sx={{ mr:3 }} onClick={handleModalAction}>Tạo bài viết</Button>
                    <Button variant="contained" onClick={handleClose}>Hủy tạo</Button>
                </div>
            </Box>
        </Modal>   
    </>
     
}

export default ActionModal;