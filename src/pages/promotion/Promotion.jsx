import { useState, useEffect } from "react";
import { Input, Button, Spin, Alert } from "antd";
import PromotionTable from "./PromotionTable";
import PromotionForm from "./PromotionForm";
import SearchIcon from "@mui/icons-material/Search";
import "./Promotion.css";
import {
  useGetAllPromotionsQuery,
  useAddPromotionMutation,
  useUpdatePromotionMutation,
  useDeletePromotionMutation,
} from "../../services/promotionAPI";

export default function Promotion() {
  // Fetch promotions data
  const {
    data: promotions = [],
    error,
    isLoading,
  } = useGetAllPromotionsQuery();

  // Mutations for adding, updating, and deleting promotions
  const [addPromotion] = useAddPromotionMutation();
  const [updatePromotion] = useUpdatePromotionMutation();
  const [deletePromotion] = useDeletePromotionMutation();

  // State for search, filtering, and form visibility
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(null);

  // Effect to update filtered rows based on promotions data
  useEffect(() => {
    setFilteredRows(promotions);
  }, [promotions]);

  // Effect to filter rows based on search term
  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = promotions.filter((item) => {
      return (
        item.code.toString().toLowerCase().includes(lowercasedFilter) ||
        item.discount_percentage
          .toString()
          .toLowerCase()
          .includes(lowercasedFilter)
      );
    });
    setFilteredRows(filteredData);
  }, [searchTerm, promotions]);

  // Event handlers
  const handleSearch = (event) => setSearchTerm(event.target.value);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseUpdate = () => setOpenUpdate(false);

  const handleAddPromotion = async (values) => {
    try {
      await addPromotion(values).unwrap();
      handleClose();
    } catch (error) {
      console.error("Error adding promotion: ", error);
    }
  };

  const handleUpdatePromotion = (promotionId) => {
    const promotion = promotions.find((promo) => promo.id === promotionId);
    setSelectedPromotion(promotion);
    setOpenUpdate(true);
  };

  const handleSaveUpdate = async (values) => {
    try {
      await updatePromotion({ id: selectedPromotion.id, ...values }).unwrap();
      handleCloseUpdate();
    } catch (error) {
      console.error("Error updating promotion: ", error);
    }
  };

  const handleDeletePromotion = async (promotionId) => {
    try {
      await deletePromotion(promotionId).unwrap();
    } catch (error) {
      console.error("Error deleting promotion: ", error);
    }
  };

  // Render loading or error states
  if (isLoading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <Alert message="Error loading promotions" type="error" />;
  }

  // Main render
  return (
    <div className="promotionWrapper">
      <div className="promotionTitle">
        <h1 className="titlePromotion">Promotion Page</h1>
        <div className="controls">
          <Input
            placeholder="Search by ID or Promotion Code"
            value={searchTerm}
            onChange={handleSearch}
            prefix={<SearchIcon />}
            style={{ width: 300 }}
          />
          <Button type="primary" onClick={handleOpen}>
            + Add Promotion
          </Button>
        </div>
      </div>

      <div className="tb_promotion">
        <PromotionTable
          data={filteredRows}
          handleUpdatePromotion={handleUpdatePromotion}
          handleDeletePromotion={handleDeletePromotion}
        />
      </div>

      <PromotionForm
        visible={open}
        onCancel={handleClose}
        onFinish={handleAddPromotion}
      />

      {selectedPromotion && (
        <PromotionForm
          visible={openUpdate}
          onCancel={handleCloseUpdate}
          onFinish={handleSaveUpdate}
          initialValues={selectedPromotion}
        />
      )}
    </div>
  );
}
