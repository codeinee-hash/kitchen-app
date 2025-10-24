"use client";

import {Modal, ModalContent, ModalBody, ModalHeader} from "@heroui/react";
import {ReactNode} from "react";

export default function CustomModal({ isOpen, onClose, size = 'xs', children, title }: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    children: ReactNode;
}) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size={size}>
            <ModalContent>
                <ModalHeader className="border-b">
                    <h3 className="text-xl font-semibold text-background">{title}</h3>
                </ModalHeader>
                <ModalBody className="space-y-4 py-6">{children}</ModalBody>
            </ModalContent>
        </Modal>
    )
}