import React, { useState } from 'react';
import Modal from './Modal';

interface ModalContent {
  title: string;
  content: JSX.Element;
  isDragEnabled?: boolean; // Optional prop for drag-and-drop
}

const MultipleModals: React.FC = () => {
  const [modalData, setModalData] = useState<ModalContent[]>([]);

  const openModal = (title: string, content: JSX.Element, isDragEnabled?: boolean) => {
    setModalData((prevData) => [...prevData, { title, content, isDragEnabled }]);
  };

  const closeModal = (index: number) => {
    setModalData((prevData) => prevData.filter((_, i) => i !== index));
  };

  return (
    <div>
      <button onClick={() => openModal('Modal 1', <div>Modal 1 content</div>, true)}>Open Modal 1</button>
      {/* Add a button to open Modal 2 */}
      <button onClick={() => openModal('Modal 2', <div>Modal 2 content</div>, false)}>Open Modal 2</button>
      
      {modalData.map((modal, index) => (
        <Modal
          key={index}
          title={modal.title}
          onClose={() => closeModal(index)}
          isDragEnabled={modal.isDragEnabled}
        >
          {modal.content}
        </Modal>
      ))}
    </div>
  );
};

export default MultipleModals;
