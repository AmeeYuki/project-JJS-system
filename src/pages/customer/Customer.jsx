import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import {
  Modal,
  Box,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import ActionsMenu from "./ActionsMenu";
import {
  handleViewDetail,
  handleUpdateCustomer,
  handleDeleteCustomer,
  handleCreatePromotion,
  handleSaveUpdate,
  handleSavePromotion,
} from "./CustomerActions";
import { handleAddCustomer } from "./handleAddCustomer";
import "./Customer.css";
import "./AddCustomer.css";
import { useGetAllCustomerQuery } from "../../services/customerAPI";
import CustomerList from "./CustomerList";
const columns = (
  handleViewDetail,
  handleUpdateCustomer,
  handleDeleteCustomer,
  handleCreatePromotion
) => [
  { field: "id", headerName: "No", width: 70 },
  { field: "fullName", headerName: "Customer Name", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "phone", headerName: "Phone number", width: 150 },
  { field: "address", headerName: "Address", width: 200 },
  { field: "accumulated_point", headerName: "Point", width: 90 },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    renderCell: (params) => (
      <ActionsMenu
        customerId={params.row.id}
        handleViewDetail={handleViewDetail}
        handleUpdateCustomer={handleUpdateCustomer}
        handleDeleteCustomer={handleDeleteCustomer}
        handleCreatePromotion={handleCreatePromotion}
      />
    ),
  },
];

export default function Customer() {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openPromotion, setOpenPromotion] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    accumulated_point: 0,
  });
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const {
    data: customerData,
    isLoadingCustomer,
    refetchCustomer,
  } = useGetAllCustomerQuery();
  console.log(customerData);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/customers/search?keyword=")
      .then((response) => {
        setRows(response.data);
        setFilteredRows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setSnackbar({
          open: true,
          message: "Error fetching data",
          severity: "error",
        });
      });
  }, []);

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = rows.filter((item) => {
      return (
        item.id.toString().includes(lowercasedFilter) ||
        item.phone.toLowerCase().includes(lowercasedFilter)
      );
    });
    setFilteredRows(filteredData);
  }, [searchTerm, rows]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseDetail = () => setOpenDetail(false);
  const handleCloseUpdate = () => setOpenUpdate(false);
  const handleClosePromotion = () => setOpenPromotion(false);
  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  return (
    <div className="customerWrapper">
      <div className="customerTitle">
        <h1 className="titleCustomer">Customer List</h1>
        <div className="controls">
          <div className="searchFilter">
            <input
              type="text"
              className="searchInput"
              placeholder="Search by ID or phone number"
              value={searchTerm}
              onChange={handleSearch}
            />
            <button className="filterButton">Filter</button>
          </div>
          <button className="addCustomerButton" onClick={handleOpen}>
            Add Customer
          </button>
        </div>
      </div>

      <div className="tb_customer">
        <div style={{ height: 400, width: "100%" }}>
          {/* <DataGrid
            rows={filteredRows}
            columns={columns(
              handleViewDetail,
              handleUpdateCustomer,
              handleDeleteCustomer,
              handleCreatePromotion
            )}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10]}
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "black",
                color: "black",
              },
            }}
          /> */}
          <CustomerList customerData={customerData} />
        </div>
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box className="addCustomerModal">
          <Typography variant="h6" className="addCustomerTitle">
            Add a new customer
          </Typography>
          <TextField
            label="Full Name"
            name="fullName"
            value={newCustomer.fullName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            placeholder="Customer name..."
          />
          <TextField
            label="Phone"
            name="phone"
            value={newCustomer.phone}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            placeholder="Phone number..."
          />
          <TextField
            label="Email"
            name="email"
            value={newCustomer.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            placeholder="Email..."
          />
          <TextField
            label="Address"
            name="address"
            value={newCustomer.address}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            placeholder="Address..."
          />
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            row
            name="gender"
            value={newCustomer.gender}
            onChange={handleInputChange}
            className="radioGroup"
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
          </RadioGroup>
          <div className="addCustomerActions">
            <Button onClick={handleClose} className="cancelButton">
              Cancel
            </Button>
            <Button
              onClick={() =>
                handleAddCustomer(
                  newCustomer,
                  setRows,
                  setFilteredRows,
                  setOpen,
                  setSnackbar
                )
              }
              className="addButton"
              variant="contained"
              color="primary"
            >
              Add
            </Button>
          </div>
        </Box>
      </Modal>

      <Modal open={openDetail} onClose={handleCloseDetail}>
        <Box className="modalContent">
          {selectedCustomer && (
            <>
              <Typography variant="h6" className="modalTitle">
                Customer Detail
              </Typography>
              <Typography>Full Name: {selectedCustomer.fullName}</Typography>
              <Typography>Phone: {selectedCustomer.phone}</Typography>
              <Typography>Email: {selectedCustomer.email}</Typography>
              <Typography>Address: {selectedCustomer.address}</Typography>
              <Typography>Gender: {selectedCustomer.gender}</Typography>
              <Typography>
                Point: {selectedCustomer.accumulated_point}
              </Typography>
            </>
          )}
          <div className="modalActions">
            <Button
              onClick={handleCloseDetail}
              variant="contained"
              color="primary"
            >
              Close
            </Button>
          </div>
        </Box>
      </Modal>

      <Modal open={openUpdate} onClose={handleCloseUpdate}>
        <Box className="modalContent">
          {selectedCustomer && (
            <>
              <Typography variant="h6" className="modalTitle">
                Update Customer
              </Typography>
              <TextField
                label="Full Name"
                name="fullName"
                value={selectedCustomer.fullName}
                onChange={(e) =>
                  setSelectedCustomer({
                    ...selectedCustomer,
                    fullName: e.target.value,
                  })
                }
                fullWidth
                margin="normal"
                placeholder="Customer name..."
              />
              <TextField
                label="Phone"
                name="phone"
                value={selectedCustomer.phone}
                onChange={(e) =>
                  setSelectedCustomer({
                    ...selectedCustomer,
                    phone: e.target.value,
                  })
                }
                fullWidth
                margin="normal"
                placeholder="Phone number..."
              />
              <TextField
                label="Email"
                name="email"
                value={selectedCustomer.email}
                onChange={(e) =>
                  setSelectedCustomer({
                    ...selectedCustomer,
                    email: e.target.value,
                  })
                }
                fullWidth
                margin="normal"
                placeholder="Email..."
              />
              <TextField
                label="Address"
                name="address"
                value={selectedCustomer.address}
                onChange={(e) =>
                  setSelectedCustomer({
                    ...selectedCustomer,
                    address: e.target.value,
                  })
                }
                fullWidth
                margin="normal"
                placeholder="Address..."
              />
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                row
                name="gender"
                value={selectedCustomer.gender}
                onChange={(e) =>
                  setSelectedCustomer({
                    ...selectedCustomer,
                    gender: e.target.value,
                  })
                }
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </>
          )}
          <div className="modalActions">
            <Button onClick={handleCloseUpdate} className="cancelButton">
              Cancel
            </Button>
            <Button
              onClick={() =>
                handleSaveUpdate(
                  selectedCustomer,
                  rows,
                  setRows,
                  setFilteredRows,
                  setOpenUpdate,
                  setSnackbar
                )
              }
              className="addButton"
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </div>
        </Box>
      </Modal>

      <Modal open={openPromotion} onClose={handleClosePromotion}>
        <Box className="modalContent">
          {selectedCustomer && (
            <>
              <Typography variant="h6" className="modalTitle">
                Create Promotion for {selectedCustomer.fullName}
              </Typography>
              <TextField
                label="Promotion Details"
                name="promotionDetails"
                fullWidth
                margin="normal"
                placeholder="Enter promotion details..."
              />
            </>
          )}
          <div className="modalActions">
            <Button onClick={handleClosePromotion} className="cancelButton">
              Cancel
            </Button>
            <Button
              onClick={() =>
                handleSavePromotion(
                  selectedCustomer,
                  setOpenPromotion,
                  setSnackbar
                )
              }
              className="addButton"
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </div>
        </Box>
      </Modal>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
