import { createGlobalStyle } from 'styled-components';
import colors from './colors';
import reset from './reset';

const GlobalStyles = createGlobalStyle`
  ${reset}

  body {
    color: ${colors.black};
  }
`;

export default GlobalStyles;
