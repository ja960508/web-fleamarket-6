import UserInfoProvider from './context/UserInfoContext';
import useToken from './hooks/useToken';
import { Route, Routes } from './lib/Router';
import LocationProvider from './lib/Router/components/LocationProvider';
import PathProvider from './lib/Router/components/PathProvider';
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
  useToken();

  return (
    <>
      <UserInfoProvider>
        <GlobalStyles />
        <PathProvider>
          <Transition>
            <LocationProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/my" element={<My />} />
                <Route path="/region" element={<RegionInfo />} />
                <Route path="/category" element={<Category />} />
                <Route path="/auth/sign-in" element={<SignIn />} />
                <Route path="/auth/sign-up" element={<SignUp />} />
                <Route
                  path="/auth/OAuth-redirect"
                  element={<OAuthRedirect />}
                />
                <Route path="/post/manage" element={<PostManager />} />
                <Route path="/post/:productId" element={<PostDetail />} />
                <Route path="/chat" element={<Chat />} />
              </Routes>
            </LocationProvider>
          </Transition>
        </PathProvider>
      </UserInfoProvider>
    </>
  );
}
export default App;
