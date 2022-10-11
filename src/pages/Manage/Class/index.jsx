import React from "react";
import TableClass from "./Table/TableClass";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { connect } from "react-redux";
import { actSetModalClassOpen } from "@/redux/action/class";
import ModalEditClass from "./Modal/ModalEditClass";
import { ClassWrapper, ClassContainer, PageHeadingWrapper } from "./style";

const Class = (props) => {
  const onOpenModal = () => {
    props.actSetModalClassOpen(true);
  };

  return (
    <ClassWrapper>
      <PageHeadingWrapper>
        <div className="heading">Manage Class</div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ marginBottom: "1rem" }}
          onClick={onOpenModal}
        >
          Add
        </Button>
      </PageHeadingWrapper>

      <ClassContainer>
        <TableClass />
      </ClassContainer>

      <ModalEditClass />
    </ClassWrapper>
  );
};

export default connect(() => ({}), {
  actSetModalClassOpen,
})(Class);
