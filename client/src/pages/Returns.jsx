import React from 'react';
import { Link } from 'react-router-dom';

const Returns = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-primary text-white py-16">
        <div className="container-fluid">
          <h1 className="text-4xl font-bold mb-4">Returns & Refunds</h1>
          <div className="flex items-center">
            <Link to="/" className="text-white hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <span>Returns & Refunds</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-fluid py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-md rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-neutral-dark mb-6">Return Policy</h2>
            
            <div className="space-y-6">
              <p className="text-muted-foreground">
                At Liquor Online, we want you to be completely satisfied with your purchase. We understand that sometimes a product may not meet your expectations or may arrive damaged. Our return policy is designed to address these situations fairly and efficiently.
              </p>
              
              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-3">Eligible Returns</h3>
                <p className="text-muted-foreground mb-2">
                  We accept returns for products that:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground">
                  <li>Have foreign material in the bottle</li>
                  <li>Are not fully filled (short-filled bottles)</li>
                  <li>Have a damaged cork or cap</li>
                  <li>Have part of the product missing from a sealed case</li>
                  <li>Are subject to a product recall</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-3">Return Process</h3>
                <p className="text-muted-foreground mb-2">
                  To initiate a return, please follow these steps:
                </p>
                <ol className="list-decimal pl-6 text-muted-foreground space-y-2">
                  <li>Contact our customer service team at <a href="mailto:admin@liquoronline.ca" className="text-primary hover:underline">admin@liquoronline.ca</a> or call 1-833-306-SELL (7355) within 7 days of receiving your order.</li>
                  <li>Provide your order number, the product(s) you wish to return, and the reason for the return.</li>
                  <li>Our team will review your request and provide instructions for returning the product.</li>
                  <li>Package the product securely in its original packaging if possible.</li>
                  <li>Ship the product back to us using the shipping method provided by our customer service team.</li>
                </ol>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-3">Refund Process</h3>
                <p className="text-muted-foreground mb-2">
                  Once we receive and inspect the returned product, we will process your refund as follows:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground">
                  <li>Full refunds are issued for all eligible returns.</li>
                  <li>Refunds will be processed to the original payment method used for the purchase.</li>
                  <li>Refund processing typically takes 3-5 business days, but may vary depending on your financial institution.</li>
                  <li>Shipping costs are refunded only if the return is due to our error (damaged product, incorrect product shipped, etc.).</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-3">Cancellations</h3>
                <p className="text-muted-foreground">
                  If you request a refund prior to the order being delivered, a 5% restocking fee will apply. Orders that have already been shipped cannot be cancelled and must follow the standard return process.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-3">Non-Returnable Items</h3>
                <p className="text-muted-foreground mb-2">
                  The following items cannot be returned:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground">
                  <li>Products that have been opened or consumed</li>
                  <li>Products returned more than 30 days after delivery</li>
                  <li>Products that show signs of misuse or abuse</li>
                  <li>Gift cards</li>
                  <li>Special order items (unless they arrive damaged)</li>
                </ul>
              </div>
              
              <div className="bg-primary/5 p-4 rounded-md">
                <p className="text-muted-foreground italic">
                  Please note: Provincial liquor laws may restrict certain types of returns. We comply with all applicable regulations regarding the return of alcoholic beverages.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-bold text-neutral-dark mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-neutral-dark mb-2">What if I receive the wrong product?</h3>
                <p className="text-muted-foreground">
                  If you receive a product that doesn't match what you ordered, please contact our customer service team immediately. We will arrange for the correct product to be shipped to you and provide instructions for returning the incorrect item at no cost to you.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-neutral-dark mb-2">Can I return a product if I simply don't like it?</h3>
                <p className="text-muted-foreground">
                  Due to the nature of alcoholic beverages and provincial regulations, we cannot accept returns based solely on personal preference. Returns are limited to the eligible reasons listed above.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-neutral-dark mb-2">How long do I have to initiate a return?</h3>
                <p className="text-muted-foreground">
                  You should contact us within 7 days of receiving your order to initiate a return. Products must be returned within 30 days of delivery to be eligible for a refund.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-neutral-dark mb-2">Do I have to pay for return shipping?</h3>
                <p className="text-muted-foreground">
                  If the return is due to our error (damaged product, incorrect product shipped, etc.), we will cover the cost of return shipping. If the return is for any other eligible reason, the customer is responsible for return shipping costs.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Have questions about our return policy? <Link to="/contact" className="text-primary hover:underline">Contact us</Link> for assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Returns; 