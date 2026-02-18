import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import QuizListPage from "./pages/QuizListPage.jsx";
import QuizCreatePage from "./pages/QuizCreatePage.jsx";
import QuizTakePage from "./pages/QuizTakePage.jsx";
import QuizResultsPage from "./pages/QuizResultsPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import MyResultsPage from "./pages/MyResultsPage.jsx";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppShell = () => (
  <>
    <Navbar />
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quizzes" element={<QuizListPage />} />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <QuizCreatePage />
            </ProtectedRoute>
          }
        />
        <Route path="/quizzes/:id" element={<QuizTakePage />} />
        <Route
          path="/results"
          element={
            <ProtectedRoute>
              <MyResultsPage />
            </ProtectedRoute>
          }
        />
        <Route path="/quiz-results" element={<QuizResultsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </main>
    <Footer />
  </>
);

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
