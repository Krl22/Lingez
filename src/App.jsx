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
import Lessons from "./pages/Lessons";
import Environment from "./pages/Environment";
import More from "./pages/More";
import Chat from "./pages/chat";
import Account from "./pages/Account";
import Notification from "./pages/Notifications";
import Game from "./pages/Game";
import Lobby from "./pages/Lobby";
import Room from "./pages/Room";
import Search from "./pages/Search";
import Scene from "./pages/locations/Restaurant/scene";

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
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/environment" element={<Environment />} />
            <Route path="/more" element={<More />} />
            <Route path="/account" element={<Account />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/notifications" element={<Notification />} />
            <Route path="/game/:roomId" element={<Game />} />
            <Route path="/lobby" element={<Lobby />} />
            <Route path="/room/:roomId" element={<Room />} />
            <Route path="/search-rooms" element={<Search />} />
            <Route path="/restaurant" element={<Scene />} />
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
