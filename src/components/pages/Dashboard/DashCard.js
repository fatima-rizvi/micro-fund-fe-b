import React from 'react';
import styled from 'styled-components';
import { FormButton, FormInput } from '../../common';

const DashCardStyle = styled.div`
  display: flex;
  box-shadow: 2px 2px 2px grey;
  margin: 20px;
  padding: 20px;
  background: lightblue;
  box-szing: boarder-box;
  width: 1500px;
  height: 500px;
`;

function DashCard() {
  return (
    <DashCardStyle>
      <h1>User Dashboard</h1>
    </DashCardStyle>
  );
}

export default DashCard;
