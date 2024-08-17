import './App.css';
import React, { Suspense, lazy } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Layout } from './components/Layout/Layout';
import { GroupPage } from './pages/GroupPage/GroupPage';
import { EventDetailPage } from './pages/EventDetailPage/EventDetailPage';


// Динамическая загрузка компонентов
const MainPage = lazy(() => import('./pages/Main/Main'));
const AdminPage = lazy(() => import('./pages/AdminPage/AdminPage'));
//// add adiin as Lazy and others
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<h1>Loading!</h1>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<MainPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/groups" element={<GroupPage/>} />
              <Route path="/events/:id" element={<EventDetailPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
