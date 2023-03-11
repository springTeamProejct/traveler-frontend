
import React, { useState } from "react";

import ChatIcon from '@mui/icons-material/Chat';
import { Box, Fab } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface ChatMainBoxProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChatMainBox = ({ setOpen }: ChatMainBoxProps) => {
    const handleClose = () => {
        setOpen((value) => !value);
    };

    return (
        <>
            <Box
                sx={{
                    width: '400px',
                    height: '600px',
                    border: '1px solid black',
                    borderRadius: 5,
                    position: 'fixed',
                    right: 20,
                    bottom: 20,
                }}
            >
                <IconButton
                    sx={{ position: 'absolute', top: 5, right: 5 }}
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>
            </Box>
        </>
    );
}

const ChatController = () => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            {
                open ?
                    <Fab onClick={handleClick}
                        variant="circular"
                        sx={{
                            position: 'fixed',
                            bottom: 20,
                            right: 20,
                        }}>
                        <ChatIcon />
                    </Fab>
                    :
                    <ChatMainBox setOpen={setOpen} />
            }
        </>
    );
};

export default ChatController;