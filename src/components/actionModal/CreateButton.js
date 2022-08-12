import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const CreateButton = (props) => {

    return <div 
        className='top-50 end-0 me-2 position-fixed translate-middle-y cursor-pointer'
        onClick={() => {
            props.setOpenModal(true);
            props.setIsCreateProduct(true);
            props.setProductInfo(null);
        }}>
        <AddCircleOutlineIcon fontSize='large' />
    </div>
}

export default CreateButton;