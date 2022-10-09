import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import Home from "./pages";
import { SocketProvider } from "./hooks/useSocket";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/:id"
          element={
            <SocketProvider>
              <Home />
            </SocketProvider>
          }
        />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
