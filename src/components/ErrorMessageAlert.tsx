import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

interface ErrorSnackbarProps {
  errorMessage: string;
  open: boolean;
  onClose: () => void;
}

const ErrorSnackbar: React.FC<ErrorSnackbarProps> = ({ errorMessage, open, onClose }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <MuiAlert onClose={onClose} severity="error" elevation={6} variant="filled">
        {errorMessage}
      </MuiAlert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
