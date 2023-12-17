# FinBuddy

1. shadcn-ui components installation

   If a component has been installed, we can use the CLI command to install. If I'd like to install [the Accordion component](https://ui.shadcn.com/docs/components/accordion), select the `CLI` tab and run the command.

   ```bash
   $ cd frontend
   $ npx shadcn-ui@latest add accordion
   ```

   And the Accordion components will be installed in the `components/ui` directory.

   The installation will look up the config file `components.json` to decide where the output component file should be placed.

2. `apollo/client` with Next.js RSC

   There are two ways to fetch data: one in client component (SSR), the other is in server component (RSC). According to the [apollographql/apollo-client-nextjs](https://github.com/apollographql/apollo-client-nextjs), we use the hooks (e.g.`useSuspenseQuery`) in the client component, and use the `getClient` function in RSC.

## Running Vitest

```bash
$ pnpm test
```

## Resources

1. [Next.js with-docker-compose example](https://github.com/vercel/next.js/tree/canary/examples/with-docker-compose)
