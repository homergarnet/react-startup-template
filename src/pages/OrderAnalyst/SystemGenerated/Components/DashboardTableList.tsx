import React, { useEffect, useRef, useState } from "react";
import DashboardTableData from "./DashboardTableData";
import dummydashboardtbllist from "../../../../constants/dummydashboardtbllist";
import useHomeContext from "../../../../store/Home/useHomeContext";
import { useLocation } from "react-router-dom";
import useOrderFormContext from "../../../../store/OrderAnalyst/OrderForm/useOrderFormContext";
import { ROUTE_LOCATIONS } from "../../../../constants/constants";
interface DataProps {
  tableHeaderArr: string[]; // Adding a property for an array of strings
  isView: boolean;
  visibleWorksheetStatus: number;
  dashboardType?: string;
}

// interface HomeTblItem {
//   SkuNumber: string;
//   ItemDescription: string;
//   ContainerLoad: string;
//   CurrentWeekSupply: number;
//   ProjectedWeekSupply: number;
//   SuggestedWeekNo: string;
//   SuggestedOrder: number;
//   AdjustedOrder: number;
//   AdjustedWeekSupply: number;
//   PoDay: string;
//   Moq: number;
//   Trigger: number;
//   BuildTo: number;
//   UnitPerCase: number;
//   IsEnabled: boolean;
//   WorksheetStatus: number;
//   DateTimeCreated: string;
//   DateTimeUpdated: null | string;
//   InCase: number;
//   InPallets: number;
// }

const DashboardTableList: React.FC<DataProps> = ({
  tableHeaderArr,
  isView,
  visibleWorksheetStatus,
  dashboardType,
}) => {
  const {
    zSkuSearchText,
    zSelectDay,
    getTableList,
    getTableListBySkuNumber,
    addOrUpdateUniqueSku,
    zSetPalletsPerContainer,
    zSetCasesPerContainer,
    zSetTotalPallets,
    zSetMoqUnits,
  } = useHomeContext();

  const { zMixedSkuNumbers } = useOrderFormContext();

  const location = useLocation();
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [homeTblList, setHomeTblList] = useState<any[]>([]);

  const [firstVisitPage, setFirstVisitPage] = useState(true);

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
    setHomeTblList([]);

    let keyword = firstVisitPage ? "" : zSkuSearchText || zSelectDay || "";
    setFirstVisitPage(false);
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
      console.log("skuNumbers: ", skuNumbers);
      getTableListBySkuNumber(keyword, wsStatus, skuNumbers, 0, rowsPerPage)
        .then((data) => {
          console.log("data: ", data);

          let homeTblList = data?.HomeTblList || [];

          console.log("homeTblList: ", homeTblList);

          let totalRecords =
            data && data.TotalRecords
              ? data.TotalRecords / rowsPerPage !== 0
                ? Math.ceil(data.TotalRecords / rowsPerPage)
                : 1
              : 1;

          let palletsPerContainer = 0;
          let casesPerContainer = 0;
          let totalPallets = 0;
          let moqUnits = 0;

          // to copy the values of zSkuMap
          homeTblList &&
            homeTblList.forEach((item: any, index: number) => {
              // console.log("item: ", item);
              // console.log("itemSku: ", item.SkuNumber);
              // console.log("index: ", index);
              palletsPerContainer += item.InPallets || 0;
              casesPerContainer += item.InCase || 0;
              totalPallets += item.TotalPallets || 0;
              moqUnits += item.Moq || 0;
              addOrUpdateUniqueSku(
                item.SkuNumber,
                item.AdjustedWeekSupply,
                item.AdjustedOrder
              );
            });

          zSetPalletsPerContainer(palletsPerContainer);
          zSetCasesPerContainer(casesPerContainer);
          zSetTotalPallets(totalPallets);
          zSetMoqUnits(moqUnits);

          // console.log("done");
          setHomeTblList(homeTblList || []);
          setTotalPages(totalRecords);
        })
        .catch((error) => {})
        .finally(() => {});
    } else {
      getTableList(keyword, wsStatus, 1, 10)
        .then((data) => {
          console.log("data: ", data);

          let homeTblList = data?.HomeTblList || [];

          console.log("homeTblList: ", homeTblList);

          let totalRecords =
            data && data.TotalRecords
              ? data.TotalRecords / rowsPerPage !== 0
                ? Math.ceil(data.TotalRecords / rowsPerPage)
                : 1
              : 1;
          // to copy the values of zSkuMap
          homeTblList &&
            homeTblList.forEach((item: any, index: number) => {
              // console.log("item: ", item);
              // console.log("itemSku: ", item.SkuNumber);
              // console.log("index: ", index);
              addOrUpdateUniqueSku(
                item.SkuNumber,
                item.AdjustedWeekSupply,
                item.AdjustedOrder
              );
            });

          // console.log("done");
          setHomeTblList(homeTblList || []);
          setTotalPages(totalRecords);
        })
        .catch((error) => {})
        .finally(() => {});
    }
  }, [zSkuSearchText, zSelectDay]);

  return (
    <>
      {homeTblList.length > 0 && (
        <DashboardTableData
          data={homeTblList}
          tableHeaderArr={tableHeaderArr}
          page={page}
          rowsPerPage={rowsPerPage}
          totalPages={totalPages}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          isView={isView}
          visibleWorksheetStatus={visibleWorksheetStatus}
          dashboardType={dashboardType}
        />
      )}
    </>
  );
};

export default DashboardTableList;
