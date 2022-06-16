import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const CreateButton = (props) => {

    return <div className='top-50 end-0 me-2 position-fixed translate-middle-y cursor-pointer'>
        <AddCircleOutlineIcon fontSize='large' onClick={() => props.setOpenModal(true)}/>
    </div>
}

export default CreateButton;