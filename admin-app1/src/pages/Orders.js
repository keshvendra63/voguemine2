import React, { useEffect } from "react";
import { Pagination, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getOrders, updateAOrder } from "../features/auth/authSlice";
const columns = [
  {
    title: "ID",
    dataIndex: "key",
    defaultSortOrder:"descend"
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Type",
    dataIndex: "type",
  },
  {
    title: "Items",
    dataIndex: "items",
  },
  {
    title: "City",
    dataIndex: "city",
  },
  {
    title: "Date",
    dataIndex: "date",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  const orderState = useSelector((state) => state?.auth?.orders.orders);
  const data1 = [];
  for (let i = orderState?.length-1; i>= 0; i--) {
    data1.push({
      key:`#${i+1}`,
      name: orderState[i]?.shippingInfo?.firstname,
      product: (
        <Link to={`/admin/order/${orderState[i]?._id}`}>
          View Orders
        </Link>
      ),
      amount: orderState[i]?.finalAmount,
      type:orderState[i]?.orderType,
      city:orderState[i]?.shippingInfo?.city,
      items:orderState[i].orderItems?.length,
      date: new Date(orderState[i]?.createdAt).toLocaleString(),
      action: (
        <>
          <select name="" id="" className="form-control form-select" defaultValue={orderState[i].orderStatus} onChange={(e)=>updateOrderStatus(orderState[i]?._id,e.target.value)}>
            <option value="Ordered" disabled selected>Ordered</option>
            <option value="Processed">Processed</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for Delivery">Out for Delivery</option>
          </select>
        </>
      ),
    });
  }

  const updateOrderStatus=(a,b)=>{
    dispatch(updateAOrder({id:a,status:b}))
  }
  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>{<Table columns={columns} dataSource={data1} scroll={{ x: 1500, y: 900 }} />}</div>
    </div>
  );
};

export default Orders;
