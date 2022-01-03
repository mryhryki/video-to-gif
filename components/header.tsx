import styled from "styled-components";

const StyledHeader = styled.header`
  align-items: center;
  border-bottom: 1px solid silver;
  display: flex;
  height: 65px;
  left: 0;
  padding: 8px;
  position: fixed;
  right: 0;
  top: 0;
`;

const Logo = styled.img`
  border-radius: 2px;
  height: 48px;
  margin-right: 8px;
  width: 48px;
`;

const Title = styled.h1``;

export const Header = () => (
  <StyledHeader>
    <Logo height="48" width="48" src="/logo_96x96.png" alt="Logo"/>
    <Title>Video to GIF</Title>
  </StyledHeader>
);
