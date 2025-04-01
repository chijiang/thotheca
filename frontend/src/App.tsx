import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import TextUpload from './pages/TextUpload';
import TextManagement from './pages/TextManagement';
import TextLibrary from './pages/TextLibrary';
import ChatBot from './pages/ChatBot';
import KnowledgeGraph from './pages/KnowledgeGraph';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="h-screen flex overflow-hidden bg-gray-100">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <Routes>
                  <Route path="/" element={<TextUpload />} />
                  <Route path="/text-management" element={<TextManagement />} />
                  <Route path="/text-library" element={<TextLibrary />} />
                  <Route path="/chatbot" element={<ChatBot />} />
                  <Route path="/knowledge-graph" element={<KnowledgeGraph />} />
                </Routes>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
