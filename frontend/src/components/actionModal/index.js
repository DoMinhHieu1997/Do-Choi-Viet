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
    IconButton,
    Grid
} from "@mui/material";
import { styled } from '@mui/material/styles';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useState } from "react";

const Input = styled('input')({
    display: 'none',
});

const ActionModal = (props) => {

    const [imageList, setImageList] = useState([]);

    const handleOpen = () => props.setOpenModal(true);

    const handleClose = () => props.setOpenModal(false);

    const handleImageUpload = (e) => {
        const files = e.target.files
        let reader = new FileReader();
        function readFile(index) {
            if( index >= files.length ) return;
            var file = files[index];
            reader.onload = function(e) {  
                // get file content  
                var bin = e.target.result;
                console.log(reader.result);
                setImageList(prev => [...prev,bin]);
                // do sth with bin
                readFile(index+1)
            }
            reader.readAsBinaryString(file);
        }
        readFile(0);
        // const file = e.target.files;
        // const filesLength = file.length;
        // for (let i = 0; i < filesLength; i ++) {
        //     if (file[i].type === "image/png" || "image/gif" || "image/jpeg") {
        //         console.log(file[i])
        //         let reader = new FileReader();
        //         reader.onload = (event) => {
        //             console.log(event.target.result);
        //             console.log(reader.result);
        //             setImageList(prev => [...prev,reader.result]);
        //         };
        //         // file && reader.readAsDataURL(file);
        //     } else {
        //         console.log("lỗi upload");
        //     }
        // }  
    }

    const handleRemoveImage = (imageLink) => {
        const list = [...imageList];
        const index = list.indexOf(imageLink);
        if (index > -1) {
            list.splice(index,1);
            setImageList(list);
        }
    }

    return <Modal
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
                    <MenuItem value={10}>Cờ vua</MenuItem>
                    <MenuItem value={20}>Cá ngựa</MenuItem>
                    <MenuItem value={30}>Cờ tướng</MenuItem>
                    <MenuItem value={30}>Xếp hình</MenuItem>
                    <MenuItem value={30}>Ngoài trời</MenuItem>
                    <MenuItem value={30}>Khác</MenuItem>
                </Select>
            </FormControl>
            <Typography id="modal-modal-title" variant="h6" className="fw-bold" sx={{ mt:3 }}>
                Tải ảnh sản phẩm lên
            </Typography>
            <label htmlFor="contained-button-file" sx={{ mt:3 }}>
                <Input accept="image/*" id="contained-button-file" type="file" multiple onChange={handleImageUpload}/>
                <Button variant="contained" component="span" sx={{ py:1 }}>
                    <span>Upload</span>
                    <AddAPhotoIcon fontSize="small" sx={{ml:1, mb:1}}/>
                </Button>
            </label>
            <Grid container sx={{ mt:3 }}>
                {
                    imageList.length > 0 && imageList.map((item,index) => {
                        return <Grid key={index} sx={{ p:2 }} item xs={6} md={4} lg={3} className="position-relative">
                            <img className="w-100" src={item}/>
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
        </Box>
    </Modal>    
}

export default ActionModal;