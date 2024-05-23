import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import PropTypes from "prop-types";
import {
  Modal,
  Box,
  TextField,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import "./Promotion.css";

const columns = (handleUpdatePromotion, handleDeletePromotion) => [
  { field: "id", headerName: "No", width: 70 },
  { field: "code", headerName: "Promotion Code", width: 200 },
  { field: "discount", headerName: "Discount(VND)", width: 200 },
  { field: "startdate", headerName: "Start Date", width: 150 },
  { field: "enddate", headerName: "End Date", width: 150 },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    renderCell: (params) => (
      <ActionsMenu
        promotionId={params.row.id}
        handleUpdatePromotion={handleUpdatePromotion}
        handleDeletePromotion={handleDeletePromotion}
      />
    ),
  },
];

const ActionsMenu = ({
  promotionId,
  handleUpdatePromotion,
  handleDeletePromotion,
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
      case "update":
        handleUpdatePromotion(promotionId);
        break;
      case "delete":
        handleDeletePromotion(promotionId);
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
        <MenuItem onClick={() => handleMenuItemClick("update")}>
          Update
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("delete")}>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

ActionsMenu.propTypes = {
  promotionId: PropTypes.number.isRequired,
  handleUpdatePromotion: PropTypes.func.isRequired,
  handleDeletePromotion: PropTypes.func.isRequired,
};

export default function Promotion() {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [newPromotion, setNewPromotion] = useState({
    code: "",
    discount: "",
    startdate: "",
    enddate: "",
  });
  const [selectedPromotion, setSelectedPromotion] = useState(null);

  useEffect(() => {
    axios
      .get("https://664e3aa4fafad45dfadf753f.mockapi.io/promotion")
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
        item.code.toString().includes(lowercasedFilter) ||
        item.discount.toLowerCase().includes(lowercasedFilter)
      );
    });
    setFilteredRows(filteredData);
  }, [searchTerm, rows]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseUpdate = () => setOpenUpdate(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPromotion({ ...newPromotion, [name]: value });
  };

  const handleAddPromotion = () => {
    axios
      .post(
        "https://664e3aa4fafad45dfadf753f.mockapi.io/promotion",
        newPromotion
      )
      .then((response) => {
        console.log("Promotion added successfully: ", response.data);
        setRows([...rows, response.data]);
        setFilteredRows([...rows, response.data]);
        handleClose();
      })
      .catch((error) => {
        console.error("Error adding promotion: ", error);
      });
  };

  const handleUpdatePromotion = (promotionId) => {
    const promotion = rows.find((row) => row.id === promotionId);
    setSelectedPromotion(promotion);
    setOpenUpdate(true);
  };

  const handleSaveUpdate = () => {
    axios
      .put(
        `https://664e3aa4fafad45dfadf753f.mockapi.io/promotion/${selectedPromotion.id}`,
        selectedPromotion
      )
      .then((response) => {
        console.log("Promotion updated successfully: ", response.data);
        const updatedRows = rows.map((row) =>
          row.id === response.data.id ? response.data : row
        );
        setRows(updatedRows);
        setFilteredRows(updatedRows);
        handleCloseUpdate();
      })
      .catch((error) => {
        console.error("Error updating promotion: ", error);
      });
  };

  const handleDeletePromotion = (promotionId) => {
    axios
      .delete(
        `https://664e3aa4fafad45dfadf753f.mockapi.io/promotion/${promotionId}`
      )
      .then(() => {
        console.log("Promotion deleted successfully");
        const updatedRows = rows.filter((row) => row.id !== promotionId);
        setRows(updatedRows);
        setFilteredRows(updatedRows);
      })
      .catch((error) => {
        console.error("Error deleting promotion: ", error);
      });
  };

  return (
    <div className="promotionWrapper">
      <div className="promotionTitle">
        <h1 className="titlePromotion">Promotion Page</h1>
        <div className="controls">
          <div className="searchFilter">
            <div className="searchBar">
              <SearchIcon className="searchIcon" />
              <input
                type="text"
                className="searchInput"
                placeholder="Search by ID or phone number"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <button className="filterButton">Filter</button>
          </div>
          <button className="addPromotionButton" onClick={handleOpen}>
            + Add Promotion
          </button>
        </div>
      </div>

      <div className="tb_promotion">
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={filteredRows}
            columns={columns(handleUpdatePromotion, handleDeletePromotion)}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10]}
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
          <h2>Add a new Promotion</h2>
          <TextField
            label="Promotion Code"
            name="code"
            value={newPromotion.code}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            placeholder="Promotion Code..."
          />
          <TextField
            label="Discount"
            name="discount"
            value={newPromotion.discount}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            placeholder="Discount..."
          />
          <TextField
            label="Start Date"
            name="startdate"
            value={newPromotion.startdate}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            placeholder="Start Date..."
          />
          <TextField
            label="End Date"
            name="enddate"
            value={newPromotion.enddate}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            placeholder="End Date..."
          />
          <div className="modalActions">
            <Button onClick={handleClose} style={{ color: "red" }}>
              Cancel
            </Button>
            <Button
              onClick={handleAddPromotion}
              variant="contained"
              color="primary"
            >
              Add
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
          {selectedPromotion && (
            <>
              <Typography variant="h6">Update Promotion</Typography>
              <TextField
                label="Promotion Code"
                name="code"
                value={selectedPromotion.code}
                onChange={(e) =>
                  setSelectedPromotion({
                    ...selectedPromotion,
                    code: e.target.value,
                  })
                }
                fullWidth
                margin="normal"
                placeholder="Promotion Code..."
              />
              <TextField
                label="Discount"
                name="discount"
                value={selectedPromotion.discount}
                onChange={(e) =>
                  setSelectedPromotion({
                    ...selectedPromotion,
                    discount: e.target.value,
                  })
                }
                fullWidth
                margin="normal"
                placeholder="Discount..."
              />
              <TextField
                label="Start Date"
                name="startdate"
                value={selectedPromotion.startdate}
                onChange={(e) =>
                  setSelectedPromotion({
                    ...selectedPromotion,
                    startdate: e.target.value,
                  })
                }
                fullWidth
                margin="normal"
                placeholder="Start Date..."
              />
              <TextField
                label="End Date"
                name="enddate"
                value={selectedPromotion.enddate}
                onChange={(e) =>
                  setSelectedPromotion({
                    ...selectedPromotion,
                    enddate: e.target.value,
                  })
                }
                fullWidth
                margin="normal"
                placeholder="End Date..."
              />
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
    </div>
  );
}
