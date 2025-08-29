import 'dotenv/config';

export const configs = {
  server: {
    port: parseInt(process.env.SERVER_PORT as string, 10) || 3000,
  },
};

export default configs;
