import React from 'react';
import { Link } from 'react-router-dom';

const PrivateCommercial = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-primary text-white py-16">
        <div className="container-fluid">
          <h1 className="text-4xl font-bold mb-4">Private & Commercial Services</h1>
          <div className="flex items-center">
            <Link to="/" className="text-white hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <span>Private & Commercial</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-fluid py-16">
        <div className="max-w-4xl mx-auto">
          {/* Private Functions Section */}
          <div className="bg-white shadow-md rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-neutral-dark mb-6">Private Functions</h2>
            
            <div className="space-y-6">
              <p className="text-muted-foreground">
                Planning a special event? Whether it's a wedding, corporate gathering, birthday celebration, or holiday party, our Private Functions service provides everything you need to make your event memorable.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-dark mb-3">Our Private Event Services</h3>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Customized beverage packages tailored to your event</li>
                    <li>Expert recommendations based on your menu and preferences</li>
                    <li>Quantity planning to ensure you have the right amount</li>
                    <li>Glassware rental options</li>
                    <li>Delivery and setup services</li>
                    <li>Bar staff and service professionals (upon request)</li>
                    <li>Consignment options for unused products (where permitted by law)</li>
                  </ul>
                </div>
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80" 
                    alt="Private event with drinks" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-3">Types of Events We Serve</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-primary/5 p-4 rounded-md text-center">
                    <span className="font-medium text-neutral-dark">Weddings</span>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-md text-center">
                    <span className="font-medium text-neutral-dark">Corporate Events</span>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-md text-center">
                    <span className="font-medium text-neutral-dark">Birthday Parties</span>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-md text-center">
                    <span className="font-medium text-neutral-dark">Holiday Celebrations</span>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-md text-center">
                    <span className="font-medium text-neutral-dark">Fundraisers</span>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-md text-center">
                    <span className="font-medium text-neutral-dark">Private Dinners</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Link 
                  to="/contact" 
                  className="inline-block bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dark transition-colors font-medium"
                >
                  Inquire About Private Events
                </Link>
              </div>
            </div>
          </div>
          
          {/* Commercial Services Section */}
          <div className="bg-white shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-bold text-neutral-dark mb-6">Commercial Services</h2>
            
            <div className="space-y-6">
              <p className="text-muted-foreground">
                We provide specialized services for businesses in the hospitality and retail industries. Our commercial services are designed to help your business thrive with reliable supply, competitive pricing, and expert support.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80" 
                    alt="Commercial bar setup" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-neutral-dark mb-3">Commercial Offerings</h3>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Wholesale pricing for qualified businesses</li>
                    <li>Regular delivery schedules</li>
                    <li>Inventory management assistance</li>
                    <li>Menu development consultation</li>
                    <li>Staff training on product knowledge</li>
                    <li>Special order capabilities for unique products</li>
                    <li>Flexible payment terms for established accounts</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-3">Industries We Serve</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-primary/5 p-4 rounded-md text-center">
                    <span className="font-medium text-neutral-dark">Restaurants</span>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-md text-center">
                    <span className="font-medium text-neutral-dark">Bars & Pubs</span>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-md text-center">
                    <span className="font-medium text-neutral-dark">Hotels</span>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-md text-center">
                    <span className="font-medium text-neutral-dark">Catering Companies</span>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-md text-center">
                    <span className="font-medium text-neutral-dark">Event Venues</span>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-md text-center">
                    <span className="font-medium text-neutral-dark">Retail Stores</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-primary/5 p-4 rounded-md">
                <p className="text-muted-foreground italic">
                  To qualify for our commercial services, businesses must provide appropriate licensing and documentation. Please contact our commercial team for more information.
                </p>
              </div>
              
              <div className="mt-6">
                <Link 
                  to="/contact" 
                  className="inline-block bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dark transition-colors font-medium"
                >
                  Contact Commercial Services
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Have questions about our private or commercial services? <Link to="/contact" className="text-primary hover:underline">Contact us</Link> for assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateCommercial; 