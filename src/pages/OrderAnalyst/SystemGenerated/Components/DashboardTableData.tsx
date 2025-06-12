import {
  Box,
  Button,
  Checkbox,
  Grid,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  CreateOrUpdateIsPORequest,
  DashboardModel,
  UpdateAdjustedRequest,
  UpdateWorksheetRequest,
  WorksheetObj,
} from "../../../../types/dashboardmodel";
import useColumnVisibility from "../Hooks/useColumnVisibility";
import StyledTableCellHeader from "../../../../Components/ReusableComponents/TableComponents/StyledTableCellHeader";
import StyledTableCellBody from "../../../../Components/ReusableComponents/TableComponents/StyledTableCellBody";
import StyledTableCellNoData from "../../../../Components/ReusableComponents/TableComponents/StyledTableCellNoData";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank"; // Icon for empty box
import CheckIcon from "@mui/icons-material/Check";
import useHomeContext from "../../../../store/Home/useHomeContext";
import useOrderFormContext from "../../../../store/OrderAnalyst/OrderForm/useOrderFormContext";
import { useLocation, useNavigate } from "react-router-dom";
import useSwal from "../../../../Hooks/useSwal";
import {
  CREATED_WITH_PO_MESSAGE,
  ROUTE_LOCATIONS,
  UPDATED_WORKSHEET_STATUS_MESSAGE,
} from "../../../../constants/constants";

import { formatNumber } from "../../../../utils/formatNumber";
import useUpdateOrderForm from "../../OrderForm/hooks/useUpdateOrderForm";
import debounce from "lodash/debounce";
import { AxiosRequestConfig } from "axios";
import api from "../../../../Config/AxiosConfig";
import useSharedStore from "../../../../store/sharedStore";
import ITempSku from "../../SkuMasterList/Interface/ITempSku";
import ISkuMap from "../../Home/Interface/ISkuMap";
import DTblDataTextField from "./DTblDataTextField";
import { IDashboardColumn } from "../../SkuMasterList/Interface/IDashboardColumn";
import { IDashboardRow } from "../../SkuMasterList/Interface/IDashboardRow";
import DashboardTblHdrData from "./DashboardTblHdrData";
import RestoreIcon from "@mui/icons-material/Restore";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { addSpaceToPascalCase } from "../../../../utils/addSpacePascalCase";
import DashboardTblBodyData from "./DashboardTblBodyData";

interface TableDataProps {
  data: DashboardModel[];
  tableHeaderArr: string[]; // Adding a property for an array of strings
  page: number;
  rowsPerPage: number;
  totalPages: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isView?: boolean;
  visibleWorksheetStatus: number;
  dashboardType?: string;
}

const columns: IDashboardColumn[] = [
  { id: "Checkbox", label: "Checkbox" },
  { id: "IsPOCheckbox", label: "PO Checkbox" },
  { id: "SkuNumber", label: "SKU" },
  { id: "ItemDescription", label: "SKU Description" },
  { id: "ContainerLoad", label: "Freight Terms" },
  { id: "SkuCount", label: "SKU Count" },
  { id: "Moq", label: "MOQ" },
  { id: "Trigger", label: "Trigger" },
  { id: "BuildTo", label: "Build To" },
  { id: "UnitPerCase", label: "Unit Per Case" },
  { id: "InCase", label: "In Case" },
  { id: "InPallets", label: "In Units" },
  { id: "SuggestedWeekNo", label: "Suggested Week No" },
  { id: "SuggestedOrder", label: "System Suggested Order" },
  { id: "Adjustment", label: "Adjustment" },
  { id: "Ordered", label: "Ordered" },
  { id: "CurrentWeekSupply", label: "Current Week Supply" },
  { id: "ProjectedWeekSupply", label: "Projected Week Supply" },
  { id: "AdjustedOrder", label: "Adjusted Order" },
  { id: "AdjustedWeekSupply", label: "Adjusted Week Supply" },
  { id: "NextPoArrival", label: "Nearest ETA" },
  { id: "PoNumber", label: "Po Number" },
  { id: "VendorName", label: "Vendor" },
  { id: "OriginalETA", label: "Original ETA" },
  { id: "UpdatedETA", label: "Updated ETA" },
  { id: "ActionTblCol", label: "Action" },
];

const DashboardTableData: React.FC<TableDataProps> = ({
  data,
  tableHeaderArr,
  page,
  rowsPerPage,
  totalPages,
  onPageChange,
  onRowsPerPageChange,
  isView,
  visibleWorksheetStatus,
  dashboardType,
}) => {
  const {
    getTableList,
    getTableListBySkuNumber,
    updateWorksheetStatus,
    updateAdjustedBySku,
    createOrUpdateIsPO,
    zSetIsWorksheetStatusChange,
    zIsWorksheetStatusChange,
    zOrderFormReRender,
    zSetOrderFormReRender,
    zWorksheetObj,
    zSetWorksheetObj,
    zSkuMap,
    removeSku,
    zSku,
    zSetSku,
    scorecardDetailsCount,
    zCheckedItemsCache,
    updateZCheckedItemsCache,
    toggleZCheckedItemsCache,
    zSkuSearchText,
    zSelectDay,
  } = useHomeContext();

  const {
    filteredTGA,
    setFilteredTGA,
    checkedItems,
    setCheckedItems,
    checkedItemsHistory,
    setCheckedItemsHistory,
    setOrderForms,
    processOrderForms,
    setProcessOrderForms,
    updateOrderForm,
    processOrderFormAndSetState,
    currentYearAndWeeks,
    setCurrentYearAndWeeks,
    orderFormsDetails,
    setOrderFormsDetails,
    adjustedOrder,
    setAdjustedOrder,
  } = useUpdateOrderForm();

  const { zSetLoading, zUserEmailAdd, zRoleId } = useSharedStore();

  const {
    zBaseLineLastYear,
    zBaseLineThisYear,
    zSetWorksheetHistory,
    zSetIsScroll,
    zSetCurrentWeekHighlight,
    zSetNextLeadTime,
    zSetOrderFormSearch,
    zSetCurrentWeek,
    zSetIsClearLYTYBaseLine,
    zSetBaseLineThisYear,
    zSetBaseLineLastYear,
    zSetIsFirstLoad,
    zProjectedWeekSupply,
    zSetAdjustedOrder,
    zMixedSkuNumbers,
  } = useOrderFormContext();

  const location = useLocation();

  const { showConfirm, showToast } = useSwal();
  const navigate = useNavigate();

  const allChecked =
    data.length > 0 && data.every((row) => checkedItems[row.SkuNumber]);

  const {
    visibleColumns,
    anchorEl,
    handleMenuOpen,
    handleMenuClose,
    handleColumnToggle,
  } = useColumnVisibility({
    initialColumns: {
      Checkbox: true,
      IsPOCheckbox: true,
      SkuNumber: true,
      ItemDescription: true,
      ContainerLoad: true,
      SkuCount: true,
      Moq: true,
      SuggestedWeekNo: true,
      SuggestedOrder: true,
      Ordered: true,
      Trigger: true,
      BuildTo: true,
      UnitPerCase: true,
      InCase: true,
      InPallets: true,
      CurrentWeekSupply: true,
      ProjectedWeekSupply: true,
      AdjustedOrder: true,
      AdjustedWeekSupply: true,
      NextPoArrival: true,
      PoNumber: true,
      VendorName: true,
      OriginalETA: true,
      UpdatedETA: true,
      ActionTblCol: true,
    },
  });

  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof IDashboardRow | "">("");
  const [displayedRows, setDisplayedRows] = useState<DashboardModel[]>([]);
  // for finding row of skuNumber
  const [tempSuggestedOrders, setTempSuggestedOrders] = useState<ITempSku[]>(
    []
  );
  // for finding row of skuNumber
  const tempSuggestedOrdersRef = useRef<ITempSku[]>([]);
  //needed for Day Selector change
  const [displayedRowsCache, setDisplayedRowsCache] = useState<
    DashboardModel[]
  >([]);
  const [pageScroll, setPageScroll] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const handleSort = (property: keyof IDashboardRow) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleResetSort = () => {
    setOrder("asc");
    setOrderBy("");
  };

  const loadMoreRows = async () => {
    //if you get all the data without pagination in be, used this code
    // const startIndex = pageScroll * rowsPerPage;
    // const newRows = data.slice(startIndex, startIndex + rowsPerPage);
    // console.log("newRows: ", newRows);
    let keyword = zSkuSearchText || zSelectDay || "";
    let wsStatus = 0;
    if (
      location.pathname.includes(`${ROUTE_LOCATIONS.HOME}`) ||
      location.pathname.includes(`${ROUTE_LOCATIONS.SYSTEM_GENERATED}`)
    ) {
      wsStatus = 2;
    } else if (
      location.pathname.includes(
        `${ROUTE_LOCATIONS.TO_REVIEW_MANAGER_APPROVAL}`
      )
    ) {
      wsStatus = 3;
    } else if (
      location.pathname.includes(`${ROUTE_LOCATIONS.APPROVED_S_AND_R}`)
    ) {
      wsStatus = 4;
    } else if (
      location.pathname.includes(`${ROUTE_LOCATIONS.MIX_CONTAINER_SUMMARY}`)
    ) {
      wsStatus = 2;
    }
    // when it is in the mix container summary
    if (
      location.pathname.includes(`${ROUTE_LOCATIONS.MIX_CONTAINER_SUMMARY}`)
    ) {
      const skuNumbersArr = zMixedSkuNumbers
        ?.map((item) => item.match(/^\d+/)?.[0])
        .filter(Boolean);
      const skuNumbers = skuNumbersArr.join(",");
      let { HomeTblList } = await getTableListBySkuNumber(
        keyword,
        wsStatus,
        skuNumbers,
        pageScroll * rowsPerPage,
        rowsPerPage
      );

      // console.log("pageScroll: ", pageScroll);
      // console.log("HomeTblList2: ", HomeTblList);
      setDisplayedRows((prev) => [...prev, ...HomeTblList]);
      // console.log("pageScroll: ", pageScroll);
      setPageScroll((prev) => prev + 1);
      setIsLoading(false);
    } else {
      let { HomeTblList } = await getTableList(
        keyword,
        wsStatus,
        pageScroll + 1,
        rowsPerPage
      );

      // console.log("pageScroll: ", pageScroll);
      // console.log("HomeTblList2: ", HomeTblList);
      setDisplayedRows((prev) => [...prev, ...HomeTblList]);
      // console.log("pageScroll: ", pageScroll);
      setPageScroll((prev) => prev + 1);
      setIsLoading(false);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const scrollPosition = scrollTop + clientHeight;

    if (
      scrollPosition >= scrollHeight * 0.9 &&
      pageScroll < totalPages &&
      !isLoading
    ) {
      setIsLoading(true);
      loadMoreRows();
    }
  };

  const handleSkuRedirect = useCallback((skuNumber: string) => {
    zSetOrderFormSearch(skuNumber);
    navigate("/order-analyst/order-form");
  }, []);

  const handleClear = async () => {
    console.log("handle clear is called");
    setProcessOrderForms([]);
    setOrderForms([]);
    setCurrentYearAndWeeks([]);
    setCheckedItems({});
    setCheckedItemsHistory({});
    zSetIsClearLYTYBaseLine(true);
    zSetBaseLineThisYear(0);
    zSetBaseLineLastYear(0);
    zSetWorksheetHistory([]);
    zSetIsFirstLoad(true);
  };

  const fetchWorkSheet = useCallback(async (sku: string) => {
    console.log("fetchWorkSheet is called");
    try {
      zSetLoading(true); // Start loading
      const config: AxiosRequestConfig = {
        method: "GET",
        url: `/WorkSheet/GetWorkSheetDetails?Sku=${sku}&userEmailAdd=${zUserEmailAdd}`,
      };

      const response = await api(config);

      if (
        response.data &&
        response.data.currentRange &&
        response.data.previousRange
      ) {
        zSetCurrentWeekHighlight(response.data.CurrentWeekHighlight);
        // Use functional updates to avoid stale state issues
        setFilteredTGA(response.data.selectedTGA);
        setOrderFormsDetails(response.data.workSheetSkuDetails);
        setCurrentYearAndWeeks(response.data.currentRange);
        // currentYearAndWeek = response.data.currentRange[1];
        zSetCurrentWeek(response.data.currentRange[1]);
        setOrderForms(response.data.workSheetList);
        // console.log(
        //   "response.data.workSheetList: ",
        //   response.data.workSheetList
        // );
        zSetWorksheetHistory(response.data.workSheetHistory);
        // console.log("response.data: ", response.data);
      } else {
        zSetNextLeadTime("");
        setOrderFormsDetails([]);
        showToast("Sku not found or data incomplete.", "error");
      }
    } catch (error) {
      zSetNextLeadTime("");
      setOrderFormsDetails([]);
      showToast("An error occurred while fetching the data.", "error");
    } finally {
      zSetIsScroll(true);
      zSetLoading(false); // Stop loading in both success and error scenarios
    }
  }, []);

  // Debounced functions
  const debouncedFetchWorkSheet = debounce((skuNumber: string) => {
    fetchWorkSheet(skuNumber);
  }, 1500);

  const handleAdjustedOrderChange = useCallback(
    () => async (e: React.ChangeEvent<HTMLInputElement>) => {
      // Remove all non-numeric characters (keep only numbers)

      // console.log("after fetch");
      const rawValue = e.target.value.replace(/(?!^-)\D/g, "");
      // console.log("rawValue: ", rawValue, "SKU:", skuNumber);

      // Convert to number
      const numericValue = rawValue === "" ? 0 : Number(rawValue);
      console.log("numericValue: ", numericValue);
      // Ensure a valid number before setting state
      if (!isNaN(numericValue)) {
        // Format and update input field
        e.target.value = formatNumber(numericValue);
      } else {
        // Format and update input field
        e.target.value = formatNumber(numericValue);
      }
    },
    []
  );

  const handleAdjustedOrderKeyDown = useCallback(
    (skuNumber: string, moq: number) =>
      async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter") return;

        const target = e.target as HTMLInputElement;
        const noCommaTValue = target.value.replace(/,/g, "");

        if (
          target.value !== "" &&
          Number.isInteger(Number(noCommaTValue) / moq)
        ) {
          // It's a whole number
          await handleClear();
          zSetSku(skuNumber);
          debouncedFetchWorkSheet(skuNumber);

          const rawValue = target.value.replace(/(?!^-)\D/g, "");
          const numericValue = rawValue === "" ? 0 : Number(rawValue);

          if (!isNaN(numericValue)) {
            // console.log("nag if zCheckedItemsCache: ", zCheckedItemsCache);
            target.value = formatNumber(numericValue);
            setAdjustedOrder(numericValue);
            zSetAdjustedOrder(numericValue);
            // for updating the specific table row
            setDisplayedRows((prevRows) => {
              return prevRows.map((row, index) => {
                if (row.SkuNumber === skuNumber) {
                  //setting up the tempSuggestedOrders
                  setTempSuggestedOrders((prev) => {
                    const index = prev.findIndex(
                      (item) => item.SkuNumber === skuNumber
                    );

                    if (index !== -1) {
                      console.log("updated");
                      const updated = [...prev];
                      updated[index] = {
                        ...updated[index],
                        NewSuggestedOrder: numericValue,
                      };
                      return updated;
                    }

                    console.log("created");
                    const newItem: ITempSku = {
                      SkuNumber: skuNumber,
                      SuggestedOrderOriginal: row.SuggestedOrder,
                      NewSuggestedOrder: numericValue,
                      AdjustedWeekSupplyOriginal: row.AdjustedWeekSupply,
                    };

                    return [...prev, newItem];
                  });

                  return {
                    ...row,
                    // if we want to override the suggested order if user inputs in adjusted order
                    // SuggestedOrder: numericValue,
                    // Plantilla: zEmployeeTeamObj?.Plantilla,
                    // Vacancies: zEmployeeTeamObj?.Vacancies,
                  };
                }
                return row;
              });
            });
          } else {
            console.log("nag else");
            console.log("skuNumber: ", skuNumber);
            console.log(
              "tempSuggestedOrders: ",
              tempSuggestedOrdersRef.current
            );

            target.value = formatNumber(numericValue);
            // for updating the specific table row
            setDisplayedRows((prevRows) => {
              return prevRows.map((row) => {
                if (row.SkuNumber === skuNumber) {
                  const foundRow = tempSuggestedOrdersRef.current.find(
                    (item) => item.SkuNumber === skuNumber
                  );

                  return {
                    ...row,
                    SuggestedOrder:
                      (foundRow && foundRow.SuggestedOrderOriginal) || 0,
                    AdjustedWeekSupply:
                      (foundRow && foundRow.AdjustedWeekSupplyOriginal) || 0,
                  };
                }
                return row;
              });
            });
          }
        } else {
          showToast("not divisible by moq", "error");
        }
      },
    []
  );

  // Always keep the ref in sync with state
  useEffect(() => {
    tempSuggestedOrdersRef.current = tempSuggestedOrders;
  }, [tempSuggestedOrders]);

  const handleHeaderCheckboxChange = useCallback(() => {
    const newCheckedState = allChecked
      ? {} // Uncheck all
      : data.slice(0, pageScroll * rowsPerPage).reduce((acc, row) => {
          acc[row.SkuNumber] = true;
          return acc;
        }, {} as Record<string, boolean>); // Check all

    setCheckedItems(newCheckedState);
    updateZCheckedItemsCache(newCheckedState);
  }, [allChecked, data, pageScroll, rowsPerPage, updateZCheckedItemsCache]);

  //set always to zero when there is no other options
  const handleCheckboxChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, skuNumber: string) => {
      const isChecked = event.target.checked;
      console.log("isChecked: ", isChecked);
      setCheckedItems((prev) => ({
        ...prev,
        [skuNumber]: isChecked,
      }));
      toggleZCheckedItemsCache(skuNumber, isChecked);
    },
    [toggleZCheckedItemsCache]
  );

  const handleApproveReviewStatus = useCallback(
    async (statusType: string, skuNumber: string, worksheetStatus: number) => {
      const result = await showConfirm(
        `Are you sure you want to ${statusType}`,
        "You won't be able to revert this!"
      );

      if (result.isConfirmed) {
        const worksheetStatusObj: UpdateWorksheetRequest = {
          SkuNumber: skuNumber,
          WorksheetStatus: worksheetStatus,
        };

        const worksheetObj: WorksheetObj = {
          SkuNumber: skuNumber,
          WorksheetStatus: worksheetStatus,
        };

        zSetWorksheetObj(worksheetObj);

        const res = await updateWorksheetStatus(worksheetStatusObj);
        if (res === UPDATED_WORKSHEET_STATUS_MESSAGE) {
          showToast(res, "success");
          zSetIsWorksheetStatusChange(true);
          scorecardDetailsCount();
        } else {
          showToast(res, "error");
        }
      } else {
        showToast("Cancelled", "info");
      }
    },
    [
      showConfirm,
      showToast,
      zSetWorksheetObj,
      updateWorksheetStatus,
      zSetIsWorksheetStatusChange,
      scorecardDetailsCount,
    ]
  );

  const handleApproveCancelStatus = async (statusType: string) => {
    if (Object.keys(zCheckedItemsCache).length > 0) {
      const result = await showConfirm(
        `Are you sure you want to ${statusType}`,
        "You won't be able to revert this!"
      );
      if (result.isConfirmed) {
        //so the success toast or error toast display once
        let errorCounterObj = { error: "", counter: 0 } as {
          error: string;
          counter: number;
        };

        const list: ISkuMap[] = Array.from(zSkuMap.values());

        console.log("list: ", list);
        console.log("tempSuggestedOrders: ", tempSuggestedOrders);
        for (let i = 0; i < Object.keys(zCheckedItemsCache).length; i++) {
          let skuNumber = Object.keys(zCheckedItemsCache)[i];
          let ManagerApprovalStatus = Object.values(zCheckedItemsCache)[i];
          const foundRow = list.find((item) => item.sku === skuNumber);
          let updateAdjustedObj: UpdateAdjustedRequest = {
            SkuNumber: skuNumber,
            AdjustedOrder:
              statusType === "cancel" ? 0 : foundRow?.adjustedOrder || 0,
            AdjustedWeekSupply:
              statusType === "cancel" ? 0 : foundRow?.adjustedWeekSupply || 0,
            WorksheetStatus:
              ManagerApprovalStatus && statusType === "approve"
                ? 4
                : statusType === "cancel"
                ? 2
                : 3,
          };

          let res = await updateAdjustedBySku(updateAdjustedObj);

          if (res === UPDATED_WORKSHEET_STATUS_MESSAGE) {
            // for updating the specific table row
            setDisplayedRows((prevRows) => {
              return prevRows.map((row) => {
                if (row.SkuNumber === skuNumber) {
                  const foundRow = tempSuggestedOrdersRef.current.find(
                    (item) => item.SkuNumber === skuNumber
                  );

                  return {
                    ...row,
                    WorksheetStatus:
                      statusType === "approve"
                        ? 4
                        : statusType === "cancel"
                        ? 2
                        : 3,
                  };
                }
                return row;
              });
            });
          } else {
            errorCounterObj.error += res + " ";
          }
          errorCounterObj.counter++;
        }
        if (
          errorCounterObj.counter === Object.keys(zCheckedItemsCache).length
        ) {
          showToast(UPDATED_WORKSHEET_STATUS_MESSAGE, "success");
        } else {
          showToast(errorCounterObj.error, "error");
        }
      } else {
        showToast("Cancelled", "info");
      }
    } else {
      showToast("Check atleast one for ordering checkbox", "info");
    }
  };

  const handleWithPOStatus = async (statusType: string) => {
    if (Object.keys(zCheckedItemsCache).length > 0) {
      const result = await showConfirm(
        `Are you sure you want to ${statusType}`,
        "You won't be able to revert this!"
      );
      if (result.isConfirmed) {
        //so the success toast or error toast display once
        let errorCounterObj = { error: "", counter: 0 } as {
          error: string;
          counter: number;
        };

        const list: ISkuMap[] = Array.from(zSkuMap.values());

        console.log("list: ", list);
        console.log("tempSuggestedOrders: ", tempSuggestedOrders);

        for (let i = 0; i < Object.keys(zCheckedItemsCache).length; i++) {
          let skuNumber = Object.keys(zCheckedItemsCache)[i];
          let ManagerApprovalStatus = Object.values(zCheckedItemsCache)[i];
          const foundRow = list.find((item) => item.sku === skuNumber);
          let createOrUpdateIsPORequest: CreateOrUpdateIsPORequest = {
            SkuNumber: skuNumber,
            IsWithPO: true,
            IsEnabled: true,
          };

          let res = await createOrUpdateIsPO(createOrUpdateIsPORequest);

          if (res === CREATED_WITH_PO_MESSAGE) {
            // for updating the specific table row
            setDisplayedRows((prevRows) => {
              return prevRows.map((row) => {
                if (row.SkuNumber === skuNumber) {
                  const foundRow = tempSuggestedOrdersRef.current.find(
                    (item) => item.SkuNumber === skuNumber
                  );

                  return {
                    ...row,
                    WorksheetStatus: 5,
                  };
                }
                return row;
              });
            });
          } else {
            errorCounterObj.error += res + " ";
          }
          errorCounterObj.counter++;
        }
        if (
          errorCounterObj.counter === Object.keys(zCheckedItemsCache).length
        ) {
          showToast(CREATED_WITH_PO_MESSAGE, "success");
        } else {
          showToast(errorCounterObj.error, "error");
        }
      } else {
        showToast("Cancelled", "info");
      }
    } else {
      showToast("Check atleast one for is po checkbox", "info");
    }
  };

  // to display the data in the table when zSkuMasterList is updated
  useEffect(() => {
    // setDisplayedRows(allRows.slice(0, rowsPerPage));
    console.log("data: ", data);
    setDisplayedRows(data.slice(0, rowsPerPage));
    setDisplayedRowsCache(data.slice(0, rowsPerPage));
    setPageScroll(1);
  }, []);

  //useEffect for updating buttons in the table
  useEffect(() => {
    if (zIsWorksheetStatusChange === true) {
      // for updating the specific table row
      setDisplayedRows((prevRows) => {
        const updatedRows = prevRows.map((row) =>
          row.SkuNumber === zWorksheetObj?.SkuNumber
            ? {
                ...row,
                WorksheetStatus: zWorksheetObj?.WorksheetStatus,
              }
            : row
        );

        return updatedRows;
      });

      // for updating the specific table row
      setDisplayedRowsCache((prevRows) => {
        const updatedRows = prevRows.map((row) =>
          row.SkuNumber === zWorksheetObj?.SkuNumber
            ? {
                ...row,
                WorksheetStatus: zWorksheetObj?.WorksheetStatus,
              }
            : row
        );

        return updatedRows;
      });
    }
  }, [zIsWorksheetStatusChange]);

  //useEffect for updating adjusted week supply in the table
  useEffect(() => {
    //need condition 3 if the Sku has no LY TY baseline 4 if that SKU has a LY TY baseline history
    // console.log("zOrderFormReRender: ", zOrderFormReRender);
    if (
      (zBaseLineLastYear !== 0 || zBaseLineThisYear !== 0) &&
      zOrderFormReRender === 4
    ) {
      if (zOrderFormReRender === 4) {
        // for updating the specific table row
        setDisplayedRows((prevRows) => {
          const updatedRows = prevRows.map((row) =>
            row.SkuNumber == zSku
              ? {
                  ...row,
                  AdjustedWeekSupply: zProjectedWeekSupply,
                }
              : row
          );

          return updatedRows;
        });
        zSetOrderFormReRender(0);
      }
    } else if (
      zBaseLineLastYear === 0 &&
      zBaseLineThisYear === 0 &&
      zOrderFormReRender === 3
    ) {
      // for updating the specific table row
      setDisplayedRows((prevRows) => {
        const updatedRows = prevRows.map((row) =>
          row.SkuNumber == zSku
            ? {
                ...row,
                AdjustedWeekSupply: zProjectedWeekSupply,
              }
            : row
        );

        return updatedRows;
      });
      zSetOrderFormReRender(0);
    }
  }, [zOrderFormReRender]);

  //for recalculation of updateOrderForm
  // remove the checkedItems because we are using it only for deletion not for excluding TGA
  useEffect(() => {
    // console.log("called: ");
    updateOrderForm();
    // console.log(" zBaseLineLastYear useEffect: ", zBaseLineLastYear);
    // console.log(" checkedItems: ", checkedItems);
  }, [filteredTGA, zBaseLineLastYear, zBaseLineThisYear]);

  const sortedRows = [...displayedRows].sort((a, b) => {
    if (!orderBy) return 0;
    if (a[orderBy] < b[orderBy]) {
      return order === "asc" ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <>
      {dashboardType && dashboardType === "Manager Approval" && (
        <Grid container spacing={1} sx={{ ml: 1.5, mb: 2 }}>
          <Grid item xs={12} sm={3} md={3} xl={3}>
            <Button
              variant="outlined"
              onClick={() => handleApproveCancelStatus("approve")}
            >
              Approve
            </Button>
          </Grid>
        </Grid>
      )}
      {dashboardType &&
        dashboardType === "ApprovedSAndR" &&
        zRoleId === "2" && (
          <Grid container spacing={1} sx={{ ml: 1.5, mb: 2 }}>
            <Grid item xs={12} sm={3} md={3} xl={3}>
              <Button
                variant="outlined"
                onClick={() => handleWithPOStatus("approve PO Status")}
              >
                Create PO
              </Button>{" "}
              <Button
                variant="outlined"
                onClick={() => handleApproveCancelStatus("cancel")}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        )}
      <TableContainer
        component={Paper}
        onScroll={handleScroll}
        sx={{
          width: "98%",
          height: "370px",
          overflowY: "scroll",
          padding: "10px 20px",
          borderRadius: "20px",
          boxShadow: "none",
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#2b4b81",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
        }}
      >
        <Table>
          <DashboardTblHdrData
            columns={columns}
            visibleColumns={visibleColumns}
            tableHeaderArr={tableHeaderArr}
            allChecked={allChecked}
            onHeaderCheckboxChange={handleHeaderCheckboxChange}
            onSort={handleSort}
            orderBy={orderBy}
            order={order}
            isView={isView}
          />
          <DashboardTblBodyData
            columns={columns}
            visibleColumns={visibleColumns}
            tableHeaderArr={tableHeaderArr}
            isView={isView}
            sortedRows={sortedRows}
            data={data}
            visibleWorksheetStatus={visibleWorksheetStatus}
            checkedItems={checkedItems}
            setCheckedItems={setCheckedItems}
            onCheckboxChange={handleCheckboxChange}
            onSkuRedirect={handleSkuRedirect}
            onAdjustedOrderChange={handleAdjustedOrderChange}
            onAdjustedOrderKeyDown={handleAdjustedOrderKeyDown}
            onApproveReviewStatus={handleApproveReviewStatus}
          />
        </Table>
      </TableContainer>
      <Box mt={2} display="flex" justifyContent="center">
        <Typography variant="body1">
          Page {pageScroll} of {totalPages}
        </Typography>
      </Box>
    </>
  );
};

export default DashboardTableData;
