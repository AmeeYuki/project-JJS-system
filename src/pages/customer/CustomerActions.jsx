import axios from "axios";

export const handleViewDetail = (
  customerId,
  rows,
  setSelectedCustomer,
  setOpenDetail
) => {
  const customer = rows.find((row) => row.id === customerId);
  setSelectedCustomer(customer);
  setOpenDetail(true);
};

export const handleUpdateCustomer = (
  customerId,
  rows,
  setSelectedCustomer,
  setOpenUpdate
) => {
  const customer = rows.find((row) => row.id === customerId);
  setSelectedCustomer(customer);
  setOpenUpdate(true);
};

export const handleDeleteCustomer = (
  customerId,
  rows,
  setRows,
  setFilteredRows,
  setSnackbar
) => {
  axios
    .delete(
      `https://65edbd9708706c584d9a764a.mockapi.io/LoginForm/${customerId}`
    )
    .then(() => {
      const updatedRows = rows.filter((row) => row.id !== customerId);
      setRows(updatedRows);
      setFilteredRows(updatedRows);
      setSnackbar({
        open: true,
        message: "Customer deleted successfully",
        severity: "success",
      });
    })
    .catch((error) => {
      console.error("Error deleting customer: ", error);
      setSnackbar({
        open: true,
        message: "Error deleting customer",
        severity: "error",
      });
    });
};

export const handleCreatePromotion = (
  customerId,
  rows,
  setSelectedCustomer,
  setOpenPromotion
) => {
  const customer = rows.find((row) => row.id === customerId);
  setSelectedCustomer(customer);
  setOpenPromotion(true);
};

export const handleSaveUpdate = (
  selectedCustomer,
  rows,
  setRows,
  setFilteredRows,
  setOpenUpdate,
  setSnackbar
) => {
  axios
    .put(
      `https://65edbd9708706c584d9a764a.mockapi.io/LoginForm/${selectedCustomer.id}`,
      selectedCustomer
    )
    .then((response) => {
      const updatedRows = rows.map((row) =>
        row.id === response.data.id ? response.data : row
      );
      setRows(updatedRows);
      setFilteredRows(updatedRows);
      setOpenUpdate(false);
      setSnackbar({
        open: true,
        message: "Customer updated successfully",
        severity: "success",
      });
    })
    .catch((error) => {
      console.error("Error updating customer: ", error);
      setSnackbar({
        open: true,
        message: "Error updating customer",
        severity: "error",
      });
    });
};

export const handleSavePromotion = (
  selectedCustomer,
  setOpenPromotion,
  setSnackbar
) => {
  // Logic to save promotion for the customer
  setOpenPromotion(false);
  setSnackbar({
    open: true,
    message: "Promotion saved successfully",
    severity: "success",
  });
};
