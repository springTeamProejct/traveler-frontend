import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
    Button,
    IconButton,
    Fade,
    Box,
    Badge,
    AppBar,
    Modal,
    styled,
    TextField,
    InputAdornment,
    Popover,
} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import NotificationsIcon from "@mui/icons-material/Notifications";

const SearchBoxStyle = styled(Box)(
    ({ theme }) => `
    // background-color:${theme.palette.primary.main};
    background-color: white;
    border-radius: 10px;
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, .2);
    border: "2px solid #000";
    
    // 임시로 생성 모바일, 데스크탑 나눌 예정
    width: 400px;
    height: 400px;
`
);

const SearchBox = () => {
    return (
        <>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <TextField
                    autoFocus
                    sx={{ m: 1 }}
                    fullWidth
                    placeholder=""
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    variant="standard"
                />
            </Box>
        </>
    );
};

const SearchBoxOpenButton = () => {
    const [searchModalOpen, setSearchModalOpen] = React.useState(false);
    const handleOpen = () => setSearchModalOpen(true);
    const handleClose = () => setSearchModalOpen(false);

    return (
        <>
            <Button
                onClick={handleOpen}
                variant="outlined"
                startIcon={<SearchIcon />}
            >
                검색
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={searchModalOpen}
                onClose={handleClose}
                closeAfterTransition
            >
                <Fade in={searchModalOpen}>
                    <SearchBoxStyle>
                        <SearchBox />
                    </SearchBoxStyle>
                </Fade>
            </Modal>
        </>
    );
};

const NotificationsButton = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

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
                <SearchBoxOpenButton />
                <NotificationsButton />
            </Toolbar>
        </AppBar>
    );
};
