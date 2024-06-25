// import { useState, useEffect } from "react";
// import { Button, Input, notification } from "antd";
// import PromotionTable from "./PromotionTable";
// import PromotionForm from "./PromotionForm";
// import "./Promotion.css";
// import moment from "moment";
// import {
//   useGetAllPromotionsQuery,
//   useAddPromotionMutation,
//   useUpdatePromotionMutation,
//   useDeletePromotionMutation,
// } from "../../services/promotionAPI";

// export default function Promotion() {
//   const [rows, setRows] = useState([]);
//   const [filteredRows, setFilteredRows] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [open, setOpen] = useState(false);
//   const [openUpdate, setOpenUpdate] = useState(false);
//   const [newPromotion, setNewPromotion] = useState({
//     code: "",
//     description: "",
//     discountType: "percentage",
//     discountPercentage: "",
//     fixedDiscountAmount: "",
//     startDate: null,
//     endDate: null,
//     status: false,
//   });
//   const { data: promotions, isLoading, refetch } = useGetAllPromotionsQuery();
//   const [addPromotion] = useAddPromotionMutation();
//   const [updatePromotion] = useUpdatePromotionMutation();
//   const [deletePromotion] = useDeletePromotionMutation();

//   useEffect(() => {
//     if (promotions) {
//       const indexedPromotions = promotions.map((promo, index) => ({
//         ...promo,
//         index: index + 1,
//       }));
//       setRows(indexedPromotions);
//       setFilteredRows(indexedPromotions.slice().sort((a, b) => a.id - b.id));
//     }
//   }, [promotions]);

//   useEffect(() => {
//     const lowercasedFilter = searchTerm.toLowerCase();
//     const filteredData = rows.filter((item) => {
//       return (
//         item.id.toString().includes(lowercasedFilter) ||
//         item.name.toLowerCase().includes(lowercasedFilter)
//       );
//     });

//     const sortedFilteredData = filteredData.sort((a, b) => a.id - b.id);
//     setFilteredRows(sortedFilteredData);
//   }, [searchTerm, rows]);

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleOpen = () => {
//     setNewPromotion({
//       code: "",
//       description: "",
//       discountType: "percentage",
//       discountPercentage: "",
//       fixedDiscountAmount: "",
//       startDate: null,
//       endDate: null,
//       status: false,
//     });
//     setOpen(true);
//   };

//   const handleClose = () => setOpen(false);
//   const handleCloseUpdate = () => setOpenUpdate(false);

//   const handleAddPromotion = async (values) => {
//     try {
//       await addPromotion(values).unwrap();
//       refetch();
//       handleClose();
//       notification.success({
//         message: "Success",
//         description: "Promotion added successfully.",
//       });
//     } catch (error) {
//       console.error("Error adding promotion: ", error);
//       notification.error({
//         message: "Error",
//         description: `Error: ${error.status} - ${error.data}`,
//       });
//     }
//   };

//   const handleUpdatePromotion = (promotionId) => {
//     const promotion = rows.find((row) => row.id === promotionId);
//     setNewPromotion({
//       ...promotion,
//       startDate: promotion.startDate ? moment(promotion.startDate) : null,
//       endDate: promotion.endDate ? moment(promotion.endDate) : null,
//     });
//     setOpenUpdate(true);
//   };

//   const handleSaveUpdate = async (values) => {
//     if (!values || !values.id) {
//       console.error("Promotion or its ID is undefined");
//       return;
//     }

//     try {
//       await updatePromotion({ id: values.id, ...values }).unwrap();
//       refetch();
//       handleCloseUpdate();
//       notification.success({
//         message: "Success",
//         description: "Promotion updated successfully.",
//       });
//     } catch (error) {
//       console.error("Error updating promotion: ", error);
//       notification.error({
//         message: "Error",
//         description: `Error: ${error.message}`,
//       });
//     }
//   };

//   const handleDeletePromotion = async (promotionId) => {
//     try {
//       await deletePromotion(promotionId).unwrap();
//       refetch();
//       notification.success({
//         message: "Success",
//         description: "Promotion deleted successfully.",
//       });
//     } catch (error) {
//       console.error("Error deleting promotion: ", error);
//       notification.error({
//         message: "Error",
//         description: `Error: ${error.status} - ${error.data}`,
//       });
//     }
//   };

//   return (
//     <div className="promotionWrapper">
//       <div className="promotionTitle">
//         <h1 className="titlePromotion">Promotion List</h1>
//         <div className="controls">
//           <div className="searchFilter">
//             <Input
//               type="text"
//               className="searchInput"
//               placeholder="Search by ID or name"
//               value={searchTerm}
//               onChange={handleSearch}
//             />
//             <Button className="filterButton">Filter</Button>
//           </div>
//           <Button className="addPromotionButton" onClick={handleOpen}>
//             Add Promotion
//           </Button>
//         </div>
//       </div>

//       <div className="tb_promotion">
//         <div style={{ height: 400, width: "100%" }}>
//           <PromotionTable
//             data={filteredRows}
//             handleUpdatePromotion={handleUpdatePromotion}
//             handleDeletePromotion={handleDeletePromotion}
//           />
//         </div>
//       </div>

//       <PromotionForm
//         open={open}
//         onCancel={handleClose}
//         onFinish={handleAddPromotion}
//       />

//       <PromotionForm
//         open={openUpdate}
//         onCancel={handleCloseUpdate}
//         onFinish={handleSaveUpdate}
//         initialValues={newPromotion}
//       />
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { Button, Input, notification } from "antd";
import PromotionTable from "./PromotionTable";
import PromotionForm from "./PromotionForm";
import PromotionUpdateForm from "./PromotionUpdateForm"; // Import PromotionUpdateForm
import "./Promotion.css";
import moment from "moment"; // Import moment
import {
  useGetAllPromotionsQuery,
  useAddPromotionMutation,
  useUpdatePromotionMutation,
  useDeletePromotionMutation,
} from "../../services/promotionAPI";

export default function Promotion() {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [newPromotion, setNewPromotion] = useState({
    code: "",
    description: "",
    discountType: "percentage",
    discountPercentage: "",
    fixedDiscountAmount: "",
    startDate: null,
    endDate: null,
    status: false,
  });
  const { data: promotions, isLoading, refetch } = useGetAllPromotionsQuery();
  const [addPromotion] = useAddPromotionMutation();
  const [updatePromotion] = useUpdatePromotionMutation();
  const [deletePromotion] = useDeletePromotionMutation();

  useEffect(() => {
    if (promotions) {
      const indexedPromotions = promotions.map((promo, index) => ({
        ...promo,
        index: index + 1,
      }));
      setRows(indexedPromotions);
      setFilteredRows(indexedPromotions.slice().sort((a, b) => a.id - b.id));
    }
  }, [promotions]);

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = rows.filter((item) => {
      const idMatch = item.id
        ?.toString()
        .toLowerCase()
        .includes(lowercasedFilter);
      const codeMatch = item.code?.toLowerCase().includes(lowercasedFilter);
      return idMatch || codeMatch;
    });

    const sortedFilteredData = filteredData.sort((a, b) => a.id - b.id);
    setFilteredRows(sortedFilteredData);
  }, [searchTerm, rows]);

  const handleSearch = (event) => {
    const lowercasedFilter = event.target.value.toLowerCase();
    setSearchTerm(lowercasedFilter);

    const filteredData = rows.filter((item) => {
      const idMatch = item.id
        ?.toString()
        .toLowerCase()
        .includes(lowercasedFilter);
      const codeMatch = item.code?.toLowerCase().includes(lowercasedFilter);
      return idMatch || codeMatch;
    });

    const sortedFilteredData = filteredData.sort((a, b) => a.id - b.id);
    setFilteredRows(sortedFilteredData);
  };

  const handleOpen = () => {
    setNewPromotion({
      code: "",
      description: "",
      discountType: "percentage",
      discountPercentage: "",
      fixedDiscountAmount: "",
      startDate: null,
      endDate: null,
      status: false,
    });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const handleCloseUpdate = () => setOpenUpdate(false);

  const handleAddPromotion = async (values) => {
    try {
      await addPromotion(values).unwrap();
      refetch();
      handleClose();
      notification.success({
        message: "Success",
        description: "Promotion added successfully.",
      });
    } catch (error) {
      console.error("Error adding promotion: ", error);
      notification.error({
        message: "Error",
        description: `Error: ${error.status} - ${error.data}`,
      });
    }
  };

  const handleUpdatePromotion = (promotionId) => {
    const promotion = rows.find((row) => row.id === promotionId);
    setNewPromotion({
      ...promotion,
      startDate: promotion.startDate ? moment(promotion.startDate) : null,
      endDate: promotion.endDate ? moment(promotion.endDate) : null,
    });
    setOpenUpdate(true);
  };

  const handleSaveUpdate = async (values) => {
    if (!values || !values.id) {
      console.error("Promotion or its ID is undefined", values);
      return;
    }

    console.log("Saving promotion with values:", values);

    const formattedValues = {
      ...values,
      startDate: values.startDate ? values.startDate.valueOf() : 0,
      endDate: values.endDate ? values.endDate.valueOf() : 0,
    };

    try {
      await updatePromotion({ id: values.id, ...formattedValues }).unwrap();
      refetch();
      handleCloseUpdate();
      notification.success({
        message: "Success",
        description: "Promotion updated successfully.",
      });
    } catch (error) {
      console.error("Error updating promotion: ", error);
      notification.error({
        message: "Error",
        description: `Error: ${error.message}`,
      });
    }
  };

  const handleDeletePromotion = async (promotionId) => {
    try {
      await deletePromotion(promotionId).unwrap();
      refetch();
      notification.success({
        message: "Success",
        description: "Promotion deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting promotion: ", error);
      notification.error({
        message: "Error",
        description: `Error: ${error.status} - ${error.data}`,
      });
    }
  };

  return (
    <div className="promotionWrapper">
      <div className="promotionTitle">
        <h1 className="titlePromotion">Promotion List</h1>
        <div className="controls">
          <div className="searchFilter">
            <Input
              type="text"
              className="searchInput"
              placeholder="Search by ID or code"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Button className="filterButton">Filter</Button>
          </div>
          <Button className="addPromotionButton" onClick={handleOpen}>
            Add Promotion
          </Button>
        </div>
      </div>

      <div className="tb_promotion">
        <div style={{ height: 400, width: "100%" }}>
          <PromotionTable
            data={filteredRows}
            handleUpdatePromotion={handleUpdatePromotion}
            handleDeletePromotion={handleDeletePromotion}
          />
        </div>
      </div>

      <PromotionForm
        open={open}
        onCancel={handleClose}
        onFinish={handleAddPromotion}
      />

      <PromotionUpdateForm
        open={openUpdate}
        onCancel={handleCloseUpdate}
        onFinish={handleSaveUpdate}
        initialValues={newPromotion}
      />
    </div>
  );
}
