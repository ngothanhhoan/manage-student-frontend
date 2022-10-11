import React, { useState, useEffect } from "react";
import axios from "axios";
import { Space, Table, Button } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import { message, Popconfirm } from "antd";
import { connect } from "react-redux";
import {
  actSaveGetListClass,
  actSetModalClassOpen,
  actSetSelectedClass,
  actViewStudentClass,
} from "@/redux/action/class";
import classApi from "@/api/class";
import TableViewStudentClass from "./TableViewStudentClass";

const getColumns = (
  onEditClass,
  onViewClass,
  onConfirmDelete,
  onCancelDelete
) => [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Number of Student",
    dataIndex: "numberOfStudent",
    key: "numberOfStudent",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (value, classInfo) => (
      <Space size="middle">
        <Button
          type="primary"
          icon={<EditOutlined />}
          size="small"
          onClick={() => {
            onEditClass(classInfo);
          }}
        >
          Edit
        </Button>

        <Button
          type="primary"
          icon={<DeleteOutlined />}
          size="small"
          style={{ margin: "0 10px" }}
        >
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => onConfirmDelete(classInfo.id)}
            onCancel={onCancelDelete}
            okText="Yes"
            cancelText="No"
          >
            <span
              style={{
                color: "white",
              }}
            >
              Delete
            </span>
          </Popconfirm>
        </Button>

        <Button
          type="primary"
          icon={<UnorderedListOutlined />}
          size="small"
          onClick={() => onViewClass(classInfo.id)}
        >
          Detail
        </Button>
      </Space>
    ),
  },
];

const TableClass = (props) => {
  const { listClass } = props;
  const [infoStudentByIdClass, setInfoStudentByClass] = useState([]);
  const [isTableLoading, setTableLoading] = useState(false);

  useEffect(() => {
    onGetListClass();
  }, []);

  const onGetListClass = async () => {
    setTableLoading(true);
    const res = await classApi.getListClass();
    props.actSaveGetListClass(res?.data || []);
    setTableLoading(false);
  };

  const onEditClass = (classInfo) => {
    props.actSetSelectedClass(classInfo);
    props.actSetModalClassOpen(true);
  };

  const onDeleteClass = (idDelete) => {
    axios
      .delete(`http://localhost:3002/class/${idDelete}`, {
        idDelete: idDelete,
      })
      .then((res) => {
        if (res?.data?.code === 200) {
          onGetListClass();
          message.success("Delete success!");
        }
      });
  };

  const onViewClass = (classID) => {
    axios
      .get(`http://localhost:3002/class/getStudent/${classID}`, {
        classID: classID,
      })
      .then((response) => {
        setInfoStudentByClass(response.data.data);
      })
      .catch((error) => {
        console.log("error: " + error);
      });
    props.actViewStudentClass(true);
  };

  const onConfirmDelete = (idDelete) => {
    onDeleteClass(idDelete);
  };

  const onCancelDelete = (e) => {
    message.error("Cancel delete!");
  };

  return (
    <div>
      <Table
        loading={isTableLoading}
        dataSource={listClass}
        columns={getColumns(
          onEditClass,
          onViewClass,
          onDeleteClass,
          onConfirmDelete,
          onCancelDelete
        )}
      />

      <TableViewStudentClass infoStudentByIdClass={infoStudentByIdClass} />
    </div>
  );
};

export default connect(
  (store) => ({
    listClass: store?.Class?.listClass,
    onChangeInfoTable: store?.Class?.onChangeInfoTable,
  }),
  {
    actViewStudentClass,
    actSaveGetListClass,
    actSetModalClassOpen,
    actSetSelectedClass,
  }
)(TableClass);
