import "./App.css";
import React, { Suspense, lazy } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

// Динамическая загрузка компонентов
const LandingPage = lazy(() => import("./pages/LandingPage/LandingPage"));
const AdminPage = lazy(() => import("./pages/AdminPage/AdminPage"));
const EventsPage = lazy(() => import("./pages/EventsPage/EventsPage"));
const OneEventPage = lazy(() => import("./pages/OneEventPage/OneEventPage"));
const PaymentPage = lazy(() => import("./pages/PaymentPage/PaymentPage"));
const GroupsPage = lazy(() => import("./pages/GroupsPage/GroupsPage"));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<h1>Loading!</h1>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<LandingPage />} />
              
              {/* Админ-панель и её дочерние маршруты */}
              <Route path="/admin" element={<AdminPage />}>
                <Route path="events" element={<EventsPage />} />
                <Route path="events/:id" element={<OneEventPage />} />
                <Route path="payment" element={<PaymentPage />} />
                <Route path="groups" element={<GroupsPage />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
