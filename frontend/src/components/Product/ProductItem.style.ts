import styled from 'styled-components';
import colors from '../../styles/colors';
import { textMedium, textSmall } from '../../styles/fonts';

export const StyledProductItem = styled.li`
  position: relative;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid ${colors.gray300};

  .product-name {
    ${textMedium};
    font-weight: 500;
  }

  .product-time-region {
    ${textSmall};
    color: ${colors.gray100};
    display: flex;
    align-items: center;

    .delimiter {
      background-color: ${colors.gray100};
      width: 0.2rem;
      height: 0.2rem;
      border-radius: 50%;
      margin: 0 0.25rem;
    }
  }

  .product-price {
    font-weight: 500;
    ${textSmall};
  }

  .like-button {
    position: absolute;
    top: 1rem;
    right: 1rem;

    svg {
      fill: ${colors.pink};
    }

    svg path {
      stroke: ${colors.pink};
    }
  }

  .product-meta {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    flex: 1 1 100%;
  }

  .product-count-group {
    align-self: flex-end;
    display: flex;
    gap: 1rem;
    span {
      display: flex;
      align-items: center;
      gap: 0.375rem;
    }
  }

  img {
    width: 106px;
    height: 106px;
    border: 1px solid ${colors.gray300};
    border-radius: 10px;
  }
`;
