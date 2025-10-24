"use client";

import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button} from "@heroui/react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useState} from "react";
import {siteConfig} from "@/config/site.config";
import {layoutConfig} from "@/config/layout.config";
import SignUpModal from "@/components/modals/sign-up.modal";
import SignInModal from "@/components/modals/sign-in.modal";
import {signOutFunc} from "@/actions/sign-out";
import {useAuth} from "@/store/auth-store";

export const Logo = () => {
    return (
        <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
            <path
                clipRule="evenodd"
                d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                fill="currentColor"
                fillRule="evenodd"
            />
        </svg>
    );
};

export default function Header() {
    const pathname = usePathname();
    const {isAuth, status, session, setAuthState} = useAuth();

    const [isSignInOpen, setIsSignInOpen] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);

    const handleSignOut = async () => {
        try {
            await signOutFunc();
        } catch (error) {
            console.error(error);
        }

        setAuthState("unauthenticated", null);
    }


    const getNavLinks = () => {

        return siteConfig.navItems
            .filter((item) => {
                if (item.href === "/ingredients") return isAuth;
                return true;
            })
            .map((item) => {
                const isActive = pathname === item.href;
                return (
                    <NavbarItem key={item.label} isActive={isActive}>
                        <Link
                            color="foreground"
                            href={item.href}
                            className={`px-3 py-1 ${isActive ? 'text-blue-500' : 'text-foreground'} hover:text-blue-300 transition-colors duration-200`}
                        >
                            {item.label}
                        </Link>
                    </NavbarItem>
                )
        });
    }

    return (
        <Navbar style={{ height: layoutConfig.headerHeight }}>
            <NavbarBrand>
                <Link href='/' className='flex items-center'>
                    <Logo />
                    <p className="font-bold text-inherit">KGVKUS</p>
                </Link>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {getNavLinks()}
            </NavbarContent>

            <NavbarContent justify="end">
                {status === "loading" ? <p>Загрузка...</p> : isAuth ? (
                    <NavbarItem className="hidden lg:flex">
                        <Button as={Link} color="secondary" href="#" variant="flat" onPress={handleSignOut}>
                            Выйти
                        </Button>
                    </NavbarItem>
                ) : (
                    <>
                        <NavbarItem className="hidden lg:flex">
                            <Button as={Link} color="secondary" href="#" variant="flat" onPress={() => setIsSignInOpen(true)}>
                                Войти
                            </Button>
                        </NavbarItem>
                        <NavbarItem>
                            <Button as={Link} color="primary" href="#" variant="flat" onPress={() => setIsSignUpOpen(true)}>
                                Зарегистрироваться
                            </Button>
                        </NavbarItem>
                    </>
                )}
            </NavbarContent>

            <SignUpModal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} />
            <SignInModal isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} />
        </Navbar>
    );
}
