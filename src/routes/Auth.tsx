import React, {useEffect} from "react";
import {useState} from "react";
import {authService, firebaseInstance} from "../fbase";

const Auth: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [newAccount, setNewAccount] = useState<boolean>(true);
    const [error, setError] = useState<any>("");

    useEffect(()=> {
        authService.onAuthStateChanged(
        (user) =>
            console.log(user))
        }, []);

    const toggleAccount = () => setNewAccount((prev) => !prev);

    const onSocialClick = async (event : any) => {
      const {
          target: {name},
      } = event;
      let provider: any;
      if( name == "google") {
          provider = new firebaseInstance.auth.GoogleAuthProvider();
      } else if (name == "github") {
          provider = new firebaseInstance.auth.GithubAuthProvider();
      }
      const data = await authService.signInWithPopup(provider);
      console.log(data);
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { name, value },
        } = event;
        if(name == "email") {
            setEmail(value)
        } else if (name == "password") {
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
            setError(error);
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
            {error}
        </form>
        <span onClick={toggleAccount}>
            {newAccount ? "Sign In" : "Create Account"}
        </span>
        <div>
            <button onClick={onSocialClick} name="google">Continue with Google</button>
            <button onClick={onSocialClick} name="google">Continue with Github</button>
        </div>
    </div>
)}

export default Auth;
