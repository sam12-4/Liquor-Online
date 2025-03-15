import React from 'react';
import { Link } from 'react-router-dom';

const ContactFaq = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-primary text-white py-16">
        <div className="container-fluid">
          <h1 className="text-4xl font-bold mb-4">Contact & FAQ</h1>
          <div className="flex items-center">
            <Link to="/" className="text-white hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <span>Contact & FAQ</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-fluid py-16">
        <div className="max-w-4xl mx-auto">
          {/* FAQ Section */}
          <div className="bg-white shadow-md rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-neutral-dark mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-neutral-dark mb-2">How do I place an order?</h3>
                <p className="text-muted-foreground">
                  Browse our products, add items to your cart, and proceed to checkout. You'll need to create an account or log in to complete your purchase. Follow the checkout steps to provide shipping and payment information.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-neutral-dark mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">
                  We accept Visa, Mastercard, American Express, Apple Pay, Google Pay, and e-transfers. All transactions are secure and encrypted.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-neutral-dark mb-2">How long will it take to receive my order?</h3>
                <p className="text-muted-foreground">
                  Delivery times vary depending on your location and the shipping method selected. Standard shipping typically takes 3-5 business days, while express shipping is 1-2 business days. Local delivery in Red Deer is available same-day for orders placed before 2 PM.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-neutral-dark mb-2">Do you ship to all provinces in Canada?</h3>
                <p className="text-muted-foreground">
                  We currently ship to Alberta, British Columbia, Manitoba, Ontario, and Saskatchewan. We're working to expand our shipping network to other provinces.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-neutral-dark mb-2">What is your return policy?</h3>
                <p className="text-muted-foreground">
                  We accept returns for products that have foreign material in the bottle, are not fully filled, have a damaged cork or cap, have part of the product missing from a sealed case, or are subject to a product recall. Please see our <Link to="/returns" className="text-primary hover:underline">Returns & Refunds</Link> page for more details.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-neutral-dark mb-2">Do you offer free shipping?</h3>
                <p className="text-muted-foreground">
                  Yes, orders over $150 qualify for free standard shipping within Alberta. Free shipping does not apply to express shipping or local delivery.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-neutral-dark mb-2">How do I track my order?</h3>
                <p className="text-muted-foreground">
                  Once your order has been shipped, you'll receive a confirmation email with tracking information. You can also track your order by logging into your account and viewing your order history.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-neutral-dark mb-2">Can I change or cancel my order?</h3>
                <p className="text-muted-foreground">
                  You can request changes or cancellations by contacting our customer service team as soon as possible. Once an order has been shipped, it cannot be cancelled and must follow the standard return process.
                </p>
              </div>
            </div>
          </div>
          
          {/* Contact Section */}
          <div className="bg-white shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-bold text-neutral-dark mb-6">Contact Us</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-4">Get In Touch</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-neutral-dark">Head Office:</p>
                    <p className="text-muted-foreground">
                      4808 50 St.,<br />
                      Red Deer, AB<br />
                      Canada T4N 1X5
                    </p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-neutral-dark">Phone:</p>
                    <p className="text-muted-foreground">1-833-306-SELL (7355)</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-neutral-dark">Email:</p>
                    <p className="text-muted-foreground">
                      <a href="mailto:admin@liquoronline.ca" className="text-primary hover:underline">admin@liquoronline.ca</a>
                    </p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-neutral-dark">Business Hours:</p>
                    <div className="grid grid-cols-2 gap-2 text-muted-foreground">
                      <div>Monday - Friday</div>
                      <div>9:00 AM - 5:00 PM</div>
                      <div>Saturday</div>
                      <div>10:00 AM - 4:00 PM</div>
                      <div>Sunday</div>
                      <div>Closed</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-4">Send Us a Message</h3>
                <p className="text-muted-foreground mb-4">
                  Have a question or need assistance? Fill out the form on our <Link to="/contact" className="text-primary hover:underline">Contact Page</Link> and we'll get back to you as soon as possible.
                </p>
                
                <Link 
                  to="/contact" 
                  className="inline-block bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dark transition-colors font-medium"
                >
                  Go to Contact Page
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactFaq; 