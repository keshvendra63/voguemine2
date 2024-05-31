import React, { useEffect, useState } from 'react'
import './product.css'
import {useLocation,useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {getAllProducts,getProducts, resetState } from '../../features/products/productSlice';
import { getACollection } from '../../features/collection/collectionSlice';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import Product from '../../components/Product'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TuneIcon from '@mui/icons-material/Tune';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Products = () => {
  const handleClose = () => {
    setOpen(false);
  };
  const [open6,setOpen6]=useState(false)
  const handleClose1 = () => {
    setOpen6(false);
  };
  const collectionState=useSelector((state)=>state?.collection?.singleCollection)
  const bannerState=useSelector((state)=>state?.banner?.banner)
  const navigate=useNavigate()
    const [collectionName,setCollectionName]=useState("")
    const [btn,setBtn]=useState("flex")
  const [sort,setSort]=useState("-createdAt")
    const location=useLocation()
  const [limit,setLimit]=useState(28)
  const [loading,setLoading]=useState(true)
  const [searchValue,setSearchvalue]=useState(undefined)
  const [load, setLoad] = useState(28)

  const dispatch=useDispatch();
  const queryParams = new URLSearchParams(location.search);
  let page = parseInt(queryParams.get('page')) || 1;
const search = JSON.parse(localStorage.getItem("search"))
useEffect(()=>{
if(search){
  if(location.pathname==="/products")
  setSearchvalue(search.mysearch)
}
},[search])

const pathname = location.pathname; // Gives "/collections/men-premium-shirt"
const segments = pathname.split('/'); // Splits the pathname into segments
const collection = segments[2]; // Gets "men-premium-shirt" assuming it's always in this position
useEffect(()=>{
  window.scrollTo({
    top: -10,
  });
})

useEffect(()=>{
  if(location?.pathname!=="/products"){
    localStorage.removeItem("search")

  }
  
},[location])

useEffect(()=>{

})
useEffect(()=>{
  dispatch(resetState())
},[dispatch])
const updateURL = (sizeNumber) => {
  const searchParams = new URLSearchParams();

  // Add page parameter
  searchParams.set('page', sizeNumber);

  // Add filter parameters
  if (selectedSizes.length > 0) {
    searchParams.set('sizes', selectedSizes.join(','));
  }
  if (selectedColors.length > 0) {
    searchParams.set('colors', selectedColors.join(','));
  }
  if (selectedBrands.length > 0) {
    searchParams.set('brands', selectedBrands.join(','));
  }

  navigate(`${location.pathname}?${searchParams.toString()}`);
};

    const productState=useSelector((state)=>state?.product?.product)
    const productState1=useSelector((state)=>state?.product?.prdt)
    const productStat = useSelector((state) => state?.product);

    const {isLoading,isSuccess}=productStat

    
    useEffect(()=>{
      const filter = {};

      // Add selected sizes to the filter object
      if (selectedSizes.length > 0) {
        filter.size = selectedSizes.join(',');
      }
    
      // Add selected colors to the filter object
      if (selectedColors.length > 0) {
        filter.color = selectedColors.join(',');
      }
    
      // Add selected brands to the filter object
      if (selectedBrands.length > 0) {
        filter.brand = selectedBrands.join(',');
      }
        if(searchValue===undefined){
          dispatch(getAllProducts({sort,limit,page,collectionName:collectionName,...filter}))
      }
    else{
        dispatch(getProducts({searchValue,limit,sort,page,...filter}))
    }
    },[searchValue,page,collectionName,sort])
    useEffect(() => {
      if (collection) {
        setLoading(true);
        dispatch(getACollection(collection))
          .unwrap()
          .then((response) => {
            setCollectionName(response.title);
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching collection:', error);
            setLoading(false);
          });
      }
    }, [dispatch,collection]);
    const products=searchValue===undefined?(productState? productState:[]):(productState1? productState1:[])
      

    const sortChange1 = () => {
       setSort("title");
       handleClose1()

  };
  const sortChange2 = () => {
    setSort("-title"); // Update the sort state variable
        handleClose1()
      

};
const sortChange3 = () => {
  setSort("price"); // Update the sort state variable
      handleClose1()

};
const sortChange4 = () => {
  setSort("-price"); // Update the sort state variable
 
      handleClose1()
     

};
const sortChange5 = () => {
  setSort("-createdAt"); // Update the sort state variable
 
      handleClose1()
    

};

  useEffect(()=>{
    if(isLoading && products){
      setLoading(true)
    }
    if(isSuccess && products){
      setTimeout(()=>{
        setLoading(false)

      },1000)
    }
  },[isLoading,isSuccess,products])

useEffect(()=>{
    if(products?.length<load){
      setTimeout(()=>{
        setBtn("none")
      },3000)
    }
    else{
      setBtn("flex")
    }
  
})
const [open, setOpen] = React.useState(false);

const toggleDrawer = (newOpen) => () => {
  setOpen(newOpen);
};
const toggleDrawer1 = (newOpen) => () => {
  setOpen6(newOpen);
};

const uniqueSizes = new Set();

  products?.products?.forEach(product => {
    product.variants.forEach(variant => {
      uniqueSizes.add(variant.size);
    });
  });

  // Convert the Set to an array
  const uniqueSizesArray = Array.from(uniqueSizes);
const [open1,setOpen1]=useState("translateX(-200%)")
const [open2,setOpen2]=useState("translateX(-200%)")
const [open3,setOpen3]=useState("translateX(-200%)")
const [open4,setOpen4]=useState("translateX(-200%)")
const [open5,setOpen5]=useState("translateX(-200%)")

  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const toggleSize = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const toggleColor = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const toggleBrand = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

const set3=()=>{
  if(open3==="translateX(-200%)"){
    setOpen3("translateX(0)")    
     setOpen2("translateX(-200%)")
    setOpen1("translateX(-200%)")
    setOpen4("translateX(-200%)")
    setOpen5("translateX(-200%)")

  }
  else(
    setOpen3("translateX(-200%)")
  )
}
const set4=()=>{
  if(open4==="translateX(-200%)"){
    setOpen4("translateX(0)")    
     setOpen2("translateX(-200%)")
    setOpen3("translateX(-200%)")
    setOpen1("translateX(-200%)")
    setOpen5("translateX(-200%)")

  }
  else(
    setOpen4("translateX(-200%)")
  )
}
const set5=()=>{
  if(open5==="translateX(-200%)"){
    setOpen5("translateX(0)")    
     setOpen2("translateX(-200%)")
    setOpen3("translateX(-200%)")
    setOpen4("translateX(-200%)")
    setOpen1("translateX(-200%)")

  }
  else(
    setOpen5("translateX(-200%)")
  )
}

const applyFilter = () => {
  const filter = {};

  // Add selected sizes to the filter object
  if (selectedSizes.length > 0) {
    filter.size = selectedSizes.join(',');
  }

  // Add selected colors to the filter object
  if (selectedColors.length > 0) {
    filter.color = selectedColors.join(',');
  }

  // Add selected brands to the filter object
  if (selectedBrands.length > 0) {
    filter.brand = selectedBrands.join(',');
  }

  const searchParams = new URLSearchParams(location.search);
  if (filter.size) {
    searchParams.set('sizes', filter.size);
  } else {
    searchParams.delete('sizes');
  }
  if (filter.color) {
    searchParams.set('colors', filter.color);
  } else {
    searchParams.delete('colors');
  }
  if (filter.brand) {
    searchParams.set('brands', filter.brand);
  } else {
    searchParams.delete('brands');
  }

  navigate(`${location.pathname}?${searchParams.toString()}`);

  if (searchValue === undefined) {
    dispatch(getAllProducts({ sort, limit, page, collectionName, ...filter }));
  } 
  if(searchValue!==undefined) {
    dispatch(getProducts({searchValue,limit,sort,page,...filter}))

  }

  handleClose();
};

const clearFilter=()=>{
  setSelectedBrands([])
  setSelectedColors([])
  setSelectedSizes([])
  if(searchValue===undefined){
    dispatch(getAllProducts({ sort: sort, limit, page, collectionName }));

  }
  else{
    dispatch(getProducts({searchValue,limit,sort,page}))

  }
  navigate(location.pathname);  // Clears all query parameters


  handleClose()
}
const isSelectedBrand = (brand) => selectedBrands.includes(brand) ? 'selected' : '';
  const isSelectedSize = (size) => selectedSizes.includes(size) ? 'selected' : '';
  const isSelectedColor = (color) => selectedColors.includes(color) ? 'selected' : '';
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sizesParam = queryParams.get('sizes');
    const colorsParam = queryParams.get('colors');
    const brandsParam = queryParams.get('brands');
  
    if (sizesParam) {
      setSelectedSizes(sizesParam.split(','));
    } else {
      setSelectedSizes([]);
    }
  
    if (colorsParam) {
      setSelectedColors(colorsParam.split(','));
    } else {
      setSelectedColors([]);
    }
  
    if (brandsParam) {
      setSelectedBrands(brandsParam.split(','));
    } else {
      setSelectedBrands([]);
    }
  }, [location.search]);



  useEffect(() => {
    if (collectionState?.metaTitle!=="") {
        document.title = collectionState?.metaTitle;
    }
    else{
      document.title =collectionState?.title;
    }

}, [collectionState?.metaTitle,collectionState?.title]);
useEffect(() => {
  if (collectionState?.metaDesc!=="") {
      document.querySelector('meta[name="description"]').setAttribute('content',collectionState?.metaDesc);
  }
  else{
    document.querySelector('meta[name="description"]').setAttribute('content',document.createElement('div').innerHTML = collectionState?.title );
  }

}, [collectionState?.metaDesc,collectionState?.title]);
const handlePageChange = (event, value) => {
  updateURL(value); // Update the URL with the new page value
};
const modifyCloudinaryUrl = (url) => {
  const urlParts = url?.split('/upload/');
  return urlParts && `${urlParts[0]}/upload/c_limit,h_1000,f_auto,q_auto/${urlParts[1]}`;
};

    return (
        <div className='Products'>
            <div className="category-banner p-banner">
                <img src={modifyCloudinaryUrl(bannerState[35]?.images[0]?.url) || modifyCloudinaryUrl("https://res.cloudinary.com/dqh6bd766/image/upload/v1712382538/a36_f0eblb.jpg")} alt={bannerState[35]?.alt} />
            </div>
            <div className="products-box margin-section">
 
                <div className="products-page">
                    <div className="sorting">
                        <div className="filter">
                            <p style={{fontWeight:500,cursor:'pointer'}} onClick={toggleDrawer(true)} className='f1'><TuneIcon/> <span className='spa'>Filter</span></p>
                            <Dialog open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">
          <DialogContent className='filt'>
          <div className="c-icon" onClick={handleClose}><CloseIcon/></div>
          <div className="apply">
          <button onClick={clearFilter}>Clear</button>

          <button onClick={applyFilter}>Apply</button>
          </div>

          <div className="filter-div">
          <p className='filter-head'>Filter</p>
          <div className="available">
            <p>Availability</p>
            <p>In Stock: {products && products?.length}</p>
          </div>

          <div className="brand">
          <p onClick={set3}><span>Brand - {selectedBrands?.length}</span><KeyboardArrowDownIcon className='icon1'/></p>

          <ul style={{transform:open3,height:open3==="translateX(-200%)"?0:'100%'}}>
  <li onClick={()=>toggleBrand("Amiri")} className={isSelectedBrand("Amiri")}>Amiri</li>
  <li onClick={()=>toggleBrand("Armani Exchange")} className={isSelectedBrand("Armani Exchange")}>Armani Exchange</li>
</ul>
<ul style={{transform:open3,height:open3==="translateX(-200%)"?0:'100%'}}>
  <li onClick={()=>toggleBrand("Balenciaga")} className={isSelectedBrand("Balenciaga")}>Balenciaga</li>
  <li onClick={()=>toggleBrand("Bally")} className={isSelectedBrand("Bally")}>Bally</li>
  <li onClick={()=>toggleBrand("Balmain")} className={isSelectedBrand("Balmain")}>Balmain</li>
  <li onClick={()=>toggleBrand("Bottega Veneta")} className={isSelectedBrand("Bottega Veneta")}>Bottega Veneta</li>
  <li onClick={()=>toggleBrand("Burberry")} className={isSelectedBrand("Burberry")}>Burberry</li>
</ul>
<ul style={{transform:open3,height:open3==="translateX(-200%)"?0:'100%'}}>
  <li onClick={()=>toggleBrand("Calvin Klein")} className={isSelectedBrand("Calvin Klein")}>Calvin Klein</li>
  <li onClick={()=>toggleBrand("Celine")} className={isSelectedBrand("Celine")}>Celine</li>
  <li onClick={()=>toggleBrand("Dior")} className={isSelectedBrand("Christian Dior")}>Christian Dior</li>

  <li onClick={()=>toggleBrand("Chanel")} className={isSelectedBrand("Chanel")}>Chanel</li>
  <li onClick={()=>toggleBrand("Christian Louboutin")} className={isSelectedBrand("Christian Louboutin")}>Christian Louboutin</li>
  <li onClick={()=>toggleBrand("Coach")} className={isSelectedBrand("Coach")}>Coach</li>
</ul>
<ul style={{transform:open3,height:open3==="translateX(-200%)"?0:'100%'}}>
  <li onClick={()=>toggleBrand("Dior")} className={isSelectedBrand("Dior")}>Dior</li>
  <li onClick={()=>toggleBrand("DKNY")} className={isSelectedBrand("DKNY")}>DKNY</li>
  <li onClick={()=>toggleBrand("Dolce & Gabbana")} className={isSelectedBrand("Dolce & Gabbana")}>Dolce & Gabbana</li>
</ul>
<ul style={{transform:open3,height:open3==="translateX(-200%)"?0:'100%'}}>
<li onClick={()=>toggleBrand("Emporio Armani")} className={isSelectedBrand("Emporio Armani")}>Emporio Armani</li>

  <li onClick={()=>toggleBrand("Fendi")} className={isSelectedBrand("Fendi")}>Fendi</li>
  <li onClick={()=>toggleBrand("Fred Perry")} className={isSelectedBrand("Fred Perry")}>Fred Perry</li>
</ul>
<ul style={{transform:open3,height:open3==="translateX(-200%)"?0:'100%'}}>
  <li onClick={()=>toggleBrand("Givenchy")} className={isSelectedBrand("Givenchy")}>Givenchy</li>
  <li onClick={()=>toggleBrand("Gucci")} className={isSelectedBrand("Gucci")}>Gucci</li>
  <li onClick={()=>toggleBrand("Hermes")} className={isSelectedBrand("Hermes")}>Hermes</li>
  <li onClick={()=>toggleBrand("Hugo Boss")} className={isSelectedBrand("Hugo Boss")}>Hugo Boss</li>
</ul>
<ul style={{transform:open3,height:open3==="translateX(-200%)"?0:'100%'}}>
  <li onClick={()=>toggleBrand("Karl")} className={isSelectedBrand("Karl")}>Karl</li>
  <li onClick={()=>toggleBrand("Kenzo")} className={isSelectedBrand("Kenzo")}>Kenzo</li>
  <li onClick={()=>toggleBrand("Lanvin")} className={isSelectedBrand("Lanvin")}>Lanvin</li>
  <li onClick={()=>toggleBrand("Louis Vuitton")} className={isSelectedBrand("Louis Vuitton")}>Louis Vuitton</li>
</ul>
<ul style={{transform:open3,height:open3==="translateX(-200%)"?0:'100%'}}>
  <li onClick={()=>toggleBrand("Michael Kors")} className={isSelectedBrand("Michael Kors")}>Michael Kors</li>
  <li onClick={()=>toggleBrand("Moncler")} className={isSelectedBrand("Moncler")}>Moncler</li>
  <li onClick={()=>toggleBrand("Moschino")} className={isSelectedBrand("Moschino")}>Moschino</li>
</ul>
<ul style={{transform:open3,height:open3==="translateX(-200%)"?0:'100%'}}>
  <li onClick={()=>toggleBrand("Off-White")} className={isSelectedBrand("Off-White")}>Off-White</li>
  <li onClick={()=>toggleBrand("Prada")} className={isSelectedBrand("Prada")}>Prada</li>
  <li onClick={()=>toggleBrand("Ralph Lauren")} className={isSelectedBrand("Ralph Lauren")}>Ralph Lauren</li>
</ul>
<ul style={{transform:open3,height:open3==="translateX(-200%)"?0:'100%'}}>
  <li onClick={()=>toggleBrand("Salvatore Ferragamo")} className={isSelectedBrand("Salvatore Ferragamo")}>Salvatore Ferragamo</li>
  <li onClick={()=>toggleBrand("Stefano Ricci")} className={isSelectedBrand("Stefano Ricci")}>Stefano Ricci</li>
  <li onClick={()=>toggleBrand("Tod's")} className={isSelectedBrand("Tod's")}>Tod's</li>
  <li onClick={()=>toggleBrand("Tom Ford")} className={isSelectedBrand("Tom Ford")}>Tom Ford</li>
  <li onClick={()=>toggleBrand("Tory Burch")} className={isSelectedBrand("Tory Burch")}>Tory Burch</li>
</ul>
<ul style={{transform:open3,height:open3==="translateX(-200%)"?0:'100%'}}>
  <li onClick={()=>toggleBrand("Valentino")} className={isSelectedBrand("Valentino")}>Valentino</li>
  <li onClick={()=>toggleBrand("Versace")} className={isSelectedBrand("Versace")}>Versace</li>
  <li onClick={()=>toggleBrand("Victoria's Secret")} className={isSelectedBrand("Victoria's Secret")}>Victoria's Secret</li>
  <li onClick={()=>toggleBrand("Yves Saint Laurent (YSL)")} className={isSelectedBrand("Yves Saint Laurent (YSL)")}>Yves Saint Laurent (YSL)</li>
  <li onClick={()=>toggleBrand("Zegna")} className={isSelectedBrand("Zegna")}>Zegna</li>
</ul>


          </div>
          <div className="size">
              <p onClick={set4}><span>Size - {selectedSizes?.length}</span><KeyboardArrowDownIcon className='icon1'/></p>
              <ul style={{transform:open4,height:open4==="translateX(-200%)"?0:'100%'}}>
              {uniqueSizesArray.map((size, index) => (
        <li key={index} onClick={()=>toggleSize(size)} className={isSelectedSize(size)}>{size}</li>
      ))}
              </ul>
          </div>
          <div className="color">
          <p onClick={set5}><span>Color - {selectedColors?.length}</span><KeyboardArrowDownIcon className='icon1'/></p>
<ul style={{transform:open5,height:open5==="translateX(-200%)"?0:'100%'}}>
  <li onClick={()=>toggleColor("black")} className={isSelectedColor("black")}></li>
  <li onClick={()=>toggleColor("white")} className={isSelectedColor("white")}></li>
  <li onClick={()=>toggleColor("red")} className={isSelectedColor("red")}></li>
  <li onClick={()=>toggleColor("blue")} className={isSelectedColor("blue")}></li>
  <li onClick={()=>toggleColor("pink")} className={isSelectedColor("pink")}></li>
  <li onClick={()=>toggleColor("orange")} className={isSelectedColor("orange")}></li>
  <li onClick={()=>toggleColor("yellow")} className={isSelectedColor("yellow")}></li>
  <li onClick={()=>toggleColor("green")} className={isSelectedColor("green")}></li>
  <li onClick={()=>toggleColor("wine")} className={isSelectedColor("wine")}></li>
  <li onClick={()=>toggleColor("grey")} className={isSelectedColor("grey")}></li>
  <li onClick={()=>toggleColor("brown")} className={isSelectedColor("brown")}></li>
  <li onClick={()=>toggleColor("purple")} className={isSelectedColor("purple")}></li>
  <li onClick={()=>toggleColor("violet")} className={isSelectedColor("violet")}></li>

</ul>
          </div>
          
        </div>
        </DialogContent>
        
      </Dialog>
                        </div>
                       
                     
                        <div className="sort">
                        <p onClick={toggleDrawer1(true)} style={{marginBottom:'0'}} className='s1'><SortByAlphaIcon/> <span className='spa'>Sort By</span></p>

                        <Dialog open={open6}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose1}
        aria-describedby="alert-dialog-slide-description">
          <DialogContent className='filt'>
            <p style={{textAlign:'center',fontWeight:'600'}}>Sort By</p>
            <div className="c-icon" onClick={handleClose1}><CloseIcon/></div>

  <p value="title" style={{border:sort==="title"?"1px solid blue":"",borderRadius:'10px',padding:'1px 5px'}} onClick={sortChange1}>Alphabet A-Z</p>
  <p value="-title" style={{border:sort==="-title"?"1px solid blue":"",borderRadius:'10px',padding:'1px 5px'}} onClick={sortChange2}>Alphabet Z-A</p>
  <p value="price" style={{border:sort==="price"?"1px solid blue":"",borderRadius:'10px',padding:'1px 5px'}} onClick={sortChange3}>Price Low to High</p>
  <p value="-price" style={{border:sort==="-price"?"1px solid blue":"",borderRadius:'10px',padding:'1px 5px'}} onClick={sortChange4}>Price High to Low</p>
  <p value="-createdAt" style={{border:sort==="-createdAt"?"1px solid blue":"",borderRadius:'10px',padding:'1px 5px'}} onClick={sortChange5}>New to Old</p>
          </DialogContent>

                            
                            </Dialog>
                        </div>
                    </div>
                    <div className="products-listing">
        <h1 className="section-heading p-headi">{collectionName || searchValue}</h1>
        {
          loading? <div className="skeleton">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        :
        <div className="product-list">

            {



                products?.products?.map((arm,index)=>{
                    return <Product keys={index} id={arm?._id} img={arm?.images} title={arm?.title} price={arm?.price} variants={arm?.variants} handle={arm?.handle} prdt={arm} alt={arm?.alt}/>    
                })
                
                    
            
}
      
        </div>
}



      </div>



                    <div className="pages">
                      {
                        loading===true? <CircularProgress/>:
                        <Stack spacing={2}>
    <Pagination
      count={products?.pagination?.totalPages}
      page={page}
      onChange={handlePageChange}

    />
  </Stack>
                       
        
                      }
                      
                    
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Products
