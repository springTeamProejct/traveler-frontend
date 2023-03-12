
import React, { useEffect, useState } from "react";

import ChatIcon from '@mui/icons-material/Chat';
import { Box, Fab, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { chatRooms } from "./tempDatas";
import ChatRoomList from "../components/ChatRoomList";
import ChatRoom from "../components/ChatRoom";

interface ChatControllerProps {
}

const ChatController = () => {
    const [open, setOpen] = useState(false);
    const [openTempChatRoom, setOpenTempChatRoom] = useState(false);
    const [chatRoomId, setChatRoomId] = useState<number>();

    const handleFABClick = () => {
        setOpen(!open);
    };
    const handleClose = () => {
        setOpen((value) => !value);
    };
    const onChatRoomClick = (chatRoomId: number) => {
        setChatRoomId(chatRoomId);
        setOpenTempChatRoom(!openTempChatRoom);
    }

    useEffect(() => {


    }, [chatRoomId]);

    return (
        <>
            {
                open ?
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
                        <Stack spacing={3} >
                            <IconButton
                                sx={{ height: '10px', position: 'absolute', top: 5, right: 5, zIndex: 999 }}
                                onClick={handleClose}
                            >
                                <CloseIcon />
                            </IconButton>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '573px',
                                    borderRadius: 5,
                                    overflow: 'auto',
                                    overflowY: 'scroll',
                                }}>
                                {
                                    openTempChatRoom ?
                                        <ChatRoom setGotoList={setOpenTempChatRoom} />
                                        :
                                        <ChatRoomList chatRooms={chatRooms} onChatRoomClick={onChatRoomClick} />
                                }
                            </Box>
                        </Stack>
                    </Box>
                    :
                    <Fab onClick={handleFABClick}
                        variant="circular"
                        sx={{
                            position: 'fixed',
                            bottom: 20,
                            right: 20,
                        }}>
                        <ChatIcon />
                    </Fab>
            }
        </>
    );
};

export default ChatController;