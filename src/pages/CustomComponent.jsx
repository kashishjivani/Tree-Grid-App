import { taskData } from "../data/dataSource";
import TreeGrid from "../components/TreeGrid";

export default function CustomComponent() {
  return (
      <TreeGrid data={taskData} />
  );
}
