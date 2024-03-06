import { React, useEffect, useState } from "react";
import './extraCss.css'
import { useDrag, useDrop } from "react-dnd";
import ReactQuill from "react-quill";
import { Link, useLocation } from 'react-router-dom'
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik, FieldArray, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Input, Select } from "antd";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { createProducts, resetState, getAProduct, updateAProduct, getProducts} from "../features/product/productSlice";
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





const SingleProduct = () => {
  const [colors, setColors] = useState('');
  const [sizes, setSizes] = useState('');
  const [variants, setVariants] = useState([]);
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation()


  const getProductId = location.pathname.split("/")[3];
  const imgState = useSelector((state) => state.upload.images);
  const collectionState = useSelector((state) => state.collection.collections);
  const productStat = useSelector((state) => state.product)

  const {
    isSuccess,
    isError,
    isLoading,
    createdProduct,
    productTitle,
    productDescription,
    productCategory,
    productImages,
    productPrice,
    productHandle,
    productBrand,
    productSku,
    productState,
    productCollectionName,
    productVariants,
    productTags,
    updatedProduct  } = productStat
  useEffect(() => {

    if (getProductId !== undefined) {
      dispatch(getAProduct(getProductId));
      img.push(productImages);
    } else {
      dispatch(resetState());
    }
  }, [getProductId]);
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCollections());
  }, []);

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfullly!");
    }
    if (isSuccess && updatedProduct) {
      toast.success("Product Updated Successfullly!");
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
  }, [productImages]);


  const combinedImages = productImages?.length > 0 ? [...productImages, ...imgState] : imgState;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: productTitle || "",
      tags: productTags || "",
      state: productState || "",
      handle: productHandle || "",
      description: productDescription || "",
      price: productPrice || '',
      category: productCategory || '',
      brand: productBrand || '',
      sku: productSku || '',
      images:combinedImages || imgState,
      collectionName: productCollectionName || '',
      variants: productVariants || [],
    },

    validationSchema: schema,
    onSubmit: (values) => {
      values.variants = variants
      console.log(ErrorMessage)
      if (getProductId !== undefined) {
        const product = { id: getProductId, productData: values };
        dispatch(updateAProduct(product));
        setTimeout(() => {
          dispatch(getProducts())
          navigate("/admin/product")
        }, 1000);
      } else {
        dispatch(createProducts(values));
        setTimeout(() => {
          dispatch(getProducts())
          dispatch(resetState());
        }, 300);
      }
    },
  });

  useEffect(() => {
    setVariants(productVariants || []);
  }, [productVariants]);

  const handleQuantityChange = (value, index) => {
    setVariants(prevVariants => {
      const updatedVariants = [...prevVariants];
      updatedVariants[index] = { ...updatedVariants[index], quantity: parseInt(value, 10) || 0 };
      return updatedVariants;
    });
  };

  const handleAddVariant = () => {
    const colorArr = colors.split(',').map(color => color.trim());
    const sizeArr = sizes.split(',').map(size => size.trim());
    const newVariants = [];
    colorArr.forEach(color => {
      sizeArr.forEach(size => {
        newVariants.push({ color:"", size:"", quantity: 0 });
      });
    });
    setVariants(newVariants);
  };
  return (
    <div className='container singlep'>
      <div className="back d-flex my-3 align-items-center">
        <Link to="/admin/product"><IoMdArrowRoundBack style={{ color: 'black', marginRight: '10px', fontSize: '20px' }} /></Link>
        <p style={{ fontWeight: 500, fontSize: '22px' }}>{formik.values.title}</p>
      </div>
      <form action="" onSubmit={formik.handleSubmit}>
        <div className="mains">
          <div className="left">
            <div className="basic">

              <div className="title">
                <p>Title</p>
                <input type="text"
                  placeholder={formik.values.title}
                  name="title"
                  onChange={formik.handleChange("title")}
                  onBlur={formik.handleBlur("title")}
                  value={formik.values.title} />
              </div>
              <div className="error">
                {formik.touched.title && formik.errors.title}
              </div>
              <div className="title my-2">
                <p>Handle</p>
                <input type="text"
                  placeholder="Enter Product Handle"
                  name="handle"
                  onChange={formik.handleChange("handle")}
                  onBlur={formik.handleBlur("handle")}
                  value={formik.values.handle} />
              </div>
              <div className="error">
                {formik.touched.handle && formik.errors.handle}
              </div>
              <div className="title my-2">
                <p>Price</p>
                <input
                  type="number"
                  placeholder="Enter Product Price"
                  name="price"
                  onChange={formik.handleChange("price")}
                  onBlur={formik.handleBlur("price")}
                  value={formik.values.price} />
              </div>
              <div className="error">
                {formik.touched.price && formik.errors.price}
              </div>
              <div className="desc">
                <p>Description</p>
                <ReactQuill
                  className='descr'
                  theme="snow"
                  name="description"
                  modules={modules}
                  formats={formats}
                  onChange={formik.handleChange("description")}
                  value={formik.values.description}
                />
              </div>
              <div className="error">
                {formik.touched.description && formik.errors.description}
              </div>

            </div>




            <div className="bg-white border-1 p-5 text-center">

            </div>
            <div className="showimages d-flex flex-wrap gap-3">

            </div>



            <div className="media">
              <p>Media</p>
              <div className="imgbox">
                {
                combinedImages?.map((i, j) => {
                  return (
                    <div className=" position-relative" key={j}>
                      <button
                        type="button"
                        onClick={() => dispatch(delImg(i?.public_id))}
                        className="btn-close position-absolute"
                        style={{ top: "10px", right: "10px" }}
                      ></button>
                      <img src={i?.url} alt="" />
                    </div>
                  );
                })
               
              

              }
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

            </div>
            <div className="variants">
              <p>Variants</p>
              <div className="color">
                <p>Color</p>
                <input type="text" value={colors} onChange={(e) => setColors(e.target.value)} />
              </div>
              <div className="size">
                <p>Size</p>
                <input type="text" value={sizes} onChange={(e) => setSizes(e.target.value)} />
              </div>
              <button type="button" onClick={handleAddVariant}>ADD VARIANT</button>
              <div className="v-category">
                {formik.values.variants?.map((variant, index) => (
                  <div className="var" key={index}>
                    <div>
                      <p>Color: {variant.color}</p>
                      <p>Size: {variant.size}</p>
                    </div>
                    <div>
                      <p>Quantity</p>
                      <input
          type="number"
          value={variant.quantity}
          onChange={(e) => handleQuantityChange(e.target.value, index)}
        />

                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="right">
            <div className="status">
              <p>Status</p>
              <select defaultValue="active"
                name="state"
                onChange={formik.handleChange("state")}
                onBlur={formik.handleBlur("state")}
                value={formik.values.state}
                className="form-control py-3 mb-3"
                id="">
                <option value="active">Active</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <div className="insights">
              <div>
                <p>Insights</p>
                <p>Last 30 days</p>
              </div>
              <p>30 items sold</p>
            </div>
            <div className="p-organization">
              <p>Product Organization</p>
              <div className="title">
                <p>Product Category</p>
                <input type="text"
                  name="category"
                  onChange={formik.handleChange("category")}
                  onBlur={formik.handleBlur("category")}
                  value={formik.values.category}
                  className="form-control py-3 mb-3"
                  id="" />
              </div>
              <div className="title">
                <p>Brand</p>
                <input type="text"
                  placeholder="Enter Product Brand"
                  name="brand"
                  onChange={formik.handleChange("brand")}
                  onBlur={formik.handleBlur("brand")}
                  value={formik.values.brand} />
              </div>
              <div className="title">
                <p>SKU</p>
                <input type="text"
                  placeholder="Enter Product SKU"
                  name="sku"
                  onChange={formik.handleChange("sku")}
                  onBlur={formik.handleBlur("sku")}
                  value={formik.values.sku} />
              </div>
              <div className="title">
                <p>Collection</p>
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
              </div>
              <div className="title">
                <p>Tags</p>
                <input type="text"
                  placeholder="Enter Product Tags"
                  name="tags"
                  onChange={formik.handleChange("tags")}
                  onBlur={formik.handleBlur("tags")}
                  value={formik.values.tags} />
              </div>
            </div>
          </div>
        </div>
        <div className="submit">

          
        </div>
        <input type="submit" value="Save" />
      </form>
    </div>
  )
}

export default SingleProduct
