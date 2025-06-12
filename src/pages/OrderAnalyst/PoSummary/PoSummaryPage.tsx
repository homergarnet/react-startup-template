import {
  Box,
  Grid,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Typography,
  TextField,
  InputAdornment,
  MenuItem,
  CircularProgress,
  Pagination,
  Paper,
  Divider,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  styled,
} from "@mui/material";
import {
  ArrowDropUp as ArrowDropUpIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from "@mui/icons-material";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useCallback, useEffect, useState } from "react";
import { Search as SearchIcon } from "@mui/icons-material/";
import axios, { AxiosRequestConfig } from 'axios';
import ModalComponent from "../../../Components/Common/ModalComponent";
import AddIcon from "@mui/icons-material/Add";
import ILocations from "../../_Interface/ILocations";
import IRoles from "../../_Interface/IRoles";
import IUsers from "./Interface/IPoSummary";
import IPagination from "../../_Interface/IPagination";
import api from "../../../Config/AxiosConfig";
import StyledScrollBoxDynamic  from "../../../Components/ReusableComponents/ScrollBarComponents/StyledScrollBarDynamic";
import StyledTableCellHeader from "../../../Components/ReusableComponents/TableComponents/StyledTableCellHeader";
import StyledTableCellBody from "../../../Components/ReusableComponents/TableComponents/StyledTableCellBody";
import StyledTableCellNoData from "../../../Components/ReusableComponents/TableComponents/StyledTableCellNoData";
import StyledButton from "../../../Components/ReusableComponents/ButtonComponents/StyledButton";
import StyledSnackBar from "../../../Components/ReusableComponents/NotificationComponents/StyledAlert";
import IOrderForm from "./Interface/IPoSummary";
import IOrderFormDetails from "./Interface/IPoSummary";
import StyledTableSearchBar from "../../../Components/ReusableComponents/TableComponents/StyledTableSearchBar";
import StyledLabel from "../../../Components/ReusableComponents/LabelComponent/StyledLabel";
import StyledIcon from "../../../Components/ReusableComponents/IconComponents/StyledIcon";

const PoSummaryPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<"error" | "warning" | "info" | "success">("success");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);
  const [pageCount, setPageCount] = useState<number>(0);
  const [columnToSort, setColumnToSort] = useState<string>("");
  const [orderBy, setOrderBy] = useState<string>("asc");
  const [orderForms, setOrderForms] = useState<IOrderForm[]>([] as IOrderForm[]);
  const [orderFormsDetails, setOrderFormsDetails] = useState<IOrderFormDetails[]>([] as IOrderFormDetails[]);
  const [lastSyncDate, setLastSyncDate] = useState<string>("MMMM dd, yyyy");
  const [expanded, setExpanded] = useState(false);
  const [transitionDuration, setTransitionDuration] = useState('0.5s');
  const [height, setHeight] = useState('600px');

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackbarOpen(false);
  };

  const fetchWorkSheet = useCallback(async (
    pageNumber: number,
    pageSize: number,
    searchQuery: string | null,
    columnToSort: string | null,
    orderBy: string | null
  ) => {
    try {
      setLoading(true);
      console.log("Fetching worksheet..."); // Add this for debugging
      const params: IPagination = {
        PageNumber: pageNumber,
        PageSize: pageSize,
        SearchQuery: searchQuery,
        ColumnToSort: columnToSort,
        OrderBy: orderBy,
      };
  
      const config: AxiosRequestConfig = {
        method: "POST",
        url: `/WorkSheet/GetWorkSheetListAsync`,
        data: params,
      };
  
      const response = await api(config);
      console.log("Response received:", response.data); // Add this for debugging
      setLastSyncDate(response.data.SyncDate);
      setOrderFormsDetails(response.data.Details);
      setOrderForms(response.data.List);
      setPageCount(response.data.TotalPages);
    } catch (error) {
      console.error("Error fetching item:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = (sku: string) => {
    if (sku) {
      setSearchQuery(sku);
      setTimeout(() => {
        fetchWorkSheet(page, itemsPerPage, sku, columnToSort, orderBy);
      }, 0);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = new Intl.DateTimeFormat('en-GB', { day: 'numeric' }).format(date);
    const month = new Intl.DateTimeFormat('en-GB', { month: 'short' }).format(date);
    return `${day}-${month}`;
  };

  useEffect(() => {
    if (expanded) {
      // Set height when expanding
      setHeight('360px');
      setTransitionDuration('0.5s'); // No transition during expansion
    } else {
      // Set height when collapsing
      setHeight('525px');
      setTransitionDuration('3.5'); // Apply transition during collapse
    }
  }, [expanded]);

  const StyledScrollBoxDynamic = styled(Box)<{ dynamicHeight?: string; transitionDuration?: string }>(({ dynamicHeight, transitionDuration }) => ({
    overflowY: 'auto',
    height: dynamicHeight || 'calc(100vh - 190px)', // Use dynamicHeight prop or fallback to default
    transition: `height ${transitionDuration || '0s'} ease-in-out`, // Apply transition duration
    
    /* Custom Scrollbar Styles */
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#2b4b81',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },
  }));

  return (
    <Box
      sx={{
        marginTop: "16px",
        marginLeft: "20px",
        marginRight: "20px",
        flexGrow: 1,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "20px",
          maxWidth: "100%",
          borderRadius: "15px",
          height: "640px",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", marginBottom: "10px", color: "#1C2C5A", }}
        >
          PO Summary
        </Typography>
        <Divider sx={{ marginBottom: "20px" }} />
        <Grid container spacing={1} sx={{ height: "60px" }}>
          <Grid item xs={12} sm={2}>
            <StyledTableSearchBar onSearch={handleSearch} />
          </Grid>
          <Grid item xs={12} sm={4} />
          <Grid item xs={12} sm={3} >
            <Typography sx={{ 
              padding: "10px 0px 0px 110px",
              textTransform: "none", 
              fontSize: "12px", 
              fontWeight: "bold", 
              height: "40px", 
              color: "#1C2C5A", 
            }}>
              Currency: PHP {orderFormsDetails.length > 0 ? orderFormsDetails[0].SkuNumber : '(PHILIPPINE PESO)'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3} >
            <Typography sx={{ 
              padding: "10px 0px 0px 110px",
              textTransform: "none", 
              fontSize: "12px", 
              fontWeight: "bold", 
              height: "40px", 
              color: "#1C2C5A", 
            }}>
              Last Sync Date: {lastSyncDate}
            </Typography>
          </Grid>
        </Grid>
        <Divider/>
        <StyledScrollBoxDynamic component={Paper} dynamicHeight={height} transitionDuration={transitionDuration}>
          <Table sx={{ backgroundColor: "#ffffff", }} aria-label="spanning table">
            <TableHead sx={{ zIndex: 3, position: "sticky", backgroundColor: "#4761AD", }}>
              <TableRow>
                <StyledTableCellHeader isDefault={false} sx={{ textAlign: "center" , border: "solid 1px", borderColor: "#ffffff" }}>SKU Number</StyledTableCellHeader>
                <StyledTableCellHeader isDefault={false} sx={{ textAlign: "center" , border: "solid 1px", borderColor: "#ffffff" }}>Description</StyledTableCellHeader>
                <StyledTableCellHeader isDefault={false} sx={{ textAlign: "center" , border: "solid 1px", borderColor: "#ffffff" }}>Buy U/M</StyledTableCellHeader>
                <StyledTableCellHeader isDefault={false} sx={{ textAlign: "center" , border: "solid 1px", borderColor: "#ffffff" }}>Sell U/M</StyledTableCellHeader>
                <StyledTableCellHeader isDefault={false} sx={{ textAlign: "center" , border: "solid 1px", borderColor: "#ffffff" }}>Original Order</StyledTableCellHeader>
                <StyledTableCellHeader isDefault={false} sx={{ textAlign: "center" , border: "solid 1px", borderColor: "#ffffff" }}>On Order</StyledTableCellHeader>
                <StyledTableCellHeader isDefault={false} sx={{ textAlign: "center" , border: "solid 1px", borderColor: "#ffffff" }}>Extended Retail</StyledTableCellHeader>
                <StyledTableCellHeader isDefault={false} sx={{ textAlign: "center" , border: "solid 1px", borderColor: "#ffffff" }}>Extended Cost</StyledTableCellHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow sx={{ "& td": { border: 0 } }}>
                  <StyledTableCellBody colSpan={12} align="center">
                    <CircularProgress size={80} />
                  </StyledTableCellBody>
                </TableRow>
              ) : orderForms.length === 0 ? (
                <TableRow
                  sx={{
                    "& td": {
                      border: 0,
                    },
                  }}
                >
                  <StyledTableCellNoData colSpan={11} align="center">
                    No data found
                  </StyledTableCellNoData>
                </TableRow>
              ) : (
                orderForms.map((row, index) => (
                  <TableRow key={index} sx={{ "& td": { border: 0 } }}>
                    <StyledTableCellBody sx={{ textAlign: "center" }}>{row.SkuNumber}</StyledTableCellBody>{/* Week No. */}
                    <StyledTableCellBody sx={{ textAlign: "center" }}>{row.Description}</StyledTableCellBody>{/* From */}
                    <StyledTableCellBody sx={{ textAlign: "center" }}>{row.BuyUM}</StyledTableCellBody>{/* To */}
                    <StyledTableCellBody sx={{ textAlign: "center" }}>{row.SellUM}</StyledTableCellBody>{/* Incoming */}
                    <StyledTableCellBody sx={{ textAlign: "center" }}>{row.OriginalOrder}</StyledTableCellBody>
                    <StyledTableCellBody sx={{ textAlign: "center" }}>{row.OnOrder}</StyledTableCellBody>
                    <StyledTableCellBody sx={{ textAlign: "center" }}>{row.ExtendRetail}</StyledTableCellBody>
                    <StyledTableCellBody sx={{ textAlign: "center" }}>{row.ExtendCost}</StyledTableCellBody>
                  </TableRow>
                )))
              }
            </TableBody>
          </Table>
        </StyledScrollBoxDynamic>
      </Paper>
      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Pagination
            variant="outlined"
            shape="rounded"
            count={pageCount}
            page={page}
            onChange={(event, value) => {
              setPage(value);
              fetchWorkSheet(
                value,
                itemsPerPage,
                searchQuery,
                columnToSort,
                orderBy
              );
            }}
          />
        </Box>
      {/* Snackbar for displaying messages */}
      <StyledSnackBar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={message}
      />
    </Box>
  );
};

export default PoSummaryPage;