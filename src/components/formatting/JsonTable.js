import React, { useState, useEffect } from 'react';

const JsonTable = ({ filename }) => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(filename);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        if (typeof jsonData !== 'object' || !jsonData.columns || !jsonData.rows ||
            !Array.isArray(jsonData.columns) || !Array.isArray(jsonData.rows)) {
          throw new Error('Invalid JSON structure: Expected object with "columns" and "rows" as arrays');
        }
        const cols = jsonData.columns;
        const rows = jsonData.rows;
        // Optional validation: check if all rows are arrays and match column length
        if (rows.some(row => !Array.isArray(row) || row.length !== cols.length)) {
          throw new Error('Invalid rows: Each row must be an array matching the number of columns');
        }
        setHeaders(cols);
        setData(rows);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filename]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className='theme-admonition theme-admonition-warning alert alert--danger admonition_WoCw'>Please reload the page to see this table.</div>;
  }

  if (data.length === 0 || headers.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((header, colIndex) => (
              <td key={`${rowIndex}-${colIndex}`} style={{ border: '1px solid #ddd', padding: '8px' }}>
                {row[colIndex]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default JsonTable;