import { Box, Button, useTheme, TextField, Modal, Hidden, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Toastr from "../../components/Toastr";
import { useState, useEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { server_url } from "../../config/config";

const Tokenomics = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [toastrOpen, setToastrOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [type, setType] = useState("error");

  useEffect(() => {
    catchRowData();
  }, []);

  const catchRowData = () => {
    axios.post(`${server_url}gettokenomics`).then(res => {
      setRows(res.data);
      setRowCount(res.data.length);
    }).catch(err => {

    })
  }

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    overflowY: 'scroll',
    height: 500,
    p: 4,

  };

  const handleRowClick = (row) => {
    // console.log(row);
  }

  const handleOnSelected = (row) => {
    // console.log(row);
  }

  const handleOnDoubleClick = (row) => {
    // console.log(row);
  }

  const handleRowButtonClick = (row) => {
    setOpenModal(true);
    initialValues.address = row.address;
    initialValues.name = row.name;
    initialValues.symbol = row.symbol;
    initialValues.bio = row.bio;
    initialValues.decimal = row.decimal;
    initialValues.website = row.website;
    initialValues.fname = row.fname;
    initialValues.social = row.social;
    initialValues.network = row.network;
    initialValues.id = row.id;
  }

  const handleModalClose = () => {
    setOpenModal(false);
  }

  const handleFormSubmit = (values) => {
    axios.post(`${server_url}updatetokenomics`, values).then(res => {
      if (res.data.id) {
        setOpenModal(false);
        catchRowData();
      } else {
        setType("error");
        setErrorMessage("Something went wrong!");
        setToastrOpen(true);
      }
    }).catch(err => {
      setType("error");
      setErrorMessage("Server not respond!");
      setToastrOpen(true);
    })
  }

  const showSnackBar = () => {
    return (
      <Toastr open={toastrOpen} type={type} errorMessage={errorMessage} handleClose={handleToastrClose} />
    )
  }

  const handleToastrClose = () => {
    setToastrOpen(false);
  }

  const handleCreateToken = () => {
    setOpenCreateModal(true);
  }

  const handleCreateModalClose = () => {
    setOpenCreateModal(false);
  }

  const handleFormSubmit1 = (values) => {
    axios.post(`${server_url}addtokenomics`, values).then(res => {
      if (res.data.id) {
        setOpenModal(false);
        setType("success");
        setErrorMessage("Successfully Added");
        setToastrOpen(true);
        catchRowData();
        setOpenCreateModal(false);
      } else {
        setType("error");
        setErrorMessage("Something went wrong!");
        setToastrOpen(true);
      }
    }).catch(err => {
      setType("error");
      setErrorMessage("Server not respond!");
      setToastrOpen(true);
    })
  }

  const handleDeleteClick = (row) => {
    axios.delete(`${server_url}deletetokenomics`, { params: { id: row.id } }).then(res => {
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

  const columns = [
    {
      field: 'network',
      headerName: 'Netwrok',
      headerAlign: "center",
      align: 'center',
      flex: 1
    },
    {
      field: 'name',
      headerName: 'Name',
      headerAlign: "center",
      align: 'center',
      flex: 1
    },
    {
      field: 'symbol',
      headerName: 'Symbol',
      align: 'center',
      headerAlign: "right",
      align: 'right',
      flex: 1
    },
    {
      field: 'decimal',
      headerName: 'Decimal',
      headerAlign: "right",
      align: 'right',
      flex: 1
    },
    {
      field: 'address',
      headerName: 'Address',
      flex: 1
    },
    {
      field: 'fname',
      headerName: 'Founder Name',
      headerAlign: "center",
      align: 'center',
      flex: 1
    },
    {
      field: 'bio',
      headerName: 'Bio',
      flex: 1
    },
    {
      field: 'social',
      headerName: 'Social Link',
      flex: 1
    },
    {
      field: 'website',
      headerName: 'Website',
      flex: 1
    },
    {
      field: '',
      headerName: 'Action',
      headerAlign: "center",
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

  ]

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Tokenomics" subtitle="Managing cashpad Tokens" />
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
            onClick={handleCreateToken}
          >
            Add Token
          </Button>
        </Box>
      </Box>
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
          page={page}
          rowCount={rowCount}
          paginationMode="server"
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => { setPageSize(newPageSize); }}
          rowsPerPageOptions={[5, 10, 20, 50]}
          onRowClick={handleRowClick}
          onRowDoubleClick={handleOnDoubleClick}
          onSelectionModelChange={handleOnSelected}
          components={{ Toolbar: GridToolbar }} />
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
                  { }
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Network"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.network}
                    name="network"
                    error={!!touched.network && !!errors.network}
                    helperText={touched.network && errors.network}
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
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Symbol"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.symbol}
                    name="symbol"
                    error={!!touched.symbol && !!errors.symbol}
                    helperText={touched.symbol && errors.symbol}
                    sx={{ mt: 3 }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Decimal"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.decimal}
                    name="decimal"
                    error={!!touched.decimal && !!errors.decimal}
                    helperText={touched.decimal && errors.decimal}
                    sx={{ mt: 3 }}
                  />
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
                    sx={{ mt: 3 }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Founder Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.fname}
                    name="fname"
                    error={!!touched.fname && !!errors.fname}
                    helperText={touched.fname && errors.fname}
                    sx={{ mt: 3 }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Bio"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.bio}
                    name="bio"
                    error={!!touched.bio && !!errors.bio}
                    helperText={touched.bio && errors.bio}
                    sx={{ mt: 3 }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Social Link"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.social}
                    name="social"
                    error={!!touched.social && !!errors.social}
                    helperText={touched.social && errors.social}
                    sx={{ mt: 3 }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Website"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.website}
                    name="website"
                    error={!!touched.website && !!errors.website}
                    helperText={touched.website && errors.website}
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
                    Edit Token
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
        sx={{ overflow: 'scroll' }}
        disableScrollLock={false}
      >
        <Box sx={modalStyle}>
          <Box mt="20px" overflow={true}>
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
                  { }
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Network"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.network}
                    name="network"
                    error={!!touched.network && !!errors.network}
                    helperText={touched.network && errors.network}
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
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Symbol"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.symbol}
                    name="symbol"
                    error={!!touched.symbol && !!errors.symbol}
                    helperText={touched.symbol && errors.symbol}
                    sx={{ mt: 3 }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Decimal"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.decimal}
                    name="decimal"
                    error={!!touched.decimal && !!errors.decimal}
                    helperText={touched.decimal && errors.decimal}
                    sx={{ mt: 3 }}
                  />
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
                    sx={{ mt: 3 }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Founder Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.fname}
                    name="fname"
                    error={!!touched.fname && !!errors.fname}
                    helperText={touched.fname && errors.fname}
                    sx={{ mt: 3 }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Bio"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.bio}
                    name="bio"
                    error={!!touched.bio && !!errors.bio}
                    helperText={touched.bio && errors.bio}
                    sx={{ mt: 3 }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Social Link"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.social}
                    name="social"
                    error={!!touched.social && !!errors.social}
                    helperText={touched.social && errors.social}
                    sx={{ mt: 3 }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Website"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.website}
                    name="website"
                    error={!!touched.website && !!errors.website}
                    helperText={touched.website && errors.website}
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
                    Add Token
                  </Button>
                </form>
              )}
            </Formik>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  address: yup.string().required("required"),
  symbol: yup.string().required("required"),
  bio: yup.string().required("required"),
  website: yup.string().required("required"),
  network: yup.string().required("required"),
  decimal: yup.string().required("required"),
  fname: yup.string().required("required"),
  social: yup.string().required("required"),
});
const initialValues = {
  name: "",
  address: "",
  symbol: "",
  bio: "",
  website: "",
  network: "",
  decimal: "",
  fname: "",
  social: "",
  id: 0
};

const checkoutSchema1 = yup.object().shape({
  name: yup.string().required("required"),
  address: yup.string().required("required"),
  symbol: yup.string().required("required"),
  bio: yup.string().required("required"),
  website: yup.string().required("required"),
  network: yup.string().required("required"),
  decimal: yup.string().required("required"),
  fname: yup.string().required("required"),
  social: yup.string().required("required"),
});
const initialValues1 = {
  name: "",
  address: "",
  symbol: "",
  bio: "",
  website: "",
  network: "",
  decimal: "",
  fname: "",
  social: "",
};

export default Tokenomics;
