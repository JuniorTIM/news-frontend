import { Route, Routes } from 'react-router-dom';
import New from './pages/New/New';
import News from './pages/News/News'

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<News />} />
          <Route path='/new/:id' element={<New />} />
          <Route path='/category/:categoryId' element={<News />} />
        </Routes>
    </div>
  );
}

export default App;
