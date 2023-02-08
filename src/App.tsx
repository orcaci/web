import { AppLayout } from "./layout";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<>default home</>} />
        <Route path="home" element={<Home />} />
        <Route path="section1" element={<>Section 1</>} />
      </Route>
    </Routes>
  );
}

export default App;
