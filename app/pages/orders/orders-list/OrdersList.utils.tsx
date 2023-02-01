import { Checkbox, Tag } from "antd";
import moment from "moment";

export const orderTableColumns = (t: any) => [
  {
    title: "Vendor ID",
    dataIndex: "orderVId",
    key: "orderVId",
    responsive: ["md", "xs"],
    render: (_: any, record: any) => {
      return <p>{record?.vendor?.id ? record?.vendor?.id : ""}</p>;
    },
    label: <Checkbox value="orderVId">Vendor ID</Checkbox>,
    defaultSortOrder: "descend",
    sorter: true,
  },
  {
    title: "Vendor Name",
    dataIndex: "customer",
    key: "customer",
    responsive: ["md", "xs"],
    render: (_: any, record: any) => {
      return <p>{record?.vendor?.name ? record?.vendor?.name : ""}</p>;
    },
    label: <Checkbox value="customer">Vendor Name</Checkbox>,

    sorter: (a: any, b: any, c: any) => {
      console.log(c);
    },
  },
  {
    title: "Order Id",
    dataIndex: "customer",
    key: "customer",
    responsive: ["md", "xs"],
    render: (_: any, record: any) => {
      return <p>{record?.orderId ? record?.orderId : ""}</p>;
    },
    label: <Checkbox value="customer">Order Id</Checkbox>,
  },
  {
    title: "Customer Name",
    dataIndex: "customer",
    key: "customer",
    responsive: ["md", "xs"],
    render: (_: any, record: any) => {
      return (
        <p>
          {record?.customerInfo
            ? record?.customerInfo?.firstName +
              " " +
              record?.customerInfo?.lastName
            : ""}
        </p>
      );
    },
    label: <Checkbox value="customer">Customer Name</Checkbox>,
  },
  {
    title: "Customer Phone",
    dataIndex: "customer",
    key: "customer",
    responsive: ["md", "xs"],
    render: (_: any, record: any) => {
      return <p>{record?.customerInfo ? record?.customerInfo?.phone : ""}</p>;
    },
    label: <Checkbox value="customer">Customer Phone</Checkbox>,
  },
  {
    title: "Customer Email",
    dataIndex: "customer",
    key: "customer",
    responsive: ["md", "xs"],
    render: (_: any, record: any) => {
      return <p>{record?.customerInfo ? record?.customerInfo?.email : ""}</p>;
    },
    label: <Checkbox value="customer">Customer Email</Checkbox>,
  },
  {
    title: "Payment",
    dataIndex: "payment",
    key: "payment",
    responsive: ["md", "xs"],
    render: (_: any, record: any) => {
      const getColor = (method: string) => {
        switch (method) {
          case "CASH":
            return { color: "#2db7f5", label: "CASH" };
          case "BANK_TRANSFER":
            return { color: "#f50", label: "BANK TRANSFER" };
          case "ONLINE":
            return { color: "#87d068", label: "ONLINE" };
          case "STORE":
            return { color: "#108ee9", label: "STORE" };
          default:
            return { color: "#108ee9", label: "STORE" };
        }
      };
      return (
        <Tag color={getColor(record?.paymentMethod).color}>
          {getColor(record?.paymentMethod).label}
        </Tag>
      );
    },
    label: <Checkbox value="payment">Payment</Checkbox>,
  },
  {
    title: "Total Amount",
    dataIndex: "total",
    key: "total",
    responsive: ["md", "xs"],
    render: (_: any, record: any) => {
      return <p>{record?.finalPrice ? record?.finalPrice : ""}</p>;
    },
    label: <Checkbox value="total">Total Amount</Checkbox>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    responsive: ["md", "xs"],
    render: (_: any, record: any) => {
      const getColor = (status: string) => {
        switch (status) {
          case "PENDING":
            return { color: "cyan", label: "pending" };
          case "CONFIRMED":
            return { color: "green", label: "confirmed" };
          case "FAILED":
            return { color: "red", label: "failed" };
          case "REJECTED":
            return { color: "volcano", label: "rejected" };
          case "COMPLETED":
            return { color: "blue", label: "completed" };
          default:
            return { color: "", label: "" };
        }
      };
      return (
        <Tag color={getColor(record?.status).color}>
          {getColor(record?.status).label}
        </Tag>
      );
    },
    label: <Checkbox value="status">Status</Checkbox>,
  },
  {
    title: "Created At",
    key: "createdAt",
    render(_: any, record: any) {
      // return <div>{moment(record).format("DD-MM-YYYY HH:MM")}</div>;
      return <p>{record?.createdAt ? record?.createdAt : ""}</p>;
    },
    responsive: ["sm"],
    label: <Checkbox value="createdAt">Created At</Checkbox>,
  },
  // {
  //   title: "Action",
  //   key: "action",
  //   render: () => <p className="cursor-pointer text-green">Details</p>,
  //   label: <Checkbox value="action">Actions</Checkbox>,
  // },
];

export const orderStatusTabs = (t: any) => [
  {
    label: <span className="ml-4">{t("ALL_ORDERS")}</span>,
  },
  {
    label: t("PENDING"),
  },
  {
    label: t("CONFIRMED"),
  },

  {
    label: t("REJECTED"),
  },
  {
    label: t("COMPLETED"),
  },
];
