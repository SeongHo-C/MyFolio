import { createContext, useEffect, useState } from 'react';
import { GetProjects } from '../service/get_projects';

export const projectsContext = createContext();

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState();

  const getProjects = async (keyword, type) => {
    const response = await GetProjects(keyword, type);

    setProjects(response.data);
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
