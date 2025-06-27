# Three.js Project

This project is a basic setup for a Three.js application. It includes a main scene with lights and objects, and encapsulates the rendering logic in a dedicated component.

## Project Structure

```
threejs-project
├── src
│   ├── index.js          # Entry point of the application
│   ├── scenes
│   │   └── mainScene.js  # Main scene setup
│   ├── components
│   │   └── renderer.js    # Renderer component
│   └── utils
│       └── helpers.js     # Utility functions
├── package.json           # npm configuration
└── README.md              # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd threejs-project
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Run the application:
   ```
   npm start
   ```

## Usage Examples

- The `index.js` file initializes the Three.js scene, camera, and renderer.
- The `mainScene.js` file sets up the main scene with lights and objects.
- The `renderer.js` file handles the rendering of the scene.
- Utility functions in `helpers.js` can be used to create common Three.js objects like cubes and lights.

## Contributing

Feel free to submit issues or pull requests for improvements and features.