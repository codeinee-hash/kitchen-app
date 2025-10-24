"use client";

import {Form, Input, Button} from "@heroui/react";
import {FormEvent, useState} from "react";
import {signInWithCredentials} from "@/features/auth/actions/sign-in";

export default function SignInForm({ onClose }: { onClose: () => void }) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        await signInWithCredentials(formData.email, formData.password);

        window.location.reload();
        onClose();
    }

    return (
        <Form className="w-full" onSubmit={handleSubmit}>
            <Input
                isRequired
                name="email"
                placeholder="Введите email"
                type="email"
                value={formData.email}
                classNames={{
                    inputWrapper: "bg-default-100",
                    input: "text-error focus:outline-none"
                }}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                validate={(value) => {
                    if (!value) return "Почта обязательна";
                    return null;
                }}
            />

            <Input
                isRequired
                name="password"
                placeholder="Введите пароль"
                type="password"
                value={formData.password}
                classNames={{
                    inputWrapper: "bg-default-100",
                    input: "text-error focus:outline-none"
                }}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                validate={(value) => {
                    if (!value) return "Пароль обязателен";
                    if (value.length < 6) return "Пароль должен быть не менее 6 символов";
                    return null;
                }}
            />

            <div className="flex w-full gap-4 items-center justify-end pt-8">
                <Button variant="light" onPress={onClose}>
                    Отмена
                </Button>
                <Button type="submit" color="primary">
                    Войти
                </Button>
            </div>
        </Form>
    )
}
