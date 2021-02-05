import React from 'react';
import styled from 'styled-components';
import Profile from '../../common/Profile';
import SearchPage from '../../pages/Search/SearchPage';
import OrgCards from '../../common/OrgCards';
import { useOktaAuth } from '@okta/okta-react';
import { useUserQuery } from '../../../hooks';
import { PageHeader, Button, Descriptions } from 'antd';

const DashCardStyle = styled.div`
  box-shadow: 2px 2px 2px grey;
  margin: 10px;
  padding: 10px;
  box-sizing: border-box;
  height: 100%;
`;

function DashCard() {
  const auth = useOktaAuth();
  const [{ data, isLoading, error }] = useUserQuery(auth);

  if (isLoading) return <p>loading...</p>;

  if (error) return <h1>{error}</h1>;

  return (
    <DashCardStyle>
      <h2>user_id dashboard</h2>
      <Profile />
      {/* Only partners/admins should see the dashcard however
          none of the test users are PARTNER's or part of any
          organization, so I'm hard-coding in orgId of 5.
          Should be able to replace the ternary operator with
          `&&`, and delete the last line to 'fix' this.
      */}
      {data.data.roles.filter(r => r.role.name == 'PARTNER').length > 0 &&
      data.data.organizations[0] > 0 ? (
        <SearchPage orgId={data.data.organizations[0].orgid || {}} />
      ) : (
        <SearchPage orgId={5} />
      )}

      {data.data.roles.filter(r => r.role.name == 'USER').length > 0 && (
        <OrgCards />
      )}
    </DashCardStyle>
  );
}

export default DashCard;
