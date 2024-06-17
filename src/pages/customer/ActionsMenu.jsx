import { Dropdown, Menu } from "antd";
import PropTypes from "prop-types";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const ActionsMenu = ({
  customerId,
  handleViewDetail,
  handleUpdateCustomer,
  handleDeleteCustomer,
  handleCreatePromotion,
}) => {
  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => handleViewDetail(customerId)}>
        View Details
      </Menu.Item>
      <Menu.Item key="2" onClick={() => handleUpdateCustomer(customerId)}>
        Update Customer
      </Menu.Item>
      <Menu.Item key="3" onClick={() => handleDeleteCustomer(customerId)}>
        Delete Customer
      </Menu.Item>
      <Menu.Item key="4" onClick={() => handleCreatePromotion(customerId)}>
        Create Promotion
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>
        <MoreHorizIcon />
      </a>
    </Dropdown>
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
