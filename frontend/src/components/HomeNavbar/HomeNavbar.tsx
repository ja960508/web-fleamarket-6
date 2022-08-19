import styled from 'styled-components';
import {
  CategoryIcon,
  MapPinIcon,
  MenuIcon,
  UserIcon,
} from '../../assets/icons/icons';
import colors from '../../styles/colors';

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

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  color: ${colors.white};
  background-color: ${colors.primary};

  h3 {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  svg path {
    stroke: ${colors.white};
  }

  svg circle {
    stroke: ${colors.white};
  }
`;
