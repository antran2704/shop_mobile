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

const contentStatus = {
  pending: "Đang chờ xác nhận",
  processing: "Đang chuẩn bị hàng",
  delivered: "Giao thành công",
  cancle: "Đã hủy",
};

const statusStyle = {
  pending: "bg-pending",
  processing: "bg-blue-500",
  delivered: "bg-success",
  cancle: "bg-cancle",
};


export {typeList, ESelectOrderStatus, contentStatus, statusStyle}