import { styled } from '@mui/material/styles';
import "./ckeditor5.css";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useState, useEffect} from "react";
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
    const [imageForUpdate, setImageForUpdate] = useState([]);
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

    useEffect(() => {
        if (props.productInfo) {
            let prd = props.productInfo;
            setPrdInfoProperties({
                name: prd.name,
                size: prd.size,
                classify: prd.classify,
                type: prd.type,
                content: prd.content
            });
            setImageForUpdate(prd.images);
        } else {
            setPrdInfoProperties({
                name:'',
                size:'',
                classify:'',
                type:0,
                content:''
            });
        }
    },[props.productInfo]);

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
        // console.log(imageForUpdate);
        const list = [...imageListPrev];
        const list_update = [...imageForUpdate];
        const index = list.indexOf(imageLink);
        const index_update = list_update.indexOf(imageLink);
        if (index > -1) {
            list.splice(index,1);
            setImageListPrev(list);
        }
        if (index_update > -1) {
            list_update.splice(index_update,1);
            setImageForUpdate(list_update);
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

        setPrdInfoProperties({
            ...prdInfoProperties,
            size: value
        });
        if (value !== '') {
            setSizeIsEmpty(false);
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
            if (imageUploadArray.lenght > 0) {

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
                    // console.log(res);
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
            console.log('ch??a ????ng nh???p');
        }
    }

    const handleModalActionEditProduct = () => {
        const token = props.token; 

        if (token) {
            if (imageUploadArray.length > 0 || imageForUpdate.length > 0) {
                axiosInstance
                .patch(`/products/update/${props.productInfo._id}`,
                    {
                        name: prdInfoProperties.name,
                        size: prdInfoProperties.size,
                        content: prdInfoProperties.content,
                        classify: prdInfoProperties.classify,
                        type: prdInfoProperties.type,
                        images: [...imageForUpdate,...imageUploadArray]
                    },
                    {
                        headers: {
                            Authorization: "Bearer " + token
                        },
                    }
                )
                .then((res) => {
                    const result = res.data;

                    if (result.messageCode === 0) {
                        props.setOpenModal(false);
                        navigate(`/chi-tiet/${props.productInfo._id}`);
                    } else {
                        alert(result.data[0]);
                    }
                })
                .catch(error => {
                    console.log(error);
                })
            } 
        } else {
            console.log('ch??a ????ng nh???p');
        }
    }

    return <>
        <Snackbar open={openSnackBar} autoHideDuration={3000} onClose={handleCloseSnackBar}>
            <Alert onClose={() => setOpenSnackBar(false)} severity="error" sx={{ width: '100%' }}>
                ???nh ch??a ????ng ?????nh d???ng!
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
                        {props.isCreateProduct ? "T???o b??i vi???t gi???i thi???u s???n ph???m" : "Ch???nh s???a s???n ph???m"}
                    </Typography>
                </div>
                <TextField 
                    error={nameIsEmpty}
                    helperText={nameIsEmpty ? "M???i nh???p t??n s???n ph???m" : ""}
                    id="outlined-basic" 
                    label="T??n s???n ph???m" 
                    fullWidth
                    variant="outlined" 
                    onChange={handleChangeName}
                    value={prdInfoProperties.name}
                    sx={{mt:4}}
                />
                <FormControl fullWidth sx={{ mt:4 }}>
                    <InputLabel id="demo-simple-select-label">Danh m???c s???n ph???m</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={prdInfoProperties.classify}
                        label="Lo???i s???n ph???m"
                        onChange={handleClassifyChange}
                        error={classifyIsEmpty}
                    >
                        <MenuItem value={"co-vua"}>C??? vua</MenuItem>
                        <MenuItem value={"ca-ngua"}>C?? ng???a</MenuItem>
                        <MenuItem value={"co-tuong"}>C??? t?????ng</MenuItem>
                        <MenuItem value={"xep-hinh"}>X???p h??nh</MenuItem>
                        <MenuItem value={"ngoai-troi"}>Ngo??i tr???i</MenuItem>
                        <MenuItem value={"khac"}>Kh??c</MenuItem>
                    </Select>
                </FormControl>
                <div className='flex'>
                    <Typography id="modal-modal-title" variant="h6" className="fw-bold mb-1" sx={{ mt:3 }}>
                        T???i ???nh s???n ph???m l??n
                    </Typography>
                    <Typography hidden={noticeUploadimages} id="modal-modal-title" variant="h6" className="fw-bold text-danger" sx={{ mb:1 }}>
                        (M???i ch???n ???nh cho s???n ph???m)
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
                        imageListPrev.length > 0 
                            && imageListPrev.map((item,index) => {
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
                    {
                        imageForUpdate.length > 0
                            && imageForUpdate.map((item,index) => {
                                return <Grid key={index} sx={{ p:2 }} item xs={6} md={4} lg={3} className="position-relative">
                                    <img 
                                        alt={item.name}
                                        className="w-100" 
                                        src={item}
                                    />
                                    <CancelOutlinedIcon className="position-absolute cursor-pointer" style={{ bottom:"95%", left:"95%" }} onClick={() => handleRemoveImage(item)}/>
                                </Grid>
                            })
                    }
                </Grid>
                <div>
                    <FormControl className='w-50' hidden={displayType} sx={{ mt:4 }}>
                        <InputLabel id="demo-simple-select-label">Ki???u s???n ph???m</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={prdInfoProperties.type}
                            label="ki???u s???n ph???m"
                            onChange={handleTypeChange}
                        >
                            <MenuItem value={1}>C?? nam ch??m</MenuItem>
                            <MenuItem value={2}>Kh??ng nam ch??m</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <TextField 
                    sx={{mt:4, mb:2}}
                    error={sizeIsEmpty}
                    helperText={sizeIsEmpty ? "M???i nh???p k??ch th?????c s???n ph???m" : ""}
                    id="outlined-basic" 
                    label="K??ch th?????c" 
                    variant="outlined" 
                    onChange={handleChangeSize}
                    value={prdInfoProperties.size}
                    className="w-50"
                />
                <div className='mt-4'>
                    <CKEditor
                        config={defaultConfig}
                        editor={ Editor }
                        data={prdInfoProperties.content}
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
                    {
                        props.isCreateProduct ?
                            <Button variant="contained" sx={{ mr:3 }} onClick={handleModalAction}>T???o b??i vi???t</Button>
                        :
                            <Button variant="contained" sx={{ mr:3 }} onClick={handleModalActionEditProduct}>S???a b??i vi???t</Button>
                    }
                    <Button variant="contained" onClick={handleClose}>H???y t???o</Button>
                </div>
            </Box>
        </Modal>   
    </>
     
}

export default ActionModal;