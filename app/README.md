# XR-DVBI WebXR App

This is the XR-DVBI WebXR app that utilizes the library to enable a virtual TV watching experience in WebXR. The app allows users to browse a DVB-I service list and watch live TV channels in a WebXR environment.

## Table of Contents
- [XR-DVBI WebXR App](#xr-dvbi-webxr-app)
  - [Table of Contents](#table-of-contents)
  - [Running the app](#running-the-app)
    - [Running the app locally](#running-the-app-locally)
      - [Prerequisites](#prerequisites)
      - [Installation and Running Locally](#installation-and-running-locally)
    - [Deploying the app](#deploying-the-app)
      - [Prerequisites](#prerequisites-1)
      - [Building the app](#building-the-app)
  - [Notes about features](#notes-about-features)

## Running the app
These instructions include both running the app locally and deploying it to a server.

### Running the app locally
Running the app locally is useful for development and testing purposes. It allows you to test changes and see them immediately by utilizing hot reloads.
#### Prerequisites
- Node.js
- npm
- A modern web browser that supports WebXR
- A DVB-I service list that is hosted on a URL that is reachable for you. Currently no public service list is provided and local files are not supported.

#### Installation and Running Locally
1. Clone the repository
2. Navigate to the `app/` directory
3. Create a `.env` file in the `app/` directory and add the following line:
```
API_URL=<URL to the DVB-I service list>
```
4. Run `npm i` to install the necessary dependencies
5. Run `npm run dev` to start the development server
6. Open your browser and navigate to `https://localhost:3000` and accept the self-signed certificate
7. You should now see the app running locally. If you don't see anything, check the console for errors.
8. You can test the app just using the mouse without entering a virtual environment but also in VR/AR using either a compatible headset or an emulator.
9. **Important:** The default *[Immersive Web Emulator](https://github.com/meta-quest/immersive-web-emulator/)* **isn't supported**! However, a default emulator is provided. Click on the "Enter VR" or "Enter AR" button to enter the respective mode. If this isn't working, try to activate the emulator manually using `Cmd/Ctrl + Option/Alt + E` and then enter the VR/AR mode again. While this should work also on non-localhost deployments, from our testing it seems that the emulator is not always working as expected. On `localhost` it should work fine.
The emulator contains many features and is subject to change, so we will not give details for its usage here. Features supported include pressing buttons (and holding them at certain points), using the thumbsticks, using the mouse to control the controllers including the camera and moving around the scene, and more. See the relevant [GitHub Issue](https://github.com/pmndrs/xr/issues/319).

### Deploying the app
Deploying the app to a server can be done easily and works similar to the local development server. The app doesn't require a backend other than a simple web server that can serve the *HTML* and *JS* files.

#### Prerequisites
- A server that can host static files
- A DVB-I service list that is hosted on a URL that is reachable for every user of the app. Currently no public service list is provided and local files are not supported.
- A domain that supports HTTPS (required for WebXR)

Additionally, as no built files are included at the moment, you need to build the app before deploying it. The following requirements are necessary for building the app:
- Node.js
- npm

#### Building the app
1. Clone the repository
2. Navigate to the `app/` directory
3. Create a `.env` file in the `app/` directory and add the following line:
```
API_URL=<URL to the DVB-I service list>
```
4. Run `npm i` to install the necessary dependencies
5. Run `npm run build` to build the app
6. The built files are now located in the `app/dist/` directory
7. Copy the contents of the `app/dist/` directory to your server and host them using a web server. Make sure to configure the server to serve the `index.html` file as the entry point.
8. Make sure that this app is hosted on a HTTPS enabled endpoint, this is required for WebXR to work and can e.g. be achieved by using a reverse proxy.

## Notes about features
For a list of features and screenshots refer to the *Functionality and Features* section in the main README contained in the root of the repository.

Here are some additional notes about certain features that might need further explanation:
- The app supports a virtual keyboard for searching channels. This keyboard can be controlled using the VR controller. Even when using a mouse in the non-immersive (so non-VR/AR) mode, the keyboard can only be controlled using the mouse cursor. No keyboard input is supported.
- The windows can be moved using the bottom bar. This is done by grabbing the bottom bar with the controller and moving it around. The window will follow the controller until it is released. Mouse input is not supported for this feature. There are two modes that can be toggled in the settings: *cursor-based* and *controller-based*:
  - *cursor-based*: The window will be moved by using the cursor clicking event. This has some limitations, due to technical challenges the window can only be moved ~45° in each direction and it can only be moved back and forth by actually moving the controller. However, this mode is more stable and works better in most cases.
  - *controller-based*: The window will be moved by grabbing the bottom bar with the controller which triggers a click event. Until the trigger is let go, the window will follow the controller. Unfortunately, the window center snaps to the cursor which makes it look weird. But this enables 360° movement of the window, direct control over the rotation and moving it back and forth using the y-axis of the right thumbstick. This mode is more immersive but can be unstable. Especially moving the window back and forth can be using a wrong axis/vector which makes it unintuitive to control sometimes.