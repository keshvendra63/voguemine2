import { React, useEffect, useState,useRef } from "react";
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
      color: yup.string(),
      size: yup.string(),
      quantity: yup.number().required('Variant quantity is required')
    })
  ).required('At least one variant is required')
});


const Image = ({ src, id, index, moveImage, deleteImage }) => {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: "image",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveImage(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "image",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity }} className="image-container">
      <div className="image" style={{ backgroundImage:src}}>
        <img src={src}/>
        <button className="delete-button" onClick={() => deleteImage(id)}>Delete</button>
      </div>
    </div>
  );
};


const SingleProduct = () => {
  const [colors, setColors] = useState('');
  const [sizes, setSizes] = useState('');
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
  const productStat = useSelector((state) => state?.product)

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
        }, 300);
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


  const [variants, setVariants] = useState(productVariants || []);

  const handleVariantChange = (index, field, value) => {
    setVariants((prevVariants) => {
      const updatedVariants = [...prevVariants];
      updatedVariants[index] = { ...updatedVariants[index], [field]: value };
      return updatedVariants;
    });
  };

  const handleAddVariant = () => {
    setVariants((prevVariants) => [...prevVariants, { color: "", size: "", quantity: 0 }]);
  };

  const handleDeleteVariant = (index) => {
    setVariants((prevVariants) => prevVariants.filter((_, i) => i !== index));
  };
  const moveImage = (dragIndex, hoverIndex) => {
    const draggedImage = formik.values.images[dragIndex];
    const newImages = [...formik.values.images];
    newImages.splice(dragIndex, 1);
    newImages.splice(hoverIndex, 0, draggedImage);
    formik.setFieldValue("images", newImages);
  };

  const deleteImage = (id) => {
    const filteredImages = formik.values.images.filter((image) => image.public_id !== id);
    formik.setFieldValue("images", filteredImages);
  };


  return (
    <div className='singlep'>
      
      <form action="" onSubmit={formik.handleSubmit}>
      <div className="back d-flex my-4 align-items-center">
        <Link to="/admin/product"><IoMdArrowRoundBack style={{ color: 'black', marginRight: '10px', fontSize: '20px' }} /></Link>
        <p style={{ fontWeight: 500, fontSize: '22px' }}>{formik.values.title}</p>
      </div>
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
    {formik.values.images.map((image, index) => (
      <Image
        key={image?.public_id}
        src={image?.url}
        id={image?.public_id}
        index={index}
        moveImage={moveImage}
        deleteImage={deleteImage}
      />
    ))}
    <Dropzone
      onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
      style={{width:'100px',height:'100x',border:'1px solid grey',borderRadius:'5px'}}
     >
      {({ getRootProps, getInputProps }) => (
        <section >
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        </section>
      )}
    </Dropzone>
  </div>

            </div>
            <div className="variants">
              <p>Variants</p>
              {variants.map((variant, index) => (
          <div className="variant" key={index}>
            <input
              type="text"
              value={variant.color}
              onChange={(e) => handleVariantChange(index, "color", e.target.value)}
              placeholder="Color"
            />
            <input
              type="text"
              value={variant.size}
              onChange={(e) => handleVariantChange(index, "size", e.target.value)}
              placeholder="Size"
            />
            <input
              type="number"
              value={variant.quantity}
              onChange={(e) => handleVariantChange(index, "quantity", parseInt(e.target.value))}
              placeholder="Quantity"
            />
            <button type="button" onClick={() => handleDeleteVariant(index)}>
              Delete
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddVariant}>
          Add Variant
        </button>
      
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
            <div className="error">
                {formik.touched.state && formik.errors.state}
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
              <div className="error">
                {formik.touched.category && formik.errors.category}
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
              <div className="error">
                {formik.touched.brand && formik.errors.brand}
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
              <div className="error">
                {formik.touched.sku && formik.errors.sku}
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
              <div className="error">
                {formik.touched.collectionName && formik.errors.collectionName}
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
              <div className="error">
                {formik.touched.tags && formik.errors.tags}
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
