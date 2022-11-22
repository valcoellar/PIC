import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

// agregamos los componentes *****************
import landing from './components/landing/Landing.jsx';
import Home from './components/home/Home.jsx'
import Info from './components/info/Info.jsx'
import Formulario from './components/formulario/Formulario.jsx'
// ********************************************



function App() {
  return (
<BrowserRouter>
<div className="App">
<Switch>


<Route exact path='/' component={landing}></Route>
<Route exact path='/home' component={Home}></Route>
<Route exact path='/info' component={Info}></Route>
<Route exact path='/formulario' component={Formulario}></Route>
</Switch>
</div>
</BrowserRouter>
  );
}

export default App;
