import React from 'react';
import Link from '@docusaurus/Link';
import styles from './TopicCard.module.css';

/**
 * Reusable TopicCard component for consistent card styling across the site
 * @param {Object} props
 * @param {string} props.title - Card title
 * @param {string} props.description - Card description
 * @param {string} props.href - Link URL
 * @param {string} props.variant - Card style variant: 'pattern', 'topic', 'feature', 'security'
 * @param {React.ReactNode} props.icon - Optional icon element
 * @param {boolean} props.showArrow - Whether to show arrow on hover
 * @param {string} props.className - Additional CSS classes
 */
export function TopicCard({
  title,
  description,
  href,
  variant = 'pattern',
  icon,
  showArrow = true,
  className = '',
  ...props
}) {
  const cardClasses = [
    styles.topicCard,
    styles[`topicCard${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
    className
  ].filter(Boolean).join(' ');

  const CardContent = () => (
    <>
      <div className={styles.topicCardContent}>
        {icon && <div className={styles.topicCardIcon}>{icon}</div>}
        <h3 className={styles.topicCardTitle}>{title}</h3>
        <p className={styles.topicCardDescription}>{description}</p>
      </div>
      {showArrow && <div className={styles.topicCardArrow}>→</div>}
    </>
  );

  if (href) {
    return (
      <Link to={href} className={cardClasses} {...props}>
        <CardContent />
      </Link>
    );
  }

  return (
    <div className={cardClasses} {...props}>
      <CardContent />
    </div>
  );
}

/**
 * Container component for TopicCard grids
 * @param {Object} props
 * @param {React.ReactNode} props.children - TopicCard components
 * @param {number} props.columns - Number of columns (2, 3, or 4)
 * @param {string} props.className - Additional CSS classes
 */
export function TopicCardGrid({ 
  children, 
  columns = 2, 
  className = '',
  ...props 
}) {
  const gridClasses = [
    styles.topicCardGrid,
    styles[`topicCardGrid${columns}col`],
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div className={gridClasses} {...props}>
      {children}
    </div>
  );
}

export default TopicCard; 