import { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import "./AddPromotion.css";

const AddPromotion = ({ open, handleClose, handleAdd }) => {
  const [newPromotion, setNewPromotion] = useState({
    code: "",
    discount: "",
    startdate: "",
    enddate: "",
  });

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
        handleAdd(response.data);
        handleClose();
      })
      .catch((error) => {
        console.error("Error adding promotion: ", error);
      });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="addPromotionModal">
        <Typography className="addPromotionTitle">
          Add a new Promotion
        </Typography>
        <TextField
          label="Promotion Code"
          name="code"
          value={newPromotion.code}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          placeholder="Promotion Code..."
          className="addPromotionInput"
          variant="outlined"
          size="small"
        />
        <TextField
          label="Discount"
          name="discount"
          value={newPromotion.discount}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          placeholder="Discount..."
          className="addPromotionInput"
          variant="outlined"
          size="small"
        />
        <TextField
          label="Start Date"
          name="startdate"
          value={newPromotion.startdate}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          placeholder="Start Date..."
          className="addPromotionInput"
          variant="outlined"
          size="small"
        />
        <TextField
          label="End Date"
          name="enddate"
          value={newPromotion.enddate}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          placeholder="End Date..."
          className="addPromotionInput"
          variant="outlined"
          size="small"
        />
        <div className="modalActions">
          <Button onClick={handleClose} className="cancelButton">
            Cancel
          </Button>
          <Button
            onClick={handleAddPromotion}
            variant="contained"
            className="addButton"
          >
            Add
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

AddPromotion.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
};

export default AddPromotion;
