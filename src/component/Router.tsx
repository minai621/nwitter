import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";

type Logged = {
    isLoggedIn: boolean;
}


const AppRouter:React.FC<Logged> = ({ isLoggedIn }) => {
    return (
        <BrowserRouter>
            <Switch>
                {
                    isLoggedIn ? (
                        <Route exact path="/">
                            <Home />
                        </Route>
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