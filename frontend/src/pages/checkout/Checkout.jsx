import React from 'react'
import './checkout.css'
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import AddCardIcon from '@mui/icons-material/AddCard';
import img from '../../images/mens-premium-shirts.jpeg'
const Checkout = () => {
    return (
        <div className='margin-section checkout'>
            <div className="left-form">
                <p className='section-heading'>Contact</p>
                <form action="">
                    <div className="email input">
                        <TextField
                            id="email"
                            label="Email"
                            type="email"
                        />
                    </div>
                    <p className="section-heading">Delivery</p>
                    <div className="name input">
                        <TextField
                            id="firstname"
                            label="First Name"
                            type="text"
                        />                    
                    <TextField
                            id="lastname"
                            label="Last Name"
                            type="text"
                        />  
                    </div>
                    <div className="address input">
                    <TextField
                            id="address"
                            label="Address"
                            type="text"
                        /> 
                    </div>
                    <div className="city input">
                    <TextField
                            id="city"
                            label="City"
                            type="text"
                        /> 
                        <select name="statelist" placeholder="State">
                            <option value="">State</option>
                            <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                            <option value="Assam">Assam</option>
                            <option value="Bihar">Bihar</option>
                            <option value="Chandigarh">Chandigarh</option>
                            <option value="Chhattisgarh">Chhattisgarh</option>
                            <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                            <option value="Daman and Diu">Daman and Diu</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Goa">Goa</option>
                            <option value="Gujarat">Gujarat</option>
                            <option value="Haryana">Haryana</option>
                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                            <option value="Jharkhand">Jharkhand</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Lakshadweep">Lakshadweep</option>
                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Manipur">Manipur</option>
                            <option value="Meghalaya">Meghalaya</option>
                            <option value="Mizoram">Mizoram</option>
                            <option value="Nagaland">Nagaland</option>
                            <option value="Orissa">Orissa</option>
                            <option value="Pondicherry">Pondicherry</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="Sikkim">Sikkim</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Tripura">Tripura</option>
                            <option value="Uttaranchal">Uttaranchal</option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                            <option value="West Bengal">West Bengal</option>
                        </select>
                        <TextField
                            id="pincode"
                            label="Pin Code"
                            type="number"
                        /> 
                    </div>
                    <div className="mobile input">
                    <TextField
                            id="mobile"
                            label="Phone"
                            type="number"
                        /> 
                    </div>
                    <div className="alter-mobile input">
                    <TextField
                            id="mobile2"
                            label="Alternative Phone"
                            type="number"
                        /> 
                    </div>
                    <div className="payment" style={{margin:'50px 0'}}>
                        <p className="section-heading">Payment</p>
                    <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <div className="razorpay">
            <div className="up">
            <FormControlLabel value="razorpay" control={<Radio />} label="Razorpay Secure (UPI, Cards, Wallets, NetBanking)" />
            <img src="https://axwon.com/wp-content/uploads/2021/03/Footer-payment-icons-1-1536x242-1.png" alt="" />
            </div>
            <div className="bottom">
                <AddCardIcon style={{fontSize:'80px'}}/>
                <p>After clicking “Pay now”, you will be redirected to Razorpay Secure (UPI, Cards, Wallets, NetBanking) to complete your purchase securely.</p>
            </div>
        </div>
        <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery (Rs. 200)" />
      </RadioGroup>
                    </div>
                    <input type="submit" value="Pay Now" className='pay'/>
                </form>
            </div>
            <div className="right-form">
                <div className="prdt">
                    <div className="detail">
                        <img src={img} alt="" />
                        <div><p className="p-name">Men's Premium quality Burberry Shirt white</p>
                        <p className="size"><span>S 23-24</span><span>/</span><span>Purple</span></p></div>
                    </div>
                    <p className="p-price">&#8377; 1999</p>
                </div>
                <div className="coupon">
                <TextField
                            id="coupon"
                            label="Coupon Code"
                            type="text"
                        />
                        <button>APPLY</button>
                </div>
                <div className="total">
                    <ul>
                        <li>Subtotal</li>
                        <li>Shipping</li>
                        <li>Discount</li>
                        <li style={{fontSize:'20px',fontWeight:600}}>Total</li>
                    </ul>
                    <ul>
                        <li>&#8377; 19999</li>
                        <li>&#8377; 1000</li>
                        <li>&#8377; 19999</li>
                        <li style={{fontSize:'20px',fontWeight:600}}>&#8377; 188888</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Checkout
