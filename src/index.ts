/*
 * Copyright (c) 2020 genshin.dev
 * Licensed under the Open Software License version 3.0
 */
import Koa from 'koa';
import koaBody from 'koa-body';
import helmet from 'koa-helmet';
import cors from '@koa/cors';
import * as Sentry from '@sentry/node';

import router from './routes';

const sentryDsn = process.env.SENTRY_DSN;

// Check if Sentry
if (sentryDsn && sentryDsn.length > 0) {
  Sentry.init({
    dsn: sentryDsn,
    tracesSampleRate: 0.5,
  });
}

(async () => {
  const app = new Koa();
  const port = process.env.PORT || 5000;

  app.use(koaBody());
  app.use(helmet());
  app.use(cors());

  app.use(router.routes());

  app.listen(port, () => {
    console.log(`API running on 0.0.0.0:${port}`);
  });
})();
