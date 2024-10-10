// src/components/CustomDocCard.tsx
import React from 'react';

const CustomDocCard = ({ title, children }) => {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{title}</h3>
      <div style={styles.content}>{children}</div>
    </div>
  );
};

const styles = {
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1.0em',
        border: `4px solid var(--card-border-color)`,
        borderRadius: '20px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
        margin: '4px',
        width: 'calc(95% - 10px)',
        minHeight: '150px',
        backgroundColor: 'var(--card-background-color)',
        color: 'var(--card-text-color)',
    },
    title: {
        margin: '0 0 10px 0',
    },
    content: {
        flexGrow: 1, // Allow content to take up available space
    },
};

export default CustomDocCard;
