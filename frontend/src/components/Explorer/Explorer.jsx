import { useState, useEffect } from 'react';
import { session } from '../../App';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Explorer() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate()
    useEffect(() => {
        if (!session) {
            // Mostrar el mensaje de alerta
            Swal.fire({
                title: 'Sesión no válida',
                text: 'Serás redirigido a la página de inicio.',
                icon: 'warning',
                confirmButtonText: 'OK'
            }).then((result) => {
                // Cuando el usuario hace clic en "OK", navegar a la página de inicio
                if (result.isConfirmed) {
                    navigate('/');
                }
            });
        }
    }, [navigate]);

    // Función que maneja el envío del formulario
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
                {/* Aquí podrías añadir una vista de lista o cuadrícula para mostrar archivos */}
            </div>
        </div>
    );
}

export default Explorer;
