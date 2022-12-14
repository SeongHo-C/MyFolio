import { createContext, useContext, useEffect, useState } from 'react';
import instance from '../service/interceptor';
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

    sessionStorage.setItem('keyword', keyword);
    sessionStorage.setItem('type', type);

    setProjects(response.data.data);
  };

  useEffect(() => {
    const keyword = sessionStorage.getItem('keyword');
    const type = sessionStorage.getItem('type');

    if (keyword) getProjects(keyword, type);
    else getProjects('', '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <projectsContext.Provider value={{ projects, getProjects }}>
      {children}
    </projectsContext.Provider>
  );
}
