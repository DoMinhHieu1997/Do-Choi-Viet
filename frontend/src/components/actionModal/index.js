import { styled } from '@mui/material/styles';
import "./ckeditor5.css";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useState} from "react";
import { useNavigate } from 'react-router-dom';
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
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import axiosInstance from '../../axios';
import { getToken } from '../../common';
import { async } from '@firebase/util';

const ActionModal = (props) => {

    const navigate = useNavigate(); 

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
                'imageUpload',
                'blockQuote',
                'insertTable',
                'undo',
                'redo',
                'fontBackgroundColor',
                'fontFamily',
                'fontColor',
                'fontSize',
                'underline',
                'alignment'
            ]
        },
        language: 'vi',
        image: {
            toolbar: [
                'imageTextAlternative',
                'imageStyle:inline',
                'imageStyle:block',
                'imageStyle:side',
                "resizeImage:50",
                "resizeImage:75",
                "resizeImage:original",
            ]
        },
        table: {
            contentToolbar: [
                'tableColumn',
                'tableRow',
                'mergeTableCells'
            ]
        }
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
    const [prdInfoProperties, setPrdInfoProperties] = useState({
        name:'',
        size:'',
        classify:'',
        type:0,
        content:''
    });
    const [sizeIsEmpty, setSizeIsEmpty] = useState(false);
    const [nameIsEmpty, setNameIsEmpty] = useState(false);
    const [classifyIsEmpty, setClassifyIsEmpty] = useState(false);
    const [imageUploadArray] = useState([]);
    const [displayType, setDisplayType] = useState(false);
    const [noticeUploadimages, setNoticeUploadimages] = useState(true);

    const handleClose = () => {
        props.setOpenModal(false);
        setImageListPrev([]);
        setProgress(0);
    }

    const handleCloseSnackBar = () => {
        setOpenSnackBar(false);
    }

    const handleChangeName = (event) => {
        const value = event.target.value;

        if (value) {
            setPrdInfoProperties({
                ...prdInfoProperties,
                name: value
            });
            setNameIsEmpty(false);
        } else {
            setNameIsEmpty(true);
        }
    }

    const handleImageUpload = (e) => {
        const file = e.target.files;
        
        for (let i = 0; i < file.length; i++) {
            if (file[i].type === "image/png" || file[i].type ==="image/gif" || file[i].type ==="image/jpeg") {
                setImageListPrev(prev => [...prev,file[i]]);
                uploadFiles(file[i]);
            } else {
                setOpenSnackBar(true);
            }
        }
    }

    const uploadFiles = async (file) => {
        if (!file) return;
        const storageRef = ref(storage, `/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        setDisplayProgressBar(true);

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

    class MyUploadAdapter {
        constructor( loader ) {
            this.loader = loader;
        }

        upload() {
            return this.loader.file.then(
                file => 
                    new Promise((resolve, reject) => {
                        const storageRef = ref(storage, `/files/${file.name}`);
                        const uploadTask = uploadBytesResumable(storageRef, file);
                        uploadTask.on("state_changed", 
                            (snapshot) => {
                                const progress = Math.round(
                                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                                );
                            }, 
                            (err) => console.log(err),
                            () => {
                                getDownloadURL(uploadTask.snapshot.ref)
                                .then(url => {
                                    resolve({ default: url });
                                });
                            }
                        )
                    }
                )
            )
        }

        abort() {}
    }

    const handleClassifyChange = (event) => {
        const value = event.target.value;
        if (value === "co-vua" || value === "ca-ngua" || value === "co-tuong") {
            setDisplayType(false);
        } else {
            setDisplayType(true);
        }
        setPrdInfoProperties({
            ...prdInfoProperties,
            classify: value
        })
    }

    const handleChangeSize = (event) => {
        const value = event.target.value;
        if (value !== '') {
            setSizeIsEmpty(false);
            setPrdInfoProperties({
                ...prdInfoProperties,
                size: value
            })
        } else {
            setSizeIsEmpty(true);
        }
    }

    const handleTypeChange = (event) => {
        const type = event.target.value;
        setPrdInfoProperties({
            ...prdInfoProperties,
            type: type
        })
    }

    const handleModalAction = () => {
        const token = props.token; 

        if (token) {
            if (imageUploadArray.lenght === 0) {
                
            } else {
                axiosInstance
                .post(`/products`,
                    {
                        name: prdInfoProperties.name,
                        size: prdInfoProperties.size,
                        content: prdInfoProperties.content,
                        classify: prdInfoProperties.classify,
                        type: prdInfoProperties.type,
                        images: imageUploadArray
                    },
                    {
                        headers: {
                            Authorization: "Bearer " + token
                        },
                    }
                )
                .then((res) => {
                    console.log(res);
                    const result = res.data;

                    if (result.messageCode === 0) {
                        props.setOpenModal(false);
                        navigate(`/chi-tiet/${result.data.insertedId}`);
                    } else {
                        alert(result.data[0]);
                    }
                });
            } 
        } else {
            console.log('chưa đăng nhập');
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
            <Box className="top-50 start-50 translate-middle bg-white p-4 position-absolute col-lg-7 col-11" style={{ height:"80vh", overflowY:"scroll", overflowX:"hidden" }}>
                <div className="d-flex">
                    <div className="me-2" style={{width:"4px", backgroundColor:"#f79207"}}></div>
                    <Typography id="modal-modal-title" variant="h5" className="fw-bold">
                        Tạo bài viết giới thiệu sản phẩm
                    </Typography>
                </div>
                {/* <Typography id="modal-modal-title" variant="h6" className="fw-bold" sx={{ mt:3, mb:1 }}>
                    Tên sản phẩm
                </Typography> */}
                <TextField 
                    error={nameIsEmpty}
                    helperText={nameIsEmpty ? "Mời nhập tên sản phẩm" : ""}
                    id="outlined-basic" 
                    label="Tên sản phẩm" 
                    fullWidth
                    variant="outlined" 
                    onChange={handleChangeName}
                    sx={{mt:4}}
                />
                <FormControl fullWidth sx={{ mt:4 }}>
                    <InputLabel id="demo-simple-select-label">Danh mục sản phẩm</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={prdInfoProperties.classify}
                        label="Loại sản phẩm"
                        onChange={handleClassifyChange}
                        error={classifyIsEmpty}
                    >
                        <MenuItem value={"co-vua"}>Cờ vua</MenuItem>
                        <MenuItem value={"ca-ngua"}>Cá ngựa</MenuItem>
                        <MenuItem value={"co-tuong"}>Cờ tướng</MenuItem>
                        <MenuItem value={"xep-hinh"}>Xếp hình</MenuItem>
                        <MenuItem value={"ngoai-troi"}>Ngoài trời</MenuItem>
                        <MenuItem value={"khac"}>Khác</MenuItem>
                    </Select>
                </FormControl>
                <div className='flex'>
                    <Typography id="modal-modal-title" variant="h6" className="fw-bold" sx={{ mt:3 }}>
                        Tải ảnh sản phẩm lên
                    </Typography>
                    <Typography hidden={noticeUploadimages} id="modal-modal-title" variant="h6" className="fw-bold text-danger" sx={{ mb:1 }}>
                        (Mời chọn ảnh cho sản phẩm)
                    </Typography>
                </div>
                
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
                <div>
                    <FormControl className='w-50' hidden={displayType} sx={{ mt:4 }}>
                        <InputLabel id="demo-simple-select-label">Kiểu sản phẩm</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={prdInfoProperties.type}
                            label="kiểu sản phẩm"
                            onChange={handleTypeChange}
                        >
                            <MenuItem value={1}>Có nam châm</MenuItem>
                            <MenuItem value={2}>Không nam châm</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <TextField 
                    sx={{mt:4, mb:2}}
                    error={sizeIsEmpty}
                    helperText={sizeIsEmpty ? "Mời nhập kích thước sản phẩm" : ""}
                    id="outlined-basic" 
                    label="Kích thước" 
                    variant="outlined" 
                    onChange={handleChangeSize}
                    className="w-50"
                />
                <div className='mt-4'>
                    <CKEditor
                        config={defaultConfig}
                        editor={ Editor }
                        onReady={ editor => {
                            editor.plugins.get("FileRepository").createUploadAdapter = (
                                loader
                              ) => {
                                return new MyUploadAdapter(loader);
                            };
                        }}
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            setPrdInfoProperties({
                                ...prdInfoProperties,
                                content: data
                            })
                        } }
                        onBlur={ ( event, editor ) => {} }
                        onFocus={ ( event, editor ) => {} }
                    />
                </div>
                <div className="mt-4 text-end">
                    <Button variant="contained" sx={{ mr:3 }} onClick={handleModalAction}>Tạo bài viết</Button>
                    <Button variant="contained" onClick={handleClose}>Hủy tạo</Button>
                </div>
            </Box>
        </Modal>   
    </>
     
}

export default ActionModal;