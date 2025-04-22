const config = {
  // host: "https://munaykiv3.vercel.app",
  // host: "http://192.168.137.176:3000",
  host: "https://munaykiapi.cochabamba.bo",
  // host: "http://192.168.137.102:3000",
  api: {
    auth: "/auth",
    users: "/users",
  } as const,
};

export default config;
