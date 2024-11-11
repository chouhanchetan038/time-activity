import React, { useState, useEffect } from 'react';
import Active from './Active';
import Report from './Report';

const Main = () => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const storedActivities = JSON.parse(localStorage.getItem('activities'));
        if (storedActivities) {
            setActivities(storedActivities);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('activities', JSON.stringify(activities));
    }, [activities]);

    const updateActivities = (newActivities) => {
        setActivities(newActivities);
    };

    return (
        <div>
            <Active activities={activities} updateActivities={updateActivities} />
            <Report activities={activities} />
        </div>
    );
};

export default Main;
