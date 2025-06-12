import React, { useEffect, useState } from "react";
import useHomeContext from "../../../../store/Home/useHomeContext";
import WithPOTblData from "./WithPOTblData";

interface Props {
  isView: boolean;
}
const WithPOTblList: React.FC<Props> = ({ isView }) => {
  const { zSkuSearchText, getWithPOList } = useHomeContext();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [withPOTblList, setWithPOTblList] = useState<any[]>([]);

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

  useEffect(() => {
    setWithPOTblList([]);
    getWithPOList(zSkuSearchText || "", 1, 10)
      .then((data) => {
        console.log("data: ", data);

        setWithPOTblList(data || []);
      })
      .catch((error) => {})
      .finally(() => {});
  }, [zSkuSearchText]);

  return (
    <>
      {withPOTblList.length > 0 && (
        <WithPOTblData
          data={withPOTblList}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          isView={isView}
        />
      )}
    </>
  );
};

export default WithPOTblList;
