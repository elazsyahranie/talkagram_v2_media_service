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
