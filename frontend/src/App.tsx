import UserInfoProvider from './context/UserInfoContext';
import { Route, Router, Routes } from './lib/Router';
import Transition from './lib/Router/components/Transition';
import OAuthRedirect from './pages/Auth/OAuthRedirect';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import Category from './pages/Category';
import Chat from './pages/Chat';
import Home from './pages/Home';
import My from './pages/My';
import PostDetail from './pages/Post/PostDetail';
import PostManager from './pages/Post/PostManager';
import RegionInfo from './pages/RegionInfo';
import GlobalStyles from './styles/GlobalStyles';

function App() {
  return (
    <>
      <UserInfoProvider>
        <GlobalStyles />
        <Router>
          <Transition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/my" element={<My />} />
              <Route path="/region" element={<RegionInfo />} />
              <Route path="/category" element={<Category />} />
              <Route path="/auth/sign-in" element={<SignIn />} />
              <Route path="/auth/sign-up" element={<SignUp />} />
              <Route path="/auth/OAuth-redirect" element={<OAuthRedirect />} />
              <Route path="/post/manage" element={<PostManager />} />
              <Route path="/post/:id" element={<PostDetail />} />
              <Route path="/chat" element={<Chat />} />
            </Routes>
          </Transition>
        </Router>
      </UserInfoProvider>
    </>
  );
}
export default App;
