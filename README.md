## Development
  Setup environment variables.
  ```sh
  export JWT_SECRET=secret
  export MONGO_STRING=mongodb://127.0.0.1:27017/todo
  export SERVICES=ALL
  ```
  Update `docker-compose.env` file.
  ```sh
  docker-compose up -d mongodb
  ```
  ```sh
  npm install
  ```
  ```sh
  npm run start
  ```

## Prod
  Update `docker-compose.env` file.
  ```sh
  docker-compose up -d
  ```