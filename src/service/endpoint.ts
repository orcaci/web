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
    suite: {
      list: (appId: string) => `/api/v1/app/${appId}/suite/`,
      create: (appId: string) => `/api/v1/app/${appId}/suite/`,
      update: (appId: string, suiteId: string) =>
        `/api/v1/app/${appId}/suite/${suiteId}/`,
      delete: (appId: string, suiteId: string) =>
        `/api/v1/app/${appId}/suite/${suiteId}/`,
      itemList: (appId: string, suiteId: string) =>
      `/api/v1/app/${appId}/suite/${suiteId}/item/`,
      itemCreate: (appId: string, suiteId: string) =>
      `/api/v1/app/${appId}/suite/${suiteId}/item/`,
    },
    case: {
      list: (appId: string) => `/api/v1/app/${appId}/case/`,
      create: (appId: string) => `/api/v1/app/${appId}/case/`,
      update: (appId: string, caseId: string) =>
        `/api/v1/app/${appId}/case/${caseId}/`,
      delete: (appId: string, caseId: string) =>
        `/api/v1/app/${appId}/case/${caseId}/`,
      itemList: (appId: string, caseId: string) =>
      `/api/v1/app/${appId}/case/${caseId}/item/`,
      itemCreate: (appId: string, caseId: string) =>
      `/api/v1/app/${appId}/case/${caseId}/item/`,
    },
    group: {
      getList: (appId: string) => `/api/v1/app/${appId}/group/`,
      create: (appId: string) => `/api/v1/app/${appId}/group/`,
      update: (appId: string, groupId: string) =>
        `/api/v1/app/${appId}/group/${groupId}/`,
      delete: (appId: string, groupId: string) =>
        `/api/v1/app/${appId}/group/${groupId}/`
    },
    action: {
      batch: (appId: string, groupId: string) =>
        `/api/v1/app/${appId}/group/${groupId}/action/batch/`,
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
