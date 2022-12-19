import styles from './App.module.css';
import React, { useContext } from 'react';
import Main from './screens/main/main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { OauthContext } from './context/oauthContext';
import Oauth from './screens/oauth/oauth';
import Header from './components/header/header';
import ProjectCreate from './screens/project_create/project_create';
import ProjectDetail from './screens/project_detail/project_detail';
import ProjectEdit from './screens/project_edit/project_edit';

export default function App() {
  const { userInfo } = useContext(OauthContext);

  return (
    <div className={styles.app}>
      <BrowserRouter>
        {userInfo && <Header />}
        <Routes>
          <Route path='/' exact element={<Main />} />
          <Route path='/oauth/saving' element={<Oauth />} />
          <Route path='/project/create' element={<ProjectCreate />} />
          <Route path='/project/:id' element={<ProjectDetail />} />
          <Route path='/project/edit/:id' element={<ProjectEdit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
