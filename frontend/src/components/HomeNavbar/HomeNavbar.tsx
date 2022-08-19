import styled from 'styled-components';
import { CategoryIcon, MapPinIcon, UserIcon } from '../../assets/icons/icons';
import { LinkButton } from '../../lib/Router';
import colors from '../../styles/colors';

function HomeNavbar() {
  return (
    <header>
      <StyledNav>
        <LinkButton moveTo="/category">
          <CategoryIcon />
        </LinkButton>

        <h3>
          <LinkButton className="region-button" moveTo="/region">
            <MapPinIcon />
            <span>역삼동</span>
          </LinkButton>
        </h3>
        <div>
          <LinkButton moveTo={false ? '/auth/sign-in' : '/my'}>
            <UserIcon />
          </LinkButton>
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
    .region-button {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
  }

  svg path {
    stroke: ${colors.white};
  }

  svg circle {
    stroke: ${colors.white};
  }
`;
