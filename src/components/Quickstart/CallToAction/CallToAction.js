import React from 'react';
import styles from './call-to-action.module.css';

 export const CallToAction = ({ href, children, analyticsId }) => {
   const analyticsProps = analyticsId
     ? { 'data-analytics-id': analyticsId, 'data-analytics-action': 'click' }
     : {};

   return (
     <a href={href} className={styles.cta} {...analyticsProps}>
       <div className={styles.content}>
         {children}
       </div>
       <div className={styles.arrow}>→</div>
     </a>
   );
 };