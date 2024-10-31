import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useWeb3 } from './hooks/useWeb3';
import { Wallet } from 'lucide-react';
import TransactionsPage from './pages/TransactionsPage';
import WalletConnect from './components/WalletConnect';
import Dashboard from './pages/Dashboard';
import { Toaster } from 'react-hot-toast';
import './css/style.css';

function App() {
  const { account, connectWallet } = useWeb3();

  return (
    <>
      <Router>
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
          <header className="bg-gray-800 shadow-lg">
            <div className="container mx-auto px-4 py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-8">
                  <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Wallet className="w-6 h-6" />
                    Web3 Wallet
                  </h1>
                  <nav className="hidden md:flex items-center gap-4">
                    <Link to="/" className="hover:text-indigo-400 transition-colors">
                      Dashboard
                    </Link>
                    <Link to="/transactions" className="hover:text-indigo-400 transition-colors">
                      Transactions
                    </Link>
                  </nav>
                </div>
                <WalletConnect account={account} onConnect={connectWallet} />
              </div>
            </div>
          </header>

          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/transactions" element={<TransactionsPage />} />
            </Routes>
          </main>
        </div>
      </Router>
      
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#1f2937',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
          loading: {
            iconTheme: {
              primary: '#6366F1',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  );
}

export default App;