
import React, { useState } from "react";

import ChatIcon from '@mui/icons-material/Chat';
import { Box, Fab } from '@mui/material';

export const ChatMainBox = () => {

    return (
        <Box
            sx={{
                width: '400px',
                height: '600px',
                border: '1px solid black',
                borderradius: 20,
                position: 'fixed',
                right: 20,
                bottom: 20,
            }
            }>
        </Box >
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
                    <ChatMainBox />
            }
        </>
    );
};

export default ChatController;