import {BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import Navigation from "./Navigation";
import Profile from "../routes/Profile";

type Logged = {
    isLoggedIn: boolean;
}


const AppRouter:React.FC<Logged> = ({ isLoggedIn }) => {
    return (
        <BrowserRouter>
            {isLoggedIn && <Navigation />}
            <Switch>
                {
                    isLoggedIn ? (
                        <>
                            <Route exact path="/">
                                <Home />
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