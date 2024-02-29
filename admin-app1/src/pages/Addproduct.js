import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik, FieldArray,Field,ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getSizes } from "../features/size/sizeSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { Input, Select } from "antd";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { createProducts, resetState } from "../features/product/productSlice";
import { getCollections } from "../features/collection/collectionSlice";
let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  handle: yup.string().required("handle is Required"),
  description: yup.string().required("Description is Required"),
  price: yup.number().required("Price is Required"),
  category: yup.string().required("Category is Required"),
  brand: yup.string().required("Brand is Required"),
  sku: yup.string().required("SKU is Required"),
  collectionName: yup.string().required("Collection is Required"),
  variants: yup.array().of(
    yup.object().shape({
      color: yup.string().required('Variant color is required'),
      size: yup.string().required('Variant size is required'),
      quantity: yup.number().required('Variant quantity is required')
    })
  ).required('At least one variant is required')
});

const Addproduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(getSizes());
    dispatch(getCategories());
    dispatch(getCollections());
  }, []);

  const sizeState = useSelector((state) => state.size.sizes);
  const catState = useSelector((state) => state.pCategory.pCategories);
  const collectionState = useSelector((state) => state.collection.collections);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product.products);
  const { isSuccess, isError, isLoading, createdProduct } = newProduct;
  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);
  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.images = img;
  }, [img]);
  const formik = useFormik({
    initialValues: {
      title: '',
      handle: '',
      description: '',
      price: '',
      category: '',
      brand: '',
      sku: '',
      collectionName:'',
      variants: [{ color: '', size: '', quantity: '' }]
    },
    
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProducts(values));

      setTimeout(() => {
        dispatch(resetState());
        formik.resetForm();
      }, 1000);
    },
  });
  console.log(formik.values)
  const addVariant = () => {
    formik.setFieldValue("variants", [
      ...formik.values.variants,
      { color: "", size: "", quantity: "" },
    ]);
  };

  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="Enter Product Title"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <CustomInput
            type="text"
            label="Enter Product Handle"
            name="handle"
            onChng={formik.handleChange("handle")}
            onBlr={formik.handleBlur("handle")}
            val={formik.values.handle}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <div className="">
            <ReactQuill
              theme="snow"
              name="description"
              onChange={formik.handleChange("description")}
              value={formik.values.description}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <CustomInput
            type="number"
            label="Enter Product Price"
            name="price"
            onChng={formik.handleChange("price")}
            onBlr={formik.handleBlur("price")}
            val={formik.values.price}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>
          <select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select Category</option>
            {catState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
          <CustomInput
            type="text"
            label="Enter Product Brand"
            name="brand"
            onChng={formik.handleChange("brand")}
            onBlr={formik.handleBlur("brand")}
            val={formik.values.brand}
          />
          <div className="error">
            {formik.touched.brand && formik.errors.brand}
          </div>
          <CustomInput
            type="text"
            label="Enter Product SKU"
            name="sku"
            onChng={formik.handleChange("sku")}
            onBlr={formik.handleBlur("sku")}
            val={formik.values.sku}
          />
          <div className="error">
            {formik.touched.sku && formik.errors.sku}
          </div>
            
          <select
            name="collectionName"
            onChange={formik.handleChange("collectionName")}
            onBlur={formik.handleBlur("collectionName")}
            value={formik.values.collectionName}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select Collection</option>
            {collectionState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.collectionName && formik.errors.collectionName}
          </div>
          
          <CustomInput
            type="text"
            label="Enter Product Tags"
            name="tags"
            onChng={formik.handleChange("tags")}
            onBlr={formik.handleBlur("tags")}
            val={formik.values.tags}
          />
          <div className="error">
            {formik.touched.tags && formik.errors.tags}
          </div>
         
                {formik.values.variants.map((variant, index) => (
                  <div key={index}>
                    <input
                      id={`color-${index}`}
                      name={`variants[${index}].color`}
                      type="text"
                      label="Enter Color"
                      value={formik.values.variants[index].color}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control py-3 mb-3"
                    />
                    <div className="error">
              {formik.touched.variants?.[index]?.color &&
                formik.errors.variants?.[index]?.color}
            </div>
            <select
            id={`size-${index}`}
            name={`variants[${index}].size`}
            type="text"
            value={formik.values.variants[index].size}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="form-control py-3 mb-3"
          >
            <option value="">Select Size</option>
            {sizeState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
              {formik.touched.variants?.[index]?.size &&
                formik.errors.variants?.[index]?.size}
            </div>
                    {/* <label htmlFor={`size-${index}`}>Size:</label>
                    <input
                      id={`size-${index}`}
                      name={`variants[${index}].size`}
                      type="text"
                      value={formik.values.variants[index].size}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <div className="error">
              {formik.touched.variants?.[index]?.size &&
                formik.errors.variants?.[index]?.size}
            </div> */}
          
                    <input
                      id={`quantity-${index}`}
                      name={`variants[${index}].quantity`}
                      type="number"
                      label="Please Enter Quantity"
                      value={formik.values.variants[index].quantity}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control py-3 mb-3"
                    />
                    <div className="error">
              {formik.touched.variants?.[index]?.quantity &&
                formik.errors.variants?.[index]?.quantity}
            </div>
                  </div>
                ))}
          
                <button type="button" onClick={addVariant}>
                  Add Variant
                </button>
          
         
          <select
            name="state"
            onChange={formik.handleChange("state")}
            onBlur={formik.handleBlur("state")}
            value={formik.values.state}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="Draft" selected>Draft</option>
            <option value="Active">Active</option>
            
            
            
          </select>
          <div className="error">
            {formik.touched.state && formik.errors.state}
          </div>
          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {imgState?.map((i, j) => {
              return (
                <div className=" position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(delImg(i.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
