import "./App.sass";
import { BrowserRouter, Routes, Route } from "react-router";
import MainNav from "./comp/MainNav/MainNav";
import Work from "./pages/Work/Work";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import SkipLinks from "./comp/SkipLinks/SkipLinks";


function App() {
  return (
    <>
      <BrowserRouter>
        <SkipLinks />
        <MainNav />
        <Routes>
          <Route path="/" element={<Work />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
