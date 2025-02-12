import React, { useEffect, useState } from "react";
import TeamMasterTblData from "./TeamMasterTblData";
import { TeamMasterlistModel } from "../../../types/teammasterlistmodel";
import useTeamMasterlistContext from "../../../store/team-masterlist/useTeamMasterlistContext";

interface ChildProps {
  isView: boolean;
}

const TeamMasterTblList: React.FC<ChildProps> = ({ isView }) => {
  const {
    // getAllSkus,
    zTeamMasterlistList,

    zTMGBTeamNameList,
    zTMGBShiftList,
    zTeamSearchText,
    zMasterlistTab,
  } = useTeamMasterlistContext();

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

  let zSkuMasterFormattedList: TeamMasterlistModel[] | null = null;
  //for group by only
  if (zMasterlistTab === 0) {
    zSkuMasterFormattedList = zTeamMasterlistList;
  } else if (zMasterlistTab === 1) {
    zSkuMasterFormattedList = zTMGBTeamNameList;
  } else {
    zSkuMasterFormattedList = zTMGBShiftList;
  }
  const filteredZSkuMasterList = zSkuMasterFormattedList?.filter((sku) =>
    zTeamSearchText
      ? sku.TeamName.toLowerCase().includes(zTeamSearchText.toLowerCase())
      : true
  );

  // useEffect(() => {
  //   getAllSkus();
  //   console.log("zSkuMasterFormattedList: ", zSkuMasterFormattedList);
  //   console.log("run: ", filteredZSkuMasterList);
  // }, []);
  return (
    <React.Fragment>
      {filteredZSkuMasterList && filteredZSkuMasterList?.length > 0 ? (
        <TeamMasterTblData
          data={filteredZSkuMasterList}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          isView={isView}
        />
      ) : (
        <p>Loading data...</p>
      )}
    </React.Fragment>
  );
};

export default TeamMasterTblList;
