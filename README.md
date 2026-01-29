# Stratus

An electron application that can generate VXML grammar and menu templates.

The frontend of Stratus is created using **React** and the **Material-UI** libraries.

The backend of Stratus is created in **Golang**

#### Docker Setup

**⚠️ IMPORTANT**: Before starting the Docker containers, you must complete these prerequisites:

**Create projects directory structure**: The application requires at least one project folder to function properly:

```shell script
# Create the required directory structure
mkdir -p docker/projects/example
```

You can start Stratus using Docker in two ways:

**Option 1: With [mise](https://mise.jdx.dev/) installed**

```shell script
mise run up
```

**Option 2: Manually**

```shell script
docker-compose up -d --build
```

This will start the **server** on _localhost:8080_ and the **client** on _localhost:3000_

#### Install dependencies

```shell script
yarn install
```

#### Running locally

```shell script
yarn dev
```

This command will start the **server** on _localhost:8080_ and the **client** on _localhost:3000_

#### Building the Windows executable for production install

```shell script
yarn package
```

This command will package the project and dump the installer exe in
`Stratus/client/dist`
