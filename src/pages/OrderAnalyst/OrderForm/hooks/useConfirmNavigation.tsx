import React, { useRef, useState } from "react";
import { useBlocker, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useOrderFormContext from "../../../../store/OrderAnalyst/OrderForm/useOrderFormContext";
import { WorksheetDataModel } from "../../../../types/worksheetDataModel";
import { getDateTimeNow } from "../../../../utils/getDateTimeNow";
import useSharedStore from "../../../../store/sharedStore";
import { Bounce, toast } from "react-toastify";
import { UNSAVE_CHANGES_MESSAGE } from "../../../../constants/constants";
interface CheckedItems {
  [key: string]: boolean;
}
interface Props {
  checkedItems: CheckedItems;
}
const useConfirmNavigation = ({ checkedItems }: Props) => {
  let checkItemsStr = Object.entries(checkedItems)
    .filter(([key, value]) => value === true) // Filter items where value is true
    .map(([key]) => key) // Extract the keys
    .join(","); // Join them into a string
  const {
    zIsSaveOrder,
    createWorkSheetData,
    zOrderFormSearch,
    zBaseLineThisYear,
    zBaseLineLastYear,
    zSalesManualAdjustedWeeks,
    zSalesManualAdjustedValue,
    zCurrentWeekSupply,
    zProjectedWeekSupply,
    zSuggestedWeekNo,
    zFirstSuggestedOrder,
    zSetIsSaveOrder,
  } = useOrderFormContext();

  const { zSetLoading, zUserEmailAdd } = useSharedStore();
  const [isBlocking, setIsBlocking] = useState(true);
  const navigate = useNavigate();
  const isAlertOpen = useRef(false); // Track if alert is open

  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    console.log("isBlocking:", isBlocking);
    console.log("Current Path:", currentLocation.pathname);
    console.log("Next Path:", nextLocation.pathname);
    console.log("Current Search Params:", currentLocation.search);
    console.log("Next Search Params:", nextLocation.search);
    if (
      isBlocking &&
      currentLocation.pathname !== nextLocation.pathname &&
      !isAlertOpen.current &&
      !zIsSaveOrder
    ) {
      isAlertOpen.current = true; // Prevent duplicate alerts

      Swal.fire({
        title: "Are you sure?",
        text: UNSAVE_CHANGES_MESSAGE,
        icon: "warning",
        showDenyButton: true, // Add a third option
        confirmButtonText: "Save and leave",
        denyButtonText: "Exit without saving", // New option
        allowOutsideClick: false,
        didOpen: () => {
          const swalContainer = document.querySelector(
            ".swal2-container"
          ) as HTMLElement;
          swalContainer?.focus(); // Ensure it's an HTMLElement before calling focus()
        },
      }).then(async (result) => {
        // Delay resetting to prevent rapid triggers
        setTimeout(() => {
          isAlertOpen.current = false;
        }, 500);

        setIsBlocking(false);

        if (result.isConfirmed) {
          let data: WorksheetDataModel = {
            SkuNumber: zOrderFormSearch,
            ExTGAWeekNo: checkItemsStr,
            BaseLineTY: zBaseLineThisYear,
            BaseLineLY: zBaseLineLastYear,
            SalesManualAdjustedWeeks: zSalesManualAdjustedWeeks.slice(0, -1),
            SalesManualAdjustedValue: zSalesManualAdjustedValue.slice(0, -1),
            CurrentWeekSupply: zCurrentWeekSupply,
            ProjectedWeekSupply: zProjectedWeekSupply,
            SuggestedWeekNo: zSuggestedWeekNo,
            SuggestedOrder: zFirstSuggestedOrder,
            WorkSheetStatus: 2,
            WorkSheetUser: zUserEmailAdd,
            CreatedOn: getDateTimeNow(),
            ModifiedOn: getDateTimeNow(),
          };

          setIsBlocking(false);

          try {
            // Await the result of createSkuMasterList if it's a promise
            let res: any = await createWorkSheetData(data);
            console.log("res: ", res);
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
            zSetIsSaveOrder(true);
          } catch (err: any) {
            // Handle any errors during the creation process
            toast.error("Failed to create/update Worksheet: " + err.message, {
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

          navigate(
            nextLocation.search !== "" ||
              nextLocation.search !== undefined ||
              nextLocation.search !== null
              ? nextLocation.pathname + nextLocation.search
              : nextLocation.pathname
          );
        } else if (result.isDenied) {
          setIsBlocking(false);
          navigate(
            nextLocation.search !== "" ||
              nextLocation.search !== undefined ||
              nextLocation.search !== null
              ? nextLocation.pathname + nextLocation.search
              : nextLocation.pathname
          );
        }
      });

      return true; // Prevent navigation until confirmed
    }
    return false;
  });

  return { setIsBlocking };
};

export default useConfirmNavigation;
