import React, { useState } from "react";
import "../styles/style.css"

export default function TreeGrid({ data }) {
    const [expandedRows, setExpandedRows] = useState({});
  
    const toggleRow = (rowId) => {
      setExpandedRows((prevExpandedRows) => ({
        ...prevExpandedRows,
        [rowId]: !prevExpandedRows[rowId],
      }));
    };
  
    const renderRows = (rows) => {
      return rows.map((row) => (
        <React.Fragment key={row.taskID}>
          <tr className={row.subtasks ? "parent" : "child"}>
            <td>{row.taskID}</td>
            <td>
              <button onClick={() => toggleRow(row.taskID)}>{expandedRows[row.taskID] ? '-' : '+'}</button>
              {row.taskName}
            </td>
            <td>{row.startDate.toDateString()}</td>
            <td>{row.duration}</td>
            <td>{row.progress}</td>
            <td>{row.priority}</td>
            <td>{row.approved ? 'Yes': 'No'}</td>
          </tr>
          {expandedRows[row.taskID] && row.subtasks && renderRows(row.subtasks)}
        </React.Fragment>
      ));
    };
  
    return (
      <div className="tree-grid-container">
        <table className="tree-grid">
          <thead>
            <tr>
              <th>Task ID</th>
              <th>Task Name</th>
              <th>Start Date</th>
              <th>Duration(in days)</th>
              <th>Progress</th>
              <th>Priority</th>
              <th>Approved</th>
            </tr>
          </thead>
          <tbody>
            {renderRows(data)}
          </tbody>
        </table>
      </div>
    );
  }