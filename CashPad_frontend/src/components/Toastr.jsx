import { Snackbar, Alert } from "@mui/material";

const Toastr = (props) => {
    const {open, errorMessage, type, handleClose} = props
    
    const showSnackBar = () => {
        return (
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        )
    }

    return (
        <>
            {showSnackBar()}
        </>
    )
}

export default Toastr;
