const ESelectOrderStatus = {
  ALL: "all",
  PENDING: "pending",
  CANCLE: "cancle",
  PROCESSING: "processing",
  DELIVERED: "delivered",
};

const typeList = [
  {
    title: "Tất cả",
    type: ESelectOrderStatus.ALL,
  },
  {
    title: "Đang chờ xác nhận",
    type: ESelectOrderStatus.PENDING,
  },
  {
    title: "Đang chuẩn bị hàng",
    type: ESelectOrderStatus.PROCESSING,
  },
  {
    title: "Giao thành công",
    type: ESelectOrderStatus.DELIVERED,
  },
  {
    title: "Đã hủy",
    type: ESelectOrderStatus.CANCLE,
  },
];


const paymentMethods = {
  cod: "Thanh toán khi giao hàng (COD)",
  vnpay: "Thanh toán Online VNPay",
  banking: "Chuyển khoản qua ngân hàng",
};

const contentStatus = {
  pending: "Đang chờ xác nhận",
  processing: "Đang chuẩn bị hàng",
  delivered: "Giao thành công",
  cancle: "Đã hủy",
};

const textStyle = {
  pending: "text-pending",
  processing: "text-blue-500",
  delivered: "text-success",
  cancle: "text-cancle",
};

const statusStyle = {
  pending: "bg-pending",
  processing: "bg-blue-500",
  delivered: "bg-success",
  cancle: "bg-cancle",
};

export { typeList, ESelectOrderStatus, contentStatus, statusStyle, textStyle, paymentMethods };
