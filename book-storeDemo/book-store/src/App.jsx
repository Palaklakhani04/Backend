import './App.css'
import HomePage from './Pages/HomePage'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <HomePage />
      <ToastContainer />
    </>
  )
}

export default App
