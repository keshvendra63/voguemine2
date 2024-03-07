import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteACollection, getCollections } from "../features/collection/collectionSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Collectionlist = () => {
  const [open, setOpen] = useState(false);
  const [collectionId, setcollectionId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setcollectionId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCollections());
  }, []);
  const collectionState = useSelector((state) => state.collection.collections);
  const data1 = [];
  for (let i = 0; i < collectionState.length; i++) {
    data1.push({
      key: i + 1,
      name: collectionState[i].title,
      action: (
        <>
          <Link
            to={`/admin/collection/${collectionState[i]._id}`}
            className=" fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(collectionState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteCollection = (e) => {
    dispatch(deleteACollection(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getCollections());
    }, 100);
  };
  return (
    <div>
      <div className="heads d-flex justify-content-between">
      <h3 className="mb-4 title">Collections</h3>
      <Link to='/admin/collection'><button>Add Collection</button></Link>
      </div>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteCollection(collectionId);
        }}
        title="Are you sure you want to delete this collection?"
      />
    </div>
  );
};

export default Collectionlist;
