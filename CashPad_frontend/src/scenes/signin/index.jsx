import { useState, useContext } from 'react'
import { Box, Button, TextField, Typography, Snackbar, Alert } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import SidebarContext from '../../SidebarContext';
import Toastr from '../../components/Toastr';
import { server_url } from '../../config/config';

const Signin = () => {
    const navigate = useNavigate();
    const sidebarContext = useContext(SidebarContext);
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [type, setType] = useState("error");

    const handleFormSubmit = (values) => {
        axios.post(`${server_url}signin`, values).then((response) => {
            response = response.data;
            if (response.success) {
                localStorage.setItem("userInfo", JSON.stringify(response.user));
                sidebarContext.updateUser(response.user)
                navigate("/dashboard");
            } else {
                setType("error");
                setErrorMessage("User Does not Exist")
                setOpen(true);
            }
        });
    };

    const handleClose = () => {
        setOpen(false);
    }

    const showSnackBar = () => {
        return (
            <Toastr open={open} errorMessage={errorMessage} type={type} handleClose={handleClose}/>
        )
    }

    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {showSnackBar()}
            <Typography component="h1" variant="h1">
                Sign in
            </Typography>
            <Box mt="20px">
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={checkoutSchema}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                    }) => (

                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={!!touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="password"
                                label="Password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name="password"
                                error={!!touched.password && !!errors.password}
                                helperText={touched.password && errors.password}
                                sx={{ mt: 3, mb: 2 }}

                            />
                            <Button
                                type="Login"
                                fullWidth
                                color="secondary"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                        </form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
};

// const phoneRegExp =
//     /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
    password: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
});
const initialValues = {
    password: "",
    email: "",
};

export default Signin;
