"use client";

import CustomModal from "@/components/ui-kit/modal";
import SignInForm from "@/components/forms/sign-in.form";

export default function SignInModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    return (
        <CustomModal isOpen={isOpen} onClose={onClose} title={"Авторизация"}>
            <SignInForm onClose={onClose} />
        </CustomModal>
    )
}