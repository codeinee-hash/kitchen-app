"use client";

import CustomModal from "@/shared/ui/modal";
import SignInForm from "@/features/auth/view/sign-in.form";

export function SignInModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    return (
        <CustomModal isOpen={isOpen} onClose={onClose} title={"Авторизация"}>
            <SignInForm onClose={onClose} />
        </CustomModal>
    )
}