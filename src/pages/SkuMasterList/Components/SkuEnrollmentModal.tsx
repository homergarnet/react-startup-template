import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useSkuMasterListContext from "../../../../store/OrderAnalyst/SkuMasterList/useSkuMasterListContext";
import { Controller, useForm } from "react-hook-form";
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
import top100Films from "../../../../constants/top100Films";
import SkuSelect from "./SkuSelect";

interface Props {
  initialValues?: SkuEnrollmentFormValues;
}
const SkuEnrollmentModal: React.FC<Props> = () => {
  const { createSkuMasterList, updateSku, error, modalData } =
    useSkuMasterListContext();

  const form = useForm<SkuEnrollmentFormValues>({
    resolver: zodResolver(skuEnrollmentFormSchema), // Use Zod for validation
    defaultValues: {
      skuNumber: "",
      itemDescription: "",
      vendorCode: "",
      vendorName: "",
      foreignVendorName: "",
      foreignVendorCode: "",
      countryOrigin: "",
      itemStatus: "",
      shelfLifeWeeks: 0,
      trigger: 0,
      buildTo: 0,
      totalOrderLeadTime: 0,
      cbmPerCase: 0,
      totalCbmPerContainer: 0,
      tonPerCase: 0,
      poDay: "",
      buyer: "",
      // orderSpecialist: "",
      unitPerCase: 0,
      casePerPallet: 0,
      unitPerPallet: 0,
      totalTonPerContainer: 0,
      noOfPalletsPerContainer: 0,
      containerStacking: "",
      unitsPerContainer: 0,
      containerLoad: "",
      containerSize: "",
      moq: 1,
      mixLoadSkus: "",
    },
    //for validation way choices "onBlur"(When you exit the textbox hover) | "onChange"(When you change the field not recommended performance issue) | "onSubmit" (Default and when user click the button) | "onTouched (on the first load event and every change event)" | "all" (Both change and blur event)
    mode: "onTouched",
  });
  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    reset,
    trigger,
  } = form;
  const {
    errors,
    touchedFields,
    dirtyFields,
    isDirty,
    isValid,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
    submitCount,
  } = formState;

  const { zIsSkuDialogOpen, zSetSkuDialogOpen, zSkuDialogTitle, getAllSkus } =
    useSkuMasterListContext();
  const handleOpenClose = () => {
    zSetSkuDialogOpen(!zIsSkuDialogOpen);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setValue("poDay", event.target.value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    // setAge(event.target.value);
  };

  const onSubmit = async (data: SkuEnrollmentFormValues) => {
    let data2: SkuMasterModel = {
      Id: data.id != null && data.id !== "" ? data.id : generateGuid(),
      SkuNumber: data.skuNumber,
      ItemDescription: data.itemDescription,
      VendorCode: data.vendorCode,
      VendorName: data.vendorName,
      ForeignVendorCode: data.foreignVendorCode,
      ForeignVendorName: data.foreignVendorName,
      CountryOrigin: data.countryOrigin,
      ItemStatus: data.itemStatus,
      ShelfLifeWeeks: data.shelfLifeWeeks,
      Trigger: data.trigger,
      BuildTo: data.buildTo,
      TotalOrderLeadTime: data.totalOrderLeadTime,
      CbmPerCase: data.cbmPerCase,
      TotalCbmPerContainer: data.totalCbmPerContainer,
      TonPerCase: data.tonPerCase,
      PoDay: data.poDay,
      Buyer: data.buyer,
      // OrderSpecialist: data.orderSpecialist,
      UnitPerCase: data.unitPerCase,
      CasePerPallet: data.casePerPallet,
      UnitPerPallet: data.unitPerPallet,
      TotalTonPerContainer: data.totalCbmPerContainer,
      NoOfPalletsPerContainer: data.noOfPalletsPerContainer,
      ContainerStacking: data.containerStacking,
      UnitsPerContainer: data.unitsPerContainer,
      ContainerLoad: data.containerLoad,
      ContainerSize: data.containerSize,
      Moq: data.moq,
      MixLoadSkus: data.mixLoadSkus,
      CreatedOn: getDateTimeNow(),
      CreatedBy: "By User",
      ModifiedOn: getDateTimeNow(),
      ModifiedBy: "By User",
      IsEnabled: true,
      ActionTblCol: "",
    };

    console.log("data2:", data2);

    if (isValid) {
      if (zSkuDialogTitle === ADD_SKU) {
        try {
          // Await the result of createSkuMasterList if it's a promise
          let res: any = await createSkuMasterList(data2);

          if (res !== null && res === "Sku already exists!") {
            toast.error(res, {
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
          } else if (res !== null && res === "Sku created successfully") {
            getAllSkus();
            toast.success(res, {
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
            //reset fields
            reset();
          }
        } catch (err: any) {
          // Handle any errors during the creation process
          toast.error("Failed to create SKU: " + err.message, {
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
      } else {
        try {
          // Await the result of createSkuMasterList if it's a promise
          let res: any = await updateSku(data2);
          if (res !== null && res === UPDATED_SKU_MESSAGE) {
            getAllSkus();
            toast.success(res, {
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
            toast.error(res, {
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

            //reset fields
            // reset();
          }
        } catch (err: any) {
          // Handle any errors during the creation process
          toast.error("Failed to create SKU: " + err.message, {
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
      }
    }
  };

  const options = [
    { value: "MONDAY", label: "Monday" },
    { value: "TUESDAY", label: "Tuesday" },
    { value: "WEDNESDAY", label: "Wednesday" },
    { value: "THURSDAY", label: "Thursday" },
    { value: "FRIDAY", label: "Friday" },
  ];

  //for update modal fields
  useEffect(() => {
    reset(modalData); // Update form values when initialValues changes
  }, [modalData]);

  return (
    <React.Fragment>
      <Dialog
        open={zIsSkuDialogOpen}
        maxWidth={"xl"}
        onClose={handleOpenClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{zSkuDialogTitle}</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Grid container spacing={2}>
              {skuEnrollmentFields.map((field) => {
                return (
                  <Grid item xs={12} sm={4} key={field.name}>
                    {field.type === "select" ? (
                      <SkuSelect
                        label="PO Day"
                        name="poDay"
                        value={getValues("poDay")}
                        options={options}
                        error={errors.poDay}
                        register={register}
                        onChange={handleChange}
                      />
                    ) : field.type === "autocomplete" ? (
                      <></>
                    ) : (
                      // <Controller
                      //   name={field.name as keyof SkuEnrollmentFormValues}
                      //   control={control}
                      //   rules={{
                      //     required: "Order Specialist selection is required",
                      //   }} // Validation rule
                      //   render={({
                      //     field: { onChange, value, ...restField },
                      //     fieldState,
                      //   }) => (
                      //     <Autocomplete
                      //       {...restField}
                      //       options={top100Films}
                      //       getOptionLabel={(option) =>
                      //         typeof option === "string" ? option : option.label
                      //       } // Show the label of the option in the dropdown
                      //       isOptionEqualToValue={(option, value) =>
                      //         option.label ===
                      //         (typeof value === "object" ? value.label : value)
                      //       }
                      //       onChange={(_, selectedValue) => {
                      //         // Pass only the string (label) to `onChange`
                      //         onChange(
                      //           selectedValue ? selectedValue.label : ""
                      //         );
                      //       }}
                      //       renderInput={(params) => (
                      //         <TextField
                      //           {...params}
                      //           label="Order Specialist"
                      //           fullWidth
                      //           margin="normal"
                      //           error={!!fieldState.error}
                      //           helperText={fieldState.error?.message}
                      //         />
                      //       )}
                      //     />
                      //   )}
                      // />
                      <TextField
                        type={field.type}
                        key={field.name}
                        {...register(
                          field.name as keyof SkuEnrollmentFormValues,
                          {
                            valueAsNumber:
                              field.type === "number" ? true : false, // Parse as number
                          }
                        )}
                        inputProps={{
                          step: field.type === "number" ? "0.01" : undefined, // Allow decimals for numbers
                        }}
                        label={field.label}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors[field.name as keyof typeof errors]}
                        helperText={
                          errors[field.name as keyof typeof errors]?.message
                        }
                      />
                    )}
                  </Grid>
                );
              })}
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleOpenClose}>Close</Button>
            <Button
              onClick={handleOpenClose}
              type="submit"
              disabled={!isValid}
              autoFocus
            >
              {zSkuDialogTitle}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
};
export default SkuEnrollmentModal;
