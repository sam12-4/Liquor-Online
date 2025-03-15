import React from 'react';
import { Link } from 'react-router-dom';

const Jobs = () => {
  const jobListings = [
    {
      id: 1,
      title: 'E-Commerce Specialist',
      location: 'Red Deer, AB',
      type: 'Full-time',
      description: 'We are seeking an experienced E-Commerce Specialist to join our growing team. The ideal candidate will have experience in managing online retail platforms, digital marketing, and customer engagement strategies.',
      responsibilities: [
        'Manage and optimize our e-commerce platform',
        'Implement digital marketing strategies to drive traffic and sales',
        'Analyze website performance and customer behavior',
        'Coordinate with the inventory team to ensure product listings are accurate',
        'Provide exceptional customer service through online channels'
      ],
      requirements: [
        'Bachelor\'s degree in Marketing, Business, or related field',
        '2+ years of experience in e-commerce or digital marketing',
        'Proficient in web analytics tools and SEO best practices',
        'Strong communication and problem-solving skills',
        'Knowledge of the liquor industry is a plus'
      ]
    },
    {
      id: 2,
      title: 'Customer Service Representative',
      location: 'Red Deer, AB',
      type: 'Part-time',
      description: 'We are looking for a friendly and professional Customer Service Representative to assist our clients with orders, inquiries, and provide information about our products and services.',
      responsibilities: [
        'Answer customer inquiries via phone, email, and chat',
        'Process orders and track shipments',
        'Resolve customer complaints and issues',
        'Maintain customer records and update account information',
        'Provide information about products, services, and policies'
      ],
      requirements: [
        'High school diploma or equivalent',
        'Previous customer service experience preferred',
        'Excellent communication and interpersonal skills',
        'Basic computer skills and familiarity with CRM systems',
        'Must be 18 years or older'
      ]
    },
    {
      id: 3,
      title: 'Warehouse Associate',
      location: 'Red Deer, AB',
      type: 'Full-time',
      description: 'Join our warehouse team to help manage inventory, fulfill orders, and ensure smooth operations. This position involves physical work in a fast-paced environment.',
      responsibilities: [
        'Pick, pack, and ship customer orders accurately and efficiently',
        'Receive and process incoming inventory',
        'Maintain a clean and organized warehouse',
        'Conduct regular inventory counts',
        'Assist with loading and unloading deliveries'
      ],
      requirements: [
        'High school diploma or equivalent',
        'Ability to lift up to 50 lbs repeatedly',
        'Previous warehouse or inventory management experience preferred',
        'Attention to detail and basic math skills',
        'Must be 18 years or older'
      ]
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-primary text-white py-16">
        <div className="container-fluid">
          <h1 className="text-4xl font-bold mb-4">Careers at Liquor Online</h1>
          <div className="flex items-center">
            <Link to="/" className="text-white hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <span>Jobs</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-fluid py-16">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="bg-white shadow-md rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-neutral-dark mb-6">Join Our Team</h2>
            
            <div className="space-y-6">
              <p className="text-muted-foreground">
                At Liquor Online, we're passionate about connecting customers with exceptional products and providing outstanding service. We're looking for talented individuals who share our values and want to be part of our growing team.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-primary/5 p-6 rounded-lg text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-dark mb-2">Flexible Schedules</h3>
                  <p className="text-sm text-muted-foreground">
                    We offer flexible work arrangements to help you maintain a healthy work-life balance.
                  </p>
                </div>
                
                <div className="bg-primary/5 p-6 rounded-lg text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-dark mb-2">Growth Opportunities</h3>
                  <p className="text-sm text-muted-foreground">
                    We believe in promoting from within and providing opportunities for professional development.
                  </p>
                </div>
                
                <div className="bg-primary/5 p-6 rounded-lg text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-dark mb-2">Collaborative Culture</h3>
                  <p className="text-sm text-muted-foreground">
                    We foster a supportive environment where teamwork and innovation thrive.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Current Openings */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-dark mb-6">Current Openings</h2>
            
            <div className="space-y-6">
              {jobListings.map(job => (
                <div key={job.id} className="bg-white shadow-md rounded-lg p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h3 className="text-xl font-semibold text-neutral-dark">{job.title}</h3>
                    <div className="flex items-center mt-2 md:mt-0">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mr-2">
                        {job.location}
                      </span>
                      <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                        {job.type}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{job.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-neutral-dark mb-2">Responsibilities:</h4>
                    <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                      {job.responsibilities.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-neutral-dark mb-2">Requirements:</h4>
                    <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                      {job.requirements.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <button className="mt-4 bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-dark transition-colors font-medium">
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Application Process */}
          <div className="bg-white shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-bold text-neutral-dark mb-6">How to Apply</h2>
            
            <div className="space-y-6">
              <p className="text-muted-foreground">
                To apply for any of our open positions, please send your resume and cover letter to <a href="mailto:careers@liquoronline.ca" className="text-primary hover:underline">careers@liquoronline.ca</a> with the position title in the subject line.
              </p>
              
              <div>
                <h3 className="text-xl font-semibold text-neutral-dark mb-3">Our Hiring Process</h3>
                <ol className="list-decimal pl-6 text-muted-foreground space-y-2">
                  <li>Resume and cover letter review</li>
                  <li>Phone screening</li>
                  <li>In-person or virtual interview</li>
                  <li>Reference check</li>
                  <li>Job offer</li>
                </ol>
              </div>
              
              <div className="bg-primary/5 p-4 rounded-md">
                <p className="text-muted-foreground italic">
                  Liquor Online is an equal opportunity employer. We celebrate diversity and are committed to creating an inclusive environment for all employees.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Don't see a position that matches your skills? Send your resume to <a href="mailto:careers@liquoronline.ca" className="text-primary hover:underline">careers@liquoronline.ca</a> and we'll keep it on file for future opportunities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs; 