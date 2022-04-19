import { styled } from '@mui/material/styles';
import "./ckeditor5.css";
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
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import axiosInstance from '../../axios';

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
    const [prdClassify, setPrdClassify] = useState("");
    const [prdImages, setPrdImages] = useState([]);
    const [prdContent, setPrdContent] = useState("");
    const [prdType, setPrdType] = useState("");
    const [prdSize, setPrdSize] = useState("");
    const [sizeIsEmpty, setSizeIsEmpty] = useState(false);
    const [classifyIsEmpty, setClassifyIsEmpty] = useState(false);
    const userToken = " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjU1M2U2MGE2MjYyMDQ0Nzk0ZTNiMDQiLCJpYXQiOjE2NTAzMzY2MDQsImV4cCI6MTY1MDQyMzAwNH0.hJeW2Xc3P6LtaewFSMzkRGzDxdwQjt8hxXEsG0x0kso";

    let imageUploadArray = [];

    const handleClose = () => {
        props.setOpenModal(false);
        setImageListPrev([]);
        setProgress(0);
    }

    const handleCloseSnackBar = () => {
        setOpenSnackBar(false);
    }

    // const handleCheckVirus = () => {
    //     const options = {
    //         method: 'POST',
    //         headers: {Accept: 'text/plain', 'Content-Type': 'application/x-www-form-urlencoded'},
    //         body: new URLSearchParams({
    //           apikey: 'f8836037b94a1754c9ac0c8a9d747572aeda729473059a9bcdd0a5819142eed8',
    //           file: 'data:image/svg+xml;name=Group%2075.svg;base64,PHN2ZyB3aWR0aD0iMzI2IiBoZWlnaHQ9IjE4IiB2aWV3Qm94PSIwIDAgMzI2IDE4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMCAySDE0Ny41TDE2My41IDE2LjUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMyIvPgo8cGF0aCBkPSJNMzI1LjUgMkgxNzhMMTYyIDE2LjUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMyIvPgo8L3N2Zz4K'
    //         })
    //     };
        
    //     fetch('https://www.virustotal.com/vtapi/v2/file/scan', options)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));
    // }

    const handleImageUpload = (e) => {
        const file = e.target.files;
        
        for (let i = 0; i < file.length; i++) {
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
                                    console.log(url)
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
        setPrdClassify(value);
    }

    const handleChangeSize = (event) => {
        const value = event.target.value;
        if (value !== '') {
            setSizeIsEmpty(false);
            setPrdSize(value);
        } else {
            setSizeIsEmpty(true);
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
        axiosInstance
        .get(`/products`)
        .then((res) => {
            const result = res.data;

            if (result.messageCode === 0) {
                
            } else {
                
            }
        });
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
            <Box className="top-50 start-50 translate-middle bg-white p-4 position-absolute col-lg-9 col-11" style={{ height:"80vh", overflowY:"scroll", overflowX:"hidden" }}>
                <Typography id="modal-modal-title" variant="h5" className="fw-bold">
                    Tạo bài viết giới thiệu sản phẩm
                </Typography>
                <FormControl fullWidth sx={{ mt:3 }}>
                    <InputLabel id="demo-simple-select-label">Loại sản phẩm</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={prdClassify}
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
                <Typography id="modal-modal-title" variant="h6" className="fw-bold" sx={{ mt:3, mb:1 }}>
                    Kích thước sản phẩm
                </Typography>
                <TextField 
                    error={sizeIsEmpty}
                    helperText={sizeIsEmpty ? "Mời nhập kích thước sản phẩm" : ""}
                    id="outlined-basic" 
                    label="Kích thước" 
                    variant="outlined" 
                    onChange={handleChangeSize}
                />
                <Typography id="modal-modal-title" variant="h6" className="fw-bold" sx={{ mt:3, mb:1 }}>
                    Mô tả sản phẩm
                </Typography>
                <TextareaAutosize
                    aria-label="empty textarea"
                    placeholder="Nhập mô tả"
                    className="rounded p-2"
                    minRows={3}
                    style={{ width: '100%' }}
                />
                <div className='mt-3'>
                    <Typography id="modal-modal-title" variant="h6" className="fw-bold" sx={{ mt:3, mb:1 }}>
                        Nội dung bài viết
                    </Typography>
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
                            setPrdContent(data);
                        } }
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