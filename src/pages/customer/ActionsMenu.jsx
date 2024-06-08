import { Dropdown, Menu } from "antd";
import PropTypes from "prop-types";

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
      <a onClick={(e) => e.preventDefault()}>Actions</a>
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
// import { Dropdown, Menu } from "antd";
// import PropTypes from "prop-types";

// const ActionsMenu = ({
//   customerId,
//   handleViewDetail,
//   handleUpdateCustomer,
//   handleDeleteCustomer,
//   handleCreatePromotion,
// }) => {
//   const menuItems = [
//     {
//       key: "1",
//       label: "View Details",
//       onClick: () => handleViewDetail(customerId),
//     },
//     {
//       key: "2",
//       label: "Update Customer",
//       onClick: () => handleUpdateCustomer(customerId),
//     },
//     {
//       key: "3",
//       label: "Delete Customer",
//       onClick: () => handleDeleteCustomer(customerId),
//     },
//     {
//       key: "4",
//       label: "Create Promotion",
//       onClick: () => handleCreatePromotion(customerId),
//     },
//   ];

//   const menu = <Menu items={menuItems} />;

//   return (
//     <Dropdown menu={menu} trigger={["click"]}>
//       <a onClick={(e) => e.preventDefault()}>Actions</a>
//     </Dropdown>
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
