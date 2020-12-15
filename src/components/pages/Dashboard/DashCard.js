import React from 'react';
import styled from 'styled-components';
import Profile from '../../common/Profile';
import MyUsersCard from '../../common/MyUsers';
import { PageHeader, Button, Descriptions } from 'antd';

const DashCardStyle = styled.div`
  box-shadow: 2px 2px 2px grey;
  margin: 10px;
  padding: 10px;
  background: #d5f2bb;
  box-szing: boarder-box;
  height: 100%;
`;

function DashCard() {
  return (
    <DashCardStyle>
      <h2>user_id dashboard</h2>
      <Profile />
      <MyUsersCard />
    </DashCardStyle>
  );
}

export default DashCard;
