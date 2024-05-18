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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./Customer.css";

const columns = [
  { field: "id", headerName: "No", width: 70 },
  { field: "name", headerName: "Customer Name", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "phone", headerName: "Phone number", width: 150 },
  { field: "address", headerName: "Address", width: 200 },
  { field: "point", headerName: "Point", width: 90 },
];

export default function Customer() {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    point: 0,
  });

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
            <AddIcon />
          </button>
        </div>
      </div>

      <div className="tb_customer">
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
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
    </div>
  );
}
