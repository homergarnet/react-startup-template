import React, { useEffect, useState } from "react";
import { SkuMasterModel } from "../../../../types/skumastermodel";
import useSkuMasterListContext from "../../../../store/OrderAnalyst/SkuMasterList/useSkuMasterListContext";
import SETableData from "./SETableData";

interface ChildProps {
  isView: boolean;
  data: SkuMasterModel[] | null | undefined;
  isEnableCheckbox: boolean;
  isForApprovalDisabled: boolean;
  isApprovedDisabledOrder: boolean;
}

const SkuEnrollmentTableList: React.FC<ChildProps> = ({
  isView,
  data,
  isEnableCheckbox,
  isForApprovalDisabled,
  isApprovedDisabledOrder,
}) => {
  const {
    getAllSkus,
    zSkuMasterList,
    zSkuMasterGBBuyerList,
    zSkuMasterGBVNameList,
    zSkuSearchText,
    zSkuEnrollmentTab,
  } = useSkuMasterListContext();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredDataList = data?.filter((sku) =>
    zSkuSearchText
      ? sku.SkuNumber.toLowerCase().includes(zSkuSearchText.toLowerCase())
      : true
  );

  useEffect(() => {}, [zSkuSearchText, zSkuEnrollmentTab]);

  return (
    <>
      {filteredDataList && filteredDataList?.length > 0 ? (
        <SETableData
          data={filteredDataList}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          isView={isView}
          isEnableCheckbox={isEnableCheckbox}
          isForApprovalDisabled={isForApprovalDisabled}
          isApprovedDisabledOrder={isApprovedDisabledOrder}
        />
      ) : (
        <p>No Result</p>
      )}
    </>
  );
};

export default SkuEnrollmentTableList;
