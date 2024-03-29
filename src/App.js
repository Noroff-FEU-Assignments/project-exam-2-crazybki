import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FrontPage from './components/frontpage/FrontPage';
import HotelDetails from "./components/frontpage/HotelDetails";
import LoginPage from "./components/login/LoginPage";
import Navigation from "./components/navigation/Navigation";
import { AuthProvider } from "../src/components/context/AuthContext"
import Reservations from "./components/adminpages/Reservations";
import AdminMessages from "./components/adminpages/AdminMessages";
import PublishHotels from "./components/adminpages/New hotels/PublishHotels"
import Footer from "./components/navigation/Footer";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Navigation />
          <Route path="/" exact>
            <FrontPage />
          </Route>
          <Switch>
            <Route path="/hotels/:id">
              <HotelDetails />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/reservations">
              <Reservations />
            </Route>
            <Route path="/adminmessages">
              <AdminMessages />
            </Route>
            <Route path="/publishhotels">
              <PublishHotels />
            </Route>
          </Switch>
        </Router>
        <div className="container__test">
          <Footer />
        </div>
      </AuthProvider>
    </div>
  );
}

export default App;
