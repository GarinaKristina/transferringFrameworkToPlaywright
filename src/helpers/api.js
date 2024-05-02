// import axios from "axios";
// import dotenv from "dotenv";

// import seedDatabase from "../data/database-seed.json";

// dotenv.config({ path: ".env.local" });
// dotenv.config();

// export async function setSeedDatabase() {
//   const testDataApiEndpoint = `http://localhost:3000/testData`;
//   try {
//     const { data } = await axios.post(`${testDataApiEndpoint}/seed`);
//     console.log("------data----:", data);
//     return data;
//   } catch (error) {
//     console.error("Error seeding database:", error);
//     throw error;
//   }
// }

// export async function filterDatabase(queryPayload) {
//   const { table, attrs } = queryPayload;
//   return seedDatabase(table).where(attrs);
// }

// export async function findDatabase(queryPayload) {
//   const { table, attrs } = queryPayload;
//   return seedDatabase(table).where(attrs).first();
// }

// export async function loginByApi(username, password) {
//   const response = await axios.post(`http://localhost:3000/login`, {
//     username,
//     password,
//   });

//   return response;
// }

// export async function database(operation, entity, query, logTask = false) {
//   const params = {
//     entity,
//     query,
//   };

//   console.log(`🔎 ${operation}ing within ${entity} data`);

//   try {
//     const response = await axios.post(`http://localhost:3000/${operation}/database`, params);

//     console.log(response.data);

//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

// export async function loginByGoogleApi() {
//   console.log("Logging in to Google");

//   try {
//     const refreshTokenResponse = await axios.post("https://www.googleapis.com/oauth2/v4/token", {
//       grant_type: "refresh_token",
//       client_id: process.env.GOOGLE_CLIENT_ID,
//       client_secret: process.env.GOOGLE_CLIENT_SECRET,
//       refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
//     });

//     const { access_token, id_token } = refreshTokenResponse.data;

//     const userInfoResponse = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
//       headers: { Authorization: `Bearer ${access_token}` },
//     });

//     console.log(userInfoResponse.data);

//     const { sub, email, given_name, family_name, picture } = userInfoResponse.data;

//     const userItem = {
//       token: id_token,
//       user: {
//         googleId: sub,
//         email,
//         givenName: given_name,
//         familyName: family_name,
//         imageUrl: picture,
//       },
//     };

//     const userData = JSON.stringify(userItem);
//     process.env.GOOGLE_CYPRESS = userData;

//     await page.goto("/");

//     return userData;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

// let awsConfig = {
//   default: undefined,
// };

// try {
//   awsConfig = require(path.join(__dirname, "./aws-exports-es5.js"));
// } catch (e) {}

// module.exports = defineConfig({
//   projectId: "7s5okt",
//   retries: {
//     runMode: 2,
//   },
//   env: {
//     apiUrl: "http://localhost:3001",
//     mobileViewportWidthBreakpoint: 414,
//     coverage: false,
//     codeCoverage: {
//       url: "http://localhost:3001/__coverage__",
//       exclude: "cypress/**/*.*",
//     },
//     defaultPassword: process.env.SEED_DEFAULT_USER_PASSWORD,
//     paginationPageSize: process.env.PAGINATION_PAGE_SIZE,

//     // Auth0
//     auth0_username: process.env.AUTH0_USERNAME,
//     auth0_password: process.env.AUTH0_PASSWORD,
//     auth0_domain: process.env.VITE_AUTH0_DOMAIN,

//     // Okta
//     okta_username: process.env.OKTA_USERNAME,
//     okta_password: process.env.OKTA_PASSWORD,
//     okta_domain: process.env.VITE_OKTA_DOMAIN,
//     okta_client_id: process.env.VITE_OKTA_CLIENTID,
//     okta_programmatic_login: process.env.OKTA_PROGRAMMATIC_LOGIN || false,

//     // Amazon Cognito
//     cognito_username: process.env.AWS_COGNITO_USERNAME,
//     cognito_password: process.env.AWS_COGNITO_PASSWORD,
//     cognito_domain: process.env.AWS_COGNITO_DOMAIN,
//     cognito_programmatic_login: false,
//     awsConfig: awsConfig.default,

//     // Google
//     googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
//     googleClientId: process.env.VITE_GOOGLE_CLIENTID,
//     googleClientSecret: process.env.VITE_GOOGLE_CLIENT_SECRET,
//   },
//   component: {
//     devServer(devServerConfig) {
//       const viteConfig = require("./vite.config.ts");
//       const conf = {
//         define: {
//           "process.env": loadEnv("development", process.cwd(), "VITE"),
//         },
//         server: {
//           /**
//            * start the CT dev server on a different port than the full RWA
//            * so users can switch between CT and E2E testing without having to
//            * stop/start the RWA dev server.
//            */
//           port: 3002,
//         },
//       };

//       const resolvedViteConfig = mergeConfig(viteConfig, conf);
//       return devServer({
//         ...devServerConfig,
//         framework: "react",
//         viteConfig: resolvedViteConfig,
//       });
//     },
//     specPattern: "src/**/*.cy.{js,jsx,ts,tsx}",
//     supportFile: "cypress/support/component.ts",
//     setupNodeEvents(on, config) {
//       codeCoverageTask(on, config);
//       return config;
//     },
//   },
//   e2e: {
//     baseUrl: "http://localhost:3000",
//     specPattern: "cypress/tests/**/*.spec.{js,jsx,ts,tsx}",
//     supportFile: "cypress/support/e2e.ts",
//     viewportHeight: 1000,
//     viewportWidth: 1280,
//     experimentalRunAllSpecs: true,
//     setupNodeEvents(on, config) {
//       const testDataApiEndpoint = `${config.env.apiUrl}/testData`;

//       const queryDatabase = ({ entity, query }, callback) => {
//         const fetchData = async (attrs) => {
//           const { data } = await axios.get(`${testDataApiEndpoint}/${entity}`);
//           return callback(data, attrs);
//         };

//         return Array.isArray(query) ? Promise.map(query, fetchData) : fetchData(query);
//       };

//       on("task", {
//         async "db:seed"() {
//           // seed database with test data
//           const { data } = await axios.post(`${testDataApiEndpoint}/seed`);
//           return data;
//         },

//         // fetch test data from a database (MySQL, PostgreSQL, etc...)
//         "filter:database"(queryPayload) {
//           return queryDatabase(queryPayload, (data, attrs) => _.filter(data.results, attrs));
//         },
//         "find:database"(queryPayload) {
//           return queryDatabase(queryPayload, (data, attrs) => _.find(data.results, attrs));
//         },
//       });

//       codeCoverageTask(on, config);
//       return config;
//     },
//   },
// });
