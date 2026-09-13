# Media Service 
🚧 ***This service and its documentation are currently under development***. Its architecture, APIs, features, and implementation details may change as development progresses.

The Media Service is responsible for managing file-related functionality within the application. It handles file uploads, storage, retrieval, and other file-related operations used by the application. The API Gateway communicates with the service over HTTP for file uploads and retrieval.

## Responsibilities
The Media Service is responsible for managing media-related data and operations, including:

- Uploading files
- Fetching files individually or in groups
- Deleting files

## HTTP & Message Patterns
The Media Service communicates with the API Gateway through both HTTP and TCP. HTTP is used for operations that require `multipart/form-data`, such as file uploads, while TCP is used for other internal service-to-service operations.

The following is the list of HTTP endpoints and message patterns that can be requested by other services.

### HTTP Endpoints
- **POST** `/user-images/:id`</br>
  Upload an image for a user.
- **PATCH** `/user-images/:id`</br>
  Update an image for a user.

### TCP Message Patterns
- `userImagesGetByIds`</br>
  Fetch multiple user images by their IDs.
- `userImageDelete`</br>
  Delete user images by their IDs.

## Environmental Variables
Each service contains its environment variables in a `.env` file. The `.env` file should be included in `.gitignore`, especially when the repository is public, to prevent sensitive information or credentials from being exposed.

The Media Service `.env` file contains the following variables:
```
PORT=
GATEWAY=
USERS_SERVICE_HOST=
USERS_SERVICE_PORT=
MEDIA_SERVICE_HOST=
MEDIA_SERVICE_PORT=
MEDIA_SERVICE_HTTP_PORT=

PROJECT_URL=

ENVIRONMENT=

REDIS_HOST=
REDIS_PORT=

# This was inserted by `prisma init`:
# Environment variables declared in this file are NOT automatically loaded by Prisma.
# Please add `import "dotenv/config";` to your `prisma.config.ts` file, or use the Prisma CLI with Bun
# to load environment variables from .env files: https://pris.ly/prisma-config-env-vars.

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

# The following `prisma+postgres` URL is similar to the URL produced by running a local Prisma Postgres 
# server with the `prisma dev` CLI command, when not choosing any non-default ports or settings. The API key, unlike the 
# one found in a remote Prisma Postgres URL, does not contain any sensitive information.

# DATABASE_URL=
DATABASE_URL=
```

## Installation
This project uses `npm` as its package manager.

Install the project dependencies using:

```bash
npm install
```

or:

```bash
npm i
```

### Start the App
* `npm run start` — Start the app.
* `npm run start:dev` — Start the app in development mode.
* `npm run start:debug` — Start the app in debug mode with file watching.
* `npm run start:prod` — Start the app in production mode.

### Test the App
* `npm run test` — Run unit tests.
* `npm run test:watch` — Run tests in watch mode.
* `npm run test:e2e` — Run end-to-end tests.

## Typical Module Structure
Modules generally follow this structure:

- `controller` — Handles HTTP requests and exposes the module's API endpoints.
- `service` — Contains the business logic for the module.
- `module` — Defines the module and its dependencies.

## Error Handling 
The application uses centralized error handling for consistent error responses across services. The custom `RpcException` implementation is located at `src/common/grpc-exceptions.filter.ts`

Common errors include:
- `RpcException` — Handles errors in inter-service communication using gRPC status codes.
- `PrismaClientValidationError` — Handles validation errors raised by Prisma.
- `ZodError` — Handles schema validation errors.
- `InternalServerError` — Handles unexpected internal server errors.

#### gRPC Status Code Mapping
| gRPC Code | Status | HTTP Status |
|---:|---|---:|
| `3` | `INVALID_ARGUMENT` | `400 Bad Request` |
| `5` | `NOT_FOUND` | `404 Not Found` |
| `10` | `ABORTED` | `401 Unauthorized` |
| `16` | `UNAUTHENTICATED` | `401 Unauthorized` |

For TCP communication, errors should be transformed into appropriate NestJS RPC exceptions where necessary.

Example:
```
throw new RpcException({
  statusCode: 404,
  message: 'Chat not found',
});
```

The API Gateway can then translate the error into an appropriate HTTP response for the client.

