import { useEffect, useState } from 'react';
import { ENDPOINT } from '../../App';
import { Link } from 'react-router-dom';
import pdf from "../../assets/pdf-file.png"
import png from "../../assets/png-file.png"
import svg from "../../assets/svg-file.png"
import txt from "../../assets/txt-file.png"

// Mapeo de extensiones a imágenes
const fileIcons = {
    pdf: pdf,
    png: png,
    svg: svg,
    txt: txt
};

function getFileExtension(filename) {
    return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
}

function Report() {

    const [files, setFiles] = useState([]);

    useEffect(() => {
        // Llamada a la API para obtener los nombres de los archivos
        fetch(`${ENDPOINT}/reports`)
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
            <div className="container bg-report altoReport">
                <h1 className="display-1 text-light text-center">Reportes</h1>
                {
                    files
                        ? (
                            <ul className='d-flex flex-wrap container-fluid'>
                                {files.map((file, index) => {
                                    const ext = getFileExtension(file).toLowerCase(); // Obtener la extensión del archivo
                                    const icon = fileIcons[ext] || png; // Obtener el ícono basado en la extensión o png por defecto
                                    return (
                                        <Link key={index} className='nav-link report p-4' to={'/'}>
                                            <img src={icon} alt="reporte" className='img-fluid' />
                                            <h6 className='text-light'>{file}</h6>
                                        </Link>
                                    );
                                })}
                            </ul>

                        )
                        : (<h3 className="text-light">No se han generado reportes</h3>)
                }
            </div>
        </div>
    )
}

export default Report