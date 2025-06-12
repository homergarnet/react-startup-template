import { useCallback } from "react";
import Swal from "sweetalert2";
import { SkuMasterModel } from "../../../../types/skumastermodel";
import useSkuMasterListContext from "../../../../store/OrderAnalyst/SkuMasterList/useSkuMasterListContext";
import { SkuEnrollmentFormValues } from "../schema/skuEnrollmentFormSchema";

type UseSkuActionsReturn = {
  handleEdit: (data: SkuMasterModel) => void;
  handleShowDelete: (id: string, skuNumber: string) => void;
};

export const useSkuActions = (): UseSkuActionsReturn => {
  const {
    modalData,
    setModalData,
    zIsSkuDialogOpen,
    zSetSkuDialogOpen,
    zSetSkuDialogTitle,
    deleteSku,
    zSkuMasterList,
  } = useSkuMasterListContext();

  const handleEdit = useCallback(
    (data: SkuMasterModel) => {
      const updatedData: SkuEnrollmentFormValues = {
        id: data.Id,
        skuNumber: data.SkuNumber,
        itemDescription: data.ItemDescription,
        vendorCode: data.VendorCode,
        vendorName: data.VendorName,
        foreignVendorName: data.ForeignVendorName,
        foreignVendorCode: data.ForeignVendorCode,
        countryOrigin: data.CountryOrigin,
        itemStatus: data.ItemStatus,
        shelfLifeWeeks:
          data.ShelfLifeWeeks != null && data.ShelfLifeWeeks !== ""
            ? parseInt(data.ShelfLifeWeeks)
            : 0,
        trigger: data.Trigger,
        buildTo: data.BuildTo,
        totalOrderLeadTime: data.TotalOrderLeadTime,
        cbmPerCase: data.CbmPerCase,
        totalCbmPerContainer: data.TotalCbmPerContainer,
        tonPerCase: data.TonPerCase,
        poDay: data.PoDay,
        buyer: data.Buyer,
        unitPerCase: data.UnitPerCase,
        casePerPallet: data.CasePerPallet,
        unitPerPallet: data.UnitPerPallet,
        totalTonPerContainer: data.TotalTonPerContainer,
        noOfPalletsPerContainer: data.NoOfPalletsPerContainer,
        containerStacking: data.ContainerStacking,
        unitsPerContainer: data.UnitsPerContainer,
        containerLoad: data.ContainerLoad,
        containerSize: data.ContainerSize,
        moq: data.Moq,
        mixLoadSkus: [],
      };
      setModalData(updatedData);
      zSetSkuDialogOpen(!zIsSkuDialogOpen);
      zSetSkuDialogTitle("Edit SKU");
    },
    [setModalData, zSetSkuDialogOpen, zIsSkuDialogOpen, zSetSkuDialogTitle]
  );

  const handleShowDelete = useCallback((id: string, skuNumber: string) => {
    Swal.fire({
      title: "Are you sure you want to delete this SKU?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // If the user clicks "Yes, delete it!"
        deleteSku(id, skuNumber); // Make sure deleteSku is available in scope
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
      } else if (result.isDismissed) {
        console.log("Delete action canceled");
      }
    });
  }, []);

  return {
    handleEdit,
    handleShowDelete,
  };
};
