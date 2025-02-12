import React, { useState } from "react";
import {
  enrollmentFormSchema,
  EnrollmentFormValues,
} from "../schema/employeeFormSchema";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  employeeFields,
  teamFields,
  UPDATE_EMPLOYEE,
} from "../../../constants/constants";
import {
  Autocomplete,
  Button,
  Grid,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import useEnrollmentPeopleContext from "../../../store/enrollment-people/useEnrollmentPeopleContext";
import Swal from "sweetalert2";
import { Bounce, toast } from "react-toastify";
import EmployeeSelect from "./EmployeeSelect";
import { teamFormSchema, TeamFormValues } from "../schema/teamFormSchema";
import ColorPicker from "material-ui-color-picker";
import DaySelector from "./DaySelector";
interface Props {
  initialValues?: TeamFormValues;
}
const AddEditTeamForm: React.FC<Props> = () => {
  const { zEmployeeAddEditTitle, zEmployee } = useEnrollmentPeopleContext();
  const [color, setColor] = useState("#000");
  const form = useForm<TeamFormValues>({
    resolver: zodResolver(teamFormSchema), // Use Zod for validation
    defaultValues: {
      teamName: "",
      colorCode: "",
      area: "",
      shift: "",
      restDay: "",
      shiftPerRole: [{ roleLabel: "", roleDesignation: "" }],
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

  const { fields, append, remove } = useFieldArray({
    name: "shiftPerRole",
    control,
  });

  const handleAreaChange = (event: SelectChangeEvent) => {
    setValue("area", event.target.value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    // setAge(event.target.value);
  };

  const handleShiftChange = (event: SelectChangeEvent) => {
    setValue("shift", event.target.value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    // setAge(event.target.value);
  };

  const handleColorInput = (newValue: string) => {
    setValue("colorCode", newValue);
    setColor(newValue);
  };

  const onSubmit = async (data: TeamFormValues) => {
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

  const areaOptions = [
    { value: "Inbound", label: "Inbound" },
    { value: "Outbound", label: "Outbound" },
  ];

  const shiftOptions = [
    { value: "Day Shift", label: "Day Shift" },
    { value: "Night Shift", label: "Night Shift" },
  ];

  return (
    <React.Fragment>
      {zEmployee && Object.keys(zEmployee).length > 0 ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {teamFields.map((field) => {
              let fieldName: any = field.name;
              return (
                <Grid item xs={12} sm={4} key={field.name}>
                  {field.type === "select" ? (
                    <EmployeeSelect
                      label={field.label}
                      name={field.name}
                      value={getValues(fieldName)}
                      options={
                        fieldName === "area"
                          ? areaOptions
                          : fieldName === "shift"
                          ? shiftOptions
                          : []
                      }
                      error={
                        fieldName === "area"
                          ? errors.area
                          : fieldName === "shift"
                          ? errors.shift
                          : undefined
                      }
                      register={register}
                      onChange={
                        fieldName === "area"
                          ? handleAreaChange
                          : fieldName === "shift"
                          ? handleShiftChange
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
                  ) : field.type === "colorCode" ? (
                    <>
                      <ColorPicker
                        name="color"
                        defaultValue="Color code"
                        value={color}
                        // value={this.state.color} - for controlled component
                        onChange={handleColorInput}
                        disabled={true}
                      />
                    </>
                  ) : field.type === "buttonGroup" ? (
                    <>
                      <Typography
                        variant="h4"
                        component="div"
                        sx={{
                          fontWeight: "bold",
                          color: "darkblue", // Light blue for the number
                        }}
                        textAlign={"center"}
                      >
                        Rest Day
                      </Typography>
                      <DaySelector />
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
                      {...register(field.name as keyof TeamFormValues, {
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
            {teamFields.map((field) => {
              let fieldName: any = field.name;
              return (
                <>
                  <Grid item xs={12} sm={6} key={field.name}>
                    {field.type === "select" ? (
                      <EmployeeSelect
                        label={field.label}
                        name={field.name}
                        value={getValues(fieldName)}
                        options={
                          fieldName === "area"
                            ? areaOptions
                            : fieldName === "shift"
                            ? shiftOptions
                            : []
                        }
                        error={
                          fieldName === "area"
                            ? errors.area
                            : fieldName === "shift"
                            ? errors.shift
                            : undefined
                        }
                        register={register}
                        onChange={
                          fieldName === "area"
                            ? handleAreaChange
                            : fieldName === "shift"
                            ? handleShiftChange
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
                    ) : field.type === "colorCode" ? (
                      <>
                        <ColorPicker
                          name="color"
                          defaultValue="Color code"
                          value={color}
                          // value={this.state.color} - for controlled component
                          onChange={handleColorInput}
                          disabled={false}
                        />
                      </>
                    ) : field.type === "buttonGroup" ? (
                      <>
                        <Typography
                          variant="h4"
                          component="div"
                          sx={{
                            fontWeight: "bold",
                            color: "darkblue", // Light blue for the number
                          }}
                          textAlign={"center"}
                        >
                          Rest Day
                        </Typography>
                        <DaySelector />
                      </>
                    ) : field.type === "labelWithText" ? (
                      <>
                        <Typography
                          variant="h4"
                          component="div"
                          sx={{
                            fontWeight: "bold",
                            color: "darkblue", // Light blue for the number
                          }}
                          textAlign={"center"}
                        >
                          {field.label}
                        </Typography>
                        {/* fields */}
                        {fields.map((field2, index) => {
                          return (
                            <>
                              <Grid container spacing={2} alignItems="center">
                                <Grid item xs={4} sm={4} md={4} xl={4}>
                                  <TextField
                                    type={field.fieldTypes[index]}
                                    key={field2.id}
                                    {...register(
                                      `shiftPerRole.${index}.roleLabel` as const,
                                      {
                                        valueAsNumber:
                                          field.fieldTypes[index] === "number"
                                            ? true
                                            : false, // Parse as number
                                      }
                                    )}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    inputProps={{
                                      step:
                                        field.fieldTypes[index] === "number"
                                          ? 1
                                          : undefined, // Allow decimals for numbers
                                    }}
                                    label={
                                      errors[
                                        `shiftPerRole.${index}.roleLabel` as keyof typeof errors
                                      ]?.message
                                        ? "Role label*"
                                        : "Role label"
                                    }
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    onChange={
                                      field.name === "skuNumber"
                                        ? () => {}
                                        : () => {}
                                    }
                                    error={
                                      !!errors?.shiftPerRole?.[index]?.roleLabel
                                    }
                                    helperText={
                                      errors?.shiftPerRole?.[index]?.roleLabel
                                        ?.message
                                    }
                                    sx={{
                                      "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                                        {
                                          borderColor: "black", // Removes the red border
                                        },
                                    }}
                                    disabled={field.disabled ? true : false}
                                  />
                                </Grid>
                                <Grid item xs={4} sm={4} md={4} xl={4}>
                                  <EmployeeSelect
                                    label={field.label}
                                    name={field.name}
                                    value={getValues(fieldName)}
                                    options={
                                      fieldName === "area"
                                        ? areaOptions
                                        : fieldName === "shift"
                                        ? shiftOptions
                                        : []
                                    }
                                    error={
                                      fieldName === "area"
                                        ? errors.area
                                        : fieldName === "shift"
                                        ? errors.shift
                                        : undefined
                                    }
                                    register={register}
                                    onChange={
                                      fieldName === "area"
                                        ? handleAreaChange
                                        : fieldName === "shift"
                                        ? handleShiftChange
                                        : () => {} // default function that does nothing
                                    }
                                  />
                                  {/* <TextField
                                    type={field.fieldTypes[index]}
                                    key={field2.id}
                                    {...register(
                                      `shiftPerRole.${index}.roleDesignation` as const,
                                      {
                                        valueAsNumber:
                                          field.fieldTypes[index] === "number"
                                            ? true
                                            : false, // Parse as number
                                      }
                                    )}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    inputProps={{
                                      step:
                                        field.fieldTypes[index] === "number"
                                          ? 1
                                          : undefined, // Allow decimals for numbers
                                    }}
                                    label={
                                      errors[
                                        `shiftPerRole.${index}.roleDesignation` as keyof typeof errors
                                      ]?.message
                                        ? "Role Designation*"
                                        : "Role Designation"
                                    }
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    onChange={
                                      field.name === "skuNumber"
                                        ? () => {}
                                        : () => {}
                                    }
                                    error={
                                      !!errors?.shiftPerRole?.[index]
                                        ?.roleDesignation
                                    }
                                    helperText={
                                      errors?.shiftPerRole?.[index]
                                        ?.roleDesignation?.message
                                    }
                                    sx={{
                                      "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                                        {
                                          borderColor: "black", // Removes the red border
                                        },
                                    }}
                                    disabled={field.disabled ? true : false}
                                  /> */}
                                </Grid>
                                {index > 0 && (
                                  <Grid
                                    item
                                    xs={2}
                                    sm={2}
                                    md={2}
                                    xl={2}
                                    display="flex"
                                    alignItems="center"
                                  >
                                    <Button
                                      variant="outlined"
                                      onClick={() => remove(index)}
                                      // sx={{ mb: 2 }}
                                    >
                                      Remove
                                    </Button>
                                  </Grid>
                                )}
                              </Grid>
                            </>

                            // <div className="container" key={field.id}>
                            //   <div className="row">
                            //     <div className="col">
                            //       <input
                            //         className="form-control"
                            //         type="number"
                            //         {...register(
                            //           `shiftPerRole.${index}.roleDesignation` as const
                            //         )}
                            //       />
                            //     </div>

                            //     {index > 0 && (
                            //       <div className="col">
                            //         <button
                            //           className="btn btn-primary"
                            //           type="button"
                            //           onClick={() => remove(index)}
                            //         >
                            //           Remove
                            //         </button>
                            //       </div>
                            //     )}
                            //   </div>
                            // </div>
                          );
                        })}

                        <Button
                          variant="outlined"
                          onClick={() =>
                            append({ roleLabel: "", roleDesignation: "" })
                          }
                          sx={{ mb: 2 }}
                        >
                          + Add role
                        </Button>
                      </>
                    ) : (
                      <TextField
                        type={field.type}
                        key={field.name}
                        {...register(field.name as keyof TeamFormValues, {
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
                </>
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

export default AddEditTeamForm;
