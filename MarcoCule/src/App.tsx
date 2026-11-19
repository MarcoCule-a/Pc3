
import { useState, useEffect } from 'react';
import './App.css';

// Estructura de los datos de universidades
interface Universidad {
  name: string;
  country: string;
  domains: string[];
  web_pages: string[];
}

function App() {

  const [universidades, setUniversidades] = useState<Universidad[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('http://universities.hipolabs.com/search?country=Peru')
      .then(response => response.json())
      .then(data => {
        setUniversidades(data);
        setCargando(false);
      })
      .catch(error => {
        console.error('Error al consultar la API:', error);
        setCargando(false);
      });
  }, []);

  const resultados = universidades.filter(universidad =>
    universidad.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="contenedor">

      <h1>Buscador de Universidades del Perú</h1>

      <input
        type="text"
        placeholder="Buscar universidad..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {cargando ? (
        <p>Cargando universidades...</p>
      ) : (
        <>
          <p>Universidades encontradas: {resultados.length}</p>

          <div className="lista">
            {resultados.map((universidad, i) => (
              <div className="tarjeta" key={i}>

                <h3>{universidad.name}</h3>

                <p>País: {universidad.country}</p>

                <p>
                  Dominio: {universidad.domains[0] || 'No disponible'}
                </p>

                <a
                  href={universidad.web_pages[0]}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visitar página web
                </a>

              </div>
            ))}

            {resultados.length === 0 && (
              <p>No se encontraron universidades.</p>
            )}
          </div>
        </>
      )}

    </div>
  );
}

export default App;
