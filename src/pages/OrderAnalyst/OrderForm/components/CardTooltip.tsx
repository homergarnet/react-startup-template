import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useWSPODetailsContext from "../../../../store/OrderAnalyst/OrderForm/useWSPODetailsContext";
import { formatNADate } from "../../../../utils/formatNADate";
import useOrderFormContext from "../../../../store/OrderAnalyst/OrderForm/useOrderFormContext";

interface Props {
  originalPOEta: string;
  poReceivedWeekNo: string;
}
const CardTooltip: React.FC<Props> = ({ originalPOEta, poReceivedWeekNo }) => {
  // console.log("originalPOEta: ", originalPOEta);
  // console.log("poReceivedWeekNo: ", poReceivedWeekNo);
  const {
    getWorkSheetPODetails,
    getWorkSheetActualReceivedPerSku,
    zWSPODList,
    zOriginalPOEtaCache,
    zSetOriginalPOEtaCache,
    zLoadingPODetails,
  } = useWSPODetailsContext();

  const { zOrderFormSearch } = useOrderFormContext();
  useEffect(() => {
    if (zOriginalPOEtaCache !== originalPOEta) {
      getWorkSheetActualReceivedPerSku(zOrderFormSearch, originalPOEta);
      zSetOriginalPOEtaCache(originalPOEta);
    }
  }, []);

  return (
    <React.Fragment>
      {" "}
      {zLoadingPODetails ? (
        <Box display="flex" justifyContent="center" alignItems="center" p={2}>
          <CircularProgress size={24} />
          <Typography ml={1}>Loading...</Typography>
        </Box>
      ) : (
        <Card sx={{ minWidth: 200, p: 1 }}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{
                color:
                  zWSPODList && zWSPODList?.[0]?.Lapse_Time >= 1
                    ? "red"
                    : zWSPODList?.[0]?.Lapse_Time === 0
                    ? ""
                    : "green",
              }}
            >
              Revised ETA:
              {zWSPODList && zWSPODList?.[0]?.GSheet_Revised_ETA !== "N/A"
                ? formatNADate(zWSPODList[0]?.GSheet_Revised_ETA)
                : "-"}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color:
                  zWSPODList && zWSPODList?.[0]?.Lapse_Time >= 1
                    ? "red"
                    : zWSPODList?.[0]?.Lapse_Time === 0
                    ? ""
                    : "green",
              }}
            >
              Expected Receipt date:
              {zWSPODList &&
              zWSPODList?.[0]?.MMS_Expected_Receipt_Date !== "N/A"
                ? formatNADate(zWSPODList?.[0]?.MMS_Expected_Receipt_Date)
                : "-"}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color:
                  zWSPODList && zWSPODList?.[0]?.Lapse_Time >= 1
                    ? "red"
                    : zWSPODList?.[0]?.Lapse_Time === 0
                    ? ""
                    : "green",
              }}
            >
              PO Status: {zWSPODList?.[0]?.Received_Status}{" "}
              {zWSPODList?.[0]?.Received_Status_Percentage_Display}
              {/* {poReceivedWeekNo !== ""
                ? "Received"
                : zWSPODList?.[0].GSheet_Status != null
                ? zWSPODList?.[0].GSheet_Status
                : "-"} */}
            </Typography>
          </CardContent>
        </Card>
      )}
    </React.Fragment>
  );
};

export default CardTooltip;
