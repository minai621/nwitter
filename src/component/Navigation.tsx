import {Link} from "react-router-dom";
import {InvalidEvent} from "react";

type INavigation = {
    userObj: any;
};

const Navigation: React.FC<INavigation> = ({ userObj }) => {

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/profile">{ userObj.displayName }</Link>
                </li>
            </ul>
        </nav>
    );
};

export default  Navigation;