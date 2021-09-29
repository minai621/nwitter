import React, {useEffect, useState} from 'react';
import AppRouter from "component/Router";
import { authService } from "../fbase";

const App:React.FC = () => {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState<any>(false);
    const [userObj, setUserObj] = useState<any>(null);

    useEffect(()=> {
        authService.onAuthStateChanged((user) => {
            if(user){
                setIsLoggedIn(user);
                setUserObj(user);
            } else {
                setIsLoggedIn(false);
            }
            setInit(true);
        });
    }, []);

    return (
        <>
            {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/> : "initializing..."}
        </>
    )
};

export default App;
