import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import Axios from "axios";
import { Modal, Form, Input, notification, Select, DatePicker } from "antd";
import _ from "lodash";
import { connect } from "react-redux";
import {
  actAddSubjectModal,
  actSelectedSubject,
  actSaveCreateSubject,
  actSaveUpdateSubject,
  actSaveGetListSubject,
} from "@/redux/action/subject";
import subjectApi from "@/api/subject";

const dateFormat = "DD/MM/YYYY";

const ModalAddEditSubject = (props) => {
  const { listSubject, isModalOpen, selectedSubject } = props;
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(true);

  const isCreateMode = useMemo(() => {
    return _.isEmpty(selectedSubject);
  }, [selectedSubject]);

  const { Option } = Select;
  const { RangePicker } = DatePicker;

  useEffect(() => {
    form.setFieldsValue({
      id: selectedSubject?.id,
      name: selectedSubject?.name,
      classID: selectedSubject?.classID,
      pickTimeSubject: selectedSubject?.startTime
        ? [
            moment(selectedSubject?.startTime || null, dateFormat),
            moment(selectedSubject?.endTime || null, dateFormat),
          ]
        : [null, null],
    });
  }, [selectedSubject, form]);

  const onSubmitForm = async () => {
    setIsLoading(true);
    const { id, name, classID, pickTimeSubject } = await form.validateFields([
      "id",
      "name",
      "classID",
      "pickTimeSubject",
    ]);

    const requestBody = {
      id,
      name,
      classID,
      startTime: pickTimeSubject[0].format(dateFormat),
      endTime: pickTimeSubject[1].format(dateFormat),
    };

    if (isCreateMode) {
      // create subject
      const res = await subjectApi.createSubject({
        id,
        name,
        classID,
        pickTimeSubject,
      });

      if (res?.code === 200) {
        props.actSaveCreateSubject(requestBody);
        onCloseModal();
        onShowNotifcation("success", "Add subject successfully");
      } else if (res?.code === 304) {
        onShowNotifcation("error", "Subject existed");
      }
    } else {
      Axios.put("http://localhost:3002/subject", {
        id,
        name,
        classID,
        pickTimeSubject,
      }).then((res) => {
        if (res?.data?.code === 200) {
          props.actSaveUpdateSubject(requestBody);
          setTimeout(() => {
            setIsLoading(false);
            onCloseModal();
          }, 4000);
          onShowNotifcation("success", "Edit subject successfully");
        } else if (res?.data?.code === 400) {
          onShowNotifcation("error", "Error occur when edit subject");
        }
      });
    }
  };

  const onCloseModal = () => {
    props.actSelectedSubject({});
    props.actAddSubjectModal(false);
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
      title={isCreateMode ? "Add subject" : "Update subject"}
      visible={isModalOpen}
      onOk={onSubmitForm}
      onCancel={onCloseModal}
      okText={isCreateMode ? "Add" : "update"}
      width="25rem"
      confirmLoading={isLoading}
    >
      <Form form={form} autoComplete="off" layout="vertical">
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
          <Input type="text" />
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
          <Input type="text" />
        </Form.Item>

        <Form.Item label="Class" name="classID">
          <Select placeholder="Select a class">
            {listSubject?.map((classInfo, index) => {
              return (
                <Option value={classInfo?.id} key={index}>
                  Class {classInfo?.id}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          label="Time"
          rules={[
            {
              required: true,
              message: "Please input date time ",
            },
          ]}
          name="pickTimeSubject"
        >
          <RangePicker
            format={dateFormat}
            allowClear={true}
            style={{ width: "100%" }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(
  (store) => ({
    listSubject: store.Subject.listSubject,
    selectedSubject: store.Subject.selectedSubject,
    activeAddModal: store.Subject.activeAddModal,
    listIdSubject: store.Subject.listIdSubject,
  }),
  {
    actAddSubjectModal,
    actSelectedSubject,
    actSaveUpdateSubject,
    actSaveCreateSubject,
    actSaveGetListSubject,
  }
)(ModalAddEditSubject);
