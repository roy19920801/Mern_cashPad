import { useEffect, useState } from "react";
import { Box, Button, Typography, Select, MenuItem, Modal, TextField, Hidden } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { server_url } from "../../config/config";
import { Formik } from "formik";
import Toastr from "../../components/Toastr";
import * as yup from "yup";
import axios from "axios";

const ListingInfo = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [type, setType] = useState("error");
  const [errorMessage, setErrorMessage] = useState("");
  const [toastrOpen, setToastrOpen] = useState(false);
  const [coins, setCoins] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);

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

  const handleOpen = () => { setOpenCreateModal(true) }
  const handleModalClose = () => { setOpenModal(false) }
  const handleCreateModalClose = () => { setOpenCreateModal(false) }
  
  useEffect(() => {
    catchRowData();
    catchCoins();
  }, []);

  const catchRowData = () => {
    axios.post(`${server_url}getlisting`).then(res => {
      setRows(res.data.listing);
    }).catch(err => {
      setType("error");
      setErrorMessage("Server is not running");
      setToastrOpen(true);
    })
  }

  const catchCoins = () => {
    axios.post(`${server_url}gettokenomics`).then(res => {
      setCoins(res.data);
    }).catch(err => {
      setType("error");
      setErrorMessage("Server is not running");
      setToastrOpen(true);
    })
  }

  const handleDeleteClick = (row) => {
    axios.delete(`${server_url}deletelisting`, { params: { id: row.id } }).then(res => {
      setType("success");
      setErrorMessage("Successfully Deleted");
      setToastrOpen(true);
      catchRowData();
    }).catch(err => {
      setType("error");
      setErrorMessage("Something went wrong")
      setToastrOpen(true);
    }).catch(err => {
      setType("error");
      setErrorMessage("Server not running")
      setToastrOpen(true);
    })
  }

  const handleRowButtonClick = (row) => {
    setOpenModal(true);
    initialValues.price = row.price;
    initialValues.currency_accept = row.currency_accept;
    initialValues.token_id = row.token_id;
    initialValues.down = row.down;
    initialValues.hardcap = row.hardcap;
    initialValues.id = row.id;
  }

  const columns = [
    { 
      field: "name", 
      headerName: "Token Name", 
      headerAlign: 'center', 
      align: 'center', 
      cellClassName: "name-column--cell", 
      flex: 2 
    },
    { 
      field: "price", 
      headerName: "Price", 
      headerAlign: 'center', 
      align: 'center', 
      cellClassName: "name-column--cell", 
      flex: 1 
    },
    {
      field: "hardcap",
      headerName: "Hardcap",
      headerAlign: 'center',
      align: 'center',
      flex: 1
    },
    {
      field: "currency_accept",
      headerName: "Currency",
      headerAlign: 'center',
      align: 'center',
      flex: 2
    },
    {
      field: "down",
      headerName: "Countdown",
      headerAlign: 'center',
      align: 'center',
      flex: 1
    },
    {
      field: '',
      headerName: 'Action',
      headerAlign: "center",
      align: 'center',
      sortable: false,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Button
              size="small"
              style={{ marginRight: 5 }}
              onClick={() => handleRowButtonClick(params.row)}
              tabIndex={params.hasFocus ? 0 : -1}
            >
              <Typography
                color={colors.grey[100]}
                variant="h5"
                fontWeight="600"
                textAlign="center"
              >
                <BorderColorIcon />
              </Typography>
            </Button> | <Button
              size="small"
              style={{ marginLeft: 5 }}
              onClick={() => handleDeleteClick(params.row)}
              tabIndex={params.hasFocus ? 0 : -1}
            >
              <Typography
                color={colors.grey[100]}
                variant="h5"
                fontWeight="600"
                textAlign="center"
              >
                <DeleteIcon />
              </Typography>
            </Button>
          </>
        )
      }
    },
  ];

  const handleFormSubmit = (values) => {
    axios.post(`${server_url}updatelisting`, values).then((res) => {
      if (res.data.success) {
        catchRowData();
        setOpenModal(false);
        setType("success");
        setToastrOpen(true);
        setErrorMessage("Update successed");
      } else {
        setType("error");
        setToastrOpen(true);
        setErrorMessage(res.data.message);
      }
    }).catch((err) => {
      setToastrOpen(true);
      setType("error");
      setErrorMessage("Server not runnung!");
    })
  }

  const handleFormSubmit1 = (values) => {
    axios.post(`${server_url}createlisting`, values).then((res) => {
      if (res.data.success) {
        catchRowData();
        setOpenCreateModal(false);
      } else {
        setType("error");
        setToastrOpen(true);
        setErrorMessage(res.data.message);
      }
    }).catch((err) => {
      setToastrOpen(true);
      setType("error");
      setErrorMessage("Server not runnung!");
    })
  }

  const handleToastrClose = () => {
    setToastrOpen(false);
  }

  const showSnackBar = () => {
    return (
      <Toastr open={toastrOpen} errorMessage={errorMessage} type={type} handleClose={handleToastrClose} />
    )
  }

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Listing Info" subtitle="Managing Listing Info" />
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
            Add Listing Info
          </Button>
        </Box>
      </Box>
      <Modal
        open={openModal}
        onClose={handleModalClose}
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
                  <Select
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    variant="filled"
                    value={values.token_id}
                    label="Token"
                    onChange={handleChange}
                    error={!!touched.token_id && !!errors.token_id}
                    helperText={touched.token_id && errors.token_id}
                    name="token_id"
                    sx={{ mt: 3 }}
                  >
                    {
                      coins.map(coin => {
                        return (
                          <MenuItem value={coin.id}>{coin.name}</MenuItem>
                        )
                      })
                    }
                  </Select>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Price"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.price}
                    name="price"
                    error={!!touched.price && !!errors.price}
                    helperText={touched.price && errors.price}
                    sx={{ mt: 3 }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Hardcap"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.hardcap}
                    name="hardcap"
                    error={!!touched.hardcap && !!errors.hardcap}
                    helperText={touched.hardcap && errors.hardcap}
                    sx={{ mt: 3 }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Currency"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.currency_accept}
                    name="currency_accept"
                    error={!!touched.currency_accept && !!errors.currency_accept}
                    helperText={touched.currency_accept && errors.currency_accept}
                    sx={{ mt: 3 }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Countdown"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.down}
                    name="down"
                    error={!!touched.down && !!errors.down}
                    helperText={touched.down && errors.down}
                    sx={{ mt: 3 }}
                  />
                  <Hidden value={values.id}
                    name="id"
                  />
                  <Button
                    type="Login"
                    justifyContent="right"
                    alignItems="right"
                    color="secondary"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Update Listing Info
                  </Button>
                </form>
              )}
            </Formik>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={openCreateModal}
        onClose={handleCreateModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box mt="20px">
            <Formik
              onSubmit={handleFormSubmit1}
              initialValues={initialValues1}
              validationSchema={checkoutSchema1}
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
                  <Select
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    variant="filled"
                    value={values.token_id}
                    label="Token"
                    onChange={handleChange}
                    error={!!touched.token_id && !!errors.token_id}
                    helperText={touched.token_id && errors.token_id}
                    name="token_id"
                    sx={{ mt: 3 }}
                  >
                    {
                      coins.map(coin => {
                        return (
                          <MenuItem value={coin.id}>{coin.name}</MenuItem>
                        )
                      })
                    }
                  </Select>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Price"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.price}
                    name="price"
                    error={!!touched.price && !!errors.price}
                    helperText={touched.price && errors.price}
                    sx={{ mt: 3 }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Hardcap"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.hardcap}
                    name="hardcap"
                    error={!!touched.hardcap && !!errors.hardcap}
                    helperText={touched.hardcap && errors.hardcap}
                    sx={{ mt: 3 }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Currency"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.currency_accept}
                    name="currency_accept"
                    error={!!touched.currency_accept && !!errors.currency_accept}
                    helperText={touched.currency_accept && errors.currency_accept}
                    sx={{ mt: 3 }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Countdown"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.down}
                    name="down"
                    error={!!touched.down && !!errors.down}
                    helperText={touched.down && errors.down}
                    sx={{ mt: 3 }}
                  />
                  <Button
                    type="Login"
                    justifyContent="right"
                    alignItems="right"
                    color="secondary"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Add Listing Info
                  </Button>
                </form>
              )}
            </Formik>
          </Box>
        </Box>
      </Modal>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  token_id: yup.number().required("required"),
  price: yup.string().required("required"),
  hardcap: yup.string().required("required"),
  currency_accept: yup.string().required("required"),
  down: yup.string().required("required")
});
const initialValues = {
  token_id: "",
  price: "",
  hardcap: "",
  currency_accept: "", 
  down: ""
};

const checkoutSchema1 = yup.object().shape({
  token_id: yup.number().required("required"),
  price: yup.string().required("required"),
  hardcap: yup.string().required("required"),
  currency_accept: yup.string().required("required"),
  down: yup.string().required("required")
});
const initialValues1 = {
  token_id: "",
  price: "",
  hardcap: "",
  currency_accept: "", 
  down: ""
};

export default ListingInfo;
