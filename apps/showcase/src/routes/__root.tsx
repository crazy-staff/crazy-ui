import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router';
import * as React from 'react';
import appCss from '@/styles/app.css?url';
import { RootProvider } from 'fumadocs-ui/provider/tanstack';
import SearchDialog from '@/components/search';
import { registerSquircles } from '@crazy-staff/ui';

/** Squircle corners in Firefox/Safari; `?fallback` forces the polyfill in Chromium. */
function Squircles() {
  React.useEffect(() => {
    registerSquircles({ force: new URLSearchParams(location.search).has('fallback') });
  }, []);
  return null;
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'crazy-ui',
      },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <html suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="flex flex-col min-h-screen">
        <RootProvider search={{ SearchDialog }} theme={{ defaultTheme: 'dark' }}>
          <Squircles />
          <Outlet />
        </RootProvider>
        <Scripts />
      </body>
    </html>
  );
}
