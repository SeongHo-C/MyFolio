import { createContext, useContext, useEffect, useState } from 'react';
import instance from '../service/interceptor';
import { setAuthorizationToken } from '../service/setAuthorizationToken';
import { TokenCheck } from '../service/token_check';
import { OauthContext } from './oauthContext';

export const projectsContext = createContext();

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState();
  const { onRefresh } = useContext(OauthContext);

  const getProjects = async (keyword, type) => {
    if (TokenCheck()) onRefresh();

    const response = await instance.get('/project', {
      params: {
        keyword,
        type,
        page: 1,
        size: 15,
      },
    });

    setProjects(response.data.data);
  };

  useEffect(() => {
    getProjects('', '');
  }, []);

  return (
    <projectsContext.Provider value={{ projects, getProjects }}>
      {children}
    </projectsContext.Provider>
  );
}
