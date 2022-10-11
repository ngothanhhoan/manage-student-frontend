import React from "react";

//antd
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

import { SubjectWrapper, PageHeadingWrapper, SubjectContainer } from "./style";

//redux
import { connect } from "react-redux";
import { actAddSubjectModal } from "@/redux/action/subject";

import TableSubject from "./Table/TableSubject";

import ModalAddEditSubject from "@/pages/Manage/Subject/Modal/ModalAddEditSubject";

const Subject = (props) => {
  const showModal = () => {
    props.actAddSubjectModal(true);
  };

  return (
    <SubjectWrapper>
      <PageHeadingWrapper>
        <div className="heading">Manage Subject</div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ marginBottom: "1rem" }}
          onClick={showModal}
        >
          Add
        </Button>
      </PageHeadingWrapper>
      <ModalAddEditSubject />
      <SubjectContainer>
        <TableSubject />
      </SubjectContainer>
    </SubjectWrapper>
  );
};

export default connect((store) => ({}), { actAddSubjectModal })(Subject);
