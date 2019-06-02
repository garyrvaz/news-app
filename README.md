# Example News app with Next.js, next-offline(PWA), Material-UI v4, Axios, React Testing Library and Jest

## Prerequisites

### Node Modules
Node version should be node >= 8. If you've confirmed your node version to be compatible, go ahead and install the dependencies
```bash
npm i
```

### ENV

We have to first set `NEWS_API_KEY` variable in the `.env` file, otherwise our API calls will fail. Sign up on https://newsapi.org and set your token in the file
```bash

cp .env.sample .env
```

## Running code and tests
React testing library comes really handy while you're testing functional React components with hooks. Before you start, I would suggest to run the test once.

```bash
npm run test

// If all tests pass you can run the code in dev mode by running...
npm run dev
```

This runs the dev server on port 4000

## Running PWA
To run the PWA you will have to build and do a static export of the project, which will generate files in the `out` directory at root and run it on a local server. I personally used `python3` to do so

```bash
npm run build && npm run export
cd out
python3 -m http.server
```
This will create a server on port 8000. Leave it running

PWA requires `https`, for this I used ngrok


```bash
npm i -g ngrok

ngrok http 8000
```
You will see a `http` and a `https` link in the terminal after running the above, open the `https` link and you have a PWA running. Browse about the app, let the service worker cache as many recent pages and go offline from the network console, navigate backwards and see the magic happen :)
