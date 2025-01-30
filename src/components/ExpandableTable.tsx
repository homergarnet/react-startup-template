import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Collapse,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

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

const ExpandableTable: React.FC = () => {
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

export default ExpandableTable;
