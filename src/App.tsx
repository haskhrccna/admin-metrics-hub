import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AdminStats from './pages/AdminStats';
import Unauthorized from './pages/Unauthorized';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route
          path="/admin/stats"
          element={
            <ProtectedRoute>
              <AdminStats />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;