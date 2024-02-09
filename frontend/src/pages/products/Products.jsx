import React from 'react'
import banner from '../../images/A21.jpg'
import './product.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import img from '../../images/mens-premium-shirts.jpeg'
import img1 from '../../images/men-shirt2.jpeg'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {Link} from 'react-router-dom'
const Products = () => {
    

    return (
        <div className='Products'>
            <div className="product-banner">
                <img src={banner} alt="" />
            </div>
            <div className="products-box">
                <div className="filter">
                    <div className="category">
                        <p>Availability</p>
                        <ul>
                            <li><input type="checkbox" name="" id="" />In Stock</li>
                            <li><input type="checkbox" name="" id="" />Out of Stock</li>
                        </ul>
                    </div>
                    <div className="price">
                        <p>Price</p>
                        <ul>
                            <li>min:<input type="number" /></li>
                            <li>max:<input type="number" /></li>
                        </ul>


                    </div>
                    <div className="size">
                        <p>Size</p>
                        <ul>
                            <li><input type="checkbox" name="" id="" />30</li>
                            <li><input type="checkbox" name="" id="" />32</li>
                            <li><input type="checkbox" name="" id="" />34</li>
                            <li><input type="checkbox" name="" id="" />36</li>
                            <li><input type="checkbox" name="" id="" />38</li>
                            <li><input type="checkbox" name="" id="" />40</li>
                            <li><input type="checkbox" name="" id="" />42</li>
                        </ul>
                    </div>
                    <div className="color">
                        <p>Colour</p>
                        <ul>
                            <li><input type="checkbox" name="" id="" />30</li>
                            <li><input type="checkbox" name="" id="" />32</li>
                            <li><input type="checkbox" name="" id="" />34</li>
                            <li><input type="checkbox" name="" id="" />36</li>
                            <li><input type="checkbox" name="" id="" />38</li>
                            <li><input type="checkbox" name="" id="" />40</li>
                            <li><input type="checkbox" name="" id="" />42</li>
                        </ul>
                    </div>

                </div>
                <div className="products-page">
                    <div className="sorting">
                        <div className="filter">
                            <p>Filter</p>
                        </div>
                        <p style={{fontWeight:'bold'}}>1000 Products</p>
                        <div className="sort">
                            <select name="" id="" style={{fontWeight:'bold'}}>
                                <option value="">Best Selling</option>
                                <option value="">Featured</option>
                                <option value="">Price Low to High</option>
                                <option value="">Price High to Low</option>
                                <option value="">Old to New</option>
                                <option value="">New to Old</option>
                            </select>
                        </div>
                    </div>
                    <hr />
                    <div className="all-products">
                        <div className="product-card">
                            <Link to="/product">
                                <div>
                                <img src={img} alt="" />
                                <img src={img1} alt="" className='second-img'/>
                                <a href="" className='quick-add'>QUICK ADD</a>
                                </div>
                                <p className="title">Burberry White Premium Quality Shirt</p>
                                <p className="price">Rs. 1999</p>
                                
                            </Link>
                            <p className='wish-icon'><FavoriteIcon /></p>
                        </div>
                        <div className="product-card">
                            <Link to="/product">
                                <div>
                                <img src={img} alt="" />
                                <img src={img1} alt="" className='second-img'/>
                                <a href="" className='quick-add'>QUICK ADD</a>
                                </div>
                                <p className="title">Burberry White Premium Quality Shirt</p>
                                <p className="price">Rs. 1999</p>
                                
                            </Link>
                            <p className='wish-icon'><FavoriteIcon /></p>
                        </div>
                        <div className="product-card">
                            <Link to="/product">
                                <div>
                                <img src={img} alt="" />
                                <img src={img1} alt="" className='second-img'/>
                                <a href="" className='quick-add'>QUICK ADD</a>
                                </div>
                                <p className="title">Burberry White Premium Quality Shirt</p>
                                <p className="price">Rs. 1999</p>
                                
                            </Link>
                            <p className='wish-icon'><FavoriteIcon /></p>
                        </div>
                        <div className="product-card">
                            <Link to="/product">
                                <div>
                                <img src={img} alt="" />
                                <img src={img1} alt="" className='second-img'/>
                                <a href="" className='quick-add'>QUICK ADD</a>
                                </div>
                                <p className="title">Burberry White Premium Quality Shirt</p>
                                <p className="price">Rs. 1999</p>
                                
                            </Link>
                            <p className='wish-icon'><FavoriteIcon /></p>
                        </div>
                        <div className="product-card">
                            <Link to="/product">
                                <div>
                                <img src={img} alt="" />
                                <img src={img1} alt="" className='second-img'/>
                                <a href="" className='quick-add'>QUICK ADD</a>
                                </div>
                                <p className="title">Burberry White Premium Quality Shirt</p>
                                <p className="price">Rs. 1999</p>
                                
                            </Link>
                            <p className='wish-icon'><FavoriteIcon /></p>
                        </div>
                        <div className="product-card">
                            <Link to="/product">
                                <div>
                                <img src={img} alt="" />
                                <img src={img1} alt="" className='second-img'/>
                                <a href="" className='quick-add'>QUICK ADD</a>
                                </div>
                                <p className="title">Burberry White Premium Quality Shirt</p>
                                <p className="price">Rs. 1999</p>
                                
                            </Link>
                            <p className='wish-icon'><FavoriteIcon /></p>
                        </div>
                        <div className="product-card">
                            <Link to="/product">
                                <div>
                                <img src={img} alt="" />
                                <img src={img1} alt="" className='second-img'/>
                                <a href="" className='quick-add'>QUICK ADD</a>
                                </div>
                                <p className="title">Burberry White Premium Quality Shirt</p>
                                <p className="price">Rs. 1999</p>
                                
                            </Link>
                            <p className='wish-icon'><FavoriteIcon /></p>
                        </div>
                        <div className="product-card">
                            <Link to="/product">
                                <div>
                                <img src={img} alt="" />
                                <img src={img1} alt="" className='second-img'/>
                                <a href="" className='quick-add'>QUICK ADD</a>
                                </div>
                                <p className="title">Burberry White Premium Quality Shirt</p>
                                <p className="price">Rs. 1999</p>
                                
                            </Link>
                            <p className='wish-icon'><FavoriteIcon /></p>
                        </div>
                        <div className="product-card">
                            <Link to="/product">
                                <div>
                                <img src={img} alt="" />
                                <img src={img1} alt="" className='second-img'/>
                                <a href="" className='quick-add'>QUICK ADD</a>
                                </div>
                                <p className="title">Burberry White Premium Quality Shirt</p>
                                <p className="price">Rs. 1999</p>
                                
                            </Link>
                            <p className='wish-icon'><FavoriteIcon /></p>
                        </div>
                        <div className="product-card">
                            <Link to="/product">
                                <div>
                                <img src={img} alt="" />
                                <img src={img1} alt="" className='second-img'/>
                                <a href="" className='quick-add'>QUICK ADD</a>
                                </div>
                                <p className="title">Burberry White Premium Quality Shirt</p>
                                <p className="price">Rs. 1999</p>
                                
                            </Link>
                            <p className='wish-icon'><FavoriteIcon /></p>
                        </div>
                        <div className="product-card">
                            <Link to="/product">
                                <div>
                                <img src={img} alt="" />
                                <img src={img1} alt="" className='second-img'/>
                                <a href="" className='quick-add'>QUICK ADD</a>
                                </div>
                                <p className="title">Burberry White Premium Quality Shirt</p>
                                <p className="price">Rs. 1999</p>
                                
                            </Link>
                            <p className='wish-icon'><FavoriteIcon /></p>
                        </div>
                        <div className="product-card">
                            <Link to="/product">
                                <div>
                                <img src={img} alt="" />
                                <img src={img1} alt="" className='second-img'/>
                                <a href="" className='quick-add'>QUICK ADD</a>
                                </div>
                                <p className="title">Burberry White Premium Quality Shirt</p>
                                <p className="price">Rs. 1999</p>
                                
                            </Link>
                            <p className='wish-icon'><FavoriteIcon /></p>
                        </div>
                        <div className="product-card">
                            <Link to="/product">
                                <div>
                                <img src={img} alt="" />
                                <img src={img1} alt="" className='second-img'/>
                                <a href="" className='quick-add'>QUICK ADD</a>
                                </div>
                                <p className="title">Burberry White Premium Quality Shirt</p>
                                <p className="price">Rs. 1999</p>
                                
                            </Link>
                            <p className='wish-icon'><FavoriteIcon /></p>
                        </div>
                        <div className="product-card">
                            <Link to="/product">
                                <div>
                                <img src={img} alt="" />
                                <img src={img1} alt="" className='second-img'/>
                                <a href="" className='quick-add'>QUICK ADD</a>
                                </div>
                                <p className="title">Burberry White Premium Quality Shirt</p>
                                <p className="price">Rs. 1999</p>
                                
                            </Link>
                            <p className='wish-icon'><FavoriteIcon /></p>
                        </div>
                        <div className="product-card">
                            <Link to="/product">
                                <div>
                                <img src={img} alt="" />
                                <img src={img1} alt="" className='second-img'/>
                                <a href="" className='quick-add'>QUICK ADD</a>
                                </div>
                                <p className="title">Burberry White Premium Quality Shirt</p>
                                <p className="price">Rs. 1999</p>
                                
                            </Link>
                            <p className='wish-icon'><FavoriteIcon /></p>
                        </div>
                        <div className="product-card">
                            <Link to="/product">
                                <div>
                                <img src={img} alt="" />
                                <img src={img1} alt="" className='second-img'/>
                                <a href="" className='quick-add'>QUICK ADD</a>
                                </div>
                                <p className="title">Burberry White Premium Quality Shirt</p>
                                <p className="price">Rs. 1999</p>
                                
                            </Link>
                            <p className='wish-icon'><FavoriteIcon /></p>
                        </div>
                        <div className="product-card">
                            <Link to="/product">
                                <div>
                                <img src={img} alt="" />
                                <img src={img1} alt="" className='second-img'/>
                                <a href="" className='quick-add'>QUICK ADD</a>
                                </div>
                                <p className="title">Burberry White Premium Quality Shirt</p>
                                <p className="price">Rs. 1999</p>
                                
                            </Link>
                            <p className='wish-icon'><FavoriteIcon /></p>
                        </div>
                        <div className="product-card">
                            <Link to="/product">
                                <div>
                                <img src={img} alt="" />
                                <img src={img1} alt="" className='second-img'/>
                                <a href="" className='quick-add'>QUICK ADD</a>
                                </div>
                                <p className="title">Burberry White Premium Quality Shirt</p>
                                <p className="price">Rs. 1999</p>
                                
                            </Link>
                            <p className='wish-icon'><FavoriteIcon /></p>
                        </div>
                    </div>
                    <div className="pages">
                    <Stack spacing={2}>
      <Pagination count={10} />
    </Stack>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products
