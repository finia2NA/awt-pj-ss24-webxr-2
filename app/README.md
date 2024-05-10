# XR-DVBI
*An XR Live TV Experience*

## Getting Started
You need to install the dependencies first. Use `npm i --dev` to install the dependencies.

From here, you can run the following commands:

- `npm run dev` - Start the development server.
- `npm run build` - Build the project
- `npm run lint` - Lint the project
- `npm run preview` - Preview the project (like dev, but with a production build and no hot reload)
- `npm run storybook` - Start the storybook server
- `npm run build-storybook` - Build the storybook project


Technically, the app is served on `https://localhost:3000`. However, the XR simulator will say "VR unsupported" if you try to access using localhost. Instead, you need to find out your local IP (eg 192.168.0.42). You can do this using `ifconfig | grep 192` on MacOS/Linux.

The app is served using a self-signed certificate. You might see a warning in the browser. This is normal. The reason for this is that the XR API requires HTTPS.