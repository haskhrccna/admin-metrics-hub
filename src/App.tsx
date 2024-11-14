import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminStats from './pages/AdminStats';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminStats />} />
      </Routes>
    </Router>
  );
}

export default App;