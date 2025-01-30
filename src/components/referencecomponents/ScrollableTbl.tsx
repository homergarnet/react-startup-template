import { MoreVert } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

interface Row {
  name: string;
  age: number;
  city: string;
}

const ScrollableTbl = () => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof Row | "">("");
  const [displayedRows, setDisplayedRows] = useState<Row[]>([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 20;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    age: true,
    city: true,
  });

  const allRows: Row[] = [
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "Eve", age: 35, city: "Houston" },
    { name: "John", age: 25, city: "New York" },
    { name: "Alice", age: 30, city: "Los Angeles" },
    { name: "Bob", age: 22, city: "Chicago" },
    { name: "End", age: 35, city: "End" },
  ];

  const totalPages = Math.ceil(allRows.length / rowsPerPage);

  const handleSort = (property: keyof Row) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleResetSort = () => {
    setOrder("asc");
    setOrderBy("");
  };

  const loadMoreRows = () => {
    const startIndex = page * rowsPerPage;
    const newRows = allRows.slice(startIndex, startIndex + rowsPerPage);
    setDisplayedRows((prev) => [...prev, ...newRows]);
    setPage((prev) => prev + 1);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const scrollPosition = scrollTop + clientHeight;
    if (scrollPosition >= scrollHeight * 0.9 && page < totalPages) {
      loadMoreRows();
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleColumnToggle = (column: keyof Row) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  useEffect(() => {
    setDisplayedRows(allRows.slice(0, rowsPerPage));
  }, []);

  const sortedRows = [...displayedRows].sort((a, b) => {
    if (!orderBy) return 0;
    if (a[orderBy] < b[orderBy]) {
      return order === "asc" ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" marginBottom={2}>
        <Button variant="outlined" onClick={handleResetSort}>
          Reset Sort
        </Button>
        <IconButton onClick={handleMenuOpen}>
          <MoreVert />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {Object.keys(visibleColumns).map((column) => (
            <MenuItem
              key={column}
              onClick={() => handleColumnToggle(column as keyof Row)}
            >
              <Checkbox checked={visibleColumns[column as keyof Row]} />
              {column.charAt(0).toUpperCase() + column.slice(1)}
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <TableContainer
        component={Paper}
        onScroll={handleScroll}
        sx={{
          width: "70%",
          height: "calc(100vh - 490px)",
          overflowY: "auto",
          padding: "10px 20px",
          borderRadius: "20px",
          boxShadow: "none",
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#2b4b81",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {visibleColumns.name && (
                <TableCell
                  sx={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "white",
                    zIndex: 1,
                  }}
                >
                  <TableSortLabel
                    active={orderBy === "name"}
                    direction={orderBy === "name" ? order : "asc"}
                    onClick={() => handleSort("name")}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
              )}
              {visibleColumns.age && (
                <TableCell
                  sx={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "white",
                    zIndex: 1,
                  }}
                >
                  <TableSortLabel
                    active={orderBy === "age"}
                    direction={orderBy === "age" ? order : "asc"}
                    onClick={() => handleSort("age")}
                  >
                    Age
                  </TableSortLabel>
                </TableCell>
              )}
              {visibleColumns.city && (
                <TableCell
                  sx={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "white",
                    zIndex: 1,
                  }}
                >
                  <TableSortLabel
                    active={orderBy === "city"}
                    direction={orderBy === "city" ? order : "asc"}
                    onClick={() => handleSort("city")}
                  >
                    City
                  </TableSortLabel>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.map((row, index) => (
              <TableRow key={index}>
                {visibleColumns.name && <TableCell>{row.name}</TableCell>}
                {visibleColumns.age && <TableCell>{row.age}</TableCell>}
                {visibleColumns.city && <TableCell>{row.city}</TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={2} display="flex" justifyContent="center">
        <Typography variant="body1">
          Page {page} of {totalPages}
        </Typography>
      </Box>
    </Box>
  );
};

export default ScrollableTbl;
