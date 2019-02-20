import React from 'react';
import { Modal } from 'antd';

const CommonModal = ({
  visible,
  modalBody,
  modalTitle,
  handleModalConfirm,
  confirmButtonLabel,
  handleModalCancel,
  disabled,
}) => {
  const buttonProps = { disabled };
  return (
    <div>
      <Modal
        title={modalTitle}
        visible={visible}
        onOk={handleModalConfirm}
        okText={confirmButtonLabel}
        onCancel={handleModalCancel}
        okButtonProps={buttonProps}
      >
        {modalBody}
      </Modal>
    </div>
  );
};

export default CommonModal;
