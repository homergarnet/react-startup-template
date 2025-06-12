import React from 'react';
import { TablePagination, TablePaginationProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomTablePagination = styled(TablePagination)(() => ({
  color: '#1C2C5A',
}));

const StyledTablePagination: React.FC<TablePaginationProps> = (props) => {
  return <CustomTablePagination {...props} />;
};

export default StyledTablePagination;
