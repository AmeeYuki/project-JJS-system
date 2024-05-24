import ActionsMenu from "./ActionsMenu";

const columns = (handleUpdatePromotion, handleDeletePromotion) => [
  { field: "id", headerName: "No", width: 70 },
  { field: "code", headerName: "Promotion Code", width: 200 },
  { field: "discount", headerName: "Discount(VND)", width: 200 },
  { field: "startdate", headerName: "Start Date", width: 150 },
  { field: "enddate", headerName: "End Date", width: 150 },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    renderCell: (params) => (
      <ActionsMenu
        promotionId={params.row.id}
        handleUpdatePromotion={handleUpdatePromotion}
        handleDeletePromotion={handleDeletePromotion}
      />
    ),
  },
];

export default columns;
