import { useKeycloak } from '@react-keycloak/web';

export const useRolesKeycloak = (allowedRoles) => {
  const { keycloak } = useKeycloak();
  const roles = keycloak?.resourceAccess['hcis-user-app-client']?.roles;

  return !!roles?.includes(allowedRoles);
};
