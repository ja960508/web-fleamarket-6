import React from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';

interface InputProps {
  name?: string;
  id?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: () => void;
  readOnly?: boolean;
}

function CustomInput(props: InputProps) {
  return <StyledInput {...props} />;
}

export default CustomInput;

const StyledInput = styled.input`
  padding: 0.625rem 1rem;
  border: 1px solid ${colors.gray300};
  border-radius: 8px;
`;
