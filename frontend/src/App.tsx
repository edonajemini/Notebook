import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Animals } from "./pages/Animals";
import { HomePage } from "./pages/HomePage";
import { Important } from "./pages/Important";
import { Me } from "./pages/Me";
import { Work } from "./pages/Work";
import { Notes } from "./utilis";

function App() {
  const [notes, setNotes] = useState<Notes[]>([]);

  return (
    <div className="App">
      <Routes>
        <Route index element={<Navigate to="/homepage" />} />
        <Route
          path="/homepage"
          element={<HomePage notes={notes} setNotes={setNotes} />}
        />
        <Route
          path="/animals"
          element={<Animals notes={notes} setNotes={setNotes} />}
        />
        <Route
          path="/work"
          element={<Work notes={notes} setNotes={setNotes} />}
        />
        <Route
          path="/me"
          element={<Me notes={notes} setNotes={setNotes} />}
        />
        <Route
          path="/important"
          element={<Important notes={notes} setNotes={setNotes} />}
        />
      </Routes>
    </div>
  );
}

export default App;
