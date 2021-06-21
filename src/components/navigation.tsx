import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import Home from "./Home/Home";
import Pokemon from "./Pokemon/Pokemon";


class Navigation extends React.Component<any, any>{
    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/pokemon">Pokemon</Link>
                        </li>

                    </ul>

                    <Switch>
                        <Route path="/pokemon">
                            <Pokemon />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </div>

            </Router>
        );
    }

}

export default Navigation
