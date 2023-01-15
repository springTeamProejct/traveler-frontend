import { useState, useEffect } from "react";

export function useCountdownTimer(seconds: number) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  // const formattedTimeLeft = new Date(timeLeft * 1000).toISOString().substr(11, 8);
  const formattedTimeLeft = new Date(timeLeft * 1000)
    .toISOString()
    .substr(14, 5);

  return { timeLeft, formattedTimeLeft, setTimeLeft };
}
