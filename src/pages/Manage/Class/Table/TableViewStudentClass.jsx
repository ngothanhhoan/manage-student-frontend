import React, { useState } from "react";
import { Table, Modal } from "antd";
import "antd/dist/antd.css";
import { useSelector, connect } from "react-redux";
import { actViewStudentClass } from "@/redux/action/class";

const TableViewStudentClass = (props) => {
  //sort table
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const infoStudentByIdClass = props?.infoStudentByIdClass;

  const classReducer = useSelector((state) => state.Class);

  //modal
  const handleModalClose = () => {
    props.actViewStudentClass(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "id" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === "age" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Sex",
      dataIndex: "sex",
      key: "sex",
      filters: [
        {
          text: "Male",
          value: "Male",
        },
        {
          text: "Female",
          value: "Female",
        },
      ],
      filteredValue: filteredInfo.sex || null,
      onFilter: (value, record) => record.sex.includes(value),
    },
  ];

  const handleChangeTable = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  return (
    <div>
      <Modal
        visible={classReducer.activeViewStudentClass}
        onCancel={handleModalClose}
        onOk={handleModalClose}
        width={1060}
        bodyStyle={{ padding: "2.6rem", alignItems: "center" }}
        title={
          infoStudentByIdClass.length === 0
            ? ""
            : `Student in class ${infoStudentByIdClass[0].classID}`
        }
      >
        <Table
          columns={columns}
          dataSource={infoStudentByIdClass}
          style={{ height: "100%", width: "100%" }}
          onChange={handleChangeTable}
          pagination={false}
        ></Table>
      </Modal>
    </div>
  );
};

export default connect(
  (store) => ({
    listClass: store.Class.listClass,
    onChangeInfoTable: store.Class.onChangeInfoTable,
  }),
  { actViewStudentClass }
)(TableViewStudentClass);
