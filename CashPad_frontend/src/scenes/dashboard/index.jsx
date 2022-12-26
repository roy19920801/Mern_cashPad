import { Box, Typography, useTheme, Grid, Button, Modal, TextField, Select, MenuItem } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { Formik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import axios from "axios";
import Toastr from "../../components/Toastr";
import { server_url } from "../../config/config";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [toastrOpen, setToastrOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [type, setType] = useState("error");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    catchUser();
  }, [])

  const catchUser = () => {
    axios.get(`${server_url}recentuser`).then((res) => {
      setUsers(res.data.users);
    })
  }

  const showUserList = () => {
    if (users.length > 0) {
      return (
        users.map((user, i) => (
          <Grid container key={`${user.id}-${i}`} rowSpacing={2} columnSpacing={{ xs: 1, sm: 5, md: 5 }} sx={{ padding: 2 }}>
            <Grid item xs={3}>
              <Box justifyContent="center">
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                  textAlign="center"
                >
                  {user.name}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box color={colors.grey[100]}>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  textAlign="center"
                >
                  {user.address}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box
                p="5px 10px"
                borderRadius="4px"
                textAlign="center"
              >
                ${user.amount}
              </Box>
            </Grid>
            <Grid item xs={3}>
              {user.status === 1 ?
                <Box
                  backgroundColor={colors.greenAccent[500]}
                  p="5px 10px"
                  textAlign="center"
                  borderRadius="4px"
                  sx={{px: 5}}
                >
                  Normal
                </Box>
                : <Box
                  backgroundColor={colors.redAccent[500]}
                  p="5px 10px"
                  borderRadius="4px"
                  textAlign="center"
                  sx={{mx:5}}
                >
                  Suspended
                </Box>}

            </Grid>
          </Grid>
        ))
      )
    } else {
      return (<></>)
    }

  }

  const handleFormSubmit = (value) => {
    axios.post(`${server_url}createuser`, value).then((res) => {
      if (res.data.success) {
        catchUser();
        setOpen(false);
      } else {
        setType("error");
        setToastrOpen(true);
        setErrorMessage("Something went wrong!");
      }
    }).catch((err) => {
      setToastrOpen(true);
      setType("error");
      setErrorMessage("Server not runnung!");
    })
  }

  const showSnackBar = () => {
    return (
      <Toastr open={toastrOpen} errorMessage={errorMessage} type={type} handleClose={handleToastrClose} />
    )
  }

  const handleToastrClose = () => {
    setToastrOpen(false);
  }

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        {showSnackBar()}
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={handleOpen}
          >
            Add User
          </Button>
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
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
                    label="Address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address}
                    name="address"
                    error={!!touched.address && !!errors.address}
                    helperText={touched.address && errors.address}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    name="name"
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    sx={{ mt: 3 }}
                  />
                  <Select
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    variant="filled"
                    value={values.status}
                    label="Status"
                    onChange={handleChange}
                    error={!!touched.status && !!errors.status}
                    helperText={touched.status && errors.status}
                    name="status"
                    sx={{ mt: 3 }}
                  >
                    <MenuItem value={1}>Normal</MenuItem>
                    <MenuItem value={2}>Suspended</MenuItem>
                    <MenuItem value={3}>Ban</MenuItem>
                  </Select>
                  <Button
                    type="Login"
                    justifyContent="right"
                    alignItems="right"
                    color="secondary"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Add User
                  </Button>
                </form>
              )}
            </Formik>
          </Box>
        </Box>
      </Modal>
      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 2 */}
        <Box
          gridColumn="span 12"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Address
            </Typography>
          </Box>
          <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 5, md: 5 }} sx={{ padding: 2 }}>
            <Grid item xs={3}>
              <Box justifyContent="center">
                <Typography
                  variant="h5"
                  fontWeight="600"
                  textAlign="center"
                >
                  Name
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box color={colors.grey[100]}>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  textAlign="center"
                >
                  Address
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box
              >
                <Typography
                  variant="h5"
                  fontWeight="600"
                  textAlign="center"
                >
                  Amount
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Typography
                variant="h5"
                fontWeight="600"
                textAlign="center"
              >
                Status
              </Typography>

            </Grid>
          </Grid>
          {showUserList()}
        </Box>
      </Box>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  address: yup.string().required("required"),
  status: yup.number().required("required")
});
const initialValues = {
  name: "",
  address: "",
  status: 1
};

export default Dashboard;
