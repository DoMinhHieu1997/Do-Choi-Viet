import { styled } from '@mui/material/styles';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useState } from "react";
import { storage } from "../../firebase";
import PropTypes from 'prop-types';
import {
    getDownloadURL,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
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
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const ActionModal = (props) => {
    const defaultConfig = {
        toolbar: {
            items: [
                'heading',
                '|',
                'bold',
                'italic',
                'link',
                'bulletedList',
                'numberedList',
                '|',
                'outdent',
                'indent',
                '|',
                'uploadImage',
                'blockQuote',
                'insertTable',
                'mediaEmbed',
                'undo',
                'redo',
            ]
        },
        image: {
            toolbar: [
                'imageStyle:inline',
                'imageStyle:block',
                'imageStyle:side',
                '|',
                'toggleImageCaption',
                'imageTextAlternative',
            ]
        },
        table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
        },
        language: 'vi',
        cloudServices: {
            tokenUrl:
              "https://87781.cke-cs.com/token/dev/5ae153e2ce55fe155b8ae35065d4cbe4f822c813f61cc3abd228aaf764e8?limit=10",
            uploadUrl: "https://87781.cke-cs.com/easyimage/upload/",
        },
    };

    const Input = styled('input') ({
        display: 'none',
    });
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
    const [displayProgessBar, setDisplayProgressBar] = useState(false);
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
                setImageListPrev(prev => [...prev,file[i]]);
            } else {
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
                setDisplayProgressBar(true);
                const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(prog);
            }, 
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                .then(url => {
                    setDisplayProgressBar(false);
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
            sx={{ overflow: "scroll" }}
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
                {
                    displayProgessBar 
                        && <Box sx={{ width: '100%' }}>
                            <LinearProgressWithLabel value={progress} />
                        </Box>
                }
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
                <div className='mt-3'>
                    <Typography id="modal-modal-title" variant="h6" className="fw-bold" sx={{ mt:3, mb:1 }}>
                        Nội dung bài viết
                    </Typography>
                    <CKEditor
                        config={defaultConfig}
                        editor={ ClassicEditor }
                        data="<p>Hello from CKEditor 5!</p>"
                        onReady={ editor => {} }
                        onChange={ ( event, editor ) => {} }
                        onBlur={ ( event, editor ) => {} }
                        onFocus={ ( event, editor ) => {} }
                    />
                </div>
                <div className="mt-3 text-end">
                    <Button variant="contained" sx={{ mr:3 }} onClick={handleModalAction}>Tạo bài viết</Button>
                    <Button variant="contained" onClick={handleClose}>Hủy tạo</Button>
                </div>
            </Box>
        </Modal>   
    </>
     
}

export default ActionModal;