import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import OpenTickets from './pages/tickets/OpenTickets';
import InProgressTickets from './pages/tickets/InProgressTickets';
import ClosedTickets from './pages/tickets/ClosedTickets';
import CreateTicket from './pages/tickets/CreateTicket';
import Profile from './pages/profile/Profile';
import { AuthProvider } from './contexts/AuthContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tickets/open" element={<OpenTickets />} />
              <Route path="/tickets/in-progress" element={<InProgressTickets />} />
              <Route path="/tickets/closed" element={<ClosedTickets />} />
              <Route path="/tickets/create" element={<CreateTicket />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </Router>
        <Toaster position="top-right" />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;