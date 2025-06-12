import {
  Autocomplete,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useSkuEnrollmentContext from "../../../../store/OrderAnalyst/SkuEnrollment/useSkuEnrollmentContext";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  skuEnrollmentFormSchema,
  SkuEnrollmentFormValues,
} from "../schema/skuEnrollmentFormSchema";
import {
  ADD_SKU,
  skuEnrollmentFields,
  UPDATED_SKU_MESSAGE,
  UPDATE_SKU,
  DELETE_SKU,
  COMPARE_MIX_LOAD,
} from "../../../../constants/constants";
import { SkuMasterModel } from "../../../../types/skumastermodel";
import { generateGuid } from "../../../../utils/generateGUID";
import { Bounce, toast } from "react-toastify";
import { getDateTimeNow } from "../../../../utils/getDateTimeNow";
import SkuSelect from "./SkuSelect";
import Swal from "sweetalert2";
import useSkuNumberTF from "../hooks/useSkuNumbertf";
import useSharedStore from "../../../../store/sharedStore";
import { NumericFormat } from "react-number-format";
import { formatNumber } from "../../../../utils/formatNumber";
import IsNAButton from "./IsNAButton";
import useSwal from "../../../../Hooks/useSwal";
import { GetAllSkuNumModel } from "../../../../types/skuenrollmentmodel";
import useSkuEnrollmentSearch from "../hooks/useSkuEnrollmentSearch";
import IsPrimaryButton from "./IsPrimaryButton";

interface Props {
  initialValues?: SkuEnrollmentFormValues;
}

const AddEditSkuForm: React.FC<Props> = () => {
  const {
    createSkuMasterList,
    updateSku,
    deleteSku,
    zSkuAddEditTitle,
    zSkuEnrollmentAEData,
    zSkuMasterList,
    clearSkuEnrollmentAEData,
    zSetSkuMasterList,
    zSkuEnrollmentTab,
    zSkuSearchText,
    zSetSkuSearchText,
    zSkuNumberTF,
    zSetSkuNumberTF,
    getAllSkusDetailsInquiry,
    getAllSkuNum,
    zBuyerList,
    zAllSkuNumList,
    zNAValue,
    zSetNAValue,
    zMixLoadPrimaryValue,
    zSetMixLoadPrimaryValue,
    zMixLoadSkusOld,
    isMixedLoadSku,
  } = useSkuEnrollmentContext();
  const { zUserEmailAdd } = useSharedStore();
  const { skuNumberText, debouncedSkuNumberOnChange } = useSkuNumberTF("");
  const { showToast } = useSwal();
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
      shelfLifeWeeks: 1,
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
      moq: 0,
      mixLoadSkus: [],
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

  const [isPrimarySku, setIsPrimarySku] = useState<boolean>(false);
  const [isShowMixLoad, setIsShowMixLoad] = useState<boolean>(false);

  const handlePoChange = (event: SelectChangeEvent) => {
    setValue("poDay", event.target.value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    // setAge(event.target.value);
  };

  const handleCSChange = (event: SelectChangeEvent) => {
    setValue("containerStacking", event.target.value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    // setAge(event.target.value);
  };

  const handleCLoadChange = (event: SelectChangeEvent) => {
    setValue("containerLoad", event.target.value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    if (event.target.value === COMPARE_MIX_LOAD) {
      setIsShowMixLoad(true);
    } else {
      setIsShowMixLoad(false);
    }
    // setAge(event.target.value);
  };

  const handleCSizeChange = (event: SelectChangeEvent) => {
    setValue("containerSize", event.target.value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    // setAge(event.target.value);
  };

  const handleShowDelete = (id: string, skuNumber: string) => {
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
        deleteSku(id, skuNumber);
        clearSkuEnrollmentAEData();
        zSetSkuMasterList([]);
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
      } else if (result.isDismissed) {
        // If the user clicks "Cancel"
        console.log("Delete action canceled");
      }
    });
  };

  const onSubmit = async (data: SkuEnrollmentFormValues) => {
    console.log("datavalues: ", data);
    data.mixLoadSkus.forEach((item, index) => {
      console.log("item: ", item);
    });

    getAllSkusDetailsInquiry(
      data.skuNumber,
      zUserEmailAdd,
      zSkuAddEditTitle
    ).then((res: any) => {
      console.log("responsive: ", res);

      if (res !== null && res.IsExistInUser && zSkuAddEditTitle === ADD_SKU) {
      } else {
        let text = ``;

        const areArraysEqualUnordered = (a: any[], b: any[]): boolean => {
          if (a.length !== b.length) return false;
          const sortedA = [...a].sort();
          const sortedB = [...b].sort();
          return sortedA.every((val, index) => val === sortedB[index]);
        };

        for (const [key, value] of Object.entries(data)) {
          const formValue =
            zSkuEnrollmentAEData[key as keyof SkuEnrollmentFormValues];

          console.log(
            "key1: ",
            key,
            "value2: ",
            value,
            "formValue: ",
            formValue
          );

          const isNotSame =
            Array.isArray(formValue) && Array.isArray(value)
              ? !areArraysEqualUnordered(formValue, value)
              : true; // Consider "not same" if either is not an array

          if (key !== "mixLoadSkus" && formValue != value) {
            text += `<b style="color: #007bff;">${key}</b>: from <b style="color: #dc3545;">${formValue}</b> to <b style="color: #28a745;">${
              key === "shelfLifeWeeks" && zNAValue === "no" ? "N/A" : value
            }</b> <br/>`;
          } else if (key === "mixLoadSkus" && isNotSame) {
            text += `<b style="color: #007bff;">${key}</b>: from <b style="color: #dc3545;">${formValue}</b> to <b style="color: #28a745;">${value}</b> <br/>`;
          }
        }

        Swal.fire({
          title: `Are you sure you want to ${
            zSkuAddEditTitle === ADD_SKU ? "create" : "update"
          } this SKU?`,
          html: zSkuAddEditTitle === ADD_SKU ? "Creating new SKU." : text,
          icon: "warning",
          showCancelButton: true, // Show a cancel button
          confirmButtonText: `Yes, ${
            zSkuAddEditTitle === ADD_SKU ? "Create" : "Update"
          } it!`,
          cancelButtonText: "Cancel",
          reverseButtons: true, // To swap confirm and cancel buttons
          customClass: {
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            htmlContainer: "custom-swal-html",
          },
        }).then((result) => {
          if (result.isConfirmed) {
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
              ShelfLifeWeeks:
                zNAValue === "yes" ? data.shelfLifeWeeks.toString() : "0",
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
              IsMixLoadPrimarySku:
                zMixLoadPrimaryValue === "yes" ? true : false,
              MixLoadSkus: data.mixLoadSkus,
              MixLoadSkusOld: zMixLoadSkusOld,
              CreatedOn: getDateTimeNow(),
              CreatedBy: zUserEmailAdd,
              ModifiedOn: getDateTimeNow(),
              ModifiedBy: zUserEmailAdd,
              IsEnabled: true,
              ActionTblCol: "",
            };

            if (isValid) {
              if (zSkuAddEditTitle === ADD_SKU) {
                try {
                  createSkuMasterList(data2).then((res: any) => {
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
                    } else if (
                      res !== null &&
                      res === "Sku created successfully"
                    ) {
                      clearSkuEnrollmentAEData();
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
                      // reset();
                    }
                  });
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
                  updateSku(data2).then((res: any) => {
                    if (res !== null && res === UPDATED_SKU_MESSAGE) {
                      zSetSkuSearchText("");
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
                    }
                  });
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
          } else if (result.isDismissed) {
            // If the user clicks "Cancel"
            // console.log("Delete action canceled");
          }
        });
      }
    });
  };

  const poOptions = [
    { value: "MONDAY", label: "Monday" },
    { value: "TUESDAY", label: "Tuesday" },
    { value: "WEDNESDAY", label: "Wednesday" },
    { value: "THURSDAY", label: "Thursday" },
    { value: "FRIDAY", label: "Friday" },
  ];

  const csOptions = [
    { value: "HANDSTACKED", label: "HANDSTACKED" },
    { value: "PALLETIZED", label: "PALLETIZED" },
  ];

  const cLoadOptions = [
    { value: "FCL", label: "FCL" },
    { value: "MIX LOAD", label: "MIX LOAD" },
    { value: "CO-LOAD", label: "CO-LOAD" },
  ];

  const cSizeOptions = [
    { value: "20 Footer", label: "20 Footer" },
    { value: "40 Footer", label: "40 Footer" },
  ];

  //for update modal fields
  useEffect(() => {
    reset(zSkuEnrollmentAEData); // Update form values when initialValues changes
    if (zSkuEnrollmentTab === 0) {
      console.log("zero");
      zSetSkuSearchText("");
      zSetSkuNumberTF("");
      trigger();
      console.log("zSkuEnrollmentAEData: ", zSkuEnrollmentAEData);
    } else if (zSkuEnrollmentTab === 1) {
      trigger();
    }
  }, [zSkuEnrollmentAEData, zSkuEnrollmentTab]);

  useEffect(() => {
    if (zSkuNumberTF !== "") {
      getAllSkusDetailsInquiry(zSkuNumberTF, zUserEmailAdd, zSkuAddEditTitle);
      getAllSkuNum(zSkuNumberTF);
    }
  }, [zSkuNumberTF]);

  useEffect(() => {
    zSetNAValue("yes");
  }, []);

  //when zSkuMasterlist is not empty
  useEffect(() => {
    setIsShowMixLoad(
      !!zSkuMasterList?.length &&
        zSkuMasterList[0].ContainerLoad === COMPARE_MIX_LOAD
    );
  }, [zSkuMasterList]);

  return (
    <React.Fragment>
      {/* for update sku */}
      {zSkuMasterList && zSkuMasterList.length > 0 ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {skuEnrollmentFields.map((field) => {
              let fieldName: any = field.name;
              return (
                <Grid item xs={12} sm={4} key={field.name}>
                  {field.type === "select" ? (
                    <SkuSelect
                      label={field.label}
                      name={field.name}
                      value={getValues(fieldName)}
                      options={
                        fieldName === "poDay"
                          ? poOptions
                          : fieldName === "containerStacking"
                          ? csOptions
                          : fieldName === "containerLoad"
                          ? cLoadOptions
                          : fieldName === "containerSize"
                          ? cSizeOptions
                          : []
                      }
                      error={
                        fieldName === "poDay"
                          ? errors.poDay
                          : fieldName === "containerStacking"
                          ? errors.containerStacking
                          : fieldName === "containerLoad"
                          ? errors.containerLoad
                          : fieldName === "containerSize"
                          ? errors.containerSize
                          : undefined
                      }
                      register={register}
                      onChange={
                        fieldName === "poDay"
                          ? handlePoChange
                          : fieldName === "containerStacking"
                          ? handleCSChange
                          : fieldName === "containerLoad"
                          ? handleCLoadChange
                          : fieldName === "containerSize"
                          ? handleCSizeChange
                          : () => {} // default function that does nothing
                      }
                    />
                  ) : field.type === "autocomplete" ? (
                    <>
                      <Controller
                        name={field.name as keyof SkuEnrollmentFormValues}
                        control={control}
                        rules={{
                          required: "Buyer selection is required",
                        }} // Validation rule
                        render={({
                          field: { onChange, value, ...restField },
                          fieldState,
                        }) => (
                          <Autocomplete
                            {...restField}
                            options={zBuyerList ? zBuyerList : []}
                            value={
                              (zBuyerList &&
                                zBuyerList.find(
                                  (option) => option.Label === value
                                )) ||
                              null
                            } // Auto-populate with the current value
                            getOptionLabel={(option) =>
                              typeof option === "string" ? option : option.Label
                            } // Show the label of the option in the dropdown
                            isOptionEqualToValue={(option, value) =>
                              option.Label ===
                              (typeof value === "object" ? value.Label : value)
                            }
                            onChange={(_, selectedValue) => {
                              // Pass only the string (label) to `onChange`
                              onChange(
                                selectedValue ? selectedValue.Label : ""
                              );
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                value={"MILANIE  M. NGO"}
                                label="Buyer"
                                fullWidth
                                margin="normal"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                              />
                            )}
                            disabled={
                              zSkuAddEditTitle === DELETE_SKU ? true : false
                            }
                          />
                        )}
                      />
                    </>
                  ) : field.type === "multiple autocomplete" ? (
                    <>
                      {isShowMixLoad && (
                        <Grid container spacing={1}>
                          <Grid item xs={12} sm={5} md={5} xl={5}>
                            <IsPrimaryButton />
                          </Grid>
                          <Grid item xs={12} sm={7} md={7} xl={7}>
                            {zMixLoadPrimaryValue === "no" && (
                              <Controller
                                name={
                                  field.name as keyof SkuEnrollmentFormValues
                                }
                                control={control}
                                rules={{
                                  required: field.label + " is required",
                                }}
                                render={({
                                  field: { onChange, value, ...restField },
                                  fieldState,
                                }) => (
                                  <Autocomplete
                                    multiple
                                    {...restField}
                                    options={zAllSkuNumList ?? []}
                                    value={
                                      zAllSkuNumList
                                        ? zAllSkuNumList.filter((option) =>
                                            Array.isArray(value)
                                              ? value.includes(option.Label)
                                              : false
                                          )
                                        : []
                                    }
                                    getOptionLabel={(option) =>
                                      typeof option === "string"
                                        ? option
                                        : option.Label
                                    }
                                    isOptionEqualToValue={(option, value) =>
                                      option.Label ===
                                      (typeof value === "object"
                                        ? value.Label
                                        : value)
                                    }
                                    onChange={(_, selectedOptions) => {
                                      let limited: GetAllSkuNumModel[] = [];
                                      // uncomment this code if you want to get validation if it is already a mix load skus
                                      if (selectedOptions.length > 0) {
                                        const index =
                                          selectedOptions.length - 1;
                                        isMixedLoadSku(
                                          selectedOptions[index].Label
                                        )
                                          .then((data) => {
                                            console.log("dataaa: ", data);
                                            if (data === true) {
                                              // logic for updating the mix load skus
                                              limited = selectedOptions.slice(
                                                0,
                                                index
                                              );
                                              onChange(
                                                limited.map(
                                                  (option) => option.Label
                                                )
                                              );
                                              showToast(
                                                "SKU selected is already Mixed with other SKUs",
                                                "error"
                                              );
                                            } else {
                                              // for limiting one sku
                                              // limited = selectedOptions.slice(0, 1);
                                              // onChange(
                                              //   limited.map((option) => option.Label)
                                              // );
                                              onChange(
                                                selectedOptions.map(
                                                  (option) => option.Label
                                                )
                                              );
                                            }
                                          })
                                          .catch(() => {});
                                      } else {
                                        limited = selectedOptions.slice(0, 1);
                                        onChange(
                                          limited.map((option) => option.Label)
                                        );
                                      }
                                      // limited = selectedOptions.slice(0, 1);
                                      // onChange(limited.map((option) => option.Label));
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label={field.label}
                                        fullWidth
                                        margin="normal"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                      />
                                    )}
                                  />
                                )}
                              />
                            )}
                          </Grid>
                        </Grid>
                      )}
                    </>
                  ) : (
                    <>
                      {fieldName !== "shelfLifeWeeks" && (
                        <TextField
                          type={field.type}
                          key={field.name}
                          disabled={
                            (zSkuAddEditTitle === UPDATE_SKU &&
                              field.name === "skuNumber") ||
                            field.disabled
                              ? true
                              : zSkuAddEditTitle === DELETE_SKU
                              ? true
                              : false
                          }
                          {...register(
                            field.name as keyof SkuEnrollmentFormValues,
                            {
                              valueAsNumber:
                                field.type === "number" ? true : false, // Parse as number
                            }
                          )}
                          inputProps={{
                            step: field.type === "number" ? 1 : undefined, // Allow decimals for numbers
                          }}
                          label={
                            errors[field.name as keyof typeof errors]
                              ?.message &&
                            fieldName !== "itemDescription" &&
                            fieldName !== "vendorCode" &&
                            fieldName !== "vendorName" &&
                            fieldName !== "foreignVendorName" &&
                            fieldName !== "foreignVendorCode" &&
                            fieldName !== "countryOrigin" &&
                            fieldName !== "itemStatus" &&
                            fieldName !== "buyer"
                              ? field.label + "*"
                              : field.label
                          }
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          onChange={
                            field.name === "skuNumber"
                              ? debouncedSkuNumberOnChange
                              : (e) => {
                                  if (field.isNumberFormat) {
                                    // Remove all non-numeric characters (keep only numbers)
                                    const rawValue = e.target.value.replace(
                                      /\D/g,
                                      ""
                                    );

                                    // Convert to number
                                    const numericValue =
                                      rawValue === "" ? 0 : Number(rawValue);

                                    // Ensure a valid number before setting state
                                    if (
                                      !isNaN(numericValue) &&
                                      numericValue >= 1
                                    ) {
                                      setValue(
                                        field.name as keyof SkuEnrollmentFormValues,
                                        numericValue
                                      ); // Store as number

                                      // Format and update input field
                                      e.target.value =
                                        formatNumber(numericValue);
                                    }
                                  } else {
                                  }
                                }
                          }
                          error={
                            !!errors[field.name as keyof typeof errors] &&
                            fieldName !== "itemDescription" &&
                            fieldName !== "vendorCode" &&
                            fieldName !== "vendorName" &&
                            fieldName !== "foreignVendorName" &&
                            fieldName !== "foreignVendorCode" &&
                            fieldName !== "countryOrigin" &&
                            fieldName !== "itemStatus" &&
                            fieldName !== "buyer"
                          }
                          helperText={
                            errors[field.name as keyof typeof errors]?.message
                          }
                          sx={{
                            "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                              {
                                borderColor: `${
                                  fieldName === "itemDescription" ||
                                  fieldName === "vendorCode" ||
                                  fieldName === "vendorName" ||
                                  fieldName === "foreignVendorName" ||
                                  fieldName === "foreignVendorCode" ||
                                  fieldName === "countryOrigin" ||
                                  fieldName === "itemStatus" ||
                                  fieldName === "buyer"
                                    ? ""
                                    : "black"
                                }`, // Removes the red border
                              },
                          }}
                        />
                      )}
                      {fieldName === "shelfLifeWeeks" ? (
                        <>
                          <Grid container spacing={1}>
                            <Grid item xs={12} sm={9} md={9} xl={9}>
                              <IsNAButton />
                            </Grid>
                            <Grid item xs={12} sm={3} md={3} xl={3}>
                              {fieldName === "shelfLifeWeeks" &&
                                zNAValue === "yes" && (
                                  <TextField
                                    type={field.type}
                                    key={field.name}
                                    disabled={
                                      (zSkuAddEditTitle === UPDATE_SKU &&
                                        field.name === "skuNumber") ||
                                      field.disabled
                                        ? true
                                        : zSkuAddEditTitle === DELETE_SKU
                                        ? true
                                        : false
                                    }
                                    {...register(
                                      field.name as keyof SkuEnrollmentFormValues,
                                      {
                                        valueAsNumber:
                                          field.type === "number"
                                            ? true
                                            : false, // Parse as number
                                      }
                                    )}
                                    inputProps={{
                                      step:
                                        field.type === "number" ? 1 : undefined, // Allow decimals for numbers
                                    }}
                                    label={
                                      errors[field.name as keyof typeof errors]
                                        ?.message &&
                                      fieldName !== "itemDescription" &&
                                      fieldName !== "vendorCode" &&
                                      fieldName !== "vendorName" &&
                                      fieldName !== "foreignVendorName" &&
                                      fieldName !== "foreignVendorCode" &&
                                      fieldName !== "countryOrigin" &&
                                      fieldName !== "itemStatus" &&
                                      fieldName !== "buyer"
                                        ? field.label + "*"
                                        : field.label
                                    }
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    onChange={
                                      field.name === "skuNumber"
                                        ? debouncedSkuNumberOnChange
                                        : (e) => {
                                            if (field.isNumberFormat) {
                                              // Remove all non-numeric characters (keep only numbers)
                                              const rawValue =
                                                e.target.value.replace(
                                                  /\D/g,
                                                  ""
                                                );

                                              // Convert to number
                                              const numericValue =
                                                rawValue === ""
                                                  ? 0
                                                  : Number(rawValue);

                                              // Ensure a valid number before setting state
                                              if (
                                                !isNaN(numericValue) &&
                                                numericValue >= 1
                                              ) {
                                                setValue(
                                                  field.name as keyof SkuEnrollmentFormValues,
                                                  numericValue
                                                ); // Store as number

                                                // Format and update input field
                                                e.target.value =
                                                  formatNumber(numericValue);
                                              }
                                            } else {
                                            }
                                          }
                                    }
                                    error={
                                      !!errors[
                                        field.name as keyof typeof errors
                                      ] &&
                                      fieldName !== "itemDescription" &&
                                      fieldName !== "vendorCode" &&
                                      fieldName !== "vendorName" &&
                                      fieldName !== "foreignVendorName" &&
                                      fieldName !== "foreignVendorCode" &&
                                      fieldName !== "countryOrigin" &&
                                      fieldName !== "itemStatus" &&
                                      fieldName !== "buyer"
                                    }
                                    helperText={
                                      errors[field.name as keyof typeof errors]
                                        ?.message
                                    }
                                    sx={{
                                      "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                                        {
                                          borderColor: `${
                                            fieldName === "itemDescription" ||
                                            fieldName === "vendorCode" ||
                                            fieldName === "vendorName" ||
                                            fieldName === "foreignVendorName" ||
                                            fieldName === "foreignVendorCode" ||
                                            fieldName === "countryOrigin" ||
                                            fieldName === "itemStatus" ||
                                            fieldName === "buyer"
                                              ? ""
                                              : "black"
                                          }`, // Removes the red border
                                        },
                                    }}
                                  />
                                )}
                            </Grid>
                          </Grid>
                        </>
                      ) : null}
                    </>
                  )}
                </Grid>
              );
            })}
          </Grid>

          <Button
          // onClick={handleOpenClose}
          >
            Close
          </Button>
          {/* {JSON.stringify(zAllSkuNumList)} */}
          {zSkuAddEditTitle === UPDATE_SKU ? (
            <Button
              // onClick={handleOpenClose}
              type="submit"
              // disabled={!isValid}
              autoFocus
            >
              {zSkuAddEditTitle}
            </Button>
          ) : zSkuAddEditTitle === DELETE_SKU ? (
            <Button
              onClick={() =>
                handleShowDelete(
                  zSkuMasterList[0].Id,
                  zSkuMasterList[0].SkuNumber
                )
              }
              type="button"
              autoFocus
            >
              {zSkuAddEditTitle}
            </Button>
          ) : (
            <></>
          )}
        </form>
      ) : //for add sku
      zSkuAddEditTitle === ADD_SKU ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {skuEnrollmentFields.map((field) => {
              let fieldName: any = field.name;
              return (
                <Grid item xs={12} sm={4} key={field.name}>
                  {field.type === "select" ? (
                    <SkuSelect
                      label={field.label}
                      name={field.name}
                      value={getValues(fieldName)}
                      options={
                        fieldName === "poDay"
                          ? poOptions
                          : fieldName === "containerStacking"
                          ? csOptions
                          : fieldName === "containerLoad"
                          ? cLoadOptions
                          : fieldName === "containerSize"
                          ? cSizeOptions
                          : []
                      }
                      error={
                        fieldName === "poDay"
                          ? errors.poDay
                          : fieldName === "containerStacking"
                          ? errors.containerStacking
                          : fieldName === "containerLoad"
                          ? errors.containerLoad
                          : fieldName === "containerSize"
                          ? errors.containerSize
                          : undefined
                      }
                      register={register}
                      onChange={
                        fieldName === "poDay"
                          ? handlePoChange
                          : fieldName === "containerStacking"
                          ? handleCSChange
                          : fieldName === "containerLoad"
                          ? handleCLoadChange
                          : fieldName === "containerSize"
                          ? handleCSizeChange
                          : () => {} // default function that does nothing
                      }
                    />
                  ) : field.type === "autocomplete" ? (
                    <>
                      <Controller
                        name={field.name as keyof SkuEnrollmentFormValues}
                        control={control}
                        rules={{
                          required: "Buyer selection is required",
                        }} // Validation rule
                        render={({
                          field: { onChange, value, ...restField },
                          fieldState,
                        }) => (
                          <Autocomplete
                            {...restField}
                            options={zBuyerList ? zBuyerList : []}
                            value={
                              (zBuyerList &&
                                zBuyerList.find(
                                  (option) => option.Label === value
                                )) ||
                              null
                            } // Auto-populate with the current value
                            getOptionLabel={(option) =>
                              typeof option === "string" ? option : option.Label
                            } // Show the label of the option in the dropdown
                            isOptionEqualToValue={(option, value) =>
                              option.Label ===
                              (typeof value === "object" ? value.Label : value)
                            }
                            onChange={(_, selectedValue) => {
                              // Pass only the string (label) to `onChange`
                              onChange(
                                selectedValue ? selectedValue.Label : ""
                              );
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                value={"MILANIE  M. NGO"}
                                label="Buyer"
                                fullWidth
                                margin="normal"
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                              />
                            )}
                          />
                        )}
                      />
                    </>
                  ) : field.type === "multiple autocomplete" ? (
                    <>
                      {isShowMixLoad && (
                        <Grid container spacing={1}>
                          <Grid item xs={12} sm={5} md={5} xl={5}>
                            <IsPrimaryButton />
                          </Grid>
                          <Grid item xs={12} sm={7} md={7} xl={7}>
                            {zMixLoadPrimaryValue === "no" && (
                              <Controller
                                name={
                                  field.name as keyof SkuEnrollmentFormValues
                                }
                                control={control}
                                rules={{
                                  required: field.label + " is required",
                                }}
                                render={({
                                  field: { onChange, value, ...restField },
                                  fieldState,
                                }) => (
                                  <Autocomplete
                                    multiple
                                    {...restField}
                                    options={zAllSkuNumList ?? []}
                                    value={
                                      zAllSkuNumList
                                        ? zAllSkuNumList.filter((option) =>
                                            Array.isArray(value)
                                              ? value.includes(option.Label)
                                              : false
                                          )
                                        : []
                                    }
                                    getOptionLabel={(option) =>
                                      typeof option === "string"
                                        ? option
                                        : option.Label
                                    }
                                    isOptionEqualToValue={(option, value) =>
                                      option.Label ===
                                      (typeof value === "object"
                                        ? value.Label
                                        : value)
                                    }
                                    // 🚫 Prevent selecting more than one
                                    onChange={(_, selectedOptions) => {
                                      let limited: GetAllSkuNumModel[] = [];
                                      // uncomment this code if you want to get validation if it is already a mix load skus
                                      // if (selectedOptions.length > 0) {
                                      //   const index = selectedOptions.length - 1;
                                      //   isMixedLoadSku(selectedOptions[index].Label)
                                      //     .then((data) => {
                                      //       console.log("dataaa: ", data);
                                      //       if (data === true) {
                                      //         // logic for updating the mix load skus
                                      //         limited = selectedOptions.slice(
                                      //           0,
                                      //           index
                                      //         );
                                      //         onChange(
                                      //           limited.map((option) => option.Label)
                                      //         );
                                      //         showToast(
                                      //           "SKU selected is already Mixed with other SKUs",
                                      //           "error"
                                      //         );
                                      //       } else {
                                      //         limited = selectedOptions.slice(0, 1);
                                      //         onChange(
                                      //           limited.map((option) => option.Label)
                                      //         );
                                      //       }
                                      //     })
                                      //     .catch(() => {});
                                      // } else {
                                      //   limited = selectedOptions.slice(0, 1);
                                      //   onChange(
                                      //     limited.map((option) => option.Label)
                                      //   );
                                      // }
                                      limited = selectedOptions.slice(0, 1);
                                      onChange(
                                        limited.map((option) => option.Label)
                                      );
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label={field.label}
                                        fullWidth
                                        margin="normal"
                                        error={!!fieldState.error}
                                        helperText={
                                          fieldState.error?.message ??
                                          (Array.isArray(value) &&
                                          value.length === 1
                                            ? "Note: Maximum of 1 selections allowed when adding a new mixed SKU in the add sku tab"
                                            : "")
                                        }
                                      />
                                    )}
                                  />
                                )}
                              />
                            )}
                          </Grid>
                        </Grid>
                      )}
                    </>
                  ) : (
                    <>
                      {fieldName !== "shelfLifeWeeks" && (
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
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            step: field.type === "number" ? 1 : undefined, // Allow decimals for numbers
                          }}
                          label={
                            errors[field.name as keyof typeof errors]
                              ?.message &&
                            fieldName !== "itemDescription" &&
                            fieldName !== "vendorCode" &&
                            fieldName !== "vendorName" &&
                            fieldName !== "foreignVendorName" &&
                            fieldName !== "foreignVendorCode" &&
                            fieldName !== "countryOrigin" &&
                            fieldName !== "itemStatus" &&
                            fieldName !== "buyer"
                              ? field.label + "*"
                              : field.label
                          }
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          onChange={
                            field.name === "skuNumber"
                              ? debouncedSkuNumberOnChange
                              : (e) => {
                                  if (field.isNumberFormat) {
                                    // Remove all non-numeric characters (keep only numbers)
                                    const rawValue = e.target.value.replace(
                                      /\D/g,
                                      ""
                                    );
                                    console.log("rawValue1: ", rawValue);

                                    // Convert to number
                                    const numericValue =
                                      rawValue === "" ? 0 : Number(rawValue);

                                    // Ensure a valid number before setting state
                                    if (
                                      !isNaN(numericValue) &&
                                      numericValue >= 1
                                    ) {
                                      setValue(
                                        field.name as keyof SkuEnrollmentFormValues,
                                        numericValue
                                      ); // Store as number

                                      // Format and update input field
                                      e.target.value =
                                        formatNumber(numericValue);
                                    } else {
                                      const watcherFieldName = watch(
                                        field.name as keyof SkuEnrollmentFormValues
                                      );
                                      console.log(
                                        "watcher2: ",
                                        watcherFieldName
                                      );
                                      setValue(
                                        field.name as keyof SkuEnrollmentFormValues,
                                        watcherFieldName
                                      ); // Store as number
                                      // Format and update input field
                                      e.target.value =
                                        formatNumber(numericValue);
                                    }
                                  } else {
                                  }
                                }
                          }
                          error={
                            !!errors[field.name as keyof typeof errors] &&
                            fieldName !== "itemDescription" &&
                            fieldName !== "vendorCode" &&
                            fieldName !== "vendorName" &&
                            fieldName !== "foreignVendorName" &&
                            fieldName !== "foreignVendorCode" &&
                            fieldName !== "countryOrigin" &&
                            fieldName !== "itemStatus" &&
                            fieldName !== "buyer"
                          }
                          helperText={
                            errors[field.name as keyof typeof errors]?.message
                          }
                          sx={{
                            "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                              {
                                borderColor: `${
                                  fieldName === "itemDescription" ||
                                  fieldName === "vendorCode" ||
                                  fieldName === "vendorName" ||
                                  fieldName === "foreignVendorName" ||
                                  fieldName === "foreignVendorCode" ||
                                  fieldName === "countryOrigin" ||
                                  fieldName === "itemStatus" ||
                                  fieldName === "buyer"
                                    ? ""
                                    : "black"
                                }`, // Removes the red border
                              },
                          }}
                          disabled={field.disabled ? true : false}
                        />
                      )}

                      {fieldName === "shelfLifeWeeks" ? (
                        <>
                          <Grid container spacing={1}>
                            <Grid item xs={12} sm={9} md={9} xl={9}>
                              <IsNAButton />
                            </Grid>
                            <Grid item xs={12} sm={3} md={3} xl={3}>
                              {zNAValue === "yes" && (
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
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  inputProps={{
                                    step:
                                      field.type === "number" ? 1 : undefined, // Allow decimals for numbers
                                  }}
                                  label={
                                    errors[field.name as keyof typeof errors]
                                      ?.message &&
                                    fieldName !== "itemDescription" &&
                                    fieldName !== "vendorCode" &&
                                    fieldName !== "vendorName" &&
                                    fieldName !== "foreignVendorName" &&
                                    fieldName !== "foreignVendorCode" &&
                                    fieldName !== "countryOrigin" &&
                                    fieldName !== "itemStatus" &&
                                    fieldName !== "buyer"
                                      ? field.label + "*"
                                      : field.label
                                  }
                                  variant="outlined"
                                  fullWidth
                                  margin="normal"
                                  onChange={
                                    field.name === "skuNumber"
                                      ? debouncedSkuNumberOnChange
                                      : (e) => {
                                          if (field.isNumberFormat) {
                                            // Remove all non-numeric characters (keep only numbers)
                                            const rawValue =
                                              e.target.value.replace(/\D/g, "");

                                            // Convert to number
                                            const numericValue =
                                              rawValue === ""
                                                ? 0
                                                : Number(rawValue);

                                            // Ensure a valid number before setting state
                                            if (
                                              !isNaN(numericValue) &&
                                              numericValue >= 1
                                            ) {
                                              setValue(
                                                field.name as keyof SkuEnrollmentFormValues,
                                                numericValue
                                              ); // Store as number

                                              // Format and update input field
                                              e.target.value =
                                                formatNumber(numericValue);
                                            }
                                          } else {
                                          }
                                        }
                                  }
                                  error={
                                    !!errors[
                                      field.name as keyof typeof errors
                                    ] &&
                                    fieldName !== "itemDescription" &&
                                    fieldName !== "vendorCode" &&
                                    fieldName !== "vendorName" &&
                                    fieldName !== "foreignVendorName" &&
                                    fieldName !== "foreignVendorCode" &&
                                    fieldName !== "countryOrigin" &&
                                    fieldName !== "itemStatus" &&
                                    fieldName !== "buyer"
                                  }
                                  helperText={
                                    errors[field.name as keyof typeof errors]
                                      ?.message
                                  }
                                  sx={{
                                    "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                                      {
                                        borderColor: `${
                                          fieldName === "itemDescription" ||
                                          fieldName === "vendorCode" ||
                                          fieldName === "vendorName" ||
                                          fieldName === "foreignVendorName" ||
                                          fieldName === "foreignVendorCode" ||
                                          fieldName === "countryOrigin" ||
                                          fieldName === "itemStatus" ||
                                          fieldName === "buyer"
                                            ? ""
                                            : "black"
                                        }`, // Removes the red border
                                      },
                                  }}
                                  disabled={field.disabled ? true : false}
                                />
                              )}
                            </Grid>
                          </Grid>
                        </>
                      ) : null}
                    </>
                  )}
                </Grid>
              );
            })}
          </Grid>

          <Button
          // onClick={handleOpenClose}
          >
            Close
          </Button>
          <Button
            //   onClick={handleOpenClose}
            type="submit"
            disabled={!isValid}
            autoFocus
          >
            {zSkuAddEditTitle}
          </Button>
        </form>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
};
export default AddEditSkuForm;
