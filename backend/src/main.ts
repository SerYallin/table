import app from './app';
import conf from './configs';

const bootstrap = async () => {
  app.listen(conf.server.port);
};

bootstrap();
