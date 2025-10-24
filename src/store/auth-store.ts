import {create} from "zustand/react";
import {Session} from "next-auth";


type SessionStatus = "authenticated" | "unauthenticated" | "loading";

interface State {
    session: Session | null,
    isAuth: boolean,
    status: SessionStatus,
    setAuthState: (status: SessionStatus, session: Session | null) => void,
}

export const useAuth = create<State>((set) => ({
    session: null,
    isAuth: false,
    status: "loading",
    setAuthState(status, session) {
        set({
            session,
            status,
            isAuth: status === "authenticated",
        });
    }
}));
