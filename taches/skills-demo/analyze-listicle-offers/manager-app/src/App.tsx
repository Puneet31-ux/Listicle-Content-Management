import { useEffect } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { MainArea } from './components/layout/MainArea';
import { NewProjectModal } from './components/projects/NewProjectModal';
import { ToastContainer } from './components/ui/Toast';

function App() {
  useEffect(() => {
    console.log('App component mounted');
  }, []);

  return (
    <div className="flex w-full h-screen overflow-hidden bg-gray-100">
      <Sidebar />
      <MainArea />
      <NewProjectModal />
      <ToastContainer />
    </div>
  );
}

export default App;
