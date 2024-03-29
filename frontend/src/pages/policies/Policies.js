import React from 'react'
import './policy.css'
import {useLocation,Link} from 'react-router-dom'
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
<p>          At Voguemine, we strive to provide our customers with the best possible shopping experience. That's why we offer fast and reliable shipping worldwide.

</p>
<p style={{fontWeight:600}}>Order Processing:

</p>
<p>1. All orders are processed within 1-2 business days

</p>
<p>2. All the orders are delivered within 2-5 Business days

</p>
<p style={{fontWeight:600}}>COD Orders Processing:

</p>      
<p>1. After Placing a COD order, you will receive a WhatsApp text to confirm your order
</p>    
<p>2. You will also receive a call from our order processing department to confirm your location</p>
<p>In the event that your order is lost or damaged during shipping, please contact us immediately and we will do our best to resolve the issue.
</p>
<p>Thank you for shopping with Voguemine. If you have any questions or concerns, please don't hesitate to <Link to="/pages/contact" style={{fontWeight:600}}>contact us.</Link></p>
</p>
      </div>
      :
      location.pathname==="/pages/refund-and-return-policy"?
      <div className="margin-section">
          <p className="policy-heading">
            Refund and Return Policy
          </p>
          <p className="policy">
<p>         At Voguemine, customer satisfaction is our top priority. If you are not completely satisfied with your purchase, please contact us within 7 days of receiving your order to make arrangements for a replacement.
</p>
<p>We do not offer refunds under any circumstances. In the event that you receive a defective product, we will make arrangements for a replacement at no additional cost to you. If we are unable to offer a replacement, we will issue a store credit or refund at our discretion.
</p>
<p>All returns must be authorized by Voguemine and must be returned in their original, unused condition with all tags and packaging intact. Any unauthorized returns or items that are not in their original condition will not be accepted and will be returned to the sender at their expense.
</p>
<p>We reserve the right to refuse any return or exchange at any time.
</p>
<p>Thank you for shopping with Voguemine. If you have any questions or concerns, please don't hesitate to contact us.
</p>          </p>
      </div>
      :
      location.pathname==="/pages/terms-of-service"?
      <div className="margin-section">
          <p className="policy-heading">
            Terms of Service
          </p>
          <p className="policy">
            <p>Welcome to Voguemine, your go-to destination for the latest in fashion. Please read these terms and conditions carefully before using our website, <Link to="https://www.voguemine.com/">www.voguemine.com</Link>, and any associated services. By accessing or using our website, you agree to comply with and be bound by these terms. If you do not agree with any part of these terms, please do not use our website.</p>
 <p style={{fontWeight:600}}>1. Acceptance of Terms
</p>
<p>By accessing or using Voguemine, you agree to be bound by these terms and conditions, which constitute a legally binding agreement between you and Voguemine. These terms apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.</p>
<p style={{fontWeight:600}}>2. Online Store Terms
</p>
<p>2.1. By agreeing to these terms, you confirm that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.
</p>
<p>2.2. You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).</p>
<p>2.3. You must not transmit any worms or viruses or any code of a destructive nature.
</p>
<p>2.4. A breach or violation of any of the terms will result in an immediate termination of your services.</p>
<p style={{fontWeight:600}}>3. Personal Information
</p>
<p>3.1. Your submission of personal information through the store is governed by our Privacy Policy. View our Privacy Policy here.
</p>
<p style={{fontWeight:600}}>4. Accuracy, Completeness, and Timeliness of Information
</p>
<p>4.1. We are not responsible if information made available on this site is not accurate, complete, or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete, or more timely sources of information.
</p>
<p style={{fontWeight:600}}>5. Modifications to the Service and Prices
</p>
<p>5.1. Prices for our products are subject to change without notice.
</p>
<p>5.2. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.
</p>
<p style={{fontWeight:600}}>6. Governing Law
</p>
<p>6.1. These terms and conditions are governed by and construed in accordance with the laws of India. Any dispute arising out of or in connection with these terms and conditions shall be subject to the exclusive jurisdiction of the Indian courts.</p>
<p style={{fontWeight:600}}>7. Contact Information
</p>
<p>If you have any questions about these terms and conditions,
please contact us at <Link to="mailto:info@voguemine.com">info@voguemine.com</Link> and <Link to="tel:+919811363736">+91 9811363736</Link></p>
 </p>
      </div>
      :
      <div className="margin-section">
          <p className="policy-heading">
            Privacy Policy
          </p>
          <p className="policy">
            <p style={{fontWeight:600}}>SECTION 1 – WHAT DO WE DO WITH YOUR INFORMATION?

</p>
<p>When you purchase something from our store, as part of the buying and selling process, we collect the personal information you give us such as your name, address and email address.
When you browse our store, we also automatically receive your computer’s internet protocol (IP) address in order to provide us with information that helps us learn about your browser and operating system. Email marketing (if applicable): With your permission, we may send you emails about our store, new products and other updates.</p>
<p style={{fontWeight:600}}>SECTION 2 – CONSENT

</p>
<p>When you provide us with personal information to complete a transaction, verify your credit card, place an order, arrange for a delivery, we imply that you consent to our collecting it and using it for that specific reason only.
If we ask for your personal information for a secondary reason, like marketing, we will either ask you directly for your expressed consent, or provide you with an opportunity to say no.</p>
<p>If after you opt-in, you change your mind, you may withdraw your consent for us to contact you, for the continued collection, use or disclosure of your information, at any time, by Contacting us at <Link to="mailto:info@voguemine.com">info@voguemine.com</Link></p>
<p style={{fontWeight:600}}>SECTION 3 – DISCLOSURE

</p>
<p>We may disclose your personal information if we are required by law to do so or if you violate our Terms of Service.

</p>
<p style={{fontWeight:600}}>SECTION 4 – THIRD-PARTY SERVICES

</p>
<p>In general, the third-party providers used by us will only collect, use and disclose your information to the extent necessary to allow them to perform the services they provide to us.

However, certain third-party service providers, such as payment gateways and other payment transaction processors, have their own privacy policies in respect to the information we are required to provide to them for your purchase-related transactions.
For these providers, we recommend that you read their privacy policies so you can understand the manner in which your personal information will be handled by these providers.
In particular, remember that certain providers may be located in or have facilities that are located a different jurisdiction than either you or us. So if you elect to proceed with a transaction that involves the services of a third-party service provider, then your information may become subject to the laws of the jurisdiction(s) in which that service provider or its facilities are located.

As an example, if you are located in Canada and your transaction is processed by a payment gateway located in the United States, then your personal information used in completing that transaction may be subject to disclosure under United States legislation, including the Patriot Act.

Once you leave our store’s website or are redirected to a third-party website or application, you are no longer governed by this Privacy Policy or our website’s Terms of Service.</p>
<p style={{fontWeight:600}}>SECTION 5 – SECURITY

</p>
<p>To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed.

If you provide us with your credit card information, the information is encrypted using secure socket layer technology (SSL) and stored with a AES-256 encryption. Although no method of transmission over the Internet or electronic storage is 100% secure, we follow all PCI-DSS requirements and implement additional generally accepted industry standards.</p>
<p style={{fontWeight:600}}>SECTION 6 – COOKIES

</p>
<p>Here is a list of cookies that we use. We’ve listed them here so you that you can choose if you want to opt-out of cookies or not.

_session_id, unique token, sessional, Allows Shopify to store information about your session (referrer, landing page, etc.).

_shopify_visit, no data held, Persistent for 30 minutes from the last visit, Used by our website provider’s internal stats tracker to record the number of visits.

_shopify_uniq, no data held, expires midnight (relative to the visitor) of the next day, Counts the number of visits to a store by a single customer.

Cart, unique token, persistent for 2 weeks, Stores information about the contents of your cart.

_secure_session_id, unique token, sessional storefront digest, unique token, indefinite If the shop has a password, this is used to determine if the current visitor has access.</p>
<p style={{fontWeight:600}}>SECTION 7 – AGE OF CONSENT

</p>
<p>By using this site, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.</p>
<p style={{fontWeight:600}}>SECTION 8 – CHANGES TO THIS PRIVACY POLICY

</p>
<p>We reserve the right to modify this privacy policy at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the website. If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it. If our store is acquired or merged with another company, your information may be transferred to the new owners so that we may continue to sell products to you.</p>
<p style={{fontWeight:600}}>QUESTIONS AND CONTACT INFORMATION

</p>
<p>If you would like to: access, correct, amend or delete any personal information we have about you, register a complaint, or simply want more information contact our Privacy Compliance Officer at
<Link to="mailto:info@voguemine.com">info@voguemine.com</Link>

</p>
 </p>
      </div>
      }
      
    </div>
  )
}

export default Policies
