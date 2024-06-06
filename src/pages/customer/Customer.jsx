import { useState, useEffect } from "react";
import { Button, Input } from "antd";
import axios from "axios";
import CustomerTable from "./CustomerTable";
import CustomerForm from "./CustomerForm";
import CustomerDetail from "./CustomerDetail";
import CustomerUpdateForm from "./CustomerUpdateForm";
import PromotionForm from "./PromotionForm";
import "./Customer.css";

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

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/customers/get_customers")
      .then((response) => {
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
      .post("http://localhost:8080/api/v1/customers/create", newCustomer)
      .then((response) => {
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
        `http://localhost:8080/api/v1/customers/update/${selectedCustomer.id}`,
        selectedCustomer
      )
      .then((response) => {
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
      .delete(`http://localhost:8080/api/v1/customers/delete/${customerId}`)
      .then(() => {
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
            <Input
              type="text"
              className="searchInput"
              placeholder="Search by ID or phone number"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Button className="filterButton">Filter</Button>
          </div>
          <Button className="addCustomerButton" onClick={handleOpen}>
            Add Customer
          </Button>
        </div>
      </div>

      <div className="tb_customer">
        <div style={{ height: 400, width: "100%" }}>
          <CustomerTable
            data={filteredRows}
            handleViewDetail={handleViewDetail}
            handleUpdateCustomer={handleUpdateCustomer}
            handleDeleteCustomer={handleDeleteCustomer}
            handleCreatePromotion={handleCreatePromotion}
          />
        </div>
      </div>

      <CustomerForm
        open={open}
        handleClose={handleClose}
        handleInputChange={handleInputChange}
        handleAddCustomer={handleAddCustomer}
        newCustomer={newCustomer}
        setNewCustomer={setNewCustomer}
      />

      <CustomerDetail
        openDetail={openDetail}
        handleCloseDetail={handleCloseDetail}
        selectedCustomer={selectedCustomer}
      />

      <CustomerUpdateForm
        openUpdate={openUpdate}
        handleCloseUpdate={handleCloseUpdate}
        selectedCustomer={selectedCustomer}
        setSelectedCustomer={setSelectedCustomer}
        handleSaveUpdate={handleSaveUpdate}
      />

      <PromotionForm
        openPromotion={openPromotion}
        handleClosePromotion={handleClosePromotion}
        selectedCustomer={selectedCustomer}
        handleSavePromotion={handleSavePromotion}
      />
    </div>
  );
}
