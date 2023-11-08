// import { Outlet } from "react-router-dom";
// import { Layout } from "antd";
// import { TopNav } from "../../components/topnav";
// import "../layout.css";
// import { DocumentSearchIcon } from "@heroicons/react/outline";

// const { Content } = Layout;

// export function HomeLayout() {
//   return (
//     <>
//       <header className="sticky top-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-[48] w-full bg-white border-b text-sm py-2.5 sm:py-4 lg:ps-64 dark:bg-gray-800 dark:border-gray-700">
//         <nav
//           className="flex basis-full items-center w-full mx-auto px-4 sm:px-6 md:px-8"
//           aria-label="Global"
//         >
//           <div className="px-6">
//             <a
//               className="flex-none text-xl font-semibold dark:text-white"
//               href="#"
//               aria-label="Orca"
//             >
//               Orca
//             </a>
//           </div>

//           <div className="w-full flex items-center justify-end ms-auto sm:justify-between sm:gap-x-3 sm:order-3">
//             <div className="sm:hidden">
//               <button
//                 type="button"
//                 className="w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//               >
//                 <DocumentSearchIcon className="flex-shrink-0 h-4 w-4" />
//                 {/* <svg
//                   className="flex-shrink-0 w-4 h-4"
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   stroke-width="2"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 >
//                   <circle cx="11" cy="11" r="8" />
//                   <path d="m21 21-4.3-4.3" />
//                 </svg> */}
//               </button>
//             </div>

//             <div className="hidden sm:block">
//               <label htmlFor="icon" className="sr-only">
//                 Search
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
//                   {/* <svg
//                     className="flex-shrink-0 h-4 w-4 text-gray-400"
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     stroke-width="2"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                   >
//                     <circle cx="11" cy="11" r="8" />
//                     <path d="m21 21-4.3-4.3" />
//                   </svg> */}
//                   <DocumentSearchIcon className="flex-shrink-0 h-4 w-4" />
//                 </div>
//                 <input
//                   type="text"
//                   id="icon"
//                   name="icon"
//                   className="py-2 px-4 ps-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
//                   placeholder="Search"
//                 />
//               </div>
//             </div>

//             <div className="flex flex-row items-center justify-end gap-2">
//               <button
//                 type="button"
//                 className="w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//               >
//                 <svg
//                   className="flex-shrink-0 w-4 h-4"
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   stroke-width="2"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 >
//                   <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
//                   <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
//                 </svg>
//               </button>
//               <button
//                 type="button"
//                 className="w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//                 data-hs-offcanvas="#hs-offcanvas-right"
//               >
//                 <svg
//                   className="flex-shrink-0 w-4 h-4"
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   stroke-width="2"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 >
//                   <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
//                 </svg>
//               </button>

//               <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
//                 <button
//                   id="hs-dropdown-with-header"
//                   type="button"
//                   className="w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//                 >
//                   <img
//                     className="inline-block h-[2.375rem] w-[2.375rem] rounded-full ring-2 ring-white dark:ring-gray-800"
//                     src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
//                     alt="Image Description"
//                   />
//                 </button>

//                 <div
//                   className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] bg-white shadow-md rounded-lg p-2 dark:bg-gray-800 dark:border dark:border-gray-700"
//                   aria-labelledby="hs-dropdown-with-header"
//                 >
//                   <div className="py-3 px-5 -m-2 bg-gray-100 rounded-t-lg dark:bg-gray-700">
//                     <p className="text-sm text-gray-500 dark:text-gray-400">
//                       Signed in as
//                     </p>
//                     <p className="text-sm font-medium text-gray-800 dark:text-gray-300">
//                       james@site.com
//                     </p>
//                   </div>
//                   <div className="mt-2 py-2 first:pt-0 last:pb-0">
//                     <a
//                       className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
//                       href="#"
//                     >
//                       <svg
//                         className="flex-shrink-0 w-4 h-4"
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         stroke-width="2"
//                         stroke-linecap="round"
//                         stroke-linejoin="round"
//                       >
//                         <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
//                         <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
//                       </svg>
//                       Newsletter
//                     </a>
//                     <a
//                       className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
//                       href="#"
//                     >
//                       <svg
//                         className="flex-shrink-0 w-4 h-4"
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         stroke-width="2"
//                         stroke-linecap="round"
//                         stroke-linejoin="round"
//                       >
//                         <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
//                         <path d="M3 6h18" />
//                         <path d="M16 10a4 4 0 0 1-8 0" />
//                       </svg>
//                       Purchases
//                     </a>
//                     <a
//                       className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
//                       href="#"
//                     >
//                       <svg
//                         className="flex-shrink-0 w-4 h-4"
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         stroke-width="2"
//                         stroke-linecap="round"
//                         stroke-linejoin="round"
//                       >
//                         <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
//                         <path d="M12 12v9" />
//                         <path d="m8 17 4 4 4-4" />
//                       </svg>
//                       Downloads
//                     </a>
//                     <a
//                       className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
//                       href="#"
//                     >
//                       <svg
//                         className="flex-shrink-0 w-4 h-4"
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         stroke-width="2"
//                         stroke-linecap="round"
//                         stroke-linejoin="round"
//                       >
//                         <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
//                         <circle cx="9" cy="7" r="4" />
//                         <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
//                         <path d="M16 3.13a4 4 0 0 1 0 7.75" />
//                       </svg>
//                       Team Account
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </nav>
//       </header>

//       <div className="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 md:px-8 lg:hidden dark:bg-gray-800 dark:border-gray-700">
//         <div className="flex items-center py-4">
//           <button
//             type="button"
//             className="text-gray-500 hover:text-gray-600"
//             data-hs-overlay="#application-sidebar"
//             aria-controls="application-sidebar"
//             aria-label="Toggle navigation"
//           >
//             <span className="sr-only">Toggle Navigation</span>
//             <svg
//               className="flex-shrink-0 w-4 h-4"
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               stroke-width="2"
//               stroke-linecap="round"
//               stroke-linejoin="round"
//             >
//               <line x1="3" x2="21" y1="6" y2="6" />
//               <line x1="3" x2="21" y1="12" y2="12" />
//               <line x1="3" x2="21" y1="18" y2="18" />
//             </svg>
//           </button>
//           <ol
//             className="ms-3 flex items-center whitespace-nowrap"
//             aria-label="Breadcrumb"
//           >
//             <li className="flex items-center text-sm text-gray-800 dark:text-gray-400">
//               Application Layout
//               <svg
//                 className="flex-shrink-0 mx-3 overflow-visible h-2.5 w-2.5 text-gray-400 dark:text-gray-600"
//                 width="16"
//                 height="16"
//                 viewBox="0 0 16 16"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
//                   stroke="currentColor"
//                   stroke-width="2"
//                   stroke-linecap="round"
//                 />
//               </svg>
//             </li>
//             <li
//               className="text-sm font-semibold text-gray-800 truncate dark:text-gray-400"
//               aria-current="page"
//             >
//               Dashboard
//             </li>
//           </ol>
//         </div>
//       </div>
//       {/* <div
//         id="application-sidebar"
//         className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 dark:border-gray-700"
//       >

//         <nav
//           className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
//           data-hs-accordion-always-open
//         >
//           <ul className="space-y-1.5">
//             <li>
//               <a
//                 className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//                 href="#"
//               >
//                 <svg
//                   className="flex-shrink-0 w-4 h-4"
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   stroke-width="2"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 >
//                   <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
//                   <polyline points="9 22 9 12 15 12 15 22" />
//                 </svg>
//                 Dashboard
//               </a>
//             </li>

//             <li className="hs-accordion" id="users-accordion">
//               <button
//                 type="button"
//                 className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//               >
//                 <svg
//                   className="flex-shrink-0 w-4 h-4"
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   stroke-width="2"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 >
//                   <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
//                   <circle cx="9" cy="7" r="4" />
//                   <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
//                   <path d="M16 3.13a4 4 0 0 1 0 7.75" />
//                 </svg>
//                 Users
//                 <svg
//                   className="hs-accordion-active:block ms-auto hidden w-4 h-4"
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   stroke-width="2"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 >
//                   <path d="m18 15-6-6-6 6" />
//                 </svg>
//                 <svg
//                   className="hs-accordion-active:hidden ms-auto block w-4 h-4"
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   stroke-width="2"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 >
//                   <path d="m6 9 6 6 6-6" />
//                 </svg>
//               </button>

//               <div
//                 id="users-accordion-child"
//                 className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
//               >
//                 <ul
//                   className="hs-accordion-group ps-3 pt-2"
//                   data-hs-accordion-always-open
//                 >
//                   <li className="hs-accordion" id="users-accordion-sub-1">
//                     <button
//                       type="button"
//                       className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//                     >
//                       Sub Menu 1
//                       <svg
//                         className="hs-accordion-active:block ms-auto hidden w-4 h-4"
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         stroke-width="2"
//                         stroke-linecap="round"
//                         stroke-linejoin="round"
//                       >
//                         <path d="m18 15-6-6-6 6" />
//                       </svg>
//                       <svg
//                         className="hs-accordion-active:hidden ms-auto block w-4 h-4"
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         stroke-width="2"
//                         stroke-linecap="round"
//                         stroke-linejoin="round"
//                       >
//                         <path d="m6 9 6 6 6-6" />
//                       </svg>
//                     </button>

//                     <div
//                       id="users-accordion-sub-1-child"
//                       className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
//                     >
//                       <ul className="pt-2 ps-2">
//                         <li>
//                           <a
//                             className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//                             href="#"
//                           >
//                             Link 1
//                           </a>
//                         </li>
//                         <li>
//                           <a
//                             className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//                             href="#"
//                           >
//                             Link 2
//                           </a>
//                         </li>
//                         <li>
//                           <a
//                             className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//                             href="#"
//                           >
//                             Link 3
//                           </a>
//                         </li>
//                       </ul>
//                     </div>
//                   </li>
//                   <li className="hs-accordion" id="users-accordion-sub-2">
//                     <button
//                       type="button"
//                       className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//                     >
//                       Sub Menu 2
//                       <svg
//                         className="hs-accordion-active:block ms-auto hidden w-4 h-4"
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         stroke-width="2"
//                         stroke-linecap="round"
//                         stroke-linejoin="round"
//                       >
//                         <path d="m18 15-6-6-6 6" />
//                       </svg>
//                       <svg
//                         className="hs-accordion-active:hidden ms-auto block w-4 h-4"
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         stroke-width="2"
//                         stroke-linecap="round"
//                         stroke-linejoin="round"
//                       >
//                         <path d="m6 9 6 6 6-6" />
//                       </svg>
//                     </button>

//                     <div
//                       id="users-accordion-sub-2-child"
//                       className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden ps-2"
//                     >
//                       <ul className="pt-2 ps-2">
//                         <li>
//                           <a
//                             className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//                             href="#"
//                           >
//                             Link 1
//                           </a>
//                         </li>
//                         <li>
//                           <a
//                             className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//                             href="#"
//                           >
//                             Link 2
//                           </a>
//                         </li>
//                         <li>
//                           <a
//                             className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//                             href="#"
//                           >
//                             Link 3
//                           </a>
//                         </li>
//                       </ul>
//                     </div>
//                   </li>
//                 </ul>
//               </div>
//             </li>

//             <li className="hs-accordion" id="account-accordion">
//               <button
//                 type="button"
//                 className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//               >
//                 <svg
//                   className="flex-shrink-0 mt-0.5 w-4 h-4"
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   stroke-width="2"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 >
//                   <circle cx="18" cy="15" r="3" />
//                   <circle cx="9" cy="7" r="4" />
//                   <path d="M10 15H6a4 4 0 0 0-4 4v2" />
//                   <path d="m21.7 16.4-.9-.3" />
//                   <path d="m15.2 13.9-.9-.3" />
//                   <path d="m16.6 18.7.3-.9" />
//                   <path d="m19.1 12.2.3-.9" />
//                   <path d="m19.6 18.7-.4-1" />
//                   <path d="m16.8 12.3-.4-1" />
//                   <path d="m14.3 16.6 1-.4" />
//                   <path d="m20.7 13.8 1-.4" />
//                 </svg>
//                 Account
//                 <svg
//                   className="hs-accordion-active:block ms-auto hidden w-4 h-4"
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   stroke-width="2"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 >
//                   <path d="m18 15-6-6-6 6" />
//                 </svg>
//                 <svg
//                   className="hs-accordion-active:hidden ms-auto block w-4 h-4"
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   stroke-width="2"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 >
//                   <path d="m6 9 6 6 6-6" />
//                 </svg>
//               </button>

//               <div
//                 id="account-accordion-child"
//                 className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
//               >
//                 <ul className="pt-2 ps-2">
//                   <li>
//                     <a
//                       className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//                       href="#"
//                     >
//                       Link 1
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//                       href="#"
//                     >
//                       Link 2
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//                       href="#"
//                     >
//                       Link 3
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//             </li>

//             <li className="hs-accordion" id="projects-accordion">
//               <button
//                 type="button"
//                 className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//               >
//                 <svg
//                   className="flex-shrink-0 w-4 h-4"
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   stroke-width="2"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 >
//                   <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
//                   <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
//                 </svg>
//                 Projects
//                 <svg
//                   className="hs-accordion-active:block ms-auto hidden w-4 h-4"
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   stroke-width="2"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 >
//                   <path d="m18 15-6-6-6 6" />
//                 </svg>
//                 <svg
//                   className="hs-accordion-active:hidden ms-auto block w-4 h-4"
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   stroke-width="2"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 >
//                   <path d="m6 9 6 6 6-6" />
//                 </svg>
//               </button>

//               <div
//                 id="projects-accordion-child"
//                 className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
//               >
//                 <ul className="pt-2 ps-2">
//                   <li>
//                     <a
//                       className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//                       href="#"
//                     >
//                       Link 1
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//                       href="#"
//                     >
//                       Link 2
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//                       href="#"
//                     >
//                       Link 3
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//             </li>

//             <li>
//               <a
//                 className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//                 href="#"
//               >
//                 <svg
//                   className="flex-shrink-0 w-4 h-4"
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   stroke-width="2"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 >
//                   <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
//                   <line x1="16" x2="16" y1="2" y2="6" />
//                   <line x1="8" x2="8" y1="2" y2="6" />
//                   <line x1="3" x2="21" y1="10" y2="10" />
//                   <path d="M8 14h.01" />
//                   <path d="M12 14h.01" />
//                   <path d="M16 14h.01" />
//                   <path d="M8 18h.01" />
//                   <path d="M12 18h.01" />
//                   <path d="M16 18h.01" />
//                 </svg>
//                 Calendar
//               </a>
//             </li>
//             <li>
//               <a
//                 className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//                 href="#"
//               >
//                 <svg
//                   className="flex-shrink-0 w-4 h-4"
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   stroke-width="2"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 >
//                   <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
//                   <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
//                 </svg>
//                 Documentation
//               </a>
//             </li>
//           </ul>
//         </nav>
//       </div> */}
//       <div className="w-full pt-10 px-4 sm:px-6 md:px-8 lg:ps-72">
//         <header>
//           <p className="mb-2 text-sm font-semibold text-blue-600">
//             Starter Pages & Examples
//           </p>
//           <h1 className="block text-2xl font-bold text-gray-800 sm:text-3xl dark:text-white">
//             Application Layout: Sidebar & Header using Tailwind CSS
//           </h1>
//           <p className="mt-2 text-lg text-gray-800 dark:text-gray-400">
//             This is a simple application layout with sidebar and header examples
//             using Tailwind CSS.
//           </p>
//           <div className="mt-5 flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
//             <a
//               className="w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//               href="https://github.com/htmlstreamofficial/preline/tree/main/examples/html"
//               target="_blank"
//             >
//               <svg
//                 className="flex-shrink-0 w-4 h-4"
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="16"
//                 height="16"
//                 fill="currentColor"
//                 viewBox="0 0 16 16"
//               >
//                 <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
//               </svg>
//               Get the source code
//             </a>
//             <a
//               className="w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//               href="../examples.html"
//             >
//               <svg
//                 className="flex-shrink-0 w-4 h-4"
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 stroke-width="2"
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//               >
//                 <path d="m15 18-6-6 6-6" />
//               </svg>
//               Back to examples
//             </a>
//           </div>
//         </header>
//       </div>
//     </>
//   );
// }

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/outline";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
};
const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
  { name: "Reports", href: "#", current: false }
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" }
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function HomeLayout() {
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Orca"
                      />
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={user.imageUrl}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="block w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="block w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                          />
                        </svg>
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                {/* <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div> */}
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* <header className="bg-white shadow">
          <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Dashboard
            </h1>
          </div>
        </header> */}
        <main>
          <aside className="w-1/5 bg-gray-900 text-white p-6 space-y-6 h-full">
            <div className="text-2xl font-semibold">Navigation</div>
            <div x-data="{ open: false }" className="space-y-2">
              <button className="flex items-center w-full text-left text-sm font-semibold">
                <svg
                  x-show="!open"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                <svg
                  x-show="open"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Collapsible Section
              </button>

              <div x-show="open" className="pl-4 space-y-2">
                <a href="#" className="block text-gray-300 hover:text-white">
                  Item 1
                </a>
                <a href="#" className="block text-gray-300 hover:text-white">
                  Item 2
                </a>
                <a href="#" className="block text-gray-300 hover:text-white">
                  Item 3
                </a>
              </div>
            </div>
          </aside>

          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {/* Your content */}
          </div>
        </main>
      </div>
    </>
  );
}
