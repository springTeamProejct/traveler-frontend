import { Avatar, Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import EditProfile from "./EditPorfile";

export const SummaryUserCard = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ boxShadow: "0px 3px 6px #00000029" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          p: 2,
        }}
      >
        <Avatar sx={{ width: 120, height: 120 }} alt="User Avatar" />
        <Typography variant="h4" sx={{ mt: 2 }}>
          이환주
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          hwanju1596@gmail.com
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          수정
        </Button>
      </Box>
      <EditProfile open={open} handleClose={handleClose} />
    </Box>
  );
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        border: "1px solid",
        justifyContent: "center",
      }}
    >
      <Avatar
        sx={{
          width: { xs: 64, sm: 80, md: 100, lg: 120, xl: 140 },
          height: { xs: 64, sm: 80, md: 100, lg: 120, xl: 140 },
        }}
        alt="User Avatar"
      />
      <Typography>email: {"test"}</Typography>
    </Box>
  );
};
