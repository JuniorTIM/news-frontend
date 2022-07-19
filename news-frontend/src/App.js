import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import New from "./pages/New/New";
import News from "./pages/News/News";
import Admin from "./pages/Admin-panel/Admin";

function App() {

  const role = useSelector((state) => state.users.role);

  if (role === "admin") {
    return (
      <>
        <Routes>
          <Route path="/" element={<News />} />
          <Route path="/new/:id" element={<New />} />
          <Route path="/category/:categoryId" element={<News />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </>
    );
  } else {
    return (
      <>
        <Routes>
          <Route path="/" element={<News />} />
          <Route path="/new/:id" element={<New />} />
          <Route path="/admin" element={<Navigate to="/" replace />} />
          <Route path="/category/:categoryId" element={<News />} />
        </Routes>
      </>
    );
  }
}

export default App;
