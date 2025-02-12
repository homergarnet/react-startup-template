import React from "react";
import { incrementWeeks } from "../../../../utils/incrementWeeks";
import { formatDate } from "../../../../utils/formatDate";
import { Checkbox, TableRow } from "@mui/material";
import StyledTableCellBody from "../../../../Components/ReusableComponents/TableComponents/StyledTableCellBody";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank"; // Icon for empty box
import CloseIcon from "@mui/icons-material/Close"; // Icon for "X"
import StyledTableCellTextField from "../../../../Components/ReusableComponents/TableComponents/StyledTableCellTextField";
interface ChildProps {
  Week_No: string;
  TotalOrderLeadTime: number;
  isDisabled: boolean;
  formatDate: (dateString: string) => string;
  Week_From: string;
  Week_To: string;
  Original_PO_Eta: string;
}

const CompareWeekNumbers: React.FC<ChildProps> = ({
  Week_No,
  TotalOrderLeadTime,
  isDisabled,
  Week_From,
  Week_To,
  Original_PO_Eta,
}) => {
  const incrementedValue = incrementWeeks(Week_No, TotalOrderLeadTime); // Derive the next value

  return (
    <>test</>
    // <TableRow
    //   key={Week_No}
    //   sx={{
    //     "& td": { border: 0 },
    //     ...(isDisabled && {
    //       opacity: 0.5,
    //       pointerEvents: "none",
    //     }),
    //   }}
    //   style={{
    //     backgroundColor: "yellow",
    //   }}
    // >
    //   <StyledTableCellBody>
    //     <Checkbox
    //       sx={{
    //         height: "5px",
    //         width: "20px",
    //         maxHeight: "20px",
    //         display: "flex",
    //         alignItems: "center",
    //         justifyContent: "center",
    //         cursor: "pointer",
    //         userSelect: "none",
    //       }}
    //       id={Week_No}
    //       checked={!!checkedItems[Week_No]} // Use your state here
    //       onChange={(event) => handleChangeCheckBox(Week_No, event)} // Update state on change
    //       disabled={isDisabled} // Optionally disable checkbox if row is disabled
    //       icon={<CheckBoxOutlineBlankIcon />} // Custom unchecked icon
    //       checkedIcon={<CloseIcon sx={{ color: "red" }} />} // Custom checked icon ("X")
    //     />
    //   </StyledTableCellBody>
    //   <StyledTableCellBody className="Week_No">{Week_No}</StyledTableCellBody>
    //   <StyledTableCellBody>{formatDate(Week_From)}</StyledTableCellBody>
    //   <StyledTableCellBody>{formatDate(Week_To)}</StyledTableCellBody>
    //   <StyledTableCellBody>{Original_PO_Eta}</StyledTableCellBody>
    //   <StyledTableCellBody>
    //     <StyledTableCellTextField
    //       type="number"
    //       value={SuggestedOrder === 0 ? "" : SuggestedOrder}
    //       onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
    //         handleSuggested(row.Week_No, event)
    //       }
    //     />
    //   </StyledTableCellBody>
    //   <StyledTableCellBody>
    //     {Number(Sales_Forecast) > 0 &&
    //     !isNaN(Sales_Forecast) &&
    //     isFinite(Sales_Forecast)
    //       ? Sales_Forecast
    //       : "-"}
    //   </StyledTableCellBody>
    //   <StyledTableCellBody>
    //     <StyledTableCellTextField
    //       type="number"
    //       value={Adjustment === 0 ? "" : Adjustment}
    //       onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
    //         handleAdjustment(Week_No, event)
    //       }
    //     />
    //   </StyledTableCellBody>
    //   <StyledTableCellBody>{SalesQuantitySold}</StyledTableCellBody>
    //   <StyledTableCellBody>
    //     {isNaN(parseFloat(endingInvEstimate)) ||
    //     parseFloat(endingInvEstimate) < 0
    //       ? "-"
    //       : endingInvEstimate}
    //   </StyledTableCellBody>
    //   <StyledTableCellBody
    //     className={row.Sales_On_Hand ? "Sales_On_Hand" : "Sales_On_Hand_Null"}
    //   >
    //     {row.Sales_On_Hand}
    //   </StyledTableCellBody>

    //   <StyledTableCellBody
    //     style={{
    //       color: endingInvWs < BuildTo + 1 ? "red" : "",
    //     }}
    //   >
    //     {endingInvWs}
    //   </StyledTableCellBody>
    // </TableRow>
  );
};

export default CompareWeekNumbers;
