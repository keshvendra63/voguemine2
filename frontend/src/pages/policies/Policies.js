import React from 'react'
import './policy.css'
import {useLocation} from 'react-router-dom'
const Policies = () => {
  const location=useLocation()
  return (
    <div className='policies'>
         <div className="category-banner">
        <img src="https://res.cloudinary.com/dqh6bd766/image/upload/v1710505435/a35_qhi2xg.jpg" alt="" />
      </div>
      {
        location.pathname==="/pages/shipping-policy"?
<div className="margin-section">
          <p className="policy-heading">
            Shipping Policy
          </p>
          <p className="policy">
<p>          At Vogue Mine, we strive to provide our customers with the best possible shopping experience. That's why we offer fast and reliable shipping worldwide.
</p>
<p>All orders are processed within 1-2 business days and are shipped via a trackable method. Delivery times may vary depending on your location, but most orders will arrive within 3-5 business days for domestic orders and 7-14 business days for international orders.
</p>
<p>Please note that customs fees and duties may apply for international orders and are the responsibility of the customer. Vogue Mine is not responsible for any delays caused by customs processing.
</p>
<p>In the event that your order is lost or damaged during shipping, please contact us immediately and we will do our best to resolve the issue.
</p>
<p>Thank you for shopping with Vogue Mine. If you have any questions or concerns, please don't hesitate to contact us.
</p>          </p>
      </div>
      :
      location.pathname==="/pages/refund-and-return-policy"?
      <div className="margin-section">
          <p className="policy-heading">
            Refund and Return Policy
          </p>
          <p className="policy">
<p>         At Vogue Mine, customer satisfaction is our top priority. If you are not completely satisfied with your purchase, please contact us within 7 days of receiving your order to make arrangements for a replacement.
</p>
<p>We do not offer refunds under any circumstances. In the event that you receive a defective product, we will make arrangements for a replacement at no additional cost to you. If we are unable to offer a replacement, we will issue a store credit or refund at our discretion.
</p>
<p>All returns must be authorized by Vogue Mine and must be returned in their original, unused condition with all tags and packaging intact. Any unauthorized returns or items that are not in their original condition will not be accepted and will be returned to the sender at their expense.
</p>
<p>We reserve the right to refuse any return or exchange at any time.
</p>
<p>Thank you for shopping with Vogue Mine. If you have any questions or concerns, please don't hesitate to contact us.
</p>          </p>
      </div>
      :
      location.pathname==="/pages/terms-of-service"?
      <div className="margin-section">
          <p className="policy-heading">
            Terms of Service
          </p>
          <p className="policy">
<p>          At Vogue Mine, we strive to provide our customers with the best possible shopping experience. That's why we offer fast and reliable shipping worldwide.
</p>
<p>All orders are processed within 1-2 business days and are shipped via a trackable method. Delivery times may vary depending on your location, but most orders will arrive within 3-5 business days for domestic orders and 7-14 business days for international orders.
</p>
<p>Please note that customs fees and duties may apply for international orders and are the responsibility of the customer. Vogue Mine is not responsible for any delays caused by customs processing.
</p>
<p>In the event that your order is lost or damaged during shipping, please contact us immediately and we will do our best to resolve the issue.
</p>
<p>Thank you for shopping with Vogue Mine. If you have any questions or concerns, please don't hesitate to contact us.
</p>          </p>
      </div>
      :
      <div className="margin-section">
          <p className="policy-heading">
            Privacy Policy
          </p>
          <p className="policy">
<p>          At Vogue Mine, we strive to provide our customers with the best possible shopping experience. That's why we offer fast and reliable shipping worldwide.
</p>
<p>All orders are processed within 1-2 business days and are shipped via a trackable method. Delivery times may vary depending on your location, but most orders will arrive within 3-5 business days for domestic orders and 7-14 business days for international orders.
</p>
<p>Please note that customs fees and duties may apply for international orders and are the responsibility of the customer. Vogue Mine is not responsible for any delays caused by customs processing.
</p>
<p>In the event that your order is lost or damaged during shipping, please contact us immediately and we will do our best to resolve the issue.
</p>
<p>Thank you for shopping with Vogue Mine. If you have any questions or concerns, please don't hesitate to contact us.
</p>          </p>
      </div>
      }
      
    </div>
  )
}

export default Policies
