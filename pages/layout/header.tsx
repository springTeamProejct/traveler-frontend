import React from "react";
import {
    IconButton,
    Box,
    Badge,
    AppBar,
    Popover,
    Button,
    Avatar,
    Tooltip,
} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuthContext } from "../../context/AuthContext";
import {useRouter} from 'next/router'
import { Stack } from "@mui/system";

const LeftItems = () => {
    const pages = [
        { name: '게시판', path: '/' },
        { name: '여행동행', path: '/' },
        { name: '채팅', path: '/' }
    ]
	const router = useRouter();
    const handleClickIcon = (path: string) => {
        router.push(path);
    };

    return (
        <Stack direction="row" spacing={2}>
            {pages.map((page) => (
                <Button
                    // variant='outlined'
                    key={page.name}
                    value={page.name}
                    onClick={() => handleClickIcon(page.path)}
                >
                    {page.name}
                </Button>
            ))}
        </Stack>
    );
}

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

const RightItems = () => {
    const { user } = useAuthContext();
    const isLogin = (user !== null);
    const isExistProfileImage = (user !== undefined && user !== null && user.profileUrl !== null);
	const router = useRouter();
    const handleLoginClick = () => router.push('/login');
    const handleProfileClick = () => {

    }

    return (
        <>
        { isLogin
            ? <>
                <NotificationsButton />
                <Tooltip title="Open settings">
                    <IconButton onClick={handleProfileClick} sx={{ p: 0 }}>
                        {isExistProfileImage
                            ? <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            : <AccountCircleIcon style={{ height: '3rem', width: '3rem' }} />
                        }
                    </IconButton>
                </Tooltip>
            </>
            : <Button
                // variant='outlined'
                key={'login'}
                onClick={handleLoginClick}
            >
                {'login'}
            </Button>
        }
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
                <RightItems />
            </Toolbar>
        </AppBar>
    );
};
