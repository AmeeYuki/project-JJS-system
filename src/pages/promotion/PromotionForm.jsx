// import { useState } from "react";
// import {
//   Modal,
//   Button,
//   Form,
//   Input,
//   DatePicker,
//   InputNumber,
//   Radio,
//   notification,
// } from "antd";
// import dayjs from "dayjs";
// import { useAddPromotionMutation } from "../../services/promotionAPI";

// const PromotionForm = ({ open, onCancel, onFinish }) => {
//   const [form] = Form.useForm();
//   const [discountType, setDiscountType] = useState("percentage");
//   const [startDate, setStartDate] = useState(null);
//   const [addPromotion] = useAddPromotionMutation();

//   const handleOk = () => {
//     form
//       .validateFields()
//       .then((values) => {
//         const requestData = {
//           description: values.description,
//           discount_percentage:
//             discountType === "percentage" ? values.discountPercentage : 0,
//           fixed_discount_amount:
//             discountType === "fixed" ? values.fixedDiscountAmount : 0,
//           start_date: dayjs(values.start_date).toISOString(),
//           end_date: dayjs(values.end_date).toISOString(),
//         };

//         console.log("Request Data to be sent:", requestData);

//         addPromotion(requestData)
//           .unwrap()
//           .then((response) => {
//             console.log("Response Data:", response);
//             notification.success({
//               message: "Request Sent",
//               description: "Your request has been sent successfully.",
//             });

//             form.resetFields();
//             onFinish();
//           })
//           .catch((error) => {
//             console.error("Error sending request:", error);
//             notification.error({
//               message: "Request Failed",
//               description: "There was an issue sending your request.",
//             });
//           });
//       })
//       .catch((info) => {
//         console.log("Validate Failed:", info);
//       });
//   };

//   const handleDiscountTypeChange = (e) => {
//     setDiscountType(e.target.value);
//     form.setFieldsValue({
//       discountPercentage: 0,
//       fixedDiscountAmount: 0,
//     });
//   };

//   const handleStartDateChange = (date) => {
//     setStartDate(date);
//     form.setFieldsValue({ end_date: null });
//   };

//   const disabledStartDate = (current) => {
//     return current && current < dayjs().startOf("day");
//   };

//   const disabledEndDate = (endValue) => {
//     if (!endValue || !startDate) {
//       return false;
//     }
//     return endValue.isBefore(startDate, "day");
//   };

//   return (
//     <Modal
//       title="Add Promotion"
//       visible={open}
//       onCancel={onCancel}
//       footer={[
//         <Button key="back" onClick={onCancel}>
//           Cancel
//         </Button>,
//         <Button key="submit" type="primary" onClick={handleOk}>
//           Submit
//         </Button>,
//       ]}
//     >
//       <Form form={form} layout="vertical">
//         <Form.Item label="Discount Type" required>
//           <Radio.Group onChange={handleDiscountTypeChange} value={discountType}>
//             <Radio value="percentage">Percentage Discount</Radio>
//             <Radio value="fixed">Fixed Discount Amount</Radio>
//           </Radio.Group>
//         </Form.Item>
//         {discountType === "percentage" && (
//           <Form.Item
//             name="discountPercentage"
//             label="Discount Percentage"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input the discount percentage!",
//               },
//             ]}
//           >
//             <InputNumber min={0} max={100} formatter={(value) => `${value}%`} />
//           </Form.Item>
//         )}
//         {discountType === "fixed" && (
//           <Form.Item
//             name="fixedDiscountAmount"
//             label="Fixed Discount Amount"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input the fixed discount amount!",
//               },
//             ]}
//           >
//             <InputNumber min={0} formatter={(value) => `${value}`} />
//           </Form.Item>
//         )}
//         <Form.Item
//           name="start_date"
//           label="Valid From"
//           rules={[
//             {
//               required: true,
//               message: "Please select the start date!",
//             },
//           ]}
//         >
//           <DatePicker
//             onChange={handleStartDateChange}
//             disabledDate={disabledStartDate}
//           />
//         </Form.Item>
//         <Form.Item
//           name="end_date"
//           label="Valid To"
//           rules={[{ required: true, message: "Please select the end date!" }]}
//         >
//           <DatePicker disabledDate={disabledEndDate} />
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default PromotionForm;
import { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  DatePicker,
  Radio,
  notification,
} from "antd";
import PropTypes from "prop-types";
import moment from "moment";

const PromotionForm = ({
  open,
  onCancel,
  onFinish,
  initialValues = {
    code: "",
    description: "",
    discountType: "percentage",
    discountPercentage: "",
    fixedDiscountAmount: "",
    startDate: null,
    endDate: null,
    status: false,
  },
}) => {
  const [form] = Form.useForm();
  const [discountType, setDiscountType] = useState("percentage");
  const [startDate, setStartDate] = useState(null);
  const [addPromotion] = useAddPromotionMutation();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const requestData = {
          description: values.description,
          discount_percentage:
            discountType === "percentage" ? values.discountPercentage : 0,
          fixed_discount_amount:
            discountType === "fixed" ? values.fixedDiscountAmount : 0,
          start_date: dayjs(values.start_date).toISOString(),
          end_date: dayjs(values.end_date).toISOString(),
        };

        console.log("Request Data to be sent:", requestData);

        addPromotion(requestData)
          .unwrap()
          .then((response) => {
            console.log("Response Data:", response);
            notification.success({
              message: "Request Sent",
              description: "Your request has been sent successfully.",
            });

            form.resetFields();
            onFinish();
          })
          .catch((error) => {
            console.error("Error sending request:", error);
            notification.error({
              message: "Request Failed",
              description: "There was an issue sending your request.",
            });
          });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleDiscountTypeChange = (e) => {
    const discountType = e.target.value;

    form.setFieldsValue({
      discountType,
      discountPercentage: discountType === "percentage" ? "" : null,
      fixedDiscountAmount: discountType === "fixed" ? "" : null,
    });

    notification.success({
      message: "Fields Reset",
      description: "Discount fields reset successfully.",
      icon: <i className="fas fa-star" style={{ color: "#108ee9" }}></i>,
    });
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    form.setFieldsValue({ end_date: null });
  };

  const disabledStartDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  const disabledEndDate = (endValue) => {
    if (!endValue || !startDate) {
      return false;
    }
    return endValue.isBefore(startDate, "minute");
  };

  return (
    <Modal
      title={initialValues.id ? "Update Promotion" : "Add a new Promotion"}
      visible={open}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          ...initialValues,
          startDate: initialValues.startDate
            ? moment(initialValues.startDate)
            : null,
          endDate: initialValues.endDate ? moment(initialValues.endDate) : null,
        }}
        validateTrigger="onBlur"
      >
        <Form.Item
          label="Promotion Code"
          name="code"
          rules={[
            { required: true, message: "Please input the promotion code!" },
          ]}
        >
          <Input placeholder="Promotion Code..." />
        </Form.Item>

        <Form.Item
          label="Select Discount Type"
          name="discountType"
          initialValue={initialValues.discountType}
          rules={[{ required: true, message: "Please select discount type!" }]}
        >
          <Radio.Group onChange={handleDiscountTypeChange}>
            <Radio.Button value="percentage">Percentage</Radio.Button>
            <Radio.Button value="fixed">Fixed Amount</Radio.Button>
          </Radio.Group>
        </Form.Item>

        {initialValues.discountType === "percentage" ? (
          <Form.Item
            label="Discount Percentage"
            name="discountPercentage"
            rules={[
              {
                required: true,
                message: "Please input the discount percentage!",
              },
            ]}
          >
            <Input type="number" placeholder="Discount Percentage..." />
          </Form.Item>
        ) : (
          <Form.Item
            label="Fixed Discount Amount"
            name="fixedDiscountAmount"
            rules={[
              {
                required: true,
                message: "Please input the fixed discount amount!",
              },
            ]}
          >
            <Input type="number" placeholder="Fixed Discount Amount..." />
          </Form.Item>
        )}

        <Form.Item
          label="Start Date"
          name="startDate"
          rules={[
            {
              required: true,
              message: "Please select the start date and time!",
            },
          ]}
        >
          <DatePicker
            showTime
            onChange={handleStartDateChange}
            disabledDate={disabledStartDate}
          />
        </Form.Item>

        <Form.Item
          name="end_date"
          label="Valid To"
          rules={[
            { required: true, message: "Please select the end date and time!" },
          ]}
        >
          <DatePicker showTime disabledDate={disabledEndDate} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

PromotionForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    code: PropTypes.string,
    description: PropTypes.string,
    discountType: PropTypes.oneOf(["percentage", "fixed"]),
    discountPercentage: PropTypes.number,
    fixedDiscountAmount: PropTypes.number,
    startDate: PropTypes.instanceOf(moment),
    endDate: PropTypes.instanceOf(moment),
    status: PropTypes.bool,
  }),
};

export default PromotionForm;
