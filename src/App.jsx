import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./pages/home";
import TopNavBar from "./components/TopNavBar";
import BottomNavBar from "./components/BottomNavBar";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100 ">
        <ConditionalTopNavBar />
        <div className="flex-grow ">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <ConditionalBottomNavBar />
      </div>
    </Router>
  );
}

const ConditionalTopNavBar = () => {
  const location = useLocation();
  const hiddenRoutes = [
    "/",
    "/login",
    "/register",
    "/chat",
    "/avatar",
    "/game",
    "/chatgptclone",
  ];
  return !hiddenRoutes.includes(location.pathname) ? <TopNavBar /> : null;
};

const ConditionalBottomNavBar = () => {
  const location = useLocation();
  const hiddenRoutes = ["/", "/login", "/register", "/game", "/chatgptclone"];
  return !hiddenRoutes.includes(location.pathname) ? <BottomNavBar /> : null;
};

export default App;
