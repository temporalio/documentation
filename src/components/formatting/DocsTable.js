import React from "react";

export default function DocsTable({ Columns, children }) {
  const childArray = React.Children.toArray(children);
  const columnsPerRow = Columns.length;

  const rows = [];
  let currentRow = [];
  let currentCell = [];

  childArray.forEach((child) => {
    if (child.type === NewDocsCell) {
      currentRow.push(
        <td key={currentRow.length} style={{ padding: "16px 8px 0 8px", borderTop: "1px solid #ddd" }}>
          {currentCell.length > 0 ? currentCell.flat() : null}
        </td>
      );
      currentCell = [];

      if (currentRow.length === columnsPerRow) {
        rows.push([...currentRow]);
        currentRow = [];
      }
    } else {
      currentCell.push(child);
    }
  });

  if (currentCell.length > 0) {
    currentRow.push(
      <td key={currentRow.length} style={{ padding: "8px 8px 0 8px", borderTop: "1px solid #ddd" }}>
        {currentCell.flat()}
      </td>
    );
  }

  if (currentRow.length > 0) {
    while (currentRow.length < columnsPerRow) {
      currentRow.push(
        <td key={currentRow.length} style={{ padding: "8px 8px 0 8px", borderTop: "1px solid #ddd" }}>
          {""}
        </td>
      );
    }
    rows.push([...currentRow]);
  }

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      {Columns.length > 0 && (
        <thead>
          <tr>
            {Columns.map((col, index) => (
              <th key={index} style={{ padding: "8px", borderBottom: "2px solid #ddd", textAlign: "left" }}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>{row}</tr>
        ))}
      </tbody>
    </table>
  );
}

export function NewDocsCell() {
  return null;
}
