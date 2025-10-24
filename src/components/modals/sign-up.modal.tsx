"use client";

import CustomModal from "@/components/ui-kit/modal";
import SignUpForm from "@/components/forms/sign-up.form";

export default function SignUpModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    return (
        <CustomModal isOpen={isOpen} onClose={onClose} title={"Регистрация"}>
            <SignUpForm onClose={onClose} />
        </CustomModal>
    )
}