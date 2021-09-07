import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import '../src/styles/styles.scss';
import FrontPage from './components/frontpage/FrontPage';
import HotelDetails from "./components/frontpage/HotelDetails";


function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact>
          <FrontPage />
        </Route>
        <Switch>
          <Route path="/hotels/:id">
            <HotelDetails />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
