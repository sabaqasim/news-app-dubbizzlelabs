import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

const PageLoader: React.FC = () => {
  return (
    <Grid container alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
      <Box>
        <CircularProgress />
      </Box>
    </Grid>
  );
};

export default PageLoader;
