import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
    seconds: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = (props: CountdownTimerProps) => {
    const [timeLeft, setTimeLeft] = useState(props.seconds);

    useEffect(() => {
        if (!timeLeft) return;

        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft]);

    const formattedTimeLeft = new Date(timeLeft * 1000).toISOString().substr(11, 8);

    const handleStartClick = () => {
        setTimeLeft(props.seconds);
    }

    return (
        <div>
            {timeLeft > 0 ? formattedTimeLeft : "Time's up!"}
            <button onClick={handleStartClick}>Start</button>
        </div>
    );
};

export default CountdownTimer;