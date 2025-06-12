import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const MuiTableWithBorders = () => {
  return (
    <TableContainer component={Paper} sx={{ width: "100%", overflowX: "auto" }}>
      <Table sx={{ minWidth: 800, borderCollapse: "collapse" }}>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                borderBottom: "2px solid black",
                borderRight: "1px solid gray",
              }}
            >
              Name
            </TableCell>
            <TableCell
              sx={{
                borderBottom: "2px solid black",
                borderRight: "1px solid gray",
              }}
            >
              Age
            </TableCell>
            <TableCell
              sx={{
                borderBottom: "2px solid black",
                borderRight: "1px solid gray",
              }}
            >
              City
            </TableCell>
            <TableCell
              sx={{
                borderBottom: "2px solid black",
                borderRight: "1px solid gray",
              }}
            >
              Country
            </TableCell>
            <TableCell
              sx={{
                borderBottom: "2px solid black",
                borderRight: "1px solid gray",
              }}
            >
              Email
            </TableCell>
            <TableCell sx={{ borderBottom: "2px solid black" }}>
              Phone
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell sx={{ borderRight: "1px solid gray" }}>
              John Doe
            </TableCell>
            <TableCell sx={{ borderRight: "1px solid gray" }}>30</TableCell>
            <TableCell sx={{ borderRight: "1px solid gray" }}>
              New York
            </TableCell>
            <TableCell sx={{ borderRight: "1px solid gray" }}>USA</TableCell>
            <TableCell sx={{ borderRight: "1px solid gray" }}>
              john.doe@example.com
            </TableCell>
            <TableCell>+1 234 567 890</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ borderRight: "1px solid gray" }}>
              Jane Doe
            </TableCell>
            <TableCell sx={{ borderRight: "1px solid gray" }}>28</TableCell>
            <TableCell sx={{ borderRight: "1px solid gray" }}>
              Los Angeles
            </TableCell>
            <TableCell sx={{ borderRight: "1px solid gray" }}>USA</TableCell>
            <TableCell sx={{ borderRight: "1px solid gray" }}>
              jane.doe@example.com
            </TableCell>
            <TableCell>+1 987 654 321</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MuiTableWithBorders;
