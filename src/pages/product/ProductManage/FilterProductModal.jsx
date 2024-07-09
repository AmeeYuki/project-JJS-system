import React, { useEffect, useState } from "react";
import { Modal, Select, Button, message } from "antd";
import { useGetTypesQuery } from "../../../services/typeAPI";

const { Option } = Select;

const FilterProductModal = ({ visible, onCancel, onApply }) => {
  const { data: typesData, isLoading: typesLoading } = useGetTypesQuery();
  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleTypeChange = (values) => {
    setSelectedTypes(values);
  };

  const handleApply = () => {
    onApply(selectedTypes);
  };

  return (
    <Modal
      title="Filter Products"
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
          <Button key="apply" type="primary" onClick={handleApply}>
            Apply
          </Button>
        </div>,
      ]}
    >
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ marginBottom: 8 }}>Types:</h3>
        <Select
          mode="multiple"
          placeholder="Select types"
          loading={typesLoading}
          onChange={handleTypeChange}
          style={{ width: "100%" }}
        >
          {typesData &&
            typesData.map((type) => (
              <Option key={type.id} value={type.type}>
                {type.type}
              </Option>
            ))}
        </Select>
      </div>
    </Modal>
  );
};

export default FilterProductModal;
