/**
 * @fileoverview The main application class for the project.
 * @author your instructors
 * @lastUpdated 2025-02-10
 */

import { Engine } from '@babylonjs/core';
import { App } from './app';

// get the canvas element and create the BabylonJS engine
const canvas = <HTMLCanvasElement>document.getElementById('renderCanvas');
const engine = new Engine(canvas, true);

// expose the engine instance to the window object for tests
(window as any).engine = engine;

// create a scene from a new BabylonJS app instance
// then run the render loop
const app = new App(engine);
app.createScene().then(scene => {
    engine.runRenderLoop(() => {
        scene.render();
    })
});

// resize the engine on window resize
window.addEventListener('resize', function () {
    engine.resize();
});
