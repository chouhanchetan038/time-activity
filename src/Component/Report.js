import React, { useState, useEffect } from 'react';
import './Report.css'; // Import the CSS file

const Report = () => {
  const [reports, setReports] = useState([]);
  const [currentDate, setCurrentDate] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const storedReports = JSON.parse(localStorage.getItem('activities')); // Use 'activities' key to get the data
    if (storedReports) {
      setReports(storedReports);
    }
    setCurrentDate(new Date().toLocaleDateString()); // Set current date on component mount
    setSelectedDate(new Date().toISOString().substring(0, 10)); // Set default selected date to today
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const filteredReports = reports.filter(report => 
    new Date(report.date).toISOString().substring(0, 10) === selectedDate
  );

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <>
      <br /><br />
      <br /><br /><br /><br /><br /><br /><br /><br />
      <div className="container">
        <h2>Report</h2>
        <div>
          
        </div>
        <div>
          <form>
            <label htmlFor="date">Select Date:</label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="form-control"
            />
          </form>
        </div>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Activity</th>
                <th>Timer</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.length > 0 ? (
                filteredReports.map((report, index) => (
                  <tr key={index}>
                    <td>{report.activity}</td>
                    <td>{formatTime(report.timer)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="no-reports">No reports available for the selected date</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Report;
