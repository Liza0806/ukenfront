import './App.css';
import React, { Suspense } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import MainPage from './pages/Main/Main';
import { Layout } from './components/Layout/Layout';
import AdminPage from './pages/AdminPage/AdminPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<h1>Loading!</h1>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<MainPage />} />
              <Route path="/admin" element={<AdminPage />} />
              {/* <Route path="/:pokemonId" element={<div />} /> */}
            </Route>
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
