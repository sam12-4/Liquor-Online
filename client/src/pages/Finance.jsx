import React from 'react';
import { Link } from 'react-router-dom';

const Finance = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-primary text-white py-16">
        <div className="container-fluid">
          <h1 className="text-4xl font-bold mb-4">Interest Free Finance</h1>
          <div className="flex items-center">
            <Link to="/" className="text-white hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <span>Interest Free Finance</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-fluid py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-md rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-neutral-dark mb-6">Flexible Payment Options</h2>
            
            <div className="space-y-6">
              <p className="text-muted-foreground">
                At Liquor Online, we understand that purchasing premium spirits and wines can sometimes be a significant investment. That's why we offer flexible payment options to help you manage your purchases more effectively.
              </p>
              
              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-3">Buy Now, Pay Later</h3>
                <p className="text-muted-foreground mb-4">
                  We've partnered with leading payment providers to offer you interest-free installment options on qualifying purchases.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="border rounded-lg p-6 text-center">
                    <img 
                      src="https://web-assets.same.dev/2392223567/4134181266.webp" 
                      alt="Afterpay" 
                      className="h-8 mx-auto mb-4"
                    />
                    <h4 className="font-medium text-neutral-dark mb-2">Afterpay</h4>
                    <p className="text-sm text-muted-foreground">
                      Split your purchase into 4 interest-free payments over 6 weeks.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-6 text-center">
                    <img 
                      src="https://web-assets.same.dev/2392223567/4134181266.webp" 
                      alt="Klarna" 
                      className="h-8 mx-auto mb-4"
                    />
                    <h4 className="font-medium text-neutral-dark mb-2">Klarna</h4>
                    <p className="text-sm text-muted-foreground">
                      Pay in 3 interest-free installments or pay in 30 days.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-6 text-center">
                    <img 
                      src="https://web-assets.same.dev/2392223567/4134181266.webp" 
                      alt="PayPal" 
                      className="h-8 mx-auto mb-4"
                    />
                    <h4 className="font-medium text-neutral-dark mb-2">PayPal Pay in 4</h4>
                    <p className="text-sm text-muted-foreground">
                      Split your purchase into 4 interest-free payments over 6 weeks.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-3">How It Works</h3>
                <ol className="list-decimal pl-6 text-muted-foreground space-y-2">
                  <li>Shop as usual and add items to your cart.</li>
                  <li>At checkout, select your preferred payment option.</li>
                  <li>Complete a quick application with the payment provider.</li>
                  <li>If approved, confirm your payment plan.</li>
                  <li>Pay your installments according to the schedule.</li>
                </ol>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-3">Eligibility Requirements</h3>
                <p className="text-muted-foreground mb-2">
                  To be eligible for our interest-free finance options, you must:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground">
                  <li>Be at least 18 years old</li>
                  <li>Have a valid credit or debit card</li>
                  <li>Have a valid email address and phone number</li>
                  <li>Meet the payment provider's approval criteria</li>
                </ul>
              </div>
              
              <div className="bg-primary/5 p-4 rounded-md">
                <p className="text-muted-foreground italic">
                  Please note: Approval for payment plans is at the discretion of the payment provider and subject to their terms and conditions. Liquor Online is not responsible for payment provider decisions or policies.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-bold text-neutral-dark mb-6">Commercial Financing</h2>
            
            <div className="space-y-6">
              <p className="text-muted-foreground">
                For our business customers, we offer specialized financing options to help manage inventory purchases and cash flow. Whether you're a restaurant, bar, event company, or retail store, our commercial financing solutions can help you grow your business.
              </p>
              
              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-3">Commercial Payment Terms</h3>
                <ul className="list-disc pl-6 text-muted-foreground">
                  <li>Net 30 payment terms for qualified businesses</li>
                  <li>Bulk order discounts</li>
                  <li>Customized payment schedules for large orders</li>
                  <li>Business credit accounts</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-3">How to Apply</h3>
                <p className="text-muted-foreground">
                  To apply for commercial financing or business terms, please contact our business services team. We'll work with you to understand your needs and create a financing solution that works for your business.
                </p>
              </div>
              
              <div className="mt-6">
                <Link 
                  to="/contact" 
                  className="inline-block bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dark transition-colors font-medium"
                >
                  Contact Business Services
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Have questions about our financing options? <Link to="/contact" className="text-primary hover:underline">Contact us</Link> for assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance; 