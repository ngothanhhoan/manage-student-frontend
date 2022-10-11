import React, { useState, useEffect } from "react";
import _ from "lodash";
import axios from "axios";
import { Space, Table, Button } from "antd";
import { message, Popconfirm } from "antd";
import { connect } from "react-redux";
import {
  actSaveGetListStudent,
  actSetSelectedStudent,
  actSetModalStudentOpen,
  actSaveReceiveMail,
} from "@/redux/action/student";
import { EditOutlined, DeleteOutlined, MailOutlined } from "@ant-design/icons";
import studentApi from "@/api/student";
import ModalSendMail from "../Modal/ModalSendMail";

const TableStudent = (props) => {
  const { listStudent } = props;
  const [isTableLoading, setTableLoading] = useState(false);

  useEffect(() => {
    onGetAllStudent();
    onGetListStudent();
  }, []);

  const onGetAllStudent = () => {
    axios.get("http://localhost:3002/student").then((res) => {
      props.actSaveGetListStudent(res.data.data);
    });
  };

  const onGetListStudent = async () => {
    setTableLoading(true);
    const res = await studentApi.getListStudent();
    props.actSaveGetListStudent(res?.data || []);
    setTableLoading(false);
  };

  // function edit, view Modal
  const onEditStudent = (infoStudent) => {
    props.actSetSelectedStudent(infoStudent);
    props.actSetModalStudentOpen(true);
  };

  const onDeleteStudent = (idDelete) => {
    axios
      .delete(`http://localhost:3002/student/${idDelete}`, {
        idDelete: idDelete,
      })
      .then((res) => {
        if (res?.data?.code === 200) {
          onGetAllStudent();
          message.success("Delete success!");
        }
      });
  };

  const onConfirmDelete = (idDelete) => {
    onDeleteStudent(idDelete);
  };

  // function send mail to student
  const sendMailToStudent = (receiveMail) => {
    props.actSaveReceiveMail(receiveMail);
  };

  // sort table
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const handleChangeTable = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const onCancelDelete = (e) => {
    message.error("Cancel delete!");
  };

  const getColumns = (onEditStudent, onConfirmDelete, onCancelDelete) => [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id.length - b.id.length,
      sortOrder: sortedInfo.columnKey === "id" ? sortedInfo.order : null,
      ellipsis: true,
      width: "70px",
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
      width: "70px",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Class",
      dataIndex: "classID",
      key: "classID",
      filters: listStudent?.map((studentInfo, index) => ({
        text: `Class ${studentInfo.id}`,
        value: studentInfo.id,
      })),
      filteredValue: filteredInfo.classID || null,
      onFilter: (value, record) =>
        filteredInfo?.classID?.includes(record?.classID),
      render: (value, record) => _.find(listStudent, { id: value })?.name,
      width: "70px",
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
      onFilter: (value, record) => record?.sex?.includes(value),
      width: "70px",
    },
    {
      title: "Action",
      key: "action",
      render: (_, infoStudent) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            style={{ margin: "0 10px" }}
            onClick={() => {
              onEditStudent(infoStudent);
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
              onConfirm={() => onConfirmDelete(infoStudent.id)}
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
            icon={<MailOutlined />}
            size="small"
            onClick={() => sendMailToStudent(infoStudent.email)}
          >
            Mail
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
        dataSource={listStudent}
        columns={getColumns(
          onEditStudent,
          onDeleteStudent,
          onConfirmDelete,
          onCancelDelete
        )}
      />

      <ModalSendMail />
    </div>
  );
};

export default connect(
  (store) => ({
    listStudent: store.Student.listStudent,
    listClass: store.Student.listClass,
  }),
  {
    actSaveGetListStudent,
    actSetSelectedStudent,
    actSetModalStudentOpen,
    actSaveReceiveMail,
  }
)(TableStudent);
