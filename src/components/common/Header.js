import React from 'react';
import styled from 'styled-components';

const HeaderStyle = styled.div`
  display: flex;
  box-shadow: 2px 2px 2px grey;
  margin: 20px;
  padding: 20px;
  background: lightblue;
`;

function Header() {
  return (
    <HeaderStyle>
      <h2>Header</h2>
    </HeaderStyle>
  );
}

export default Header;
