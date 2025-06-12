import { WithPOModel } from "../../../../types/withpomodel";

export interface IWithPOColumn {
  id: keyof WithPOModel;
  label: string;
}