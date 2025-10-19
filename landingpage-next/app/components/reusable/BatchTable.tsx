'use client'

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export interface Batch {
  name: string;
  language: string;
  date: string;
  time: string;
  status: string;
  statusColor: string;
}

interface BatchTableProps {
  batches: Batch[];
  headerGradient?: string; // allow dynamic gradient
  textColor?: string;      // dynamic text color for rows
}

export default function BatchTable({ batches, headerGradient, textColor }: BatchTableProps) {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      background: headerGradient || 'transparent', // use prop
      color: theme.palette.common.white,
      fontWeight: 600,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      color: textColor || theme.palette.grey[900], // use prop
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.grey[50],
    },
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.grey[100],
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: 'none',
        borderRadius: '1rem',
        overflow: 'hidden',
      }}
    >
      <Table aria-label="batch table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Batch</StyledTableCell>
            <StyledTableCell>Language</StyledTableCell>
            <StyledTableCell>Start Date</StyledTableCell>
            <StyledTableCell>Time</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {batches.map((batch) => (
            <StyledTableRow key={batch.name}>
              <StyledTableCell>{batch.name}</StyledTableCell>
              <StyledTableCell>{batch.language}</StyledTableCell>
              <StyledTableCell>{batch.date}</StyledTableCell>
              <StyledTableCell>{batch.time}</StyledTableCell>
              <StyledTableCell>
                <span className={`px-3 py-1 rounded-full text-sm ${batch.statusColor}`}>
                  {batch.status}
                </span>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
