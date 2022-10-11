import React from "react";
import TableStudent from "./Table/TableStudent";

import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { StudentWrapper, PageHeadingWrapper, StudentContainer } from "./style";

import { actSetModalStudentOpen } from "@/redux/action/student";
import { connect } from "react-redux";

import ModalAddEditStudent from "./Modal/ModalAddEditStudent";

const Student = (props) => {
  const showAddModal = () => {
    props.actSetModalStudentOpen(true);
  };

  return (
    <StudentWrapper>
      <PageHeadingWrapper>
        <div className="heading">Manage Student</div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ marginBottom: "1rem" }}
          onClick={showAddModal}
        >
          Add
        </Button>
      </PageHeadingWrapper>

      <ModalAddEditStudent />
      <StudentContainer>
        <TableStudent />
      </StudentContainer>
    </StudentWrapper>
  );
};

export default connect((store) => ({}), { actSetModalStudentOpen })(Student);
