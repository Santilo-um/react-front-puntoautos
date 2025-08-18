import './App.css';
import {MyButton} from './function';


function App() {
  return (
    <div className="App">
      <section>
        <header>
          <h1>PuntoAutos</h1>
          <nav>
            <a href="/">Inicio</a> | <a href="/login">Login</a> | <a href="/registro">Registro</a>
          </nav>
        </header>
        <main>
          <h2>Bienvenido a PuntoAutos</h2>
          <MyButton />
          <MyButton />
          <MyButton />
          <p>La mejor plataforma para comprar y vender vehículos usados.</p>
        </main>
        <footer>
          <p>&copy; 2025 PuntoAutos</p>
        </footer>
      </section>  
    </div>
  );
}

export default App;

