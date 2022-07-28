import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Home = () => {
  return <main>
    <ul>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      <li>
        <NavLink to="/profile">Profile</NavLink>
      </li>
    </ul>
    <div>
      Welcome to Home ! ~~~
      <Outlet />
    </div>
  </main>;
};

export default Home;
