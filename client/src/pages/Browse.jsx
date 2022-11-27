import React from "react";
import NavbarColumn from "../components/NavbarColumn";
import DiscoverSustainability from "../components/DiscoverSustainability";
import DiscoverRecommended from "../components/DiscoverRecommended";
import DiscoverLocal from "../components/DiscoverLocal";

import { Link } from "react-router-dom";

const Browse = () => {
  return (
    <section className="layout">
      <div className="sidebar">
        <NavbarColumn />
      </div>

      <main className="dashboard">
        <header className="dashboard-header">
          <h1>Discover</h1>
          <div className="links">
            <Link to="/settings">Settings</Link>
            <Link to="/profile">
              <img src="" alt="avatar" />
            </Link>
          </div>
        </header>
        <DiscoverRecommended />
        <DiscoverLocal />
        <DiscoverSustainability />
      </main>
    </section>
  );
};

export default Browse;
