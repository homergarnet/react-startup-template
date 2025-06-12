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
import { CustomTableSearchField } from "../../../../Components/ReusableComponents/TableComponents/StyledTableSearchBar";
import useSharedStore from "../../../../store/sharedStore";

interface Props {
  initialValues?: SkuEnrollmentFormValues;
  handleSearch: () => void;
  isAllowSearch: boolean; // Add the isAllowSearch property
}
const AddEditSku: React.FC<Props> = ({
  initialValues,
  handleSearch,
  isAllowSearch,
}) => {

  const { debouncedSkuSearchOnChange } = useSkuEnrollmentSearch("");
  const { zSkuAddEditTitle, zSkuSearchText, getAllSkusDetails, getAllSkuNum } =
    useSkuEnrollmentContext();
  useEffect(() => {
    if (isAllowSearch) {
      getAllSkusDetails(zSkuSearchText);
      getAllSkuNum(zSkuSearchText);
    }
    handleSearch();
  }, [zSkuSearchText]);
  return (
    <React.Fragment>
      {zSkuAddEditTitle}
      <br />
      <br />
      <br />
      {zSkuAddEditTitle !== ADD_SKU && (
        <CustomTableSearchField
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          // onChange={}
          autoFocus
          size="small"
          onChange={debouncedSkuSearchOnChange}
          label="Search SKU"
          InputProps={
            {
              // endAdornment: (
              //   <InputAdornment position="end">
              //     <IconButton onClick={handleSearch} edge="end">
              //       <SearchIcon />
              //     </IconButton>
              //   </InputAdornment>
              // ),
            }
          }
        />
      )}
      <AddEditSkuForm />
    </React.Fragment>
  );
};
export default AddEditSku;
