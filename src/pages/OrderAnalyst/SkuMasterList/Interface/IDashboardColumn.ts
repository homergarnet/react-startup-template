import { DashboardModel } from "../../../../types/dashboardmodel";

export interface IDashboardColumn {
  id: keyof DashboardModel;
  label: string;
}
