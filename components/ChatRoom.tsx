
import React, { useEffect, useRef, useState } from 'react';
import { TextField, Typography, Paper, Box } from '@mui/material';

interface Message {
    id: number;
    content: string;
    sender: string;
    timestamp: string;
}

const ChatRoom = () => {
    const messagesRef = useRef<null | HTMLDivElement>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');

    const handleSend = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.nativeEvent.isComposing) return;
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (inputValue.trim() !== '') {
                const newMessage: Message = {
                    id: messages.length + 1,
                    content: inputValue,
                    sender: 'Me',
                    timestamp: new Date().toLocaleString(),
                };
                setMessages([...messages, newMessage]);
                setInputValue('');
            }
        }
    };

    useEffect(() => {
        if (messagesRef.current)
            messagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <Box
            sx={{
                flexGrow: 1,
                overflowY: 'scroll',
                p: '16px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0 16px',
                    borderBottom: '1px solid #ddd',
                    height: 64,
                }}
            >
                <Typography variant="h5">Title</Typography>
            </Box>
            <Box
                sx={{
                    flexGrow: 1,
                    overflow: 'auto',
                    padding: '16px',
                }}
            >
                {messages.map((message) => (
                    <React.Fragment key={message.id}>
                        <Paper
                            sx={{
                                position: 'relative',
                                marginBottom: '20px',
                                padding: '8px',
                                width: '50%',
                                ...(message.sender === 'Me' && {
                                    marginLeft: 'auto',
                                }),
                            }}
                        >
                            {message.content}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '-16px',
                                    ...(message.sender === 'Me' ? { right: 0 } : { left: 0 }),
                                    display: 'inline-flex',
                                    fontSize: '12px',
                                    padding: '2px 6px',
                                    backgroundColor: '#E1F5FE',
                                    color: '#000',
                                    borderRadius: '4px',
                                }}
                            >
                                {message.timestamp}
                            </Box>
                        </Paper>
                        {message.sender !== 'Me' && (
                            <Typography
                                variant="caption"
                                sx={{
                                    color: 'gray',
                                    fontSize: '12px',
                                    marginTop: '4px',
                                }}
                            >
                                {message.sender}
                            </Typography>
                        )}
                        <div ref={messagesRef} />
                    </React.Fragment>
                ))}
            </Box>
            <Box>
                <TextField
                    sx={{
                        position: 'fixed',
                        bottom: 0,
                        marginBottom: '16px',
                    }}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleSend}
                    placeholder="Type a message"
                    fullWidth
                    multiline
                    minRows={1}
                />
            </Box>
        </Box>
    );
};

export default ChatRoom;
