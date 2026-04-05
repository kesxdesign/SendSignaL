import React from 'react';
import './LeadsTable.css';

const MOCK_LEADS = [
  { id: 1, first: 'Sarah', last: 'Connor', phone: '+1 555-0192', source: 'Web', status: 'NEW' },
  { id: 2, first: 'John', last: 'Wick', phone: '+1 555-0234', source: 'Import', status: 'REPLIED' },
  { id: 3, first: 'Neo', last: '', phone: '+1 555-0899', source: 'Manual', status: 'CONTACTED' },
  { id: 4, first: 'Trinity', last: '', phone: '+1 555-0900', source: 'Manual', status: 'OPTED_OUT' },
];

const LeadsTable = () => {
  return (
    <div className="table-container">
      <table className="standard-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Source</th>
            <th>Status</th>
            <th className="action-col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {MOCK_LEADS.map(lead => (
            <tr key={lead.id}>
              <td>{lead.first} {lead.last}</td>
              <td>{lead.phone}</td>
              <td>{lead.source}</td>
              <td>
                <span className={`status-badge ${lead.status.toLowerCase()}`}>{lead.status}</span>
              </td>
              <td className="action-col">
                <button className="text-primary-link action-btn">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadsTable;
