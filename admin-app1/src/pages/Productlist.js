import React, { useEffect,useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {deleteAProduct, getProducts,resetState } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import { SearchOutlined } from '@ant-design/icons';

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a?.title?.length - b?.title?.length,
  },
  {
    title: "Stutus",
    dataIndex: "state",
    sorter: (a, b) => a?.state?.length - b?.state?.length,
  },
  {
    title: "Sku",
    dataIndex: "sku",
    sorter: (a, b) => a?.sku?.length - b?.sku?.length,
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a?.price - b?.price,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Productlist = () => {

  const [open, setOpen] = useState(false);
  const [productId, setproductId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setproductId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState())
    dispatch(getProducts());
  }, []);
  const productState = useSelector((state) => state?.product?.products);
  const data1 = [];
  for (let i = 0; i < productState?.length; i++) {
    data1.push({
      key: i + 1,
      title: productState[i]?.title,
      state: productState[i]?.state,
      sku: productState[i]?.sku,
      price: `${productState[i]?.price}`,
      action: (
        <>
          <Link to={`/admin/product/${productState[i].id}`} className=" fs-3 text-danger">
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(productState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
      
    });
  }
  const deleteProduct = (e) => {
    dispatch(deleteAProduct(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
    }, 500);
  };
  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div>
        <Table columns={columns} dataSource={data1} pagination={{ pageSize: 50 }} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteProduct(productId);
        }}
        title="Are you sure you want to delete this Product?"
      />
    </div>
  );
};

export default Productlist;
