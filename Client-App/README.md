# Login Example app with Angular 5 + Spring(Jwt) + Angular CLI + Angular Material + Docker Angular Example Library


`npm i` - Installs everything needed

`npm start` - Starts the app. Then, go to `localhost:4200`

`npm run test` - Runs unit tests with karma and jasmine

`npm run e2e` - Runs end to end tests

`npm run e2e:home` - Runs end to end tests only for the home directory. There are more commands like this one, for development purposes

`npm run build` - Builds the app for production

`npm run lint` - Runs the linter (tslint)

`npm run ci` - Executes linter and tests

`npm run deploy` - Builds the app and deploy it 

`npm run sme` - Builds and runs source map explorer

`npm run release` - Creates a new release using standard-version

`npm run docker` - Builds the docker image and run the container

**Windows: use precompilation to speed up**

`tsc --project tsconfig.json`
`npm start`

## Docker

You can build the image and run the container with Docker. The configuration is in the nginx folder if you want to change it.

`docker build -t angularexampleapp .`

`docker run -d -p 4200:80 angularexampleapp`
