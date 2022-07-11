import { Route, Routes } from 'react-router-dom';
import New from './pages/New/New';
import News from './pages/News/News'
import SignIn from './pages/SignIn/SignIn'
import SignUp from './pages/SignUp/SignUp'

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<News />} />
          <Route path='/new/:id' element={<New />} />
          <Route path='/category/:categoryId' element={<News />} />
          <Route path='/SignIn' element={<SignIn />} />
          <Route path='/SignUp' element={<SignUp />} />
        </Routes>
    </div>
  );
}

export default App;
