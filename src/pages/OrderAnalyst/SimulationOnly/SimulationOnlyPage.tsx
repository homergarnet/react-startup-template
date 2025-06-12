import { MoreVert } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  IconButton,
  Menu,
  MenuItem,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";

interface RowData {
  id: number;
  name: string;
  details: string[];
}

const rows: RowData[] = [
  { id: 1, name: "Row 1", details: ["Detail 1.1", "Detail 1.2"] },
  { id: 2, name: "Row 2", details: ["Detail 2.1", "Detail 2.2"] },
  { id: 3, name: "Row 3", details: ["Detail 3.1", "Detail 3.2"] },
];
const SimulationOnlyPage = () => {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const toggleRow = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Action</TableCell>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <React.Fragment key={row.id}>
              {/* Main Row */}
              <TableRow>
                <TableCell>
                  <IconButton onClick={() => toggleRow(row.id)}>
                    {expandedRows.includes(row.id) ? (
                      <RemoveIcon />
                    ) : (
                      <AddIcon />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell>{row.name}</TableCell>
              </TableRow>
              {/* Expandable Rows */}
              <TableRow>
                <TableCell
                  style={{ paddingBottom: 0, paddingTop: 0 }}
                  colSpan={2}
                >
                  <Collapse
                    in={expandedRows.includes(row.id)}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Box margin={1}>
                      {row.details.map((detail, index) => (
                        <TableRow key={index}>
                          <TableCell colSpan={2}>{detail}</TableCell>
                        </TableRow>
                      ))}
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SimulationOnlyPage;
