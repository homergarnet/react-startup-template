import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import useOrderFormContext from "../../../../store/OrderAnalyst/OrderForm/useOrderFormContext";
import IOrderFormDetails from "../Interface/IOrderFormDetails";
import StyledIcon from "../../../../Components/ReusableComponents/IconComponents/StyledIcon";
import {
  ArrowDropUp as ArrowDropUpIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from "@mui/icons-material";
import StyledLabel from "../../../../Components/ReusableComponents/LabelComponent/StyledLabel";
import { formatNumber } from "../../../../utils/formatNumber";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Props {
  orderFormsDetails: IOrderFormDetails;
}
//   const [orderFormsDetails, setOrderFormsDetails] = useState<
//     IOrderFormDetails[]
const AccordionOrderForm: React.FC<Props> = ({ orderFormsDetails }) => {
  // console.log("orderFormsDetails: ", orderFormsDetails);
  const { zExpanded, zSetExpanded, zZindex, zSetZindex } =
    useOrderFormContext();

  const theme = useTheme(); // Access the theme

  const handleToggleZIndex = () => {
    zSetZindex(zZindex === 4 ? 1 : 4);
  };

  return (
    <React.Fragment>
      <Accordion
        expanded={zExpanded}
        onChange={() => zSetExpanded(!zExpanded)}
        sx={{
          boxShadow: "1px 5px 4px -1px rgba(0,0,0,0.3)",
          // position: "fixed",
          // maxWidth: "80%",
          // zIndex: zZindex,
        }}
        onMouseEnter={() => handleToggleZIndex()}
        onMouseLeave={() => handleToggleZIndex()} // Call when hover out
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container alignItems="center">
            {[
              {
                label: "SKU NUMBER",
                value: orderFormsDetails?.SkuNumber,
                block: true,
              },
              {
                label: "DESCRIPTION",
                value: orderFormsDetails?.ItemDescription,
                block: true,
              },
              {
                label: "TRIGGER (WEEKS)",
                value: orderFormsDetails?.Trigger,
                block: true,
              },
              {
                label: "BUILD TO (WEEKS)",
                value: orderFormsDetails?.BuildTo,
                block: true,
              },
              {
                label: "TOTAL LEAD TIME (WEEKS)",
                value: orderFormsDetails?.TotalOrderLeadTime,
                block: true,
              },
              {
                label: "SHELF LIFE (WEEKS)",
                value: orderFormsDetails?.ShelfLifeWeeks,
                block: true, // Special case to display in block format
              },
              {
                label: "SKU STATUS",
                value: orderFormsDetails?.ItemStatus,
                block: true,
              },
              { label: "MOQ", value: orderFormsDetails?.Moq, block: true },
            ].map(({ label, value, block }, index) => (
              <Grid item xs={12} sm={1.5} key={index}>
                {" "}
                {/* Adjusted size */}
                <Typography
                  sx={{
                    textTransform: "none",
                    fontSize: "8.5px",
                    fontWeight: "bold",
                    color: (theme) => theme.palette.text.secondary,
                    textAlign: "center",
                  }}
                >
                  {label}:{" "}
                  {block ? (
                    <Box component="span" sx={{ color: "#1b3664" }}>
                      {label === "MOQ" ? formatNumber(value) : value ?? "N/A"}
                    </Box>
                  ) : (
                    value ?? "N/A"
                  )}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </AccordionSummary>

        <AccordionDetails>
          {/* ONE */}
          <Grid container>
            <Grid item xs={12} sm={2}>
              <StyledLabel>
                <span style={{ color: theme.palette.text.secondary }}>
                  SHELF LIFE (WEEKS):
                </span>{" "}
                {orderFormsDetails && orderFormsDetails.ShelfLifeWeeks != null
                  ? orderFormsDetails.ShelfLifeWeeks
                  : "N/A"}
              </StyledLabel>
            </Grid>
            <Grid item xs={12} sm={4.5}>
              <StyledLabel>
                <span style={{ color: theme.palette.text.secondary }}>
                  VENDOR CODE:
                </span>{" "}
                {orderFormsDetails && orderFormsDetails.VendorCode != null
                  ? orderFormsDetails.VendorCode
                  : "N/A"}
              </StyledLabel>
            </Grid>
            <Grid item xs={12} sm={2}>
              <StyledLabel>
                <span style={{ color: theme.palette.text.secondary }}>
                  UNIT PER CASE:
                </span>{" "}
                {orderFormsDetails && orderFormsDetails.UnitPerCase != null
                  ? orderFormsDetails.UnitPerCase
                  : "N/A"}
              </StyledLabel>
            </Grid>
            <Grid item xs={12} sm={2}>
              <StyledLabel>
                <span style={{ color: theme.palette.text.secondary }}>
                  CONTAINER LOADING:
                </span>{" "}
                {orderFormsDetails && orderFormsDetails.ContainerLoad != null
                  ? orderFormsDetails.ContainerLoad
                  : "N/A"}
              </StyledLabel>
            </Grid>
          </Grid>
          {/* TWO */}
          <Grid container>
            <Grid item xs={12} sm={2}>
              <StyledLabel>
                <span style={{ color: theme.palette.text.secondary }}>
                  TRIGGER (WEEKS):
                </span>{" "}
                {orderFormsDetails && orderFormsDetails.UnitPerPallet != null
                  ? orderFormsDetails.Trigger
                  : "N/A"}
              </StyledLabel>
            </Grid>
            <Grid item xs={12} sm={4.5}>
              <StyledLabel>
                <span style={{ color: theme.palette.text.secondary }}>
                  VENDOR NAME:
                </span>{" "}
                <span style={{ fontSize: "9.5px" }}>
                  {orderFormsDetails && orderFormsDetails.VendorName != null
                    ? orderFormsDetails.VendorName
                    : "N/A"}
                </span>
              </StyledLabel>
            </Grid>
            <Grid item xs={12} sm={2}>
              <StyledLabel>
                <span style={{ color: theme.palette.text.secondary }}>
                  CASE PER PALLET:
                </span>{" "}
                {orderFormsDetails && orderFormsDetails.CasePerPallet != null
                  ? orderFormsDetails.CasePerPallet
                  : "N/A"}
              </StyledLabel>
            </Grid>
            <Grid item xs={12} sm={2}>
              <StyledLabel>
                <span style={{ color: theme.palette.text.secondary }}>
                  CONTAINER SIZE:
                </span>{" "}
                {orderFormsDetails && orderFormsDetails.ContainerSize != null
                  ? orderFormsDetails.ContainerSize
                  : "N/A"}
              </StyledLabel>
            </Grid>
          </Grid>
          {/* THREE */}
          <Grid container>
            <Grid item xs={12} sm={2}>
              <StyledLabel>
                <span style={{ color: theme.palette.text.secondary }}>
                  BUILD TO (WEEKS):
                </span>{" "}
                {orderFormsDetails && orderFormsDetails.BuildTo != null
                  ? orderFormsDetails.BuildTo
                  : "N/A"}
              </StyledLabel>
            </Grid>
            <Grid item xs={12} sm={4.5}>
              <StyledLabel>
                <span
                  style={{
                    color: theme.palette.text.secondary,
                  }}
                >
                  FOREIGN VENDOR CODE:
                </span>{" "}
                {orderFormsDetails &&
                orderFormsDetails.ForeignVendorCode != null
                  ? orderFormsDetails.ForeignVendorCode
                  : "N/A"}
              </StyledLabel>
            </Grid>
            <Grid item xs={12} sm={2}>
              <StyledLabel>
                <span style={{ color: theme.palette.text.secondary }}>
                  UNITS PER PALLET:
                </span>{" "}
                {orderFormsDetails && orderFormsDetails.UnitPerPallet != null
                  ? formatNumber(orderFormsDetails.UnitPerPallet)
                  : "N/A"}
              </StyledLabel>
            </Grid>
            <Grid item xs={12} sm={3}></Grid>
          </Grid>
          {/* FOUR */}
          <Grid container>
            <Grid item xs={12} sm={2}>
              <StyledLabel>
                <span style={{ color: theme.palette.text.secondary }}>
                  TOTAL LEAD TIME (WEEKS):
                </span>{" "}
                {orderFormsDetails &&
                orderFormsDetails.TotalOrderLeadTime != null
                  ? orderFormsDetails.TotalOrderLeadTime
                  : "N/A"}
              </StyledLabel>
            </Grid>
            <Grid item xs={12} sm={4.5}>
              <StyledLabel>
                <span style={{ color: theme.palette.text.secondary }}>
                  FOREIGN VENDOR NAME:
                </span>{" "}
                <span style={{ fontSize: "9.5px" }}>
                  {orderFormsDetails &&
                  orderFormsDetails.ForeignVendorName != null
                    ? orderFormsDetails.ForeignVendorName
                    : "N/A"}
                </span>
              </StyledLabel>
            </Grid>
            <Grid item xs={12} sm={2}>
              <StyledLabel>
                <span style={{ color: theme.palette.text.secondary }}>
                  PALLETS PER CONTAINER:
                </span>{" "}
                {orderFormsDetails &&
                orderFormsDetails.NoOfPalletsPerContainer != null
                  ? orderFormsDetails.NoOfPalletsPerContainer
                  : "N/A"}
              </StyledLabel>
            </Grid>
            <Grid item xs={12} sm={2}>
              <StyledLabel>
                <span style={{ color: theme.palette.text.secondary }}>
                  MIX LOAD SKU's:
                </span>{" "}
                {orderFormsDetails && orderFormsDetails.MixLoadSkus != null
                  ? orderFormsDetails.MixLoadSkus
                  : "N/A"}
              </StyledLabel>
            </Grid>
          </Grid>
          {/* FIVE */}
          <Grid container>
            <Grid item xs={12} sm={2}>
              <StyledLabel>
                <span style={{ color: theme.palette.text.secondary }}>
                  PO DAY:
                </span>{" "}
                {orderFormsDetails && orderFormsDetails.PoDay != null
                  ? orderFormsDetails.PoDay
                  : "N/A"}
              </StyledLabel>
            </Grid>
            <Grid item xs={12} sm={4.5}>
              <StyledLabel>
                <span style={{ color: theme.palette.text.secondary }}>
                  COUNTRY OF ORIGIN:
                </span>{" "}
                {orderFormsDetails && orderFormsDetails.CountryOrigin != null
                  ? orderFormsDetails.CountryOrigin
                  : "N/A"}
              </StyledLabel>
            </Grid>
            <Grid item xs={12} sm={2}>
              <StyledLabel>
                <span style={{ color: theme.palette.text.secondary }}>
                  UNITS PER CONTAINER:
                </span>{" "}
                {orderFormsDetails &&
                orderFormsDetails.UnitsPerContainer != null
                  ? formatNumber(orderFormsDetails.UnitsPerContainer)
                  : "N/A"}
              </StyledLabel>
            </Grid>
            <Grid item xs={12} sm={3}></Grid>
          </Grid>
          {/* SIX */}
          <Grid container>
            <Grid item xs={12} sm={2}>
              <StyledLabel>
                <span style={{ color: theme.palette.text.secondary }}>
                  BUYER NAME:
                </span>{" "}
                {orderFormsDetails && orderFormsDetails.Buyer != null
                  ? orderFormsDetails.Buyer
                  : "N/A"}
              </StyledLabel>
            </Grid>
            <Grid item xs={12} sm={3}></Grid>
            <Grid item xs={12} sm={3}></Grid>
            <Grid item xs={12} sm={3}></Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  );
};

export default AccordionOrderForm;
