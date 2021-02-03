import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import CompactApp from './CompactApp';
import SearchInput from './SearchInput';
import './search.css';
import { useOktaAuth } from '@okta/okta-react';
import { getProfileData } from '../../../api';
import { useAppsQuery } from '../../../hooks';

const dummyData = [
  {
    appid: 9,
    name: 'Clara Oswald',
    address: '123 somewhere drive',
    phone: '923-567-8965',
    reason: 'i want to help my community',
    status: 'accepted',
    organization: {
      orgid: 4,
      name: 'Organization 1',
      address: '456 greenville drive, longtucky, ark 80067',
      phone: '567-890-2234',
    },
    user: {
      userid: 8,
      username: 'coolorg@lambdaschool.local',
      address: null,
      phone: null,
      imageUrl: null,
      description: null,
      useremails: [],
      roles: [
        {
          role: {
            roleid: 2,
            name: 'USER',
          },
        },
      ],
    },
  },
  {
    appid: 10,
    name: 'Donna Noble',
    address: '124 rainbow lane',
    phone: '444-111-3333',
    reason: 'i have a great idea i need help with',
    status: 'not reviewed',
    organization: {
      orgid: 5,
      name: 'Organization 2',
      address: '4 takona lane, nashville, tn 12546',
      phone: '333-222-1111',
    },
    user: {
      userid: 8,
      username: 'coolorg@lambdaschool.local',
      address: null,
      phone: null,
      imageUrl: null,
      description: null,
      useremails: [],
      roles: [
        {
          role: {
            roleid: 2,
            name: 'USER',
          },
        },
      ],
    },
  },
  {
    appid: 12,
    name: 'Davros',
    address: '534 abbey road',
    phone: '000-345-9807',
    reason: 'i would love to be a part of this',
    status: 'rejected',
    organization: {
      orgid: 6,
      name: 'Organization 3',
      address: '678 snowyhille crossing, boulder, c0 80053',
      phone: '888-999-1111',
    },
    user: {
      userid: 11,
      username: 'evencoolerorg@lambdaschool.local',
      address: null,
      phone: null,
      imageUrl: null,
      description: null,
      useremails: [],
      roles: [
        {
          role: {
            roleid: 3,
            name: 'PARTNER',
          },
        },
      ],
    },
  },
  {
    appid: 13,
    name: 'Amy Pond',
    address: '123 somewhere drive',
    phone: '923-567-8965',
    reason: 'i want to help my community',
    status: 'accepted',
    organization: {
      orgid: 4,
      name: 'Organization 1',
      address: '456 greenville drive, longtucky, ark 80067',
      phone: '567-890-2234',
    },
    user: {
      userid: 8,
      username: 'coolorg@lambdaschool.local',
      address: null,
      phone: null,
      imageUrl: null,
      description: null,
      useremails: [],
      roles: [
        {
          role: {
            roleid: 2,
            name: 'USER',
          },
        },
      ],
    },
  },
  {
    appid: 14,
    name: 'Rose Tyler',
    address: '123 somewhere drive',
    phone: '923-567-8965',
    reason: 'i want to help my community',
    status: 'not reviewed',
    organization: {
      orgid: 4,
      name: 'Organization 1',
      address: '456 greenville drive, longtucky, ark 80067',
      phone: '567-890-2234',
    },
    user: {
      userid: 8,
      username: 'coolorg@lambdaschool.local',
      address: null,
      phone: null,
      imageUrl: null,
      description: null,
      useremails: [],
      roles: [
        {
          role: {
            roleid: 2,
            name: 'USER',
          },
        },
      ],
    },
  },
  {
    appid: 15,
    name: 'Jack Harkness',
    address: '123 somewhere drive',
    phone: '923-567-8965',
    reason: 'i want to help my community',
    status: 'rejected',
    organization: {
      orgid: 4,
      name: 'Organization 1',
      address: '456 greenville drive, longtucky, ark 80067',
      phone: '567-890-2234',
    },
    user: {
      userid: 8,
      username: 'coolorg@lambdaschool.local',
      address: null,
      phone: null,
      imageUrl: null,
      description: null,
      useremails: [],
      roles: [
        {
          role: {
            roleid: 2,
            name: 'USER',
          },
        },
      ],
    },
  },
  {
    appid: 16,
    name: 'Rory Williams',
    address: '123 somewhere drive',
    phone: '923-567-8965',
    reason: 'i want to help my community',
    status: 'accepted',
    organization: {
      orgid: 4,
      name: 'Organization 1',
      address: '456 greenville drive, longtucky, ark 80067',
      phone: '567-890-2234',
    },
    user: {
      userid: 8,
      username: 'coolorg@lambdaschool.local',
      address: null,
      phone: null,
      imageUrl: null,
      description: null,
      useremails: [],
      roles: [
        {
          role: {
            roleid: 2,
            name: 'USER',
          },
        },
      ],
    },
  },
  {
    appid: 17,
    name: 'Martha Jones',
    address: '123 somewhere drive',
    phone: '923-567-8965',
    reason: 'i want to help my community',
    status: 'not reviewed',
    organization: {
      orgid: 4,
      name: 'Organization 1',
      address: '456 greenville drive, longtucky, ark 80067',
      phone: '567-890-2234',
    },
    user: {
      userid: 8,
      username: 'coolorg@lambdaschool.local',
      address: null,
      phone: null,
      imageUrl: null,
      description: null,
      useremails: [],
      roles: [
        {
          role: {
            roleid: 2,
            name: 'USER',
          },
        },
      ],
    },
  },
  {
    appid: 18,
    name: 'Sarah Janes Smith',
    address: '123 somewhere drive',
    phone: '923-567-8965',
    reason: 'i want to help my community',
    status: 'accepted',
    organization: {
      orgid: 4,
      name: 'Organization 1',
      address: '456 greenville drive, longtucky, ark 80067',
      phone: '567-890-2234',
    },
    user: {
      userid: 8,
      username: 'coolorg@lambdaschool.local',
      address: null,
      phone: null,
      imageUrl: null,
      description: null,
      useremails: [],
      roles: [
        {
          role: {
            roleid: 2,
            name: 'USER',
          },
        },
      ],
    },
  },
  {
    appid: 19,
    name: 'Harriet Jones',
    address: '123 somewhere drive',
    phone: '923-567-8965',
    reason: 'i want to help my community',
    status: 'rejected',
    organization: {
      orgid: 4,
      name: 'Organization 1',
      address: '456 greenville drive, longtucky, ark 80067',
      phone: '567-890-2234',
    },
    user: {
      userid: 8,
      username: 'coolorg@lambdaschool.local',
      address: null,
      phone: null,
      imageUrl: null,
      description: null,
      useremails: [],
      roles: [
        {
          role: {
            roleid: 2,
            name: 'USER',
          },
        },
      ],
    },
  },
];

function SearchPage() {
  const { authState } = useOktaAuth();

  console.log(getProfileData(authState));

  const [apps, setAppsState] = useState([]);
  const [filterValues, setFilter] = useState({ name: '', status: '' });

  //https://micro-fund-be-b.herokuapp.com/orgs/org/6/apps

  useEffect(() => {
    console.log('search page use effect:', filterValues);

    axios
      .get('https://micro-fund-be-b.herokuapp.com/apps/all')
      .then(res => {
        console.log('Retrieved data from api');
        setAppsState(res.data);
      })
      .catch(err => {
        console.log('Error: ', err);
      });
  }, [filterValues]);

  return (
    <div className="search-page">
      <SearchInput setFilter={setFilter} />
      <div className="all-short-apps">
        <div className="short-apps-header">
          <p>Name</p>
          <p>Organization Name</p>
          <p>Status</p>
        </div>
        {apps.map(application => (
          <CompactApp
            key={application.appid}
            app={application}
            filterValues={filterValues}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
