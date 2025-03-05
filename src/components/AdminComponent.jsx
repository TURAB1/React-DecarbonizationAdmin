import { Link } from "react-router-dom";
import UserRegistration from "../pages/UserSetup/krpRegistrationEdit/KrpRegistrationEdit";
import SampleDefault from "../samples/SampleDefault"
import Syling from "../samples/Styling";
import "./AdminComponent.scss";
export default function AdminComponent() {
    return (
        <div>
            <h1>Admin pages</h1>
            <div className="page-list">
            {/* <Link to="/krUser" className="btn-page-navigation">KR User</Link>
            <Link to="/krpUser" className="btn-page-navigation">KRP User</Link>
            <Link to="/krpRegistrationList" className="btn-page-navigation">KRP Registration List</Link>
            <Link to="/krpRegistrationEdit" className="btn-page-navigation">KRP Registration Edit</Link> */}
            </div>
            {/* <SampleDefault/> */}
            {/* <Syling/> */}
            {/* <UserRegistration/> */}
        </div>
    );
}