import React, { useState } from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import WatchRecord from "../components/WatchRecord";
import { useAuthContext } from "../context/AuthContext";
import { getWatchVideoRecord } from '../api/firebase';

export default function ViewRecord() {
  const {user} = useAuthContext();
  const [records, setRecords] = useState();
  getWatchVideoRecord(user.uid)
    .then(setRecords);

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{fontWeight:'bold'}}>나의 시청기록</Typography>
      {records && (
        <Grid container spacing={1}>
          {records.map(record => (
            <Grid item xs={12} md={6} xl={4}>
              <WatchRecord record={record} key={record.id} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  )
}