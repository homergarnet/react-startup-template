import React from "react";
import {
  enrollmentFormSchema,
  EnrollmentFormValues,
} from "../schema/employeeFormSchema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  employeeFields,
  UPDATE_EMPLOYEE,
} from "../../../constants/constants";
import {
  Autocomplete,
  Button,
  Grid,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import useEnrollmentPeopleContext from "../../../store/enrollment-people/useEnrollmentPeopleContext";
import Swal from "sweetalert2";
import { Bounce, toast } from "react-toastify";
import EmployeeSelect from "./EmployeeSelect";
interface Props {
  initialValues?: EnrollmentFormValues;
}
const AddEditEmployeeForm: React.FC<Props> = () => {
  const { zEmployeeAddEditTitle, zEmployee } = useEnrollmentPeopleContext();

  const form = useForm<EnrollmentFormValues>({
    resolver: zodResolver(enrollmentFormSchema), // Use Zod for validation
    defaultValues: {
      employeeNumber: "",
      fullName: "",
      designation: "",
      agency: "",
      teamAssignment: "",
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

  const handleDesignationChange = (event: SelectChangeEvent) => {
    setValue("designation", event.target.value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    // setAge(event.target.value);
  };

  const handleAgencyChange = (event: SelectChangeEvent) => {
    setValue("agency", event.target.value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    // setAge(event.target.value);
  };

  const onSubmit = async (data: EnrollmentFormValues) => {
    // Swal.fire({
    //   title: `Are you sure you want to ${
    //     zEmployeeAddEditTitle === ADD_EMPLOYEE ? "create" : "update"
    //   } this SKU?`,
    //   html: zEmployeeAddEditTitle === ADD_EMPLOYEE ? "Creating new SKU." : "",
    //   icon: "warning",
    //   showCancelButton: true, // Show a cancel button
    //   confirmButtonText: `Yes, ${
    //     zEmployeeAddEditTitle === ADD_EMPLOYEE ? "Create" : "Update"
    //   } it!`,
    //   cancelButtonText: "Cancel",
    //   reverseButtons: true, // To swap confirm and cancel buttons
    //   customClass: {
    //     popup: "custom-swal-popup",
    //     title: "custom-swal-title",
    //     htmlContainer: "custom-swal-html",
    //   },
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     let data2: SkuMasterModel = {
    //       Id: data.id != null && data.id !== "" ? data.id : generateGuid(),
    //       SkuNumber: data.skuNumber,
    //       ItemDescription: data.itemDescription,
    //       VendorCode: data.vendorCode,
    //       VendorName: data.vendorName,
    //       ForeignVendorCode: data.foreignVendorCode,
    //       ForeignVendorName: data.foreignVendorName,
    //       CountryOrigin: data.countryOrigin,
    //       ItemStatus: data.itemStatus,
    //       ShelfLifeWeeks: data.shelfLifeWeeks,
    //       Trigger: data.trigger,
    //       BuildTo: data.buildTo,
    //       TotalOrderLeadTime: data.totalOrderLeadTime,
    //       CbmPerCase: data.cbmPerCase,
    //       TotalCbmPerContainer: data.totalCbmPerContainer,
    //       TonPerCase: data.tonPerCase,
    //       PoDay: data.poDay,
    //       Buyer: data.buyer,
    //       // OrderSpecialist: data.orderSpecialist,
    //       UnitPerCase: data.unitPerCase,
    //       CasePerPallet: data.casePerPallet,
    //       UnitPerPallet: data.unitPerPallet,
    //       TotalTonPerContainer: data.totalCbmPerContainer,
    //       NoOfPalletsPerContainer: data.noOfPalletsPerContainer,
    //       ContainerStacking: data.containerStacking,
    //       UnitsPerContainer: data.unitsPerContainer,
    //       ContainerLoad: data.containerLoad,
    //       ContainerSize: data.containerSize,
    //       Moq: data.moq,
    //       MixLoadSkus: data.mixLoadSkus,
    //       CreatedOn: getDateTimeNow(),
    //       CreatedBy: zUserEmailAdd,
    //       ModifiedOn: getDateTimeNow(),
    //       ModifiedBy: zUserEmailAdd,
    //       IsEnabled: true,
    //       ActionTblCol: "",
    //     };
    //     if (isValid) {
    //       if (zEmployeeAddEditTitle === ADD_EMPLOYEE) {
    //         try {
    //           createSkuMasterList(data2).then((res: any) => {
    //             if (res !== null && res === "Sku already exists!") {
    //               toast.error(res, {
    //                 position: "top-right",
    //                 autoClose: 5000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "colored",
    //                 transition: Bounce,
    //               });
    //             } else if (res !== null && res === "Sku created successfully") {
    //               toast.success(res, {
    //                 position: "top-right",
    //                 autoClose: 5000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "colored",
    //                 transition: Bounce,
    //               });
    //               //reset fields
    //               reset();
    //             }
    //           });
    //         } catch (err: any) {
    //           // Handle any errors during the creation process
    //           toast.error("Failed to create SKU: " + err.message, {
    //             position: "top-right",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "colored",
    //             transition: Bounce,
    //           });
    //         }
    //       } else {
    //         try {
    //           // Await the result of createSkuMasterList if it's a promise
    //           updateSku(data2).then((res: any) => {
    //             if (res !== null && res === UPDATED_SKU_MESSAGE) {
    //               toast.success(res, {
    //                 position: "top-right",
    //                 autoClose: 5000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "colored",
    //                 transition: Bounce,
    //               });
    //             } else {
    //               toast.error(res, {
    //                 position: "top-right",
    //                 autoClose: 5000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "colored",
    //                 transition: Bounce,
    //               });
    //             }
    //           });
    //         } catch (err: any) {
    //           // Handle any errors during the creation process
    //           toast.error("Failed to create SKU: " + err.message, {
    //             position: "top-right",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "colored",
    //             transition: Bounce,
    //           });
    //         }
    //       }
    //     }
    //   } else if (result.isDismissed) {
    //     // If the user clicks "Cancel"
    //     // console.log("Delete action canceled");
    //   }
    // });
  };

  const designationOptions = [
    // { value: "Inbound", label: "Inbound" },
    { value: "Inbound Manager", label: "Inbound Manager" },
    { value: "Receiving Secretary", label: "Receiving Secretary" },
    { value: "Inbound Supervisor", label: "Inbound Supervisor" },
    { value: "Unloader", label: "Unloader" },
    { value: "Pallet Unloader", label: "Pallet Unloader" },
    { value: "Transporter", label: "Transporter" },
    { value: "Forklift Driver", label: "Forklift Driver" },
    // { value: "Outbound", label: "Outbound" },
    { value: "Outbound Manager", label: "Outbound Manager" },
    { value: "Outbound Supervisor", label: "Outbound Supervisor" },
    { value: "Shipping Secretary", label: "Shipping Secretary" },
    { value: "Picker", label: "Picker" },
    { value: "Counter & Scanner", label: "Counter & Scanner" },
    { value: "Builder & Loader", label: "Builder & Loader" },
    { value: "Forklift Picker", label: "Forklift Picker" },
    { value: "Letdown Supervisor", label: "Letdown Supervisor" },
    {
      value: "Forklift Letdown High to Low",
      label: "Forklift Letdown High to Low",
    },
    // { value: "Admin", label: "Admin" },
    { value: "Compound Manager", label: "Compound Manager" },
    { value: "DC1 Manager", label: "DC1 Manager" },
    { value: "DC2 Manager", label: "DC2 Manager" },
    { value: "DC1 Admin", label: "DC1 Admin" },
    { value: "DC2 Admin", label: "DC2 Admin" },
  ];

  const agencyOptions = [
    { value: "Manscout", label: "Manscout" },
    { value: "Dynamics", label: "Dynamics" },
    { value: "ATSI", label: "ATSI" },
    { value: "Nuebe", label: "Nuebe" },
  ];

  return (
    <React.Fragment>
      {zEmployee && Object.keys(zEmployee).length > 0 ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {employeeFields.map((field) => {
              let fieldName: any = field.name;
              return (
                <Grid item xs={12} sm={4} key={field.name}>
                  {field.type === "select" ? (
                    <EmployeeSelect
                      label={field.label}
                      name={field.name}
                      value={getValues(fieldName)}
                      options={
                        fieldName === "designation"
                          ? designationOptions
                          : fieldName === "agency"
                          ? agencyOptions
                          : []
                      }
                      error={
                        fieldName === "designation"
                          ? errors.designation
                          : fieldName === "agency"
                          ? errors.agency
                          : undefined
                      }
                      register={register}
                      onChange={
                        fieldName === "designation"
                          ? handleDesignationChange
                          : fieldName === "agency"
                          ? handleAgencyChange
                          : () => {} // default function that does nothing
                      }
                    />
                  ) : field.type === "autocomplete" ? (
                    <>
                      {/* <Controller
                        name={field.name as keyof EnrollmentFormValues}
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
                      /> */}
                    </>
                  ) : (
                    <TextField
                      type={field.type}
                      key={field.name}
                      disabled={
                        (zEmployeeAddEditTitle === UPDATE_EMPLOYEE &&
                          field.name === "skuNumber") ||
                        field.disabled
                          ? true
                          : zEmployeeAddEditTitle === DELETE_EMPLOYEE
                          ? true
                          : false
                      }
                      {...register(field.name as keyof EnrollmentFormValues, {
                        valueAsNumber: field.type === "number" ? true : false, // Parse as number
                      })}
                      inputProps={{
                        step: field.type === "number" ? 1 : undefined, // Allow decimals for numbers
                      }}
                      label={
                        errors[field.name as keyof typeof errors]?.message
                          ? field.label + "*"
                          : field.label
                      }
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={!!errors[field.name as keyof typeof errors]}
                      helperText={
                        errors[field.name as keyof typeof errors]?.message
                      }
                      sx={{
                        "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "black", // Removes the red border
                          },
                      }}
                    />
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

          {zEmployeeAddEditTitle === UPDATE_EMPLOYEE ? (
            <Button
              //   onClick={handleOpenClose}
              type="submit"
              // disabled={!isValid}
              autoFocus
            >
              {zEmployeeAddEditTitle}
            </Button>
          ) : zEmployeeAddEditTitle === DELETE_EMPLOYEE ? (
            <Button
              // onClick={() => handleShowDelete(zSkuMasterList[0].Id)}
              type="button"
              autoFocus
            >
              {zEmployeeAddEditTitle}
            </Button>
          ) : (
            <></>
          )}
        </form>
      ) : zEmployeeAddEditTitle === ADD_EMPLOYEE ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            {employeeFields.map((field) => {
              let fieldName: any = field.name;
              return (
                <Grid item xs={12} sm={4} key={field.name}>
                  {field.type === "select" ? (
                    <EmployeeSelect
                      label={field.label}
                      name={field.name}
                      value={getValues(fieldName)}
                      options={
                        fieldName === "designation"
                          ? designationOptions
                          : fieldName === "agency"
                          ? agencyOptions
                          : []
                      }
                      error={
                        fieldName === "designation"
                          ? errors.designation
                          : fieldName === "agency"
                          ? errors.agency
                          : undefined
                      }
                      register={register}
                      onChange={
                        fieldName === "designation"
                          ? handleDesignationChange
                          : fieldName === "agency"
                          ? handleAgencyChange
                          : () => {} // default function that does nothing
                      }
                    />
                  ) : field.type === "autocomplete" ? (
                    <>
                      {/* <Controller
                        name={field.name as keyof EnrollmentFormValues}
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
                      /> */}
                    </>
                  ) : (
                    <TextField
                      type={field.type}
                      key={field.name}
                      {...register(field.name as keyof EnrollmentFormValues, {
                        valueAsNumber: field.type === "number" ? true : false, // Parse as number
                      })}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: field.type === "number" ? 1 : undefined, // Allow decimals for numbers
                      }}
                      label={
                        errors[field.name as keyof typeof errors]?.message
                          ? field.label + "*"
                          : field.label
                      }
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      onChange={
                        field.name === "skuNumber" ? () => {} : () => {}
                      }
                      error={!!errors[field.name as keyof typeof errors]}
                      helperText={
                        errors[field.name as keyof typeof errors]?.message
                      }
                      sx={{
                        "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "black", // Removes the red border
                          },
                      }}
                      disabled={field.disabled ? true : false}
                    />
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
            {zEmployeeAddEditTitle}
          </Button>
        </form>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
};

export default AddEditEmployeeForm;
