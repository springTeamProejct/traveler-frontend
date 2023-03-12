import React from 'react';
import { Chat as ChatIcon } from '@mui/icons-material';
import {
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from '@mui/material';

interface ChatRoom {
    chatRoomId: string;
    title: string;
    lastMessage: string;
    lastMessageAt: Date;
}

interface ChatRoomListBoxProps {
    chatRooms: ChatRoom[];
    onChatRoomClick: (chatRoomId: string) => void;
}

function ChatRoomListBox({ chatRooms, onChatRoomClick }: ChatRoomListBoxProps) {

    return (
        <List sx={{ bgcolor: 'background.paper' }}>
            {chatRooms.map((chatRoom) => (
                <div key={chatRoom.chatRoomId}>
                    <ListItem
                        alignItems="flex-start"
                        sx={{
                            cursor: 'pointer',
                            '&:hover': {
                                bgcolor: 'action.hover',
                            },
                        }}
                        onClick={() => onChatRoomClick(chatRoom.chatRoomId)}
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <ChatIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={chatRoom.title}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{
                                            display: 'inline',
                                            fontWeight: 'bold',
                                        }}
                                        component="span"
                                        variant="body2"
                                        color="text.Primary"
                                    >
                                        {chatRoom.lastMessage}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            right: 0,
                                        }}
                                        component="span"
                                        variant="caption"
                                        color="text.Secondary"
                                    >
                                        {chatRoom.lastMessageAt.toLocaleString()}
                                    </Typography>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </div>
            ))}
        </List>
    );
}

export default ChatRoomListBox;
