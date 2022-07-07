import styled from "styled-components";
import React from "react";

const Wrapper = styled.div`
  text-align: center;
  font-size: 24px;
  color: coral;
`;

interface Props {
  children: string | null;
}

export const Status: React.FC<Props> = (props) => {
  const { children } = props;

  if (children == null) {
    return null;
  }

  return <Wrapper>Status: {children}</Wrapper>;
};
