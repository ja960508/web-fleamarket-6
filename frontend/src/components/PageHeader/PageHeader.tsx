import styled from 'styled-components';
import { ChevronLeftIcon } from '../../assets/icons/icons';
import { LinkButton } from '../../lib/Router';
import colors from '../../styles/colors';
import { textMedium } from '../../styles/fonts';
interface PageHeaderProps {
  pageName: string;
  extraButton?: React.ReactNode;
}

function PageHeader({ pageName, extraButton }: PageHeaderProps) {
  return (
    <StyledHeader>
      <LinkButton className="go-back-button" moveTo={-1}>
        <ChevronLeftIcon />
      </LinkButton>
      <h1>{pageName}</h1>
      {extraButton}
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;

  padding: 1rem;
  background-color: ${colors.offWhite};

  & > .go-back-button {
    display: flex;
    justify-self: flex-start;
  }

  & > h1 {
    justify-self: center;
    ${textMedium};
  }

  & > *:last-child:not(h1) {
    justify-self: flex-end;
  }
`;

export default PageHeader;
