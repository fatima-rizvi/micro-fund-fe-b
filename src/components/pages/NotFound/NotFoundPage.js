import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundStyle = styled.div`
  display: flex;
  box-shadow: 2px 2px 2px grey;
  margin: 10px;
  padding: 10px;
  background: #d5f2bb;
`;

const NotFoundPage = () => {
  return (
    <NotFoundStyle>
      <div>
        <h1>404 Page Not Found</h1>
        <Link to="/">
          <button>Back To Home</button>
        </Link>
      </div>
    </NotFoundStyle>
  );
};

export default NotFoundPage;
