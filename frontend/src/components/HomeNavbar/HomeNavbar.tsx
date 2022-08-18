import {
  CategoryIcon,
  MapPinIcon,
  MenuIcon,
  UserIcon,
} from '../../assets/icons/icons';
import { StyledNav } from './HomeNavbar.style';

function HomeNavbar() {
  return (
    <header>
      <StyledNav>
        <CategoryIcon />
        <h3>
          <MapPinIcon />
          <span>역삼동</span>
        </h3>
        <div>
          <UserIcon />
          {false && <MenuIcon />}
        </div>
      </StyledNav>
    </header>
  );
}

export default HomeNavbar;
