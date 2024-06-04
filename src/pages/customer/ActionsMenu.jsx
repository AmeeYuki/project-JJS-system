// import { useState } from "react";
// import PropTypes from "prop-types";
// import { IconButton, Menu, MenuItem } from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";

// const ActionsMenu = ({
//   customerId,
//   handleViewDetail,
//   handleUpdateCustomer,
//   handleDeleteCustomer,
//   handleCreatePromotion,
// }) => {
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleMenuItemClick = (action) => {
//     handleClose();
//     switch (action) {
//       case "view":
//         handleViewDetail(customerId);
//         break;
//       case "update":
//         handleUpdateCustomer(customerId);
//         break;
//       case "delete":
//         handleDeleteCustomer(customerId);
//         break;
//       case "promotion":
//         handleCreatePromotion(customerId);
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <>
//       <IconButton onClick={handleClick}>
//         <MoreVertIcon />
//       </IconButton>
//       <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
//         <MenuItem onClick={() => handleMenuItemClick("view")}>
//           View Detail
//         </MenuItem>
//         <MenuItem onClick={() => handleMenuItemClick("update")}>
//           Update
//         </MenuItem>
//         <MenuItem onClick={() => handleMenuItemClick("delete")}>
//           Delete
//         </MenuItem>
//         <MenuItem onClick={() => handleMenuItemClick("promotion")}>
//           Create Promotion for Customers
//         </MenuItem>
//       </Menu>
//     </>
//   );
// };

// ActionsMenu.propTypes = {
//   customerId: PropTypes.number.isRequired,
//   handleViewDetail: PropTypes.func.isRequired,
//   handleUpdateCustomer: PropTypes.func.isRequired,
//   handleDeleteCustomer: PropTypes.func.isRequired,
//   handleCreatePromotion: PropTypes.func.isRequired,
// };

// export default ActionsMenu;

import { useState } from "react";
import PropTypes from "prop-types";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

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
    handleClose();
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

export default ActionsMenu;
