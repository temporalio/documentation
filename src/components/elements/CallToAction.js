import React from 'react';
import styles from './call-to-action.module.css';

 export const CallToAction = ({ href, children }) => {
   return (
     <a href={href} className={styles.cta}>
       <div className={styles.content}>
         {children}
       </div>
       <div className={styles.arrow}>→</div>
     </a>
   );
 };