import { Routes,Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Homepage from './pages/Homepage';
import FavoritePages from "./pages/FavoritePages";
function App() {
 

  return (
    <div className="flex">
      <Sidebar />
      <Routes>
        <Route path='/' element={ <Homepage /> } />
        <Route path='/favorites' element={ <FavoritePages /> } />
       </Routes>
   </div>
  )
}

export default App
