import { useState } from "react";
import PropTypes from "prop-types";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

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
    handleClose();
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

export default ActionsMenu;
