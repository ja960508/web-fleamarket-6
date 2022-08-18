import HomeNavbar from '../components/HomeNavbar/HomeNavbar';
import { Link } from '../lib/Router';

function Home() {
  return (
    <main>
      <HomeNavbar />
      <h1>HOme</h1>
      <Link to="/chat">챗으로가자~</Link>
    </main>
  );
}

export default Home;
