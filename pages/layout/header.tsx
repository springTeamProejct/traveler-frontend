import React from "react";
import {
    IconButton,
    Box,
    Badge,
    AppBar,
    Popover,
    Menu,
    MenuItem,
    Typography,
    Button,
    Avatar,
    Tooltip,
} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from '@mui/icons-material/Menu';

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

const LeftItems = () => {
    //     const pages = [
    //         { '게시판': '/board' },
    //     ]
    const pages = [
        { name: '게시판', path: '/board' },
        { name: '여행동행', path: '/' },
        { name: '채팅', path: '/' }
    ]

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                    }}
                >
                    {pages.map((page) => (
                        <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                            <Typography textAlign="center">{page.name}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                    <Button
                        key={page.name}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        {page.name}
                    </Button>
                ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>


            </Box>
        </>
    );
}
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
                <LeftItems />
                <Box sx={{ flexGrow: 1 }} />
                <NotificationsButton />
                <Tooltip title="Open settings">
                    <IconButton onClick={() => ''} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
    );
};
