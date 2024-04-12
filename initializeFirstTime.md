# TypeScript Backend Project with Node.js and Express

This project is a simple backend server built with Node.js, Express, and TypeScript.

## Prerequisites

- Node.js (v12 or later)
- Yarn package manager

## Getting Started

### Step 1: Initialize a New Node.js Project

Open your terminal and navigate to the directory where you want to create your project. Run the following command to initialize a new Node.js project:

`yarn init -y`

### Step 2: Install Required Dependencies

In the same directory, run the following command to install the necessary dependencies:

```
yarn add express typescript
yarn add --dev @types/node @types/express ts-node-dev
```

### Step 3: Configure TypeScript

Create a tsconfig.json file in the root of your project with the following content:

```
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src/**/*"]
}
```

### Step 4: Set Up the Project Structure

Create a src directory in the root of your project. Inside the src directory, create an app.ts file. This will be the entry point of your Express application.

### Step 5: Write Your Express Application

In the src/app.ts file, add the following code to create a basic Express server:

### Step 6: Add Scripts to package.json

Open package.json and add the following scripts:

```
"scripts": {
  "start": "node dist/app.js",
  "dev": "ts-node-dev --respawn --pretty src/app.ts",
  "build": "tsc -p ."
}
```

### Step 7: Start the Development Server

Run the following command to start the development server:

`yarn dev`

### Step 8: Your Express application should now be running at

`http://localhost:3000`
