import { Box, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import useLoginContext from "../../store/Login/useLoginContext";
interface Props {
  color: string;
  marginTop: number;
}
const ColorCircle: React.FC<Props> = ({ color, marginTop }) => {
  const { getDateModAsaDimCalendarWorksheet, getJobStatusResult } =
    useLoginContext();

  const [circleColor, setCircleColor] = useState("red");
  const [dateMod, setDateMod] = useState("");

  useEffect(() => {
    getJobStatusResult()
      .then((data) => {
        console.log("data: ", data);
        if (
          data?.ApiMessage ===
          "Some steps are still in progress or not started."
        ) {
          setCircleColor("orange");
          // setDateMod("Not started.");
        } else if (data?.ApiMessage === "One or more steps failed.") {
          setCircleColor("red");
        } else {
          setCircleColor("green");
        }
        // setCircleColor(data.Color);
        // setDateMod(data.DateModified);
      })
      .catch((error) => {})
      .finally(() => {});
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      mt={marginTop}
    >
      {/* Tooltip wrapping the Circle */}
      <Tooltip title={dateMod !== "" ? dateMod.split(" ")[0] : ""}>
        <Box
          sx={{
            width: 45,
            height: 45,
            borderRadius: "50%",
            backgroundColor: circleColor,
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            cursor: "pointer", // optional: makes it clear it's hoverable
          }}
        />
      </Tooltip>
    </Box>
  );
};

export default ColorCircle;
