import { useState, useEffect } from 'react';
import { ENDPOINT } from '../../App';
import { Link } from 'react-router-dom';
import disco from "../../assets/disk.png"

function File() {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        // Llamada a la API para obtener los nombres de los archivos
        fetch(`${ENDPOINT}/disks`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setFiles(data))
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);


    return (
        <div className="container-fluid bg-main py-4">
            <div className="container bg-files altoReport">
                <h1 className="display-1 text-light text-center">Selecciona un disco</h1>
                <div className="container">
                    {
                        files
                            ? (
                                <ul className='d-flex flex-wrap container-fluid'>
                                    {files.map((file, index) => (
                                        <Link key={index} className='nav-link disco p-4' to={'/'}>
                                            <img src={disco} alt="disco" className='img-fluid' />
                                            <h3 className='text-light'>{file}</h3>
                                        </Link>
                                    ))}
                                </ul>

                            )
                            : (<h3 className="text-light">No se han creado discos</h3>)
                    }
                </div>
            </div>
        </div>
    )
}

export default File;