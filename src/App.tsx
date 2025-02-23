import "./App.css";
import React, { Suspense, lazy, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Loader } from "./components/Loader/Loader";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";

// Динамическая загрузка компонентов
const LandingPage = lazy(() => import("./pages/LandingPage/LandingPage"));
const AdminPage = lazy(() => import("./pages/AdminPage/AdminPage"));
const EventsPage = lazy(() => import("./pages/EventsPage/EventsPage"));
const OneEventPage = lazy(() => import("./pages/OneEventPage/OneEventPage"));
const PaymentPage = lazy(() => import("./pages/PaymentPage/PaymentPage"));
const UserPage = lazy(() => import("./pages/UserPage/UserPage"));
const GroupsPage = lazy(() => import("./pages/GroupsPage/GroupsPage"));
const AdminStatPage = lazy(() => import("./pages/AdminStatPage/AdminStatPage"));

const App: React.FC = () => {
  useEffect(() => {
    // @ts-ignore
    let deferredPrompt: BeforeInstallPromptEvent | null = null;
    // @ts-ignore
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      deferredPrompt = e;
      const installButton = document.getElementById("install-button");
      if (installButton) {
        installButton.style.display = "block";
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    const installButton = document.getElementById("install-button");
    installButton?.addEventListener("click", () => {
      if (deferredPrompt) {
        // @ts-ignore
        (deferredPrompt as BeforeInstallPromptEvent).prompt();
        deferredPrompt = null;
        installButton.style.display = "none";
      }
    });

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      if (installButton) {
        installButton.removeEventListener("click", () => {});
      }
    };
  }, []);

  return (
    <div className="App">
      <button id="install-button" style={{ display: "none" }}>
        Установить приложение
      </button>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<LandingPage />} />

                {/* Админ-панель и её дочерние маршруты */}
                <Route path="admin">
                  <Route index element={<AdminPage />} />
                  <Route path="events">
                    <Route index element={<EventsPage />} />
                    <Route path=":id" element={<OneEventPage />} />
                  </Route>
                  <Route path="payment" element={<PaymentPage />} />
                  <Route path="groups" element={<GroupsPage />} />
                  <Route path="admStat" element={<AdminStatPage />} />
                  <Route path="users/:id" element={<UserPage />} />
                </Route>
              </Route>
            </Routes>
          </ErrorBoundary>
        </Suspense>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default App;
