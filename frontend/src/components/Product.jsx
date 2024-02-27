import React,{useEffect,useState} from 'react'

import ProductD from './DetailProduct';
const Product = (props) => {
  let prop=props.children[0].props


  return (
    <div className="product-card" key={props.key}>
<ProductD id={prop.id} key={prop.id} img={prop.img===""?props.children[1].props.img:prop.img} title={prop.title} price={prop.price} colors={ props.children.map((item,index)=>{
    return(item.props.colors) })} size={ props.children.map((item,index)=>{
      return(item.props.size)
    })}/>
              </div>
  )
}

export default Product
