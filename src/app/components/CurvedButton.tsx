import { Button, ButtonProps, styled } from '@mui/material';
import React from 'react';

interface CurvedButtonProps extends ButtonProps {
  component?: React.ElementType;
  href?: string;
  download?: boolean;
}

const CurvedButton = styled(Button)<CurvedButtonProps>(({ theme }) => ({
  borderRadius: '50px',
  padding: '10px 20px',
  textTransform: 'none',
  backgroundColor: '#fff',
  color: theme.palette.text.primary,
  border: '1px solid rgba(0, 0, 0, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    border: '1px solid transparent',
  },
}));

export default CurvedButton; 