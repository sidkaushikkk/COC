// import React from 'react';
// import { ARTICLES } from '../data/mockData';
// import { Eye, TrendingUp } from 'lucide-react';

// export default function TrendingRow({ onNavigate }) {
//   // Sort articles by views/likes or pull a trending subset
//   const trendingArticles = ARTICLES.slice(0, 5); // Pick top 5 for ranking list

//   return (
//     <section className="trending-section section-spacing">
//       <div className="container">
//         <div className="section-header">
//           <span className="editorial-meta-tag flex-align-center">
//             <TrendingUp size={14} style={{ marginRight: 6 }} /> Pulse
//           </span>
//           <h2 className="section-title">Trending Systems Analysis</h2>
//         </div>
//       </div>

//       {/* Full width scroll container */}
//       <div className="trending-horizontal-scroll-container">
//         <div className="trending-scroll-track">
//           {trendingArticles.map((article, index) => (
//             <div key={article.id} className="trending-item-wrapper">
//               {/* Ranking Number */}
//               <div className="trending-rank-number">
//                 {index + 1}
//               </div>

//               {/* Card content */}
//               <div 
//                 className="trending-card"
//                 onClick={() => onNavigate('article', article.id)}
//               >
//                 <div className="trending-image-wrapper">
//                   <img src={article.coverImage} alt={article.title} loading="lazy" />
//                   <span className="trending-category-tag font-sans">{article.category}</span>
//                 </div>
                
//                 <div className="trending-info font-sans">
//                   <h4 className="trending-title">{article.title}</h4>
//                   <div className="trending-views-count">
//                     <Eye size={12} style={{ marginRight: 4 }} /> {article.views} views
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
