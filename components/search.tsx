
import styled from "@emotion/styled";
import SearchIcon from "@mui/icons-material/Search";
import { Box, InputAdornment, TextField } from "@mui/material";

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