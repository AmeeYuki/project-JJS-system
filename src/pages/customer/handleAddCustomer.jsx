// import axios from "axios";

// export const handleAddCustomer = (
//   newCustomer,
//   setRows,
//   setFilteredRows,
//   setOpen,
//   setSnackbar
// ) => {
//   axios
//     .post("https://65edbd9708706c584d9a764a.mockapi.io/LoginForm", newCustomer)
//     .then((response) => {
//       setRows((prevRows) => [...prevRows, response.data]);
//       setFilteredRows((prevRows) => [...prevRows, response.data]);
//       setOpen(false);
//       setSnackbar({
//         open: true,
//         message: "Customer added successfully",
//         severity: "success",
//       });
//     })
//     .catch((error) => {
//       console.error("Error adding customer: ", error);
//       setSnackbar({
//         open: true,
//         message: "Error adding customer",
//         severity: "error",
//       });
//     });
// };
import axios from "axios";

export const handleAddCustomer = (
  newCustomer,
  setRows,
  setFilteredRows,
  setOpen,
  setSnackbar
) => {
  axios
    .post("http://localhost:8080/api/v1/customers/add", newCustomer)
    .then((response) => {
      setRows((prevRows) => [...prevRows, response.data]);
      setFilteredRows((prevRows) => [...prevRows, response.data]);
      setOpen(false);
      setSnackbar({
        open: true,
        message: "Customer added successfully",
        severity: "success",
      });
    })
    .catch((error) => {
      console.error("Error adding customer: ", error);
      setSnackbar({
        open: true,
        message: "Error adding customer",
        severity: "error",
      });
    });
};
