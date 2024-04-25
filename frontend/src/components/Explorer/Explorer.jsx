import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useSession } from '../../session/useSession';
import { ENDPOINT } from '../../App';

function Explorer() {
    const [searchTerm, setSearchTerm] = useState('/');
    const [files, setFiles] = useState([]);
    const navigate = useNavigate()
    const { isAuthenticated } = useSession();
    const { driveletter } = useParams()
    const { partition } = useParams()


    useEffect(() => {
        if (!isAuthenticated) {
            // Mostrar el mensaje de alerta
            Swal.fire({
                title: 'Sesión no válida',
                text: 'Serás redirigido al login',
                icon: 'warning',
                confirmButtonText: 'OK'
            }).then((result) => {
                // Cuando el usuario hace clic en "OK", navegar a la página de inicio
                if (result.isConfirmed) {
                    navigate(`/files/${driveletter}/${partition}`);
                }
            });
        }
    }, [isAuthenticated, navigate, driveletter, partition]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${ENDPOINT}/docs`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify({
                        disk: driveletter,
                        partition: partition,
                        ruta: searchTerm

                    }),
                });
                const data = await response.text();
                setFiles(JSON.parse(data));
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchData();
    }, [driveletter, partition, searchTerm]);


    const handleSubmit = (event) => {
        event.preventDefault();  // Prevenir el comportamiento por defecto del formulario
        console.log('Buscar:', searchTerm);  // Aquí iría la lógica de búsqueda
        // Podrías actualizar el estado con los resultados o hacer algo con el término de búsqueda
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit(event);  // Llamar a handleSubmit si la tecla presionada es ENTER
        }
    };

    return (
        <div className="container-fluid bg-main py-4">
            <div className="container bg-files altoExplorer">
                <form onSubmit={handleSubmit}>
                    <br />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ingresa la ruta aqui"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}  // Usar onKeyDown en lugar de onKeyPress
                    />
                </form>
                {
                    files ?
                        (
                            <div className='container-fluid'>
                                <h4 className='text-light'>{files}</h4>
                            </div>
                        ) : (<h4>No hay archivos</h4>)
                }

            </div>
        </div>
    );
}

export default Explorer;
