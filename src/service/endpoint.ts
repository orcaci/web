export const Endpoint = {
  v1: {
    auth: {
      login: "/api/v1/auth/signin"
    },
    admin: {
      getUsers: "/api/v1/admin/user/",
      createUser: "/api/v1/admin/user/",
      getUser: (userId: string) => `/api/v1/admin/user/${userId}`,
      updateUser: (userId: string) => `/api/v1/admin/user/${userId}`,
      deleteUser: (userId: string) => `/api/v1/admin/user/${userId}`,
      getRoles: "/api/v1/admin/role/",
      createRole: "/api/v1/admin/role/"
    },
    application: {
      getApplications: "/api/v1/app/",
      createApplication: "/api/v1/app/"
    },
    group: {
      getList: (appId: string) => `/api/v1/app/${appId}/group/`,
      create: (appId: string) => `/api/v1/app/${appId}/group/`,
      update: (appId: string, groupId: string) =>
        `/api/v1/app/${appId}/group/${groupId}`,
      delete: (appId: string, groupId: string) =>
        `/api/v1/app/${appId}/group/${groupId}`
    },
    action: {
      list: (appId: string, groupId: string) =>
        `/api/v1/app/${appId}/group/${groupId}/action/`,
      create: (appId: string, groupId: string) =>
        `/api/v1/app/${appId}/group/${groupId}/action/`,
      update: (appId: string, groupId: string, actionId: string) =>
        `/api/v1/app/${appId}/group/${groupId}/action/${actionId}/`,
      delete: (appId: string, groupId: string, actionId: string) =>
        `/api/v1/app/${appId}/group/${groupId}/action/${actionId}/`
    }
  }
};
