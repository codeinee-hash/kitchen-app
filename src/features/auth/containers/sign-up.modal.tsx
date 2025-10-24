"use client";

import CustomModal from "@/shared/ui/modal";
import SignUpForm from "@/features/auth/view/sign-up.form";

export function SignUpModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    return (
        <CustomModal isOpen={isOpen} onClose={onClose} title={"Регистрация"}>
            <SignUpForm onClose={onClose} />
        </CustomModal>
    )
}