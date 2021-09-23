import React, {useEffect} from "react";
import {ReactEventHandler, useState} from "react";
import { authService } from "../fbase";
import {auth} from "firebase";

const Auth: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [newAccount, setNewAccount] = useState<boolean>(true);

    useEffect(()=> {
        authService.onAuthStateChanged(
        (user) =>
            console.log(user))
        }, []);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { name, value },
        } = event;
        if(name === "email") {
            setEmail(value)
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const onSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            let data;
            if(newAccount){
                data = await authService.createUserWithEmailAndPassword(email, password);
            } else {
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
    <div>
        <form onSubmit={onSubmit}>
            <input name="email"
                   type="email"
                   placeholder="Email"
                   value={email}
                   onChange={onChange}
                   required
            />
            <input name="password"
                   type="password"
                   placeholder="Password"
                   value={password}
                   onChange={onChange}
                   required />
            <input type="submit" value={newAccount ? "Create Account" : "Log In"}/>
        </form>
        <div>
            <button>Continue with Google</button>
            <button>Continue with Github</button>
        </div>
    </div>
)}

export default Auth;
