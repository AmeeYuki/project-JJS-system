import React, { useState } from "react";
import { Modal, Checkbox, Button } from "antd";

const FilterProductModal = ({ visible, onCancel, onApply }) => {
  const [checkedTypes, setCheckedTypes] = useState([]);

  const handleTypeChange = (checkedValues) => {
    setCheckedTypes(checkedValues);
  };

  const handleApply = () => {
    onApply(checkedTypes);
  };

  return (
    <Modal
      title={
        <div
          style={{
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#333333",
          }}
        >
          Filter Products
        </div>
      }
      visible={visible}
      onCancel={onCancel}
      footer={[
        <div
          key="buttons"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <Button key="cancel" onClick={onCancel} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          ,
          <Button key="apply" type="primary" onClick={handleApply}>
            Apply
          </Button>
          ,
        </div>,
      ]}
    >
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ marginBottom: 8 }}>Types:</h3>
        <Checkbox.Group onChange={handleTypeChange}>
          <Checkbox value="Gold">Gold</Checkbox>
          <Checkbox value="Silver">Silver</Checkbox>
          <Checkbox value="Diamond">Diamond</Checkbox>
        </Checkbox.Group>
      </div>
    </Modal>
  );
};

export default FilterProductModal;
