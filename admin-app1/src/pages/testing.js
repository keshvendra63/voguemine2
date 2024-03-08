import React, { useEffect, useState,useRef } from "react";
import './extraCss.css';
import { useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ReactQuill from "react-quill";
import { Link, useLocation } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Input, Select } from "antd";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { createProducts, resetState, getAProduct, updateAProduct, getProducts } from "../features/product/productSlice";
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

const Testing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [variants, setVariants] = useState([]);
  const imgState = useSelector((state) => state.upload.images);
  const collectionState = useSelector((state) => state.collection.collections);
  const productStat = useSelector((state) => state.product);

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
    updatedProduct
  } = productStat;

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfully!");
    }
    if (isSuccess && updatedProduct) {
      toast.success("Product Updated Successfully!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  useEffect(() => {
    if (getProductId !== undefined) {
      dispatch(getAProduct(getProductId));
    } else {
      dispatch(resetState());
    }
    dispatch(getCollections());
  }, []);

  const getProductId = location.pathname.split("/")[3];
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
      images: combinedImages || imgState,
      collectionName: productCollectionName || '',
      variants: productVariants || [],
    },

    validationSchema: schema,
    onSubmit: (values) => {
      if (getProductId !== undefined) {
        const product = { id: getProductId, productData: values };
        dispatch(updateAProduct(product));
        setTimeout(() => {
          dispatch(getProducts());
          navigate("/admin/product");
        }, 1000);
      } else {
        dispatch(createProducts(values));
        setTimeout(() => {
          dispatch(getProducts());
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
              {/* Basic form fields */}
            </div>
            <div className="media">
  <p>Media</p>
  <div className="imgbox">
    {formik.values.images.map((image, index) => (
      <Image
        key={image.public_id}
        src={image?.url}
        id={image.public_id}
        index={index}
        moveImage={moveImage}
        deleteImage={deleteImage}
      />
    ))}
    <Dropzone
      onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
    >
      {({ getRootProps, getInputProps }) => (
        <section>
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
                  {/* Variant fields */}
                </div>
              ))}
              <button type="button" onClick={handleAddVariant}>
                Add Variant
              </button>
            </div>
          </div>
          <div className="right">
            <div className="status">
              {/* Status field */}
            </div>
            <div className="insights">
              {/* Insights section */}
            </div>
            <div className="p-organization">
              {/* Product Organization fields */}
            </div>
          </div>
        </div>
        <div className="submit">
          <input type="submit" value="Save" />
        </div>
      </form>
    </div>
  )
}

export default Testing;
