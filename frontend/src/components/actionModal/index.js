import { 
    Modal, 
    Box, 
    Typography, 
    Select, 
    FormControl, 
    InputLabel, 
    MenuItem, 
    TextField,
    TextareaAutosize
} from "@mui/material";
import { useState } from "react";

const ActionModal = (props) => {

    const handleOpen = () => props.setOpenModal(true);

    const handleClose = () => props.setOpenModal(false);

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