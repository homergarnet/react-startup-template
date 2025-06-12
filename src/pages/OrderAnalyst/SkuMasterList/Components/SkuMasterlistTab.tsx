import { Box, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import SkuEnrollmentTableList from "./SkuEnrollmentTableList";
import useSkuMasterListContext from "../../../../store/OrderAnalyst/SkuMasterList/useSkuMasterListContext";
import { SkuMasterModel } from "../../../../types/skumastermodel";
import BulkInsert from "./BulkInsert";
import useSharedStore from "../../../../store/sharedStore";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const SkuMasterlistTab = () => {
  const { zSetSkuEnrollmentTab, getAllSkus } = useSkuMasterListContext();

  const { zLoading, zSetLoading } = useSharedStore();
  const [value, setValue] = useState(0);
  const [skuMasterList, setSkuMasterList] = useState<any[]>([]);
  const [skuMasterByBuyerList, setSkuMasterByBuyerList] = useState<any[]>([]);
  const [skuMasterByVNameList, setSkuMasterByVNameList] = useState<any[]>([]);
  const [skuMasterByPSchedList, setSkuMasterByPSchedList] = useState<any[]>([]);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    zSetSkuEnrollmentTab(newValue);
  };

  const initializationData = async () => {
    try {
      setSkuMasterList([]);
      setSkuMasterByBuyerList([]);
      setSkuMasterByVNameList([]);
      setSkuMasterByPSchedList([]);
      zSetLoading(true);

      const [allSkus, buyerSkus, vendorSkus, scheduleSkus] = await Promise.all([
        getAllSkus(0, "", true),
        getAllSkus(0, "Buyer", true),
        getAllSkus(0, "Vendor Name", true),
        getAllSkus(0, "PO Schedule", true),
      ]);
      zSetLoading(false);

      setSkuMasterList(allSkus || []);
      setSkuMasterByBuyerList(buyerSkus || []);
      setSkuMasterByVNameList(vendorSkus || []);
      setSkuMasterByPSchedList(scheduleSkus || []);
    } catch (error) {
      console.error("Error during initialization:", error);
      // Optionally show user feedback
    } finally {
    }
  };

  useEffect(() => {
    initializationData();
  }, [value]);

  return (
    <React.Fragment>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="All Items" {...a11yProps(0)} />
            <Tab label="Group by Order Analyst" {...a11yProps(1)} />
            <Tab label="Group by Vendor" {...a11yProps(2)} />
            <Tab label="Group by PO Schedule" {...a11yProps(3)} />
            <Tab label="For approval disable" {...a11yProps(4)} />
            <Tab label="Approved disable order" {...a11yProps(5)} />
            {/* <Tab label="Bulk Insert" {...a11yProps(3)} /> */}
          </Tabs>
        </Box>
        {/* <Divider sx={{ marginY: "20px" }} /> */}
        <CustomTabPanel value={value} index={0}>
          <SkuEnrollmentTableList
            isView={true}
            data={skuMasterList}
            isEnableCheckbox={false}
            isForApprovalDisabled={false}
            isApprovedDisabledOrder={false}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <SkuEnrollmentTableList
            isView={true}
            data={skuMasterByBuyerList}
            isEnableCheckbox={false}
            isForApprovalDisabled={false}
            isApprovedDisabledOrder={false}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <SkuEnrollmentTableList
            isView={true}
            data={skuMasterByVNameList}
            isEnableCheckbox={false}
            isForApprovalDisabled={false}
            isApprovedDisabledOrder={false}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <SkuEnrollmentTableList
            isView={true}
            data={skuMasterByPSchedList}
            isEnableCheckbox={false}
            isForApprovalDisabled={false}
            isApprovedDisabledOrder={false}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <SkuEnrollmentTableList
            isView={true}
            data={skuMasterByPSchedList}
            isEnableCheckbox={true}
            isForApprovalDisabled={true}
            isApprovedDisabledOrder={false}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
          <SkuEnrollmentTableList
            isView={true}
            data={skuMasterByPSchedList}
            isEnableCheckbox={false}
            isForApprovalDisabled={false}
            isApprovedDisabledOrder={true}
          />
        </CustomTabPanel>
        {/* <CustomTabPanel value={value} index={3}>
          <BulkInsert />
        </CustomTabPanel> */}
      </Box>
    </React.Fragment>
  );
};

export default SkuMasterlistTab;
