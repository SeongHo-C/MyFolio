import { createContext, useContext, useEffect, useState } from 'react';
import { GetProjects } from '../service/get_projects';
import { setAuthorizationToken } from '../service/setAuthorizationToken';
import { TokenCheck } from '../service/token_check';
import { OauthContext } from './oauthContext';

export const projectsContext = createContext();

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState();
  const { onRefresh } = useContext(OauthContext);

  const getProjects = async (keyword, type) => {
    if (TokenCheck()) onRefresh();

    const response = await GetProjects(keyword, type);
    setProjects(response.data);
  };

  useEffect(() => {
    getProjects('', '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <projectsContext.Provider value={{ projects, getProjects }}>
      {children}
    </projectsContext.Provider>
  );
}
