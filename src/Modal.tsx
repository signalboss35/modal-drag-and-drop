// Modal.tsx

import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';

interface ModalProps {
    title: string;
    children: JSX.Element;
    onClose: () => void;
    isDragEnabled?: boolean; // Optional prop for drag-and-drop
}

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 100; /* Ensure modal has higher stacking order */
`;

const ModalTitle = styled.h2`
  margin-bottom: 10px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const DraggableHandle = styled.div`
  cursor: grab;
  position: absolute;
  top: 10px;
  left: 10px;
`;

const Modal: React.FC<ModalProps> = ({ title, children, onClose, isDragEnabled = false }) => {
    const [isOpen, setIsOpen] = useState(true);
    const modalRef = useRef<HTMLDivElement>(null);

    const handleClose = () => {
        setIsOpen(false);
        onClose();
    };

    // Basic drag-and-drop logic (can be extended for more complex interactions)
    const [isDragging, setIsDragging] = useState(false);
    const initialX = useRef(0);
    const initialY = useRef(0);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragEnabled) return;
        setIsDragging(true);
        initialX.current = e.clientX - modalRef.current!.offsetLeft;
        initialY.current = e.clientY - modalRef.current!.offsetTop;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        if (modalRef.current) {
            const deltaX = e.clientX - initialX.current;
            const deltaY = e.clientY - initialY.current;
            modalRef.current.style.left = `${deltaX}px`;
            modalRef.current.style.top = `${deltaY}px`;
        }
    };

    useEffect(() => {
        const handleMouseUp = () => setIsDragging(false);
        document.addEventListener('mouseup', handleMouseUp);
        return () => document.removeEventListener('mouseup', handleMouseUp);
    }, []);

    if (!isOpen) return null; // Return null if the modal is closed

    return (
        <ModalWrapper ref={modalRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove}>
            {isDragEnabled && <DraggableHandle />}
            <ModalTitle>{title}</ModalTitle>
            {children}
            <CloseButton onClick={handleClose}>Close</CloseButton>
        </ModalWrapper>
    );
};


export default Modal;
