import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-primary text-white py-16">
        <div className="container-fluid">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <div className="flex items-center">
            <Link to="/" className="text-white hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <span>About Us</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-fluid py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-neutral-dark mb-6">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              Liquor Online was founded in 2020 with a simple mission: to help liquor stores across Canada embrace the digital age and connect with customers online. What started as a small team of e-commerce enthusiasts has grown into a leading provider of online solutions for the liquor industry.
            </p>
            <p className="text-muted-foreground mb-4">
              We recognized that less than 1% of all Liquor Stores in Alberta were online, and we set out to change that. Our team combines expertise in e-commerce, digital marketing, and the liquor industry to create tailored solutions that help stores increase sales and build customer loyalty.
            </p>
            <p className="text-muted-foreground">
              Today, we're proud to partner with liquor retailers across Canada, providing them with the tools and support they need to thrive in an increasingly digital marketplace.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1569529465841-dfecdab7503b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
              alt="Liquor store interior" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Our Mission */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-dark mb-4">Our Mission</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              We're on a mission to transform the liquor retail industry by making e-commerce accessible, affordable, and effective for liquor stores of all sizes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-dark mb-2">Empower Retailers</h3>
              <p className="text-muted-foreground">
                We provide liquor retailers with the tools, knowledge, and support they need to succeed online.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-dark mb-2">Connect Communities</h3>
              <p className="text-muted-foreground">
                We help local liquor stores connect with their communities through digital channels.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-dark mb-2">Drive Growth</h3>
              <p className="text-muted-foreground">
                We're committed to helping our partners increase sales and grow their businesses.
              </p>
            </div>
          </div>
        </div>

        {/* Our Team */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-dark mb-4">Our Team</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Meet the passionate professionals behind Liquor Online. Our diverse team brings together expertise in e-commerce, marketing, and the liquor industry.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" 
                  alt="John Smith" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-neutral-dark">John Smith</h3>
              <p className="text-primary">CEO & Founder</p>
            </div>
            
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80" 
                  alt="Sarah Johnson" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-neutral-dark">Sarah Johnson</h3>
              <p className="text-primary">Marketing Director</p>
            </div>
            
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" 
                  alt="Michael Chen" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-neutral-dark">Michael Chen</h3>
              <p className="text-primary">Lead Developer</p>
            </div>
            
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80" 
                  alt="Emily Rodriguez" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-neutral-dark">Emily Rodriguez</h3>
              <p className="text-primary">Customer Success</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-primary/5 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-neutral-dark mb-4">Ready to Grow Your Liquor Business Online?</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
            Join the hundreds of liquor retailers who have transformed their businesses with our e-commerce solutions. Get started today with a free demo.
          </p>
          <Link 
            to="/contact" 
            className="inline-block bg-primary text-white py-3 px-8 rounded-md hover:bg-primary-dark transition-colors font-medium"
          >
            Book a Free Demo
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About; 