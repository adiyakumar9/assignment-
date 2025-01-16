import{c as y,r as a,j as e,X as j,m as u}from"./index-0q3Rwk85.js";import{u as N}from"./index-QE24Npvd.js";import{E as k}from"./external-link-RhKf8WgL.js";import{L as w}from"./loader-BcFwzXPy.js";/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=y("Play",[["polygon",{points:"5 3 19 12 5 21 5 3",key:"191637"}]]),g=a.memo(({title:r,description:o,technologies:t,dates:c,liveUrl:n})=>{const[i,s]=a.useState(!1),[h,l]=a.useState(!1),[I,d]=a.useState(!1),f=a.useRef(null),x=a.useCallback(()=>{s(!0),l(!0),d(!1)},[]),b=a.useCallback(()=>{s(!1),l(!1)},[]),v=a.useCallback(()=>{l(!1),d(!1)},[]),S=a.useCallback(()=>{l(!1),d(!0)},[]);return e.jsxs("div",{className:"group relative bg-gray-800/50 rounded-lg overflow-hidden backdrop-blur-sm border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1",children:[e.jsxs("div",{className:"p-6",children:[e.jsxs("div",{className:"flex justify-between items-start mb-4",children:[e.jsx("h3",{className:"text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400",children:r}),e.jsxs("div",{className:"flex space-x-4",children:[n&&!i&&e.jsxs("button",{onClick:x,className:"flex items-center space-x-2 px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-full transform transition-transform hover:scale-105 active:scale-95",children:[e.jsx(A,{size:16}),e.jsx("span",{className:"text-sm font-medium",children:"Demo"})]}),n&&e.jsx("a",{href:n,target:"_blank",rel:"noopener noreferrer",className:"text-gray-300 hover:text-emerald-400 transition-colors",children:e.jsx(k,{size:20})})]})]}),e.jsx("p",{className:"text-sm text-emerald-400/70 mb-2",children:c}),e.jsx("p",{className:"text-gray-300 mb-4 leading-relaxed",children:o}),e.jsx("div",{className:"flex flex-wrap gap-2",children:t.map(m=>e.jsx("span",{className:"px-3 py-1 text-xs rounded-full bg-gray-700/50 text-emerald-400 border border-emerald-500/20",children:m},m))})]}),i&&e.jsxs("div",{className:"relative h-96",children:[h&&e.jsx("div",{className:"absolute inset-0 bg-gray-900/90 flex items-center justify-center z-20",children:e.jsxs("div",{className:"flex flex-col items-center space-y-4",children:[e.jsx(w,{className:"text-emerald-400 animate-spin",size:24}),e.jsx("p",{className:"text-emerald-400 text-sm",children:"Loading preview..."})]})}),e.jsx("button",{onClick:b,className:"absolute top-4 right-4 p-2 bg-gray-800 rounded-lg text-emerald-400 hover:bg-gray-700 z-30 transition-colors",children:e.jsx(j,{size:16})}),e.jsx("iframe",{ref:f,src:n,className:"w-full h-full border-0",sandbox:"allow-scripts allow-same-origin allow-popups allow-forms",loading:"lazy",title:`${r} Demo`,onLoad:v,onError:S})]})]})});g.displayName="ProjectCard";const p=[{id:"t-pro",title:"T-Pro",description:"Led frontend development for T-Pro, a comprehensive team and project management system. Implemented secure routing authentication, seamless form integration using React Query and Formik, and integrated data visualization graphs for real-time analytics.",technologies:["React","React Query","Formik","Yup"],dates:"Feb 2024 - Present",liveUrl:"https://pms.recru.in/",codeSnippet:`
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
    `,category:["react"]},{id:"social-collider",title:"Social Collider",description:"Developed the frontend for Social Collider, a task-based social media platform that incentivizes users to engage with content on Twitter, Telegram, and YouTube. Implemented user interface using HTML, CSS, JavaScript, and Angular, and integrated APIs for seamless cross-platform functionality.",technologies:["HTML","CSS","JavaScript","Angular","RESTful APIs"],dates:"Sep 2023 - Jan 2024",liveUrl:"https://bizthon.com/",codeSnippet:`
// Example API integration using Angular HttpClient
import { HttpClient } from '@angular/common/http';

constructor(private http: HttpClient) { }

getTwitterData() {
  this.http.get('https://api.twitter.com/data').subscribe(data => {
    // Process Twitter data
  });
}
    `,category:["angular","frontend"]},{id:"tdx-launchpad",title:"TDX Launchpad",description:"Integrated functionality and APIs for TDX Launchpad, a cross-chain superdApp facilitating transactions between blockchain ecosystems. Developed user interface components in Angular and collaborated with the development team to ensure seamless user experience.",technologies:["Angular","RESTful APIs"],dates:"Mar 2023 - Aug 2023",liveUrl:"https://tdx.biz/",codeSnippet:`
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
    `,category:["angular"]},{id:"ems",title:"EMS (Event Management System)",description:"Developed the frontend for EMS, an event management system with modules for sponsors, exhibitors, speakers, and attendees. Built the frontend using AngularJS, integrated RESTful APIs, and ensured responsive UI design.",technologies:["HTML","CSS","JavaScript","AngularJS","RESTful APIs"],dates:"Sep 2022 - Feb 2023",codeSnippet:`
// Example of an AngularJS service for API calls
angular.module('emsApp').service('EventService', function($http) {
  this.getEvents = function() {
    return $http.get('/api/events');
  };
});
    `,category:["angular","frontend"]},{id:"oshodhara",title:"Oshodhara",description:"Developed the admin panel for Oshodhara, an event booking platform focused on Osho teachings. Implemented user interface using HTML, CSS, and JavaScript, integrated booking features using AngularJS, and ensured secure authentication and role-based access control.",technologies:["HTML","CSS","JavaScript","AngularJS","RESTful APIs"],dates:"Mar 2022 - Aug 2022",liveUrl:"https://samarthgurusiddharth.org/",codeSnippet:`
// Example of an AngularJS controller for handling bookings
angular.module('oshodharaApp').controller('BookingController', function() {
  this.bookEvent = function(event) {
    // Logic to handle event booking
  };
});
    `,category:["angular","frontend"]}],C=({selectedCategory:r})=>{const o=a.useMemo(()=>r==="all"?p:p.filter(t=>t.category.includes(r)),[r]);return e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:o.map(t=>e.jsx(u.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},children:e.jsx(g,{title:t.title,description:t.description,technologies:t.technologies,dates:t.dates,liveUrl:t.liveUrl||""})},t.id))})},E=["all","react","angular","frontend"],D=()=>{const[r,o]=a.useState("all"),[t,c]=N({triggerOnce:!0,threshold:.1}),n=a.useMemo(()=>e.jsx("div",{className:"absolute inset-0 pointer-events-none",children:e.jsx("div",{className:"absolute inset-0 opacity-20",style:{backgroundImage:"linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",backgroundSize:"50px 50px"}})}),[]),i=a.useCallback(s=>{o(s)},[]);return e.jsxs("section",{ref:t,className:"relative py-16 bg-gradient-to-b from-black to-gray-900",children:[n,e.jsxs("div",{className:"max-w-7xl mx-auto px-4",children:[c&&e.jsx(u.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},className:"mb-12",children:e.jsxs("h2",{className:"text-4xl font-bold font-mono flex items-center",children:[e.jsx("span",{className:"text-emerald-400 mr-2",children:">"}),e.jsx("span",{className:"text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500",children:"projects"})]})}),e.jsx("div",{className:"mb-8 flex flex-wrap gap-4",children:E.map(s=>e.jsx("button",{onClick:()=>i(s),className:`
                px-4 py-2 rounded-full text-sm font-medium
                transition-all duration-300 ease-out
                ${r===s?"bg-emerald-500 text-white shadow-lg shadow-emerald-500/25":"bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"}
              `,children:s.charAt(0).toUpperCase()+s.slice(1)},s))}),e.jsx("div",{className:"relative",children:e.jsx(C,{selectedCategory:r})})]})]})};export{D as default};
