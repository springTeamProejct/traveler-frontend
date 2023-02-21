import { Container, Grid } from '@mui/material'
import React from 'react'
import { SummaryActivityCard } from './SummaryActivityCard'
import { SummaryUserCard } from './SummaryUserCard'

export const Profile = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <SummaryUserCard />
            </Grid>
            <Grid item xs={9}>
                <SummaryActivityCard />
            </Grid>
        </Grid >
    )
}

export default Profile;