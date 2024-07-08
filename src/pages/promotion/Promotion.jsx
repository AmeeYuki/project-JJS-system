// import { useState, useEffect } from "react";
// import { Input, notification } from "antd";
// import PromotionTable from "./PromotionTable";
// import PromotionForm from "./PromotionForm";
// import "./Promotion.css";
// import dayjs from "dayjs";
// import {
//   useGetAllPromotionsQuery,
//   useAddPromotionMutation,
//   useDeletePromotionMutation,
//   useDeleteExpiredPromotionsMutation,
// } from "../../services/promotionAPI";
// import CustomButton from "../../components/CustomButton/CustomButton";
// import { RiAddLine } from "@remixicon/react";

// export default function Promotion() {
//   const [rows, setRows] = useState([]);
//   const [filteredRows, setFilteredRows] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [open, setOpen] = useState(false);
//   const { data: promotions, isLoading, refetch } = useGetAllPromotionsQuery();
//   const [deletePromotion] = useDeletePromotionMutation();
//   const [deleteExpiredPromotions] = useDeleteExpiredPromotionsMutation();
//   const [addPromotion] = useAddPromotionMutation();

//   useEffect(() => {
//     const deleteExpiredPromos = async () => {
//       try {
//         await deleteExpiredPromotions().unwrap();
//         console.log("Expired promotions deleted successfully.");
//       } catch (error) {
//         console.error("Error deleting expired promotions: ", error);
//       }
//     };

//     deleteExpiredPromos();

//     if (promotions) {
//       const indexedPromotions = promotions.map((promo, index) => ({
//         ...promo,
//         index: index + 1,
//       }));
//       setRows(indexedPromotions);
//       setFilteredRows(indexedPromotions.slice().sort((a, b) => a.id - b.id));
//     }
//   }, [promotions, deleteExpiredPromotions]);

//   useEffect(() => {
//     const lowercasedFilter = searchTerm.toLowerCase();
//     const filteredData = rows.filter((item) => {
//       const idMatch = item.id
//         ?.toString()
//         .toLowerCase()
//         .includes(lowercasedFilter);
//       const codeMatch = item.code?.toLowerCase().includes(lowercasedFilter);
//       return idMatch || codeMatch;
//     });

//     const sortedFilteredData = filteredData.sort((a, b) => a.id - b.id);
//     setFilteredRows(sortedFilteredData);
//   }, [searchTerm, rows]);

//   const handleSearch = (event) => {
//     const lowercasedFilter = event.target.value.toLowerCase();
//     setSearchTerm(lowercasedFilter);

//     const filteredData = rows.filter((item) => {
//       const idMatch = item.id
//         ?.toString()
//         .toLowerCase()
//         .includes(lowercasedFilter);
//       const codeMatch = item.code?.toLowerCase().includes(lowercasedFilter);
//       return idMatch || codeMatch;
//     });

//     const sortedFilteredData = filteredData.sort((a, b) => a.id - b.id);
//     setFilteredRows(sortedFilteredData);
//   };

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => setOpen(false);

//   const handleAddPromotion = async (promotionData) => {
//     refetch();
//     setOpen(false);
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
//         description: `Error deleting promotion: ${error.message}`,
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
//               style={{ width: 400 }}
//               type="text"
//               className="searchInput"
//               placeholder="Search by ID or code"
//               value={searchTerm}
//               onChange={handleSearch}
//             />
//           </div>
//           <CustomButton
//             icon={RiAddLine}
//             text="Create Promotion"
//             iconSize="20px"
//             iconColor="white"
//             textColor="white"
//             containerStyle={{
//               backgroundColor: "#000000",
//               border: "none",
//               borderRadius: "6px",
//               cursor: "pointer",
//             }}
//             iconPosition="left"
//             fontSize="16px"
//             padding="10px 10px"
//             onClick={handleOpen}
//           />
//         </div>
//       </div>

//       <div className="tb_promotion">
//         <div style={{ height: 400, width: "100%" }}>
//           <PromotionTable
//             data={filteredRows}
//             handleDeletePromotion={handleDeletePromotion}
//           />
//         </div>
//       </div>

//       <PromotionForm
//         open={open}
//         onCancel={handleClose}
//         onFinish={handleAddPromotion}
//       />
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { Input, notification } from "antd";
import PromotionTable from "./PromotionTable";
import PromotionForm from "./PromotionForm";
import "./Promotion.css";
import dayjs from "dayjs";
import {
  useGetAllPromotionsQuery,
  useAddPromotionMutation,
  useDeletePromotionMutation,
  useDeleteExpiredPromotionsMutation,
} from "../../services/promotionAPI";
import CustomButton from "../../components/CustomButton/CustomButton";
import { RiAddLine } from "@remixicon/react";
import debounce from "lodash/debounce";

export default function Promotion() {
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const { data: promotions, isLoading } = useGetAllPromotionsQuery();
  const [deletePromotion] = useDeletePromotionMutation();
  const [deleteExpiredPromotions] = useDeleteExpiredPromotionsMutation();
  const [addPromotion] = useAddPromotionMutation();

  useEffect(() => {
    const deleteExpiredPromos = async () => {
      try {
        await deleteExpiredPromotions().unwrap();
        console.log("Expired promotions deleted successfully.");
      } catch (error) {
        console.error("Error deleting expired promotions: ", error);
      }
    };

    deleteExpiredPromos();

    if (promotions) {
      const indexedPromotions = promotions.map((promo, index) => ({
        ...promo,
        index: index + 1,
      }));
      setRows(indexedPromotions);
    }
  }, [promotions, deleteExpiredPromotions]);

  const filteredRows = rows
    .filter((item) => {
      const lowercasedFilter = searchTerm.toLowerCase();
      const idMatch = item.id
        ?.toString()
        .toLowerCase()
        .includes(lowercasedFilter);
      const codeMatch = item.code?.toLowerCase().includes(lowercasedFilter);
      return idMatch || codeMatch;
    })
    .sort((a, b) => a.id - b.id);

  const handleSearch = debounce((event) => {
    setSearchTerm(event.target.value);
  }, 300);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleAddPromotion = async (promotionData) => {
    try {
      await addPromotion(promotionData).unwrap();
      notification.success({
        message: "Success",
        description: "Promotion added successfully.",
      });
      setOpen(false);
    } catch (error) {
      console.error("Error adding promotion: ", error);
      notification.error({
        message: "Error",
        description: `Error adding promotion: ${error.message}`,
      });
    }
  };

  const handleDeletePromotion = async (promotionId) => {
    try {
      await deletePromotion(promotionId).unwrap();
      notification.success({
        message: "Success",
        description: "Promotion deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting promotion: ", error);
      notification.error({
        message: "Error",
        description: `Error deleting promotion: ${error.message}`,
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
              style={{ width: 400 }}
              type="text"
              className="searchInput"
              placeholder="Search by ID or code"
              onChange={handleSearch}
            />
          </div>
          <CustomButton
            icon={RiAddLine}
            text="Create Promotion"
            iconSize="20px"
            iconColor="white"
            textColor="white"
            containerStyle={{
              backgroundColor: "#000000",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
            iconPosition="left"
            fontSize="16px"
            padding="10px 10px"
            onClick={handleOpen}
          />
        </div>
      </div>

      <div className="tb_promotion">
        <div style={{ height: 400, width: "100%" }}>
          <PromotionTable
            data={filteredRows}
            handleDeletePromotion={handleDeletePromotion}
          />
        </div>
      </div>

      <PromotionForm
        open={open}
        onCancel={handleClose}
        onFinish={handleAddPromotion}
      />
    </div>
  );
}
