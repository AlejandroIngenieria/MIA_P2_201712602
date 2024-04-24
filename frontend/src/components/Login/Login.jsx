import { useState } from 'react';
import { IoArrowBack, IoLogInSharp } from "react-icons/io5";
import { Link, useParams } from 'react-router-dom';
import loginPhoto from "../../assets/login.png";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [hover, setHover] = useState(false);

    const { driveletter } = useParams()
    console.log("Disco: "+driveletter)

    const { partition } = useParams()
    console.log("Particion: "+partition)

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí podrías agregar lógica para manejar el login
        console.log('Login attempt with:', username, password);
    };

    return (
        <div className="container-fluid bg-main py-5">
            <div className="row justify-content-center align-items-center">
                <div className="col-md-6">
                    <div className="card py-5 bg-login">
                        <Link className='fs-1 mx-4' to={'/files'}>
                            <IoArrowBack />
                        </Link>
                        <img src={loginPhoto} className="card-img-top w-25 mx-auto d-block" alt="Login" />
                        <div className="card-body d-flex flex-column align-items-center">
                            <h4 className="card-title text-center mb-4 display-4">Iniciar Sesión</h4>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label fs-4">Nombre de usuario</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label fs-4">Contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className={`btn ${hover ? 'btn-warning' : 'btn-secondary'} fs-1`}
                                    onMouseEnter={() => setHover(true)}  // Cambia el estado a true cuando el mouse entra
                                    onMouseLeave={() => setHover(false)} // Cambia el estado a false cuando el mouse sale
                                >
                                    <IoLogInSharp />
                                    Ingresar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
