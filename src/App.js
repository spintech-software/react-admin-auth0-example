import * as React from 'react';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import {Admin, Resource, ListGuesser} from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

import {PostList, PostEdit, PostCreate, PostShow} from './pages/posts';
import {UserList} from './pages/users';
import loginPage from "./pages/login";

import Dashboard from './components/Dashboard';
import authProvider from './authProvider';

// import { createBrowserHistory as createHistory } from 'history';
// const history = createHistory();

const App = () => (
    <Admin
        dataProvider={jsonServerProvider(
            'https://jsonplaceholder.typicode.com'
        )}
        authProvider={authProvider}
        dashboard={Dashboard}
        loginPage={loginPage}
    >
        <Resource
            name="posts"
            icon={PostIcon}
            list={PostList}
            edit={PostEdit}
            create={PostCreate}
            show={PostShow}
        />
        <Resource name="users" icon={UserIcon} list={UserList}/>
        <Resource name="comments" list={ListGuesser}/>
    </Admin>
);
export default App;
