import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import CompactApp from './CompactApp';
import SearchInput from './SearchInput';
import './search.css';
import dummyData from './dummySearchData';
import { useOktaAuth } from '@okta/okta-react/dist/OktaContext';
import { useAppsQuery, useUserQuery } from '../../../hooks';

function SearchPage({ orgId }) {
  // passing orgId down from the parent component, because I don't see
  // an easy way to get data from one hook and use it in another hook
  const auth = useOktaAuth();
  const [{ data, isLoading, error }, mutation] = useAppsQuery(auth, orgId);
  const [apps, setAppsState] = useState([]);
  const [filterValues, setFilter] = useState({ name: '', status: '' });

  useEffect(() => {
    if (data) {
      setAppsState(data.data);
    }
  }, [data]);
  if (error) {
    console.error(error);
  }

  return (
    <div className="search-page">
      <SearchInput setFilter={setFilter} />
      <div className="all-short-apps">
        <div className="short-apps-header">
          <p>Name</p>
          <p>Organization Name</p>
          <p>Status</p>
        </div>
        <div className="apps-container">
          {/* To substitute in the dummyData in dummmySearchData.js, swap "apps" for "dummyData" below  */}
          {apps.map(application => (
            <CompactApp
              key={application.appid}
              app={application}
              filterValues={filterValues}
              mutation={mutation}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
