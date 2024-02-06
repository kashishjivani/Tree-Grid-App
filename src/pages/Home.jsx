import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { taskData } from "../data/dataSource";
import "../styles/style.css";
import {
  TreeGridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Page,
  Sort,
  Filter,
  Edit,
  Toolbar,
} from "@syncfusion/ej2-react-treegrid";
import { createElement } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

let isNotLoggedIn = true;

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    if (isNotLoggedIn) {
      navigate("/login");
      isNotLoggedIn = false;
    }
  }, []);

  const editOptions = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    mode: "Dialog",
  };
  const toolbarSettings = ["Add", "Delete"];

  const filterSettings = { type: "Menu" };

  let dropInstance;
  const filterTypeDropdown = {
    ui: {
      create: (args) => {
          const flValInput = createElement('input', { className: 'flm-input' });
          args.target.appendChild(flValInput);
          dropInstance = new DropDownList({
              dataSource: ["Low", "Normal", "High", "Critical"],
              placeholder: 'Select a value',
          });
          dropInstance.appendTo(flValInput);
      },
      read: (args) => {
          args.fltrObj.filterByColumn(args.column.field, args.operator, dropInstance.value);
      },
      write: (args) => {
          dropInstance.value = args.filteredValue;
      }
  }
};

  return (
    <>
      <Link to="/customComponent">
        <button className="btnCustomComponent">Custom Component</button>
      </Link>
      <TreeGridComponent
        dataSource={taskData}
        childMapping="subtasks"
        treeColumnIndex={1}
        allowPaging={true}
        allowSorting={true}
        allowFiltering={true}
        editSettings={editOptions}
        toolbar={toolbarSettings}
        filterSettings={filterSettings}
      >
        <Inject services={[Page, Sort, Filter, Edit, Toolbar]} />
        <ColumnsDirective>
          <ColumnDirective
            field="taskID"
            headerText="Task ID"
            isPrimaryKey={true}
            width={90}
            textAlign="Right"
          ></ColumnDirective>
          <ColumnDirective
            field="taskName"
            headerText="Task Name"
          ></ColumnDirective>
          <ColumnDirective
            field="startDate"
            headerText="Start Date"
            format="yMd"
            editType="datepickeredit"
          ></ColumnDirective>
          <ColumnDirective
            field="duration"
            headerText="Duration(in days)"
          ></ColumnDirective>
          <ColumnDirective
            field="progress"
            headerText="Progress"
          ></ColumnDirective>
          <ColumnDirective
            field="priority"
            headerText="Priority"
            editType="dropdownedit"
            filter={filterTypeDropdown}
          ></ColumnDirective>
          <ColumnDirective
            field="approved"
            headerText="Approved"
            displayAsCheckBox
            editType="booleanedit"
          ></ColumnDirective>
        </ColumnsDirective>
      </TreeGridComponent>
    </>
  );
}
