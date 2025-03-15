import React from 'react';
import { Link } from 'react-router-dom';

const Shipping = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-primary text-white py-16">
        <div className="container-fluid">
          <h1 className="text-4xl font-bold mb-4">Shipping & Delivery</h1>
          <div className="flex items-center">
            <Link to="/" className="text-white hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <span>Shipping & Delivery</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-fluid py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-md rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-neutral-dark mb-6">Shipping Information</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-3">Delivery Areas</h3>
                <p className="text-muted-foreground mb-2">
                  We currently offer shipping to the following provinces in Canada:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground">
                  <li>Alberta</li>
                  <li>British Columbia</li>
                  <li>Manitoba</li>
                  <li>Ontario</li>
                  <li>Saskatchewan</li>
                </ul>
                <p className="text-muted-foreground mt-2">
                  We are working to expand our shipping network to other provinces. Please check back for updates.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-3">Shipping Methods</h3>
                <p className="text-muted-foreground mb-2">
                  We offer the following shipping methods:
                </p>
                <div className="border rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Method
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Estimated Delivery
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Cost
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Standard Shipping
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          3-5 business days
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          $15.00
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Express Shipping
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          1-2 business days
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          $25.00
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Local Delivery (Red Deer)
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Same day (orders before 2 PM)
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          $10.00
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          In-Store Pickup
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Ready in 1 hour
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Free
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-3">Free Shipping</h3>
                <p className="text-muted-foreground">
                  Orders over $150 qualify for free standard shipping within Alberta. Free shipping does not apply to express shipping or local delivery.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-3">Delivery Times</h3>
                <p className="text-muted-foreground mb-2">
                  Delivery times are estimates and are not guaranteed. Factors that may affect delivery times include:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground">
                  <li>Weather conditions</li>
                  <li>Remote locations</li>
                  <li>High volume periods (holidays, special events)</li>
                  <li>Carrier delays</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-3">Shipping Restrictions</h3>
                <p className="text-muted-foreground mb-2">
                  Please note the following restrictions:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground">
                  <li>We cannot ship to P.O. boxes</li>
                  <li>An adult 18 years or older must be present to sign for the delivery</li>
                  <li>We reserve the right to limit quantities for shipping</li>
                  <li>Some remote locations may incur additional shipping fees</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-bold text-neutral-dark mb-6">Tracking Your Order</h2>
            
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Once your order has been shipped, you will receive a confirmation email with tracking information. You can also track your order by:
              </p>
              
              <ul className="list-disc pl-6 text-muted-foreground">
                <li>Logging into your account and viewing your order history</li>
                <li>Contacting our customer service team at <a href="mailto:admin@liquoronline.ca" className="text-primary hover:underline">admin@liquoronline.ca</a></li>
                <li>Calling us at 1-833-306-SELL (7355)</li>
              </ul>
              
              <div className="mt-6">
                <Link 
                  to="/track-order" 
                  className="inline-block bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dark transition-colors font-medium"
                >
                  Track Your Order
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Have questions about shipping or delivery? <Link to="/contact" className="text-primary hover:underline">Contact us</Link> for assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping; 