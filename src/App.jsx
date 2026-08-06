import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import HowToUse from "./pages/HowToUse";
import Instruments from "./pages/Instruments";
import Play from "./pages/Play";
import MySounds from "./pages/MySounds";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Navbar />
      <main style={{ marginTop: "60px", minHeight: "calc(100vh - 60px)", position: "relative" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-to-use" element={<HowToUse />} />
          <Route path="/instruments" element={<Instruments />} />
          <Route path="/play" element={<Play />} />
          <Route path="/mysounds" element={<MySounds />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
