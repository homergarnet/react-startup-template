import React, { useEffect, useState } from "react";
import SETableData from "./ManagerOrderingTblData";
import { SkuMasterModel } from "../../../../../types/skumastermodel";
import useManagerOrderingContext from "../../../../../store/Manager/ManagerOrdering/useManagerOrderingContext";
import ManagerOrderingTblData from "./ManagerOrderingTblData";
import useSharedStore from "../../../../../store/sharedStore";

interface ChildProps {
  isView: boolean;
  data: SkuMasterModel[] | null | undefined;
}

const ManagerOrderingTblList: React.FC<ChildProps> = ({ isView, data }) => {
  const { zSkuSearchText, getAllSkus } = useManagerOrderingContext();
  const { zSetLoading } = useSharedStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [skuMasterList, setSkuMasterList] = useState<any[]>([]);
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

  //when user search something
  useEffect(() => {}, [zSkuSearchText]);

  const initializationData = async () => {
    zSetLoading(true);
    try {
      setSkuMasterList([]);
      const [allSkus] = await Promise.all([getAllSkus(2, "", true)]);
      setSkuMasterList(allSkus || []);
    } catch (error) {
      console.error("Error during initialization:", error);
      // Optionally show user feedback
    } finally {
      zSetLoading(false);
    }
  };

  useEffect(() => {
    initializationData();
  }, []);

  return (
    <>
      {filteredDataList && filteredDataList?.length > 0 ? (
        <ManagerOrderingTblData
          data={filteredDataList}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          isView={isView}
        />
      ) : (
        <p>No Result</p>
      )}
    </>
  );
};

export default ManagerOrderingTblList;
