import { useState, useEffect } from "react";
import { Input, Button } from "antd";
import axios from "axios";
import PromotionTable from "./PromotionTable";
import PromotionForm from "./PromotionForm";
import SearchIcon from "@mui/icons-material/Search";
import "./Promotion.css";

export default function Promotion() {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(null);

  useEffect(() => {
    axios
      .get("https://664e3aa4fafad45dfadf753f.mockapi.io/promotion")
      .then((response) => {
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
        item.discount.toString().toLowerCase().includes(lowercasedFilter)
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

  const handleAddPromotion = (values) => {
    axios
      .post("https://664e3aa4fafad45dfadf753f.mockapi.io/promotion", values)
      .then((response) => {
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

  const handleSaveUpdate = (values) => {
    axios
      .put(
        `https://664e3aa4fafad45dfadf753f.mockapi.io/promotion/${selectedPromotion.id}`,
        values
      )
      .then((response) => {
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
