import React from 'react';
import { Link } from 'react-router-dom';

const SpecialOrders = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-primary text-white py-16">
        <div className="container-fluid">
          <h1 className="text-4xl font-bold mb-4">Special Orders</h1>
          <div className="flex items-center">
            <Link to="/" className="text-white hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <span>Special Orders</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-fluid py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-md rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-neutral-dark mb-6">Custom & Special Orders</h2>
            
            <div className="space-y-6">
              <p className="text-muted-foreground">
                Can't find what you're looking for in our regular inventory? Our Special Orders service allows you to request specific products that we don't typically carry. Whether it's a rare vintage wine, limited edition spirits, or international brands, we'll do our best to source it for you.
              </p>
              
              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-3">How Special Orders Work</h3>
                <ol className="list-decimal pl-6 text-muted-foreground space-y-2">
                  <li>Submit your request using our Special Order form below or contact our customer service team.</li>
                  <li>Our procurement team will research availability and pricing for your requested product.</li>
                  <li>We'll contact you with details including price, estimated delivery time, and any deposit requirements.</li>
                  <li>If you approve, we'll process your order and keep you updated on its status.</li>
                  <li>Once your special order arrives, we'll notify you for pickup or arrange delivery.</li>
                </ol>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-3">What We Can Source</h3>
                <ul className="list-disc pl-6 text-muted-foreground">
                  <li>Rare and limited edition spirits</li>
                  <li>Vintage wines</li>
                  <li>International brands not commonly available in Canada</li>
                  <li>Specialty craft beers</li>
                  <li>Large volume orders for events</li>
                  <li>Corporate gift packages</li>
                </ul>
              </div>
              
              <div className="bg-primary/5 p-4 rounded-md">
                <p className="text-muted-foreground italic">
                  Please note: Special orders may require a non-refundable deposit and longer delivery times. Not all products can be sourced due to import regulations or availability constraints.
                </p>
              </div>
            </div>
          </div>
          
          {/* Special Order Form */}
          <div className="bg-white shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-bold text-neutral-dark mb-6">Special Order Request Form</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-neutral-dark mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-neutral-dark mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-dark mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-neutral-dark mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label htmlFor="productName" className="block text-sm font-medium text-neutral-dark mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  required
                  placeholder="Be as specific as possible (brand, vintage, size, etc.)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-neutral-dark mb-1">
                  Quantity *
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label htmlFor="additionalInfo" className="block text-sm font-medium text-neutral-dark mb-1">
                  Additional Information
                </label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  rows="4"
                  placeholder="Any additional details that might help us source your product"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                ></textarea>
              </div>
              
              <div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 px-6 rounded-md hover:bg-primary-dark transition-colors font-medium"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Have questions about special orders? <Link to="/contact" className="text-primary hover:underline">Contact our customer service team</Link> for assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialOrders; 