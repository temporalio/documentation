import React from 'react';
import styles from './call-to-action.module.css';

 const getSafeHref = (href) => {
   if (typeof href !== 'string') {
     return '#';
   }

   const value = href.trim();

   if (!value || value.startsWith('/') || value.startsWith('#') || value.startsWith('?')) {
     return value || '#';
   }

   const lowerValue = value.toLowerCase();

   if (
     lowerValue.startsWith('http://') ||
     lowerValue.startsWith('https://') ||
     lowerValue.startsWith('mailto:')
   ) {
     return value;
   }

   return '#';
 };

 export const CallToAction = ({ href, children }) => {
   return (
     <a href={getSafeHref(href)} className={styles.cta}>
       <div className={styles.content}>
         {children}
       </div>
       <div className={styles.arrow}>→</div>
     </a>
   );
 };