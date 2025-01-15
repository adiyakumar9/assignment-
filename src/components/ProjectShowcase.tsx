// projectShowcase.tsx
import React, { useState, useMemo } from 'react';
import ProjectCard from './ProjectCard';
import { motion } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  dates: string;
  liveUrl?: string;
  githubUrl?: string;
  codeSnippet?: string;
  previewImage?: string;
  category: string[]; // Added category
}

const projects: Project[] = [
  {
    id: 't-pro',
    title: 'T-Pro',
    description: 'Led frontend development for T-Pro, a comprehensive team and project management system. Implemented secure routing authentication, seamless form integration using React Query and Formik, and integrated data visualization graphs for real-time analytics.',
    technologies: ['React', 'React Query', 'Formik', 'Yup'],
    dates: 'Feb 2024 - Present',
    liveUrl: 'https://pms.recru.in/',
    // githubUrl: '', Add if available
    codeSnippet: `
// Example using Formik and Yup for form validation
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
});

<Formik
  initialValues={{ email: '', password: '' }}
  validationSchema={validationSchema}
  onSubmit={(values) => {
    // Handle form submission
  }}
>
  {/* Form fields */}
</Formik>
    `,
    // previewImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    category: ['react'], // Added category
  },
  {
    id: 'social-collider',
    title: 'Social Collider',
    description: 'Developed the frontend for Social Collider, a task-based social media platform that incentivizes users to engage with content on Twitter, Telegram, and YouTube. Implemented user interface using HTML, CSS, JavaScript, and Angular, and integrated APIs for seamless cross-platform functionality.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Angular', 'RESTful APIs'],
    dates: 'Sep 2023 - Jan 2024',
    liveUrl: 'https://bizthon.com/',
    // githubUrl: '', Add if available
    codeSnippet: `
// Example API integration using Angular HttpClient
import { HttpClient } from '@angular/common/http';

constructor(private http: HttpClient) { }

getTwitterData() {
  this.http.get('https://api.twitter.com/data').subscribe(data => {
    // Process Twitter data
  });
}
    `,
    // previewImage: 'https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg',
    category: ['angular', 'frontend'], // Added category
  },
  {
    id: 'tdx-launchpad',
    title: 'TDX Launchpad',
    description: 'Integrated functionality and APIs for TDX Launchpad, a cross-chain superdApp facilitating transactions between blockchain ecosystems. Developed user interface components in Angular and collaborated with the development team to ensure seamless user experience.',
    technologies: ['Angular', 'RESTful APIs'],
    dates: 'Mar 2023 - Aug 2023',
    liveUrl: 'https://tdx.biz/',
    // githubUrl: '', Add if available
    codeSnippet: `
// Example of a simple Angular component
import { Component } from '@angular/core';

@Component({
  selector: 'app-transaction-list',
  template: \`
    <h2>Recent Transactions</h2>
    <ul>
      <li *ngFor="let transaction of transactions">{{ transaction.id }}</li>
    </ul>
  \`,
})
export class TransactionListComponent {
  transactions = []; // Fetch transaction data from API
}
    `,
    // previewImage: 'https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    category: ['angular'], // Added category
  },
  {
    id: 'ems',
    title: 'EMS (Event Management System)',
    description: 'Developed the frontend for EMS, an event management system with modules for sponsors, exhibitors, speakers, and attendees. Built the frontend using AngularJS, integrated RESTful APIs, and ensured responsive UI design.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'AngularJS', 'RESTful APIs'],
    dates: 'Sep 2022 - Feb 2023',
    // liveUrl: '', Add if available
    // githubUrl: '', Add if available
    codeSnippet: `
// Example of an AngularJS service for API calls
angular.module('emsApp').service('EventService', function($http) {
  this.getEvents = function() {
    return $http.get('/api/events');
  };
});
    `,
    // previewImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnR8ZW58MHx8MHx8&w=1000&q=80',
    category: ['angular', 'frontend'], // Added category
  },
  {
    id: 'oshodhara',
    title: 'Oshodhara',
    description: 'Developed the admin panel for Oshodhara, an event booking platform focused on Osho teachings. Implemented user interface using HTML, CSS, and JavaScript, integrated booking features using AngularJS, and ensured secure authentication and role-based access control.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'AngularJS', 'RESTful APIs'],
    dates: 'Mar 2022 - Aug 2022',
    liveUrl: 'https://samarthgurusiddharth.org/',
    // githubUrl: '', Add if available
    codeSnippet: `
// Example of an AngularJS controller for handling bookings
angular.module('oshodharaApp').controller('BookingController', function() {
  this.bookEvent = function(event) {
    // Logic to handle event booking
  };
});
    `,
    // previewImage: 'https://media.istockphoto.com/id/1329396672/photo/man-meditating-on-the-beach.jpg?s=612x612&w=0&k=20&c=ljj3wqpOuZz3jzINQWphU2cKahGd2qPl0h9oKF-SsJQ=',
    category: ['angular', 'frontend'], // Added category
  },
];

interface ProjectShowcaseProps {
  selectedCategory: string;
}

const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ selectedCategory }) => {
    
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') {
      return projects;
    } else {
      return projects.filter(project => project.category.includes(selectedCategory));
    }
  }, [selectedCategory]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {filteredProjects.map((project) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ProjectCard
            title={project.title}
            description={project.description}
            technologies={project.technologies}
            dates={project.dates}
            liveUrl={project.liveUrl || ''}
            // previewImage={project.previewImage || ''}
            // codeSnippet={project.codeSnippet || ''}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectShowcase;