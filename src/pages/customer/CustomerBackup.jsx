// import { useState, useEffect } from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import axios from "axios";
// import "./Customer.css";

// const columns = [
//   { field: "id", headerName: "No", width: 70 },
//   { field: "name", headerName: "Customer Name", width: 200 },
//   { field: "email", headerName: "Email", width: 200 },
//   { field: "phone", headerName: "Phone number", width: 150 },
//   { field: "address", headerName: "Address", width: 200 },
//   { field: "point", headerName: "Point", width: 90 },
// ];

// export default function Customer() {
//   const [rows, setRows] = useState([]);

//   useEffect(() => {
//     axios
//       .get("https://65edbd9708706c584d9a764a.mockapi.io/LoginForm")
//       .then((response) => {
//         console.log("Data fetched successfully: ", response.data);
//         setRows(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data: ", error);
//       });
//   }, []);

//   return (
//     <div className="customerWrapper">
//       <div className="customerTitle">
//         <h1>Customer List</h1>
//         <div className="controls">
//           <div className="searchFilter">
//             <input
//               type="text"
//               className="searchInput"
//               placeholder="Search by ID or phone number"
//             />
//             <button className="filterButton">Filter</button>
//           </div>
//           <button className="addCustomerButton">+ Add Customer</button>
//         </div>
//       </div>

//       <div className="tb_customer">
//         <div style={{ height: 400, width: "100%" }}>
//           <DataGrid
//             rows={rows}
//             columns={columns}
//             initialState={{
//               pagination: {
//                 paginationModel: { page: 0, pageSize: 10 },
//               },
//             }}
//             pageSizeOptions={[5, 10]}
//             checkboxSelection
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
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

  return (
    <div className="customerWrapper">
      <div className="customerTitle">
        <h1>Customer List</h1>
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
          <button className="addCustomerButton">+ Add Customer</button>
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
    </div>
  );
}
