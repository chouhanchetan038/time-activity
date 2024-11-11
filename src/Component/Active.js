import React, { useState, useEffect } from 'react';
// import './Active.css'; // Import the CSS file if needed

const Active = () => {
    const [activity, setActivity] = useState('');
    const [activityDate, setActivityDate] = useState('');
    const [output, setOutput] = useState([]);

    useEffect(() => {
        const storedActivities = JSON.parse(localStorage.getItem('activities'));
        if (storedActivities) {
            setOutput(storedActivities);
        }
        setActivityDate(new Date().toISOString().substring(0, 10)); // Set default date to today
    }, []);

    useEffect(() => {
        localStorage.setItem('activities', JSON.stringify(output));
    }, [output]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newActivity = {
            activity,
            date: activityDate, // Use selected date
            timer: 0,
            isActive: false,
            timerInterval: null
        };

        setOutput(prevOutput => [...prevOutput, newActivity]);
        setActivity('');  // Clear input after adding
        setActivityDate(new Date().toISOString().substring(0, 10)); // Reset date to today
    }

    const handleTimer = (index, action) => {
        setOutput(prevOutput => {
            const updatedActivities = [...prevOutput];
            const activity = updatedActivities[index];

            if (action === 'start') {
                if (activity.timerInterval) return prevOutput; // Timer already running

                activity.timerInterval = setInterval(() => {
                    setOutput(prevActivities => {
                        const updated = [...prevActivities];
                        updated[index].timer += 1;
                        return updated;
                    });
                }, 1000);
                activity.isActive = true;
            } else if (action === 'stop') {
                clearInterval(activity.timerInterval);
                activity.timerInterval = null;
                activity.isActive = false;
                // Persist the updated state to local storage when stopping
                localStorage.setItem('activities', JSON.stringify(updatedActivities));
            }

            return updatedActivities;
        });
    }

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    return (
        <>

        <br /><br /><br /><br />
        <section className="sign-in-form section-padding">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 mx-auto col-12">
                        <div className="row">
                            <div className="col-lg-8 col-11 mx-auto">
                                <br /><br />
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-12 d-flex">
                                        <div className='mb-10'>
                                            <input
                                                type="text"
                                                name='activity'
                                                value={activity}
                                                onChange={(e) => setActivity(e.target.value)}
                                                className="form-control"
                                                placeholder='Enter your Activity'
                                            />
                                        </div>
                                        <div className='mb-10 ms-3'>
                                            <input
                                                type="date"
                                                name='date'
                                                value={activityDate}
                                                onChange={(e) => setActivityDate(e.target.value)}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className='mb-2 ms-5'>
                                            <button type="submit" className="btn btn-primary">Add Activity</button>
                                        </div>
                                    </div>
                                </form>
                                <div>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Activity</th>
                                                <th>Date</th>
                                                <th>Timer</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                output.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.activity}</td>
                                                        <td>{item.date}</td>
                                                        <td>{formatTime(item.timer)}</td>
                                                        <td>
                                                            {item.isActive
                                                                ? <button
                                                                    className="btn btn-danger"
                                                                    onClick={() => handleTimer(index, 'stop')}>
                                                                    Stop
                                                                </button>
                                                                : <button
                                                                    className="btn btn-success"
                                                                    onClick={() => handleTimer(index, 'start')}>
                                                                    Start
                                                                </button>}
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
}

export default Active;
