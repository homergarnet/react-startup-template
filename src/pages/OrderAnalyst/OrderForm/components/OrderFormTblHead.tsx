import { TableHead, TableRow } from "@mui/material";
import React from "react";
import StyledTableCellHeader from "../../../../Components/ReusableComponents/TableComponents/StyledTableCellHeader";

const OrderFormTblHead = () => {
  return (
    <>
      <TableHead
        sx={{
          zIndex: 3,
          backgroundColor: "#4761AD",
          position: "sticky",
          top: 0,
        }}
      >
        <TableRow>
          <StyledTableCellHeader
            sx={{
              textAlign: "center",
              border: "solid 1px",
              borderColor: "#ffffff",
              width: "75px", // or any percentage
            }}
            colSpan={2}
            rowSpan={2}
          >
            Week No.
          </StyledTableCellHeader>
          <StyledTableCellHeader
            sx={{
              textAlign: "center",
              border: "solid 1px",
              borderColor: "#ffffff",
            }}
            rowSpan={2}
          >
            Period
          </StyledTableCellHeader>
          <StyledTableCellHeader
            sx={{
              textAlign: "center",
              border: "solid 1px",
              borderColor: "#ffffff",
            }}
            colSpan={2}
          >
            Purchase Order
          </StyledTableCellHeader>
          <StyledTableCellHeader
            sx={{
              textAlign: "center",
              border: "solid 1px",
              borderColor: "#ffffff",
              width: "65px", // or any percentage
            }}
            rowSpan={2}
          >
            Suggested Order
          </StyledTableCellHeader>

          <StyledTableCellHeader
            sx={{
              textAlign: "center",
              border: "solid 1px",
              borderColor: "#ffffff",
            }}
            colSpan={3}
          >
            Sales
          </StyledTableCellHeader>
          <StyledTableCellHeader
            sx={{
              textAlign: "center",
              border: "solid 1px",
              borderColor: "#ffffff",
            }}
            colSpan={2}
          >
            Ending Inventory
          </StyledTableCellHeader>
          <StyledTableCellHeader
            sx={{
              textAlign: "center",
              border: "solid 1px",
              borderColor: "#ffffff",
              width: "65px", // or any percentage
            }}
            rowSpan={2}
          >
            Ending Inv Week Supply
          </StyledTableCellHeader>
        </TableRow>
        <TableRow>
          <StyledTableCellHeader
            sx={{
              textAlign: "center",
              border: "solid 1px",
              borderColor: "#ffffff",
            }}
          >
            Incoming POS
          </StyledTableCellHeader>
          <StyledTableCellHeader
            sx={{
              textAlign: "center",
              border: "solid 1px",
              borderColor: "#ffffff",
            }}
          >
            Units ordered
          </StyledTableCellHeader>

          <StyledTableCellHeader
            sx={{
              textAlign: "center",
              border: "solid 1px",
              borderColor: "#ffffff",
            }}
          >
            Forecast
          </StyledTableCellHeader>
          <StyledTableCellHeader
            sx={{
              textAlign: "center",
              border: "solid 1px",
              borderColor: "#ffffff",
            }}
          >
            Adjustment
          </StyledTableCellHeader>
          <StyledTableCellHeader
            sx={{
              textAlign: "center",
              border: "solid 1px",
              borderColor: "#ffffff",
            }}
          >
            Actual
          </StyledTableCellHeader>
          <StyledTableCellHeader
            sx={{
              textAlign: "center",
              border: "solid 1px",
              borderColor: "#ffffff",
            }}
          >
            Estimate
          </StyledTableCellHeader>
          <StyledTableCellHeader
            sx={{
              textAlign: "center",
              border: "solid 1px",
              borderColor: "#ffffff",
            }}
          >
            Actual
          </StyledTableCellHeader>
        </TableRow>
      </TableHead>
    </>
  );
};

export default OrderFormTblHead;
