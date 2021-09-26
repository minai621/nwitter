import {BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import Navigation from "./Navigation";
import Profile from "../routes/Profile";

type IRoute = {
    isLoggedIn: boolean;
    userObj: Object;
}


const AppRouter:React.FC<IRoute> = ({ isLoggedIn, userObj }) => {
    return (
        <BrowserRouter>
            {isLoggedIn && <Navigation />}
            <Switch>
                {
                    isLoggedIn ? (
                        <>
                            <Route exact path="/">
                                <Home userObj={userObj}/>
                            </Route>
                            <Route exact path="/profile">
                                <Profile />
                            </Route>
                            </>
                    ) : (
                        <Route exact path="/">
                            <Auth />
                        </Route>
                    )
                }
            </Switch>
        </BrowserRouter>
    )
}

export default AppRouter;