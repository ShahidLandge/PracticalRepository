import { Header } from "./components/Header";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Employees } from "./components/Employees";

import { UpdateEmployee } from "./components/UpdateEmployee";

export default function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/employees" element={<Employees />} />

        <Route path="/employee/update/:id" element={<UpdateEmployee />} />
      </Routes>
    </div>
  );
}
