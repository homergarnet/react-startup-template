import {
  Button,
  Grid,
  InputAdornment,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import useSkuEnrollmentContext from "../../../../store/OrderAnalyst/SkuEnrollment/useSkuEnrollmentContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  skuEnrollmentFormSchema,
  SkuEnrollmentFormValues,
} from "../schema/skuEnrollmentFormSchema";
import {
  ADD_SKU,
  skuEnrollmentFields,
  UPDATED_SKU_MESSAGE,
} from "../../../../constants/constants";
import { SkuMasterModel } from "../../../../types/skumastermodel";
import { generateGuid } from "../../../../utils/generateGUID";
import { Bounce, toast } from "react-toastify";
import { getDateTimeNow } from "../../../../utils/getDateTimeNow";
import SkuSelect from "./SkuSelect";
import { Search as SearchIcon } from "@mui/icons-material/";
import useSkuEnrollmentSearch from "../hooks/useSkuEnrollmentSearch";
import AddEditSkuForm from "./AddEditSkuForm";

interface Props {
  initialValues?: SkuEnrollmentFormValues;
}
const AddEditSku: React.FC<Props> = () => {
  const { debouncedSkuSearchOnChange } = useSkuEnrollmentSearch("");

  const { zSkuAddEditTitle, zSkuSearchText, getAllSkusDetails } =
    useSkuEnrollmentContext();
  useEffect(() => {}, []);

  useEffect(() => {
    getAllSkusDetails(zSkuSearchText);
  }, [zSkuSearchText]);
  return (
    <React.Fragment>
      {zSkuAddEditTitle}
      {zSkuAddEditTitle !== ADD_SKU && (
        <TextField
          onChange={debouncedSkuSearchOnChange}
          placeholder="Search"
          size="small"
          fullWidth
          InputProps={{
            sx: {
              marginLeft: 0.5,
              borderRadius: "20px",
              backgroundColor: "#EEEEEE",
              color: "#1C2C5A",
              "& fieldset": { border: "none" },
              boxShadow:
                "inset 1px 1px 1px -3px rgba(0,0,0,0.1), inset 1px 1px 8px 0px rgba(0,0,0,0.3)",
            },
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          // onChange={}
          autoFocus
        />
      )}
      <AddEditSkuForm />
    </React.Fragment>
  );
};
export default AddEditSku;
