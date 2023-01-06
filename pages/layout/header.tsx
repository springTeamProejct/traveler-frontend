import React from "react";
import {
    IconButton,
    Box,
    Badge,
    AppBar,
    Popover,
} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import NotificationsIcon from "@mui/icons-material/Notifications";

const NotificationsButton = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <IconButton size="large" color="primary" onClick={handleClick}>
                <Badge badgeContent={4} color="error">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <Popover
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                id={id}
                open={open}
                onClose={handleClose}
                anchorEl={anchorEl}
            >
                <Box sx={{ border: 1, p: 1, bgcolor: "primary", backgroundColor: 'primary.dark', width: 200, height: 200 }}>
                    The content of the Popper.
                </Box>
            </Popover>
        </>
    );
};

export default function Header() {
    return (
        <AppBar color="default">
            <Toolbar
                disableGutters
                sx={{
                    minHeight: 64,
                    left: 0,
                    px: 2,
                }}
            >
                <Box sx={{ flexGrow: 1 }} />
                <NotificationsButton />
            </Toolbar>
        </AppBar>
    );
};
