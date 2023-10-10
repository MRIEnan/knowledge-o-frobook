const envConfig = () => {
  return {
    server_initial: import.meta.env.VITE_SERVER_INITIAL,
    authorization_temp: import.meta.env.VITE_AUTHORIZATION_TEMP,
  };
};

export default envConfig;
