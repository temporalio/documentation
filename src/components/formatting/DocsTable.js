import React, { useState, useMemo } from "react";

export default function DocsTable({ Columns, children, sortable = false, defaultSort = null }) {
  const [sortConfig, setSortConfig] = useState(() => {
    if (defaultSort && sortable) {
      return { key: defaultSort.column, direction: defaultSort.direction || 'asc' };
    }
    return { key: null, direction: null };
  });
  const childArray = React.Children.toArray(children);
  const columnsPerRow = Columns.length;

  const parseRows = () => {
    const rows = [];
    let currentRow = [];
    let currentCell = [];

    childArray.forEach((child) => {
      // Check if this is a DocsTableRow
      if (child.type === DocsTableRow) {
        // Parse the children of the row
        const rowChildren = React.Children.toArray(child.props.children);
        const rowCells = [];
        let cellContent = [];

        rowChildren.forEach((rowChild) => {
          if (rowChild.type === NewDocsCell) {
            // Extract content from NewDocsCell
            rowCells.push(rowChild.props.children);
          } else {
            cellContent.push(rowChild);
          }
        });

        // Add any remaining content as a cell
        if (cellContent.length > 0) {
          rowCells.push(cellContent.flat());
        }

        // Pad row to match column count
        while (rowCells.length < columnsPerRow) {
          rowCells.push("");
        }

        rows.push(rowCells);
      }
      // Fallback to old parsing method for backward compatibility
      else if (child.type === NewDocsCell) {
        // If NewDocsCell has content, use it; otherwise use accumulated content
        const cellContent = child.props.children || (currentCell.length > 0 ? currentCell.flat() : null);
        currentRow.push(cellContent);
        currentCell = [];

        if (currentRow.length === columnsPerRow) {
          rows.push([...currentRow]);
          currentRow = [];
        }
      } else {
        currentCell.push(child);
      }
    });

    // Handle remaining cells from old method
    if (currentCell.length > 0) {
      currentRow.push(currentCell.flat());
    }

    if (currentRow.length > 0) {
      while (currentRow.length < columnsPerRow) {
        currentRow.push("");
      }
      rows.push([...currentRow]);
    }

    return rows;
  };

  const rawRows = useMemo(() => parseRows(), [children]);

  const extractTextContent = (element) => {
    if (typeof element === 'string') return element;
    if (typeof element === 'number') return element.toString();
    if (Array.isArray(element)) {
      return element.map(extractTextContent).join(' ');
    }
    if (React.isValidElement(element)) {
      return extractTextContent(element.props.children);
    }
    return '';
  };

  const sortedRows = useMemo(() => {
    if (!sortable || !sortConfig.key) return rawRows;

    return [...rawRows].sort((a, b) => {
      const aVal = extractTextContent(a[sortConfig.key]);
      const bVal = extractTextContent(b[sortConfig.key]);

      // Try to parse as numbers for numeric sorting
      const aNum = parseFloat(aVal);
      const bNum = parseFloat(bVal);
      
      let comparison = 0;
      if (!isNaN(aNum) && !isNaN(bNum)) {
        comparison = aNum - bNum;
      } else {
        comparison = aVal.localeCompare(bVal, undefined, { numeric: true, sensitivity: 'base' });
      }

      return sortConfig.direction === 'desc' ? -comparison : comparison;
    });
  }, [rawRows, sortConfig, sortable]);

  const handleSort = (columnIndex) => {
    if (!sortable) return;
    
    let direction = 'asc';
    if (sortConfig.key === columnIndex && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: columnIndex, direction });
  };

  const getSortIcon = (columnIndex) => {
    if (!sortable) return '';
    if (sortConfig.key !== columnIndex) return ' ↕';
    return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
  };

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      {Columns.length > 0 && (
        <thead>
          <tr>
            {Columns.map((col, index) => (
              <th 
                key={index} 
                style={{ 
                  padding: "8px", 
                  borderBottom: "2px solid #ddd", 
                  textAlign: "left",
                  cursor: sortable ? "pointer" : "default",
                  userSelect: "none"
                }}
                onClick={() => handleSort(index)}
              >
                {col}{getSortIcon(index)}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {sortedRows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} style={{ padding: "16px 8px 0 8px", borderTop: "1px solid #ddd" }}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function NewDocsCell({ children }) {
  return <>{children}</>;
}

export function DocsTableRow({ children }) {
  return <>{children}</>;
}
