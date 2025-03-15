import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FreeDraw = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    agreeTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    alert('Thank you for entering the draw! Good luck!');
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-primary text-white py-16">
        <div className="container-fluid">
          <h1 className="text-4xl font-bold mb-4">2024 Free Draw</h1>
          <div className="flex items-center">
            <Link to="/" className="text-white hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <span>Free Draw 2024</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-fluid py-16">
        <div className="max-w-4xl mx-auto">
          {/* Prize Information */}
          <div className="bg-white shadow-md rounded-lg p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-neutral-dark mb-6">Win a Premium Spirits Package!</h2>
                <p className="text-muted-foreground mb-4">
                  Enter our free draw for a chance to win an exclusive collection of premium spirits valued at over $500!
                </p>
                <p className="text-muted-foreground mb-4">
                  Our 2024 prize package includes:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>1 bottle of Macallan 12 Year Old Single Malt Scotch</li>
                  <li>1 bottle of Grey Goose Vodka</li>
                  <li>1 bottle of Don Julio Reposado Tequila</li>
                  <li>1 bottle of Hennessy XO Cognac</li>
                  <li>2 premium crystal tumblers</li>
                </ul>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1569529465841-dfecdab7503b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                  alt="Premium spirits collection" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Entry Form */}
          <div className="bg-white shadow-md rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-neutral-dark mb-6">Enter the Draw</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-neutral-dark mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
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
                    value={formData.lastName}
                    onChange={handleChange}
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
                  value={formData.email}
                  onChange={handleChange}
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
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  id="agreeTerms"
                  name="agreeTerms"
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  required
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="agreeTerms" className="ml-2 block text-sm text-neutral-dark">
                  I agree to the <a href="#" className="text-primary hover:underline">Terms and Conditions</a> and confirm I am 18 years or older.
                </label>
              </div>
              
              <div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 px-6 rounded-md hover:bg-primary-dark transition-colors font-medium"
                >
                  Enter the Draw
                </button>
              </div>
            </form>
          </div>
          
          {/* Rules and Information */}
          <div className="bg-white shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-bold text-neutral-dark mb-6">Contest Rules</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-3">Eligibility</h3>
                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                  <li>Must be a resident of Alberta, Canada</li>
                  <li>Must be 18 years of age or older</li>
                  <li>Employees of Liquor Online and their immediate family members are not eligible</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-3">Entry Period</h3>
                <p className="text-muted-foreground">
                  The contest begins on January 1, 2024, and ends on December 31, 2024, at 11:59 PM MST.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-3">Winner Selection</h3>
                <p className="text-muted-foreground">
                  The winner will be selected by random draw on January 15, 2025. The winner will be notified by email and phone within 7 days of the draw.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-3">Prize Claim</h3>
                <p className="text-muted-foreground">
                  The winner must claim their prize within 30 days of notification. Photo ID will be required to verify age and identity when claiming the prize.
                </p>
              </div>
              
              <div className="bg-primary/5 p-4 rounded-md">
                <p className="text-muted-foreground italic">
                  This contest is subject to all applicable federal, provincial, and local laws and regulations. Void where prohibited.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Have questions about the free draw? <Link to="/contact" className="text-primary hover:underline">Contact us</Link> for assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeDraw; 