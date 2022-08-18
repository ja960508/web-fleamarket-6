import styled from 'styled-components';
import colors from '../../styles/colors';

export const StyledNav = styled.nav`
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
