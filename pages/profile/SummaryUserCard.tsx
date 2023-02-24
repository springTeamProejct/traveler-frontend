import { Avatar, Box, Button, Typography } from '@mui/material'
import React from 'react'

export const SummaryUserCard = () => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', boxShadow: '0px 3px 6px #00000029' }}>
            <Avatar sx={{ width: 120, height: 120 }} alt="User Avatar" src="/path/to/avatar.png" />
            <Typography variant="h4" sx={{ mt: 2 }}>이환주</Typography>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>hwanju1596@gmail.com</Typography>
            <Button variant="contained" color="primary">수정</Button>
        </Box>
    );
    return (
        <Box sx={{
            display: 'flex', alignItems: 'center',
            border: '1px solid',
            justifyContent: 'center'
        }}>
            <Avatar sx={{
                width: { xs: 64, sm: 80, md: 100, lg: 120, xl: 140 },
                height: { xs: 64, sm: 80, md: 100, lg: 120, xl: 140 },
            }}
                alt="User Avatar"
            />
            <Typography>
                email: {'test'}
            </Typography>
        </Box >
    )
}
