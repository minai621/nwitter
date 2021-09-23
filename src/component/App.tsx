import React, {useEffect, useState} from 'react';
import AppRouter from "component/Router";
import { authService } from "../fbase";

const App:React.FC = () => {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState<any>(false);

    useEffect(()=> {
        authService.onAuthStateChanged((user) => {
            if(user){
                setIsLoggedIn(user);
            } else {
                setIsLoggedIn(false);
            }
            setInit(true);
        });
    }, []);

    return (
        <>
            {init ? <AppRouter isLoggedIn={isLoggedIn}/> : "initializing..."}
            <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
        </>
    )
};

export default App;
