/**
 * @fileoverview The application class for the project.
 * @author your instructors
 * @lastUpdated 2024-01-04
 * @brief The App class is where the core app logic resides.
 *        - in this exercise, you will create a simple scene 
 */

import {
    Engine,
    Scene,
    FreeCamera,
    HemisphericLight,
    MeshBuilder,
    Vector3,
    WebXRDefaultExperience,
    PointerDragBehavior,
    ActionManager, 
    SceneLoader,
    Color3,
    StandardMaterial,
    ImportMeshAsync,
    ExecuteCodeAction
    
} from "@babylonjs/core";
import { registerBuiltInLoaders } from "@babylonjs/loaders/dynamic";
import { AdvancedDynamicTexture, TextBlock } from "@babylonjs/gui";
import { createHelloMessage } from "./hello"; // Import missing function

export class App {
    // the BabylonJS engine
    private engine: Engine;

    /**
     * Constructor to create the App object with an engine.
     * @param engine The Babylon engine to use for the application.
     */
    constructor(engine: Engine) {
        this.engine = engine;
        registerBuiltInLoaders();
    }

    /**
     * Create the scene.
     * @returns A promise that resolves when the application is done running.
     * @remarks This is the main entry point for the application.
     *
     * TODO the necessary code to create and return a scene with the following:
     *      1. Exactly 1 camera
     *      2. Exactly 1 light
     *      3. Exactly 1 primitive mesh (sphere, box, etc.)
     *      See BabylonJS documentation for more information:
     *      https://doc.babylonjs.com/
     */
    async createScene() {
        console.log("Hello, immersive world!");

        const scene = new Scene(this.engine);
        const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
        camera.setTarget(Vector3.Zero());
        const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
        light.intensity = 0.7;
        const sphere = MeshBuilder.CreateSphere("sphere", { diameter: 2 }, scene);
        sphere.position.y = 1;
        const plane = MeshBuilder.CreatePlane("hello plane", { size: 3 }, scene);
        plane.position.y = 0;

        const dragBehavior = new PointerDragBehavior({ dragPlaneNormal: new Vector3(0, 1, 0) });
        sphere.addBehavior(dragBehavior);

        sphere.isPickable = true;

        sphere.actionManager = new ActionManager(scene);
        sphere.actionManager.registerAction(new ExecuteCodeAction(
        ActionManager.OnPickTrigger,
        () => {
            sphere.scaling = new Vector3(2, 2, 2);
        }
        ));

        // Load a custom "dragon" object
        // The direct URL to the dragon.glb file
        const dragonUrl = "https://raw.githubusercontent.com/BabylonJS/Assets/master/meshes/Georgia-Tech-Dragon/dragon.glb";

        // Using SceneLoader to load the model directly from the URL
        const result = await ImportMeshAsync( dragonUrl, scene);
        const dragon = result.meshes[0];
        dragon.name = 'dragon';
        dragon.position = new Vector3(0, 0,10);
        dragon.scaling = new Vector3(30, 30, 30);
        const dragonMaterial = new StandardMaterial('dragonMat', scene);
        dragonMaterial.diffuseColor = new Color3(1, 0, 0); // Initial color
        result.meshes.forEach((mesh) => {
            mesh.material = dragonMaterial;
        });
        // ImportMeshAsync("https://raw.githubusercontent.com/BabylonJS/Assets/master/meshes/Georgia-Tech-Dragon/dragon.glb",scene,{meshNames: "dragon"}).then((result) => {
        //     result.name = 'dragon';
        //     result.position = new Vector3(0, 0, 5);
        //     result.scaling = new Vector3(50, 50, 50);
        // });

        const ground = MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);

        //new VideoDome("video dome", "video.mp4", {}, scene);
        const texture = AdvancedDynamicTexture.CreateFullscreenUI("hello texture");
        const text = new TextBlock("hello text");
        text.text = "Hello, XR!";
        text.color = "white";
        text.fontSize = 24;
        texture.addControl(text);

        scene.onBeforeRenderObservable.add(() => {
            const distance = Vector3.Distance(sphere.position, dragon.position).toFixed(2);
            text.text = `d: ${distance}`;
        });

        await WebXRDefaultExperience.CreateAsync(scene, {
            uiOptions: {
                sessionMode: "immersive-vr",
            },
            teleportationOptions: {
                timeToTeleport: 2000,
                floorMeshes: [ground],
            }
        });

        
        const helloText = createHelloMessage("XR");
        console.log(helloText);

        return scene;
    }
}
