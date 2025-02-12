import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import StyledScrollBox from "../../../../Components/ReusableComponents/ScrollBarComponents/StyledScrollBar";
import StyledTablePagination from "../../../../Components/ReusableComponents/TableComponents/StyledTablePagination";
import { SkuMasterModel } from "../../../../types/skumastermodel";
import StyledTableCellHeader from "../../../../Components/ReusableComponents/TableComponents/StyledTableCellHeader";
import StyledTableCellNoData from "../../../../Components/ReusableComponents/TableComponents/StyledTableCellNoData";
import StyledTableCellBody from "../../../../Components/ReusableComponents/TableComponents/StyledTableCellBody";
import useSkuEnrollmentContext from "../../../../store/OrderAnalyst/SkuEnrollment/useSkuEnrollmentContext";
import SkuEnrollmentModal from "./SkuEnrollmentModal";
import { SkuEnrollmentFormValues } from "../schema/skuEnrollmentFormSchema";
import StyledButton from "../../../../Components/ReusableComponents/ButtonComponents/StyledButton";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Swal from "sweetalert2";
interface Column {
  id: keyof SkuMasterModel;
  label: string;
}

const columns: Column[] = [
  { id: "SkuNumber", label: "SKU" },
  { id: "ShelfLifeWeeks", label: "Shelf Life" },
  { id: "Trigger", label: "Trigger" },
  { id: "BuildTo", label: "Build To" },
  { id: "TotalOrderLeadTime", label: "Order Lead Time" },
  { id: "PoDay", label: "PO Schedule" },
  { id: "Buyer", label: "Order Specialist" },
  { id: "UnitPerCase", label: "Unit per Case" },
  { id: "CasePerPallet", label: "Case per Pallet" },
  { id: "ActionTblCol", label: "Action" },
];

const SkuEnrollmentTableList: React.FC = () => {
  const {
    getAllSkus,
    zSkuMasterList,
    zSkuSearchText,
    modalData,
    zIsSkuDialogOpen,
    zSetSkuDialogOpen,
  } = useSkuEnrollmentContext();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredZSkuMasterList = zSkuMasterList?.filter((sku) =>
    zSkuSearchText
      ? sku.SkuNumber.toLowerCase().includes(zSkuSearchText.toLowerCase())
      : true
  );

  useEffect(() => {
    getAllSkus();
  }, []);

  useEffect(() => {}, [zSkuSearchText]);

  return (
    <TableData
      data={filteredZSkuMasterList || []}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

interface TableDataProps {
  data: SkuMasterModel[];
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TableData: React.FC<TableDataProps> = ({
  data,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const {
    modalData,
    zIsSkuDialogOpen,
    zSetSkuDialogOpen,
    zSetSkuDialogTitle,
    deleteSku,
    zSkuMasterList
  } = useSkuEnrollmentContext();

  const handleEdit = (data: SkuMasterModel) => {
    const updatedData: SkuEnrollmentFormValues = {
      id: data.Id,
      skuNumber: data.SkuNumber,
      itemDescription: data.ItemDescription,
      vendorCode: data.VendorCode,
      vendorName: data.VendorName,
      foreignVendorName: data.ForeignVendorName,
      foreignVendorCode: data.ForeignVendorCode,
      countryOrigin: data.CountryOrigin,
      itemStatus: data.ItemStatus,
      shelfLifeWeeks: data.ShelfLifeWeeks,
      trigger: data.Trigger,
      buildTo: data.BuildTo,
      totalOrderLeadTime: data.TotalOrderLeadTime,
      cbmPerCase: data.CbmPerCase,
      totalCbmPerContainer: data.TotalCbmPerContainer,
      tonPerCase: data.TonPerCase,
      poDay: data.PoDay,
      buyer: data.Buyer,
      unitPerCase: data.UnitPerCase,
      casePerPallet: data.CasePerPallet,
      unitPerPallet: data.UnitPerPallet,
      totalTonPerContainer: data.TotalTonPerContainer,
      noOfPalletsPerContainer: data.NoOfPalletsPerContainer,
      containerStacking: data.ContainerStacking,
      unitsPerContainer: data.UnitsPerContainer,
      containerLoad: data.ContainerLoad,
      containerSize: data.ContainerSize,
      moq: data.Moq,
      mixLoadSkus: data.MixLoadSkus,
    };
    useSkuEnrollmentContext.getState().setModalData(updatedData);
    zSetSkuDialogOpen(!zIsSkuDialogOpen);
    zSetSkuDialogTitle("Edit SKU");
  };

  const handleShowDelete = (id: string) => {
    console.log("test: ", id);
    Swal.fire({
      title: "Are you sure you want to delete this SKU?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true, // Show a cancel button
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true, // To swap confirm and cancel buttons
    }).then((result) => {
      if (result.isConfirmed) {
        // If the user clicks "Yes, delete it!"
        deleteSku(id);
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
      } else if (result.isDismissed) {
        // If the user clicks "Cancel"
        console.log("Delete action canceled");
      }
    });
  };
  
  // to display the data in the table when zSkuMasterList is updated
  useEffect(() => {

  }, [zSkuMasterList]);

  return (
    <React.Fragment>
      <StyledScrollBox
        component={Paper}
        sx={{
          height: "600px",
          position: "relative",
          paddingTop: "10px",
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
          borderTopLeftRadius: "0",
          borderTopRightRadius: "0",
          boxShadow: "none",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <StyledTableCellHeader key={column.id}>
                    {column.label}
                  </StyledTableCellHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <StyledTableCellNoData
                    colSpan={columns.length}
                    align="center"
                  >
                    No data found
                  </StyledTableCellNoData>
                </TableRow>
              ) : (
                data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={index}>
                      {columns.map((column) => {
                        if (column.id !== "ActionTblCol") {
                          return (
                            <StyledTableCellBody key={column.id}>
                              {row[column.id]}
                            </StyledTableCellBody>
                          );
                        } else {
                          return (
                            <>
                              <Grid container spacing={1}>
                                <Grid item xs={12} sm={6} md={6} xl={6}>
                                  {" "}
                                  <StyledButton
                                    onClick={() => handleEdit(row)}
                                    sx={{
                                      backgroundColor: "#47AD7D",
                                      height: "40px",
                                      width: "100%",
                                      borderRadius: "99px",
                                      color: "#FFFFFF",
                                      marginLeft: 0.5,
                                      "&:hover": {
                                        backgroundColor: "#206E47",
                                        color: "#FFFFFF",
                                      },
                                    }}
                                  >
                                    <EditNoteRoundedIcon /> Edit Sku
                                  </StyledButton>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} xl={6}>
                                  {" "}
                                  <StyledButton
                                    onClick={() => handleShowDelete(row.Id)}
                                    sx={{
                                      backgroundColor: "#AD4747",
                                      height: "40px",
                                      width: "100%",
                                      borderRadius: "99px",
                                      color: "#FFFFFF",
                                      marginLeft: 0.5,
                                      "&:hover": {
                                        backgroundColor: "#6E2020",
                                        color: "#FFFFFF",
                                      },
                                    }}
                                  >
                                    <CloseRoundedIcon /> Delete Sku
                                  </StyledButton>
                                </Grid>
                              </Grid>
                            </>
                          );
                        }
                      })}
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <StyledTablePagination
          rowsPerPageOptions={[10, 20]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      </StyledScrollBox>
      <SkuEnrollmentModal />
    </React.Fragment>
  );
};

export default SkuEnrollmentTableList;
