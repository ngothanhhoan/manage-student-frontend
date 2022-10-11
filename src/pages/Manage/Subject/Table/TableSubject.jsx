import React, { useState, useEffect } from "react";
import axios from "axios";
import { Space, Table, Button, message, Popconfirm } from "antd";
import "antd/dist/antd.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import {
  actSaveGetListSubject,
  actAddSubjectModal,
  actSelectedSubject,
  actSetListSubject,
} from "@/redux/action/subject";
import subjectApi from "@/api/subject";

const TableSubject = (props) => {
  const { listSubject } = props;
  const [isTableLoading, setTableLoading] = useState(false);

  useEffect(() => {
    getAllSubject();
    onGetListSubject();
  }, []);

  const getAllSubject = () => {
    axios.get("http://localhost:3002/subject").then((res) => {
      props.actSetListSubject(res.data.data);
    });
  };

  const onGetListSubject = async () => {
    setTableLoading(true);
    const res = await subjectApi.getListSubject();
    props.actSaveGetListSubject(res?.data || []);
    setTableLoading(false);
  };

  const onEditSubject = (infoSubject) => {
    props.actSelectedSubject(infoSubject);
    props.actAddSubjectModal(true);
  };

  const onDeleteSubject = (idDelete) => {
    axios
      .delete(`http://localhost:3002/subject/${idDelete}`, {
        idDelete: idDelete,
      })
      .then((res) => {
        if (res?.data?.code === 200) {
          getAllSubject();
          message.success("Delete success!");
        }
      });
  };

  const confirmDelete = (idDelete) => {
    onDeleteSubject(idDelete);
  };

  const onConfirmDelete = (idDelete) => {
    onDeleteSubject(idDelete);
  };
  const onCancelDelete = (e) => {
    message.error("Cancel delete!");
  };

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const getColumns = (onEditStudent, onConfirmDelete, onCancelDelete) => [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === "id" ? sortedInfo.order : null,
      ellipsis: true,
      width: "70px",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "160px",
    },
    {
      title: "Class",
      dataIndex: "classID",
      key: "classID",
      sorter: (a, b) => a.classID - b.classID,
      sortOrder: sortedInfo.columnKey === "classID" ? sortedInfo.order : null,
      ellipsis: true,
      width: "70px",
    },
    {
      title: "Start time",
      dataIndex: "startTime",
      key: "startTime",
      width: "160px",
    },
    {
      title: "End time",
      dataIndex: "endTime",
      key: "endTime",
      width: "160px",
    },
    {
      title: "Action",
      key: "action",
      render: (_, infoSubject) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            style={{ margin: "0 10px" }}
            onClick={() => {
              onEditStudent(infoSubject);
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
              onConfirm={() => confirmDelete(infoSubject.id)}
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
        </Space>
      ),
      width: "200px",
    },
  ];
  return (
    <div>
      <Table
        loading={isTableLoading}
        dataSource={listSubject}
        columns={getColumns(
          onEditSubject,
          onDeleteSubject,
          onConfirmDelete,
          onCancelDelete
        )}
      />
    </div>
  );
};

export default connect(
  (store) => ({
    activeAddModal: store.Subject.activeAddModal,
    listSubject: store.Subject.listSubject,
  }),
  {
    actAddSubjectModal,
    actSelectedSubject,
    actSaveGetListSubject,
  }
)(TableSubject);
