import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import { SummaryActivityCard } from "./SummaryActivityCard";
import { SummaryUserCard } from "./SummaryUserCard";

export const Profile = () => {
  return (
    <Grid sx={{ mt: 2 }} container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">프로필</Typography>
      </Grid>
      <Grid item xs={12} md={3}>
        <SummaryUserCard />
      </Grid>
      <Grid item xs={12} md={9}>
        <SummaryActivityCard />
      </Grid>
    </Grid>
  );
};

export default Profile;
