const config = {
  host: "https://munaykiv3.vercel.app",
  // host: "http://192.168.0.5:3000",
  api: {
    auth: "/auth",
    users: "/users",
  } as const,
};

export default config;
