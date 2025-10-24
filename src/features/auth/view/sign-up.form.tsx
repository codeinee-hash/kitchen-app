"use client";

import {Form, Input, Button} from "@heroui/react";
import {FormEvent, useState} from "react";
import {signUpUser} from "@/features/auth/actions/sign-up";


export default function SignUpForm({ onClose }: { onClose: () => void }) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const result = await signUpUser(formData);
        console.log("result: ", result);

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
                    if (!validateEmail(value)) return "Некорректный email";
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

            <Input
                isRequired
                name="confirmPassword"
                placeholder="Подтвердите пароль"
                type="password"
                value={formData.confirmPassword}
                classNames={{
                    inputWrapper: "bg-default-100",
                    input: "text-error focus:outline-none"
                }}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                validate={(value) => {
                    if (!value) return "Пароль для подтверждение обязателен";
                    if (value !== formData.password) return "Пароли не совпадают";
                    return null;
                }}
            />

            <div className="flex w-full gap-4 items-center justify-end pt-8">
                <Button variant="light" onPress={onClose}>
                    Отмена
                </Button>
                <Button type="submit" color="primary">
                    Зарегистрироваться
                </Button>
            </div>
        </Form>
    )
}