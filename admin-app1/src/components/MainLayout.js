import React, { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBgColors,
} from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux'
import { RiCouponLine } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { ImBlog } from "react-icons/im";
import { IoIosNotifications } from "react-icons/io";
import { FaClipboardList, FaBloggerB } from "react-icons/fa";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { Header } from "antd/es/layout/layout";
import {getAProduct, getProducts} from '../features/product/productSlice'
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { getOrders} from "../features/auth/authSlice";
const {Sider, Content } = Layout;
const MainLayout = () => {
  const [paginate, setPaginate] = useState(true);
  const [productOpt,setProductOpt]=useState([])
  const [collapsed, setCollapsed] = useState(false);
  const [productId, setproductId] = useState("");
  const [timing,setTiming]=useState()
  const orderState = useSelector((state) => state?.auth?.orders.orders);



orderState?.map((item)=>{
  if(item.createdAt===timing){
    console.log("matched")
  }
})


  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const productState = useSelector((state) => state?.product?.products);
  const user = JSON.parse(localStorage.getItem('user'));
  const [imageIndex, setImageIndex] = useState(0);

  const handleImageError = () => {
    // Increment the image index to load the next image URL
    setImageIndex(prevIndex => prevIndex + 1);
  }; 
  useEffect(() => {
    let data = [];
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      // Extracting all relevant product details for search
      const imageUrl = element?.images[imageIndex]?.url;
      const details = `${element.sku} ${element.title} ${element.description}`;
      data.push({ id: index, prod: element?._id, details,imageUrl }); // Include all relevant details
    }
    setProductOpt(data);
  }, [productState]);

  return (
    <Layout /* onContextMenu={(e) => e.preventDefault()} */>
      <Sider
      className="bg-white"
       breakpoint="lg"
        collapsedWidth="300"
        onBreakpoint={(broken) => {
        }}
        onCollapse={(collapsed, type) => {
        }}
        trigger={null} collapsible collapsed={collapsed}
        
        >
        <div className="logo bg-white">
          <h2 className="text-black fs-5 text-center py-3 mb-0">
            <span className="sm-logo">VM</span>
            <span className="lg-logo">Voguemine</span>
          </h2>
        </div>
        <Menu
          theme="white"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key == "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-6" />,
              label: "Dashboard",
            },
            {
              key: "customers",
              icon: <AiOutlineUser className="fs-6" />,
              label: "Customers",
            },
            {
              key: "Products",
              icon: <AiOutlineShoppingCart className="fs-6" />,
              label: "Products",
              children: [
                {
                  key: "product",
                  icon: <AiOutlineShoppingCart className="fs-6" />,
                  label: "Product",
                },
                {
                  key: "list-collection",
                  icon: <SiBrandfolder className="fs-6" />,
                  label: "Collection",
                },
              ],
            },
            {
              key: "orders",
              icon: <FaClipboardList className="fs-6" />,
              label: "Orders",
            },
            {
              key: "marketing",
              icon: <RiCouponLine className="fs-6" />,
              label: "Marketing",
              children: [
                {
                  key: "coupon",
                  icon: <ImBlog className="fs-6" />,
                  label: "Add Coupon",
                },
                {
                  key: "coupon-list",
                  icon: <RiCouponLine className="fs-6" />,
                  label: "Coupon List",
                },
              ],
            },
            {
              key: "blogs",
              icon: <FaBloggerB className="fs-6" />,
              label: "Blogs",
              children: [
                {
                  key: "blog",
                  icon: <ImBlog className="fs-6" />,
                  label: "Add Blog",
                },
                {
                  key: "blog-list",
                  icon: <FaBloggerB className="fs-6" />,
                  label: "Blog List",
                },
                {
                  key: "blog-category",
                  icon: <ImBlog className="fs-6" />,
                  label: "Add Blog Category",
                },
                {
                  key: "blog-category-list",
                  icon: <FaBloggerB className="fs-6" />,
                  label: "Blog Category List",
                },
              ],
            },
            {
              key: "enquiries",
              icon: <FaClipboardList className="fs-6" />,
              label: "Enquiries",
            },
          ]}
        />
      </Sider> 
      <Layout className="site-layout">
        
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <Typeahead
        id="pagination-example"
        onPaginate={() => console.log('Results paginated')}
        onChange={(selected)=>{
          navigate(`/admin/product/${selected[0]?.prod}`)
          dispatch(getAProduct(selected[0]?.prod))
        }}
        minLength={2}
        options={productOpt}
        labelKey={"details"}
        paginate={paginate}
        placeholder="Search here"
        style={{width:'500px',height:'30px',marginTop:'10px'}}
        renderMenuItemChildren={(option) => (
          <div>
            <img src={option.imageUrl} alt="" style={{ width: '50px', height: '50px', marginRight: '10px' }} onError={handleImageError}/>
            <span>{option.details}</span>
          </div>
        )}
      />
          <div className="d-flex gap-4 align-items-center">
            <div className="position-relative">
              <IoIosNotifications className="fs-4" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div>

            <div className="d-flex gap-3 align-items-center dropdown">
              <div>
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  width={32}
                  height={32}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-EPpUybuj7WPyKO73vZKCbNBNuU6B8pyX4A&usqp=CAU"
                  alt=""
                />
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    View Profile
                  </Link>
                </li>
                <li className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    onClick={()=>{
                      localStorage.clear()
                      navigate("/")
                    }}>
                    
                  
                    Signout
                </li>
              </div>
              
                {/* <p className="mb-0">{user.email}</p> */}
              </div>
             
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "10px",
            padding: 2,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout> 
    </Layout>
  );
};
export default MainLayout;
