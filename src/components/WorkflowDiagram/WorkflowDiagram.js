import React from 'react';
import styles from './WorkflowDiagram.module.css';

export const WorkflowDiagram = ({ title, nodes, style }) => {
    return (
        <div className={styles.workflowDiagram} style={style}>
            <h4>{title}</h4>
            <div className={styles.diagramFlow}>
                {nodes.map((node, index) => (
                    <React.Fragment key={node.id}>
                        <div className={`${styles.diagramNode} ${styles[node.status]}`}>
                            {node.label}
                        </div>
                        {index < nodes.length - 1 && (
                            <div className={styles.diagramArrow}>→</div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};
