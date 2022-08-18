import { Route, Router, Routes } from './lib/Router';
import Chat from './pages/Chat';
import Home from './pages/Home';
import PostDetail from './pages/Post/PostDetail';
import GlobalStyles from './styles/GlobalStyles';

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<PostDetail />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
