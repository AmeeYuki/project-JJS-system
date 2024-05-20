import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import PropTypes from "prop-types";
import {
  Modal,
  Box,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import AddIcon from "@mui/icons-material/Add";
import "./Customer.css";

const columns = (
  handleViewDetail,
  handleUpdateCustomer,
  handleDeleteCustomer,
  handleCreatePromotion
) => [
  { field: "id", headerName: "No", width: 70 },
  { field: "name", headerName: "Customer Name", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "phone", headerName: "Phone number", width: 150 },
  { field: "address", headerName: "Address", width: 200 },
  { field: "point", headerName: "Point", width: 90 },
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

const ActionsMenu = ({
  customerId,
  handleViewDetail,
  handleUpdateCustomer,
  handleDeleteCustomer,
  handleCreatePromotion,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (action) => {
    switch (action) {
      case "view":
        handleViewDetail(customerId);
        break;
      case "update":
        handleUpdateCustomer(customerId);
        break;
      case "delete":
        handleDeleteCustomer(customerId);
        break;
      case "promotion":
        handleCreatePromotion(customerId);
        break;
      default:
        break;
    }
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleMenuItemClick("view")}>
          View Detail
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("update")}>
          Update
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("delete")}>
          Delete
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("promotion")}>
          Create Promotion for Customers
        </MenuItem>
      </Menu>
    </>
  );
};

ActionsMenu.propTypes = {
  customerId: PropTypes.number.isRequired,
  handleViewDetail: PropTypes.func.isRequired,
  handleUpdateCustomer: PropTypes.func.isRequired,
  handleDeleteCustomer: PropTypes.func.isRequired,
  handleCreatePromotion: PropTypes.func.isRequired,
};

export default function Customer() {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openPromotion, setOpenPromotion] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    point: 0,
  });
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    axios
      .get("https://65edbd9708706c584d9a764a.mockapi.io/LoginForm")
      .then((response) => {
        console.log("Data fetched successfully: ", response.data);
        setRows(response.data);
        setFilteredRows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const handleAddCustomer = () => {
    axios
      .post(
        "https://65edbd9708706c584d9a764a.mockapi.io/LoginForm",
        newCustomer
      )
      .then((response) => {
        console.log("Customer added successfully: ", response.data);
        setRows([...rows, response.data]);
        setFilteredRows([...rows, response.data]);
        handleClose();
      })
      .catch((error) => {
        console.error("Error adding customer: ", error);
      });
  };

  const handleViewDetail = (customerId) => {
    const customer = rows.find((row) => row.id === customerId);
    setSelectedCustomer(customer);
    setOpenDetail(true);
  };

  const handleUpdateCustomer = (customerId) => {
    const customer = rows.find((row) => row.id === customerId);
    setSelectedCustomer(customer);
    setOpenUpdate(true);
  };

  const handleSaveUpdate = () => {
    axios
      .put(
        `https://65edbd9708706c584d9a764a.mockapi.io/LoginForm/${selectedCustomer.id}`,
        selectedCustomer
      )
      .then((response) => {
        console.log("Customer updated successfully: ", response.data);
        const updatedRows = rows.map((row) =>
          row.id === response.data.id ? response.data : row
        );
        setRows(updatedRows);
        setFilteredRows(updatedRows);
        handleCloseUpdate();
      })
      .catch((error) => {
        console.error("Error updating customer: ", error);
      });
  };

  const handleDeleteCustomer = (customerId) => {
    axios
      .delete(
        `https://65edbd9708706c584d9a764a.mockapi.io/LoginForm/${customerId}`
      )
      .then(() => {
        console.log("Customer deleted successfully");
        const updatedRows = rows.filter((row) => row.id !== customerId);
        setRows(updatedRows);
        setFilteredRows(updatedRows);
      })
      .catch((error) => {
        console.error("Error deleting customer: ", error);
      });
  };

  const handleCreatePromotion = (customerId) => {
    const customer = rows.find((row) => row.id === customerId);
    setSelectedCustomer(customer);
    setOpenPromotion(true);
  };

  const handleSavePromotion = () => {
    // Logic to save promotion for the customer
    handleClosePromotion();
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
          <DataGrid
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
            checkboxSelection
          />
        </div>
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>Add a new customer</h2>
          <TextField
            label="Name"
            name="name"
            value={newCustomer.name}
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
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
          </RadioGroup>
          <div className="modalActions">
            <Button onClick={handleClose} style={{ color: "red" }}>
              Cancel
            </Button>
            <Button
              onClick={handleAddCustomer}
              variant="contained"
              color="primary"
            >
              Add
            </Button>
          </div>
        </Box>
      </Modal>

      <Modal open={openDetail} onClose={handleCloseDetail}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          {selectedCustomer && (
            <>
              <Typography variant="h6">Customer Detail</Typography>
              <Typography>Name: {selectedCustomer.name}</Typography>
              <Typography>Phone: {selectedCustomer.phone}</Typography>
              <Typography>Email: {selectedCustomer.email}</Typography>
              <Typography>Address: {selectedCustomer.address}</Typography>
              <Typography>Gender: {selectedCustomer.gender}</Typography>
              <Typography>Point: {selectedCustomer.point}</Typography>
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
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          {selectedCustomer && (
            <>
              <Typography variant="h6">Update Customer</Typography>
              <TextField
                label="Name"
                name="name"
                value={selectedCustomer.name}
                onChange={(e) =>
                  setSelectedCustomer({
                    ...selectedCustomer,
                    name: e.target.value,
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
            <Button onClick={handleCloseUpdate} style={{ color: "red" }}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveUpdate}
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </div>
        </Box>
      </Modal>

      <Modal open={openPromotion} onClose={handleClosePromotion}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          {selectedCustomer && (
            <>
              <Typography variant="h6">
                Create Promotion for {selectedCustomer.name}
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
            <Button onClick={handleClosePromotion} style={{ color: "red" }}>
              Cancel
            </Button>
            <Button
              onClick={handleSavePromotion}
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
