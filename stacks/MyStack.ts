import {
  Api,
  ViteStaticSite,
  StackContext,
  Table,
} from '@serverless-stack/resources';

export function MyStack({ stack }: StackContext) {
  // Create the table
  const table = new Table(stack, 'Counter', {
    fields: {
      counter: 'string',
    },
    primaryIndex: { partitionKey: 'counter' },
  });
  
  // Create the HTTP API
  const api = new Api(stack, 'Api', {
    defaults: {
      function: {
        // Allow the API to access the table
        permissions: [table],
        // Pass in the table name to our API
        environment: {
          tableName: table.tableName,
        },
      },
    },
    routes: {
      'GET /': 'functions/get-clicks.handler',
      'POST /': 'functions/register-click.handler',
    },
  });

  const site = new ViteStaticSite(stack, 'SvelteJSSite', {
    path: 'frontend',
    buildOutput: 'build',
    environment: {
      // Pass in the API endpoint to our app
      VITE_APP_API_URL: api.url,
    },
  });

  // Show the URLs in the output
  stack.addOutputs({
    SiteUrl: site.url,
    ApiEndpoint: api.url,
  });
}

