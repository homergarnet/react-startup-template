import { Box, Tab, Tabs } from "@mui/material";
import React, { useEffect } from "react";
import AddEditEmployeeForm from "./AddEditEmployeeForm";
import useEnrollmentPeopleContext from "../../../store/enrollment-people/useEnrollmentPeopleContext";
import { ADD_EMPLOYEE } from "../../../constants/constants";
import AddEditTeamForm from "./AddEditTeamForm";
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

const EnrollmentPeopleTab = () => {
  const { zSetEmployeeAddEditTitle } = useEnrollmentPeopleContext();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    zSetEmployeeAddEditTitle(ADD_EMPLOYEE);
  }, []);

  return (
    <React.Fragment>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="+ Add Employee" {...a11yProps(0)} />
            <Tab label="+ Add Team" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <AddEditEmployeeForm />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <AddEditTeamForm />
        </CustomTabPanel>
      </Box>
    </React.Fragment>
  );
};

export default EnrollmentPeopleTab;
