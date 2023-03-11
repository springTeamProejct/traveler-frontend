
import React, { useState } from "react";

import ChatIcon from '@mui/icons-material/Chat';
import { Box, Fab } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ChatList from "../components/ChatList";
import { chatRooms } from "./tempDatas";

interface ChatMainBoxProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChatMainBox = ({ setOpen }: ChatMainBoxProps) => {
    const handleClose = () => {
        setOpen((value) => !value);
    };
    const onChatRoomClick = (chatRoomId: string) => {
        console.log("🚀 ~ file: Chat.tsx:20 ~ ChatMainBox ~ value:", chatRoomId)
    }
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
                    overflow: 'auto',
                    overflowY: 'scroll',
                    paddingTop: '100px',

                }}
            >
                <IconButton
                    sx={{ position: 'absolute', top: 5, right: 5, zIndex: 999 }}
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>
                <ChatList chatRooms={chatRooms} onChatRoomClick={onChatRoomClick} />
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