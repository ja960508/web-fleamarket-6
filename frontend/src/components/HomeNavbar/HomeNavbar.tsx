import { useContext } from 'react';
import styled from 'styled-components';
import { CategoryIcon, MapPinIcon, UserIcon } from '../../assets/icons/icons';
import { UserInfoContext } from '../../context/UserInfoContext';
import { LinkButton } from '../../lib/Router';
import colors from '../../styles/colors';

function HomeNavbar({ currentCategoryIcon }: { currentCategoryIcon: string }) {
  const userInfo = useContext(UserInfoContext);

  return (
    <header>
      <StyledNav>
        <LinkButton moveTo="/category">
          {currentCategoryIcon ? (
            <SelectedCategory>
              <img src={currentCategoryIcon} alt="selected-category" />
            </SelectedCategory>
          ) : (
            <CategoryIcon />
          )}
        </LinkButton>

        <h3>
          <LinkButton className="region-button" moveTo="/region">
            <MapPinIcon />
            <span>{userInfo.region}</span>
          </LinkButton>
        </h3>
        <div>
          <LinkButton moveTo={true ? '/auth/sign-in' : '/my'}>
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

const SelectedCategory = styled.div`
  display: flex;
  & > img {
    width: 1rem;
    height: 1rem;
  }
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;

  background-color: ${colors.white};
  border-radius: 10px;
  padding: 0.3rem;
`;
