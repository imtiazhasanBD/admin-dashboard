import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Users from './pages/Users';
import Products from './pages/Products';
import Layout from './components/Layout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><h1>Welcome to Admin Dashboard</h1></Layout>} />
        <Route path="/users" element={<Layout><Users /></Layout>} />
        <Route path="/products" element={<Layout><Products /></Layout>} />
      </Routes>
    </Router>
  );
};

export default App;
