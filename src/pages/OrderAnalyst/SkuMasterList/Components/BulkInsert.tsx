import { Box, Button } from "@mui/material";
import React from "react";
import useSkuMasterListContext from "../../../../store/OrderAnalyst/SkuMasterList/useSkuMasterListContext";
import useSharedStore from "../../../../store/sharedStore";
import { Bounce, toast } from "react-toastify";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const BulkInsert = () => {
  const { bulkInsertMasterlist } = useSkuMasterListContext();
  const { zUserEmailAdd } = useSharedStore();

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const response = await bulkInsertMasterlist(file, zUserEmailAdd);
      console.log("response: ", response);
      if (response === "Bulk Insert Successfully") {
        toast.success("Bulk Insert Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      } else {
        toast.error("Something went wrong", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
      console.log("File selected:", file.name);
      // TODO: Process the Excel file
    }
  };

  return (
    <Box
    // display="flex"
    // justifyContent="center"
    // alignItems="center"
    // height="50vh"
    >
      <input
        type="file"
        accept=".xlsx, .xls"
        id="file-upload"
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />
      <label htmlFor="file-upload">
        <Button component="span" sx={{ mb: 2, color: "#0462ac" }}>
          <PlaylistAddIcon /> Bulk Insert Upload
        </Button>
      </label>
    </Box>
  );
};

export default BulkInsert;
