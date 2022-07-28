import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
const Home = React.lazy(() => import('./pages/Home'))
const About = React.lazy(() => import('./pages/About'))
const Profile = React.lazy(() => import('./pages/Profile'))

const App = () => {
  return (
    <BrowserRouter basename={"basename"}>
      <React.Suspense
        fallback={
          <div style={{ textAlign: "center", marginTop: "240px" }}></div>
        }
      >
        <Routes>
          <Route index path="" element={<Home />}></Route>
          <Route path="about" element={<About />}></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="*" element={<Navigate replace to="" />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default App;
