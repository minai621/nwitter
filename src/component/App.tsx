import React, {useEffect, useState} from 'react';
import AppRouter from "component/Router";
import { authService } from "../fbase";
import firebase from "firebase/app";

const App:React.FC = () => {
    const [init, setInit] = useState(false);
    const [userObj, setUserObj] = useState<any>(null);

    const refreshUser = () => {
        const user: firebase.User | null = authService.currentUser;
        if(user){
            setUserObj({
                uid: user.uid,
                displayName: user.displayName,
                updateProfile: (args: any) => user.updateProfile(args),
            });
        }
    };

    useEffect(()=> {
        authService.onAuthStateChanged((user) => {
            if(user){
                setUserObj({
                    uid: user.uid,
                    displayName: user.displayName,
                    updateProfile: (args: any) => user.updateProfile(args),
                });
            } else {
                setUserObj(false);
            }
            setInit(true);
        });
    }, []);

    return (
        <>
            {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} refreshUser={refreshUser} /> : "initializing..."}
        </>
    )
};

export default App;
