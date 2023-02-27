import { useEffect, useState } from "react";
import { useCountdownTimer } from "../hooks/useCountdownTimer";
import { FormControl } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";

interface InputAndTimerProps {
    timerStart: boolean;
    handleComplete: (completedValue: string) => void
}

export const InputAndTimer = ({ timerStart: TimerStart, handleComplete }: InputAndTimerProps) => {
    const [value, setValue] = useState('');
    const { timeLeft, formattedTimeLeft, setTimeLeft } = useCountdownTimer(0);

    useEffect(() => {
        setTimeLeft(180);
    }, [TimerStart]);
    const handleChange = (newValue: string) => {
        setValue(newValue);
    }

    return (
        <>
            <FormControl variant="standard">
                <MuiOtpInput
                    TextFieldsProps={{
                        // color: 'success'
                    }}
                    id="auth-input"
                    value={value}
                    onChange={handleChange}
                    onComplete={handleComplete}
                    length={6}
                />
                {formattedTimeLeft}
            </FormControl>
        </>
    );
}
