import './App.css';
import { Route, Routes } from 'react-router-dom';
import Nav from './Component/Nav';
import Report from './Component/Report';
import Active from './Component/Active';
import Main from './Component/Main';

function App() {
  return (
    <>
      <main>
        <Nav />
        <Routes>
          <Route path='/' element={<Main/>} />
          <Route path='/active' element={<Active />} />
          <Route path='/repoter' element={<Report />} />
        </Routes>
      </main>
      {/* <Footer /> */}
    </>
  );
}
export default App;
