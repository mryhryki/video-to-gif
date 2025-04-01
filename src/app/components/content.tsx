"use client"

import React from "react";
import styled from "styled-components";

const Wrapper = styled.main`
  bottom: 36px;
  left: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  position: fixed;
  width: 60vw;
  top: 65px;
`;

const UnsupportedWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

interface Props {
  errorMessage: string | null;
  children: React.ReactNode;
}

export const Content: React.FC<Props> = (props) => {
  const { errorMessage, children } = props;

  if (errorMessage != null) {
    return (
      <Wrapper>
        <UnsupportedWrapper>
          <h2>Sorry, {errorMessage} &#x1f647;</h2>
        </UnsupportedWrapper>
      </Wrapper>
    );
  }

  return <Wrapper>{children}</Wrapper>;
};
