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
    }
  }
};
