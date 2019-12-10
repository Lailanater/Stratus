# Stratus

An electron application that can generate VXML grammar and menu templates.

The frontend of Stratus is created using **React** and the **Material-UI** libraries.

The backend of Stratus is created in **Golang** 

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