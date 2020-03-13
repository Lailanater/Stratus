import styled from "styled-components";

export const WhiteText = styled.span`
  && {
    color: white;
  }
`;

export const Brand = styled(WhiteText)`
  font-size: 26px;

  &&:hover {
    cursor: pointer;
    color: white;
  }
`;