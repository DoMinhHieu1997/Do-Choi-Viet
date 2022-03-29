import AppMenu from "./components/Menu";
import 'bootstrap/dist/css/bootstrap.min.css';
import Toolbar from '@mui/material/Toolbar';
import HomePage from "./components/homepage";

function App() {
  return (
    <div className="App">
      <AppMenu/>
      <HomePage/>
    </div>
  );
}

export default App;
