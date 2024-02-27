import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  createCollection,
  getACollection,
  resetState,
  updateACollection,
} from "../features/collection/collectionSlice";
let schema = yup.object().shape({
  title: yup.string().required("Collection is Required"),
});
const Addcollection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getCollectionId = location.pathname.split("/")[3];
  const newCollection = useSelector((state) => state.collection);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCollection,
    updatedCollection,
    collectionName,
  } = newCollection;
  useEffect(() => {
    if (getCollectionId !== undefined) {
      dispatch(getACollection(getCollectionId));
    } else {
      dispatch(resetState());
    }
  }, [getCollectionId]);
  useEffect(() => {
    if (isSuccess && createdCollection) {
      toast.success("Collection Added Successfullly!");
    }
    if (isSuccess && updatedCollection) {
      toast.success("Collection Updated Successfullly!");
      navigate("/admin/list-collection");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdCollection]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: collectionName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getCollectionId !== undefined) {
        const data = { id: getCollectionId, collectionData: values };
        dispatch(updateACollection(data));
        dispatch(resetState());
      } else {
        dispatch(createCollection(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">
        {getCollectionId !== undefined ? "Edit" : "Add"} Collection
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="collection"
            label="Enter Product Collection"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
            id="collection"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getCollectionId !== undefined ? "Edit" : "Add"} Collection
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcollection;
