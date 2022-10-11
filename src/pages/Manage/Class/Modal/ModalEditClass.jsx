import React, { useEffect, useMemo, useState } from "react";
import Axios from "axios";
import { Modal, Form, Input, InputNumber, notification } from "antd";
import _ from "lodash";
import { connect } from "react-redux";
import {
  actSetModalClassOpen,
  actSetSelectedClass,
  actSaveCreateClass,
  actSaveUpdateClass,
  actSaveGetListClass,
} from "@/redux/action/class";
import classApi from "@/api/class";

const ModalAddClass = (props) => {
  const { isModalOpen, selectedClass } = props;
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(true);

  const isCreateMode = useMemo(() => {
    return _.isEmpty(selectedClass);
  }, [selectedClass]);

  useEffect(() => {
    form.setFieldsValue({
      id: selectedClass?.id,
      name: selectedClass?.name,
      numberOfStudent: selectedClass?.numberOfStudent,
    });
  }, [selectedClass, form]);

  const onSubmitForm = async () => {
    setIsLoading(true);
    const { id, name, numberOfStudent } = await form.validateFields([
      "id",
      "name",
      "numberOfStudent",
    ]);

    const requestBody = {
      id,
      name,
      numberOfStudent,
    };

    if (isCreateMode) {
      // create class
      const res = await classApi.createClass({
        id,
        name,
        numberOfStudent,
      });

      if (res?.code === 200) {
        props.actSaveCreateClass(requestBody);
        onCloseModal();
        onShowNotifcation("success", "Add class successfully");
      } else if (res?.code === 304) {
        onShowNotifcation("error", "Class existed");
      }
    } else {
      // update class
      Axios.put("http://localhost:3002/class", {
        id,
        name,
        numberOfStudent,
      }).then((res) => {
        if (res?.data?.code === 200) {
          props.actSaveUpdateClass(requestBody);
          setTimeout(() => {
            setIsLoading(false);
            onCloseModal();
          }, 4000);
          onShowNotifcation("success", "Edit class successfully");
        } else if (res?.data?.code === 400) {
          onShowNotifcation("error", "Error occur when edit class");
        }
      });
    }
  };

  const onCloseModal = () => {
    props.actSetSelectedClass({});
    props.actSetModalClassOpen(false);
  };

  const onShowNotifcation = (type, messages) => {
    notification[type]({
      message: messages,
      description: "",
      duration: 2,
    });
  };

  return (
    <Modal
      title={isCreateMode ? "Add Class" : "Update Class"}
      visible={isModalOpen}
      onOk={onSubmitForm}
      onCancel={onCloseModal}
      okText={isCreateMode ? "Add" : "Update"}
      width="25rem"
      confirmLoading={isLoading}
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label="ID"
          name="id"
          rules={[
            {
              required: true,
              message: "Please input ID class",
            },
          ]}
        >
          <Input placeholder="Enter Class ID" />
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input name class",
            },
          ]}
        >
          <Input placeholder="Enter class name" />
        </Form.Item>

        <Form.Item
          label="Number Student"
          name="numberOfStudent"
          rules={[
            {
              required: true,
              message: "Please input number of student",
            },
          ]}
        >
          <InputNumber
            placeholder="Enter number of student"
            style={{ width: "100%" }}
            min={1}
            max={30}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(
  (store) => ({
    isModalOpen: store.Class.isModalOpen,
    selectedClass: store.Class.selectedClass,
  }),
  {
    actSetModalClassOpen,
    actSetSelectedClass,
    actSaveCreateClass,
    actSaveUpdateClass,
    actSaveGetListClass,
  }
)(ModalAddClass);
