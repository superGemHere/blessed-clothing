import React from 'react';
import { Pagination as MUIPagination } from '@mui/material';

export default function Pagination({
  count,
  page,
  onChange,
  color = 'primary',
  size = 'medium',
  showFirstButton = false,
  showLastButton = false,
  variant = variant,
  shape = shape,
}) {
  return (
    <MUIPagination
      style={{width: '100%', display: 'flex', justifyContent: 'center', margin: '20px 0'}}
      shape = {shape}
      variant={variant}
      count={count}
      page={page}
      onChange={onChange}
      color={color}
      size={size}
      showFirstButton={showFirstButton}
      showLastButton={showLastButton}
    />
  );
}