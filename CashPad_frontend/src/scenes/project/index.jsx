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

const Projects = () => {
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
    axios.post(`${server_url}getproject`).then(res => {
      setRows(res.data.projects);
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
    axios.delete(`${server_url}deleteproject`, { params: { id: row.id } }).then(res => {
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
    initialValues.status = row.status;
    initialValues.category = row.category;
    initialValues.token_id = row.token_id;
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
      field: "category", 
      headerName: "Category", 
      headerAlign: 'center', 
      align: 'center', 
      cellClassName: "name-column--cell", 
      flex: 2 
    },
    {
      field: "status",
      headerName: "Status",
      headerAlign: 'center',
      align: 'center',
      flex: 2,
      renderCell: (params) => {
        if (params.row.status === 1) {
          return (
            <>
              <Box component="span" sx={{ p: 0.5, backgroundColor: colors.greenAccent[600] }} borderRadius={5}>
                <Typography color={colors.grey[100]}
                  variant="h5"
                  fontWeight="600"
                  textAlign="center">Live Project</Typography>
              </Box>
            </>
          );
        } else if (params.row.status === 2) {
          return (
            <>
              <Box component="span" sx={{ p: 0.5, backgroundColor: colors.blueAccent[600] }} borderRadius={5}>
                <Typography color={colors.grey[100]}
                  variant="h5"
                  fontWeight="600"
                  textAlign="center">Upcoming Project</Typography>
              </Box>
            </>
          );
        } else {
          return (
            <>
              <Box component="span" sx={{ p: 0.5, backgroundColor: colors.redAccent[600] }} borderRadius={5}>
                <Typography color={colors.grey[100]}
                  variant="h5"
                  fontWeight="600"
                  textAlign="center">Completed Project</Typography>
              </Box>
            </>
          );
        }
      }
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
    axios.post(`${server_url}updateprojectcategory`, values).then((res) => {
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
    axios.post(`${server_url}createprojectcategory`, values).then((res) => {
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
        <Header title="Project Category" subtitle="Managing Project Category" />
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
            Add Project Category
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
                      coins.map( (coin, i) => {
                        return (
                          <MenuItem key={i} value={coin.id}>{coin.name}</MenuItem>
                        )
                      })
                    }
                  </Select>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Category"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.category}
                    name="category"
                    error={!!touched.category && !!errors.category}
                    helperText={touched.category && errors.category}
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
                    <MenuItem value={1}>Live Project</MenuItem>
                    <MenuItem value={2}>Upcoming Project</MenuItem>
                    <MenuItem value={3}>Complete Project</MenuItem>
                  </Select>
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
                    Update Project
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
                    label="Category"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.category}
                    name="category"
                    error={!!touched.category && !!errors.category}
                    helperText={touched.category && errors.category}
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
                    <MenuItem value={1}>Live Project</MenuItem>
                    <MenuItem value={2}>Upcoming Project</MenuItem>
                    <MenuItem value={3}>Complete Project</MenuItem>
                  </Select>
                  <Button
                    type="Login"
                    justifyContent="right"
                    alignItems="right"
                    color="secondary"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Add Project
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
  category: yup.string().required("required"),
  status: yup.number().required("required")
});
const initialValues = {
  token_id: "",
  category: "",
  status: 1
};

const checkoutSchema1 = yup.object().shape({
  token_id: yup.number().required("required"),
  category: yup.string().required("required"),
  status: yup.number().required("required")
});
const initialValues1 = {
  token_id: "",
  category: "",
  status: 1
};

export default Projects;
