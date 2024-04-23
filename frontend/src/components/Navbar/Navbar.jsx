import { FaCode } from "react-icons/fa";
import { LuFiles } from "react-icons/lu";
import { TbReportSearch } from "react-icons/tb";
import { Link } from "react-router-dom";
import logo from "../../assets/consola.png"

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-4">
            <div className="container">z
                <Link className="navbar-brand" to={'/'}><img src={logo} alt="consola" className="w-logo" />MyTerminal</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto marginX">
                        <li className="nav-item">
                            <Link className="nav-link" to={'/'}>Comandos <FaCode /></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={'/Files'}>Archivos <LuFiles /></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={'/Reports'}>Reportes <TbReportSearch /></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;