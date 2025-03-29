// App class
// TODO everything required in the assignment
//      - you should view the tests carefully to understand what is required

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
	UniversalCamera,
	Vector3,
	PointLight,
	MeshBuilder,
    VideoDome,
    ArcRotateCamera
} from "@babylonjs/core"
import { AdvancedDynamicTexture, TextBlock } from "@babylonjs/gui"
import { createHelloMessage } from "./hello"

// App class
// - this is the main class for the web application
export class App {
	// the BabylonJS engine
	private engine: Engine
	private appTimer: number = 0

	/**
	 * Constructor to create the App object with an engine.
	 * @param engine The Babylon engine to use for the application.
	 */
	constructor(engine: Engine) {
		this.engine = engine
	}

	/**
	 * Create the scene.
	 * @returns A promise that resolves when the application is done running.
	 * @remarks This is the main entry point for the application.
	 */
	async createScene() {
		// thanks to https://doc.babylonjs.com/journey/theFirstStep#the-babylonjs-playground

		// create an empty scene
		var scene = new Scene(this.engine)

		// create camera
		// var camera = new UniversalCamera("Camera", new Vector3(0, 5, -10), scene)
		var camera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 15, Vector3.Zero(), scene)
        camera.attachControl(this.engine.getRenderingCanvas(), true)


		// create light
		new PointLight("PointLight", new Vector3(0, 10, 0), scene)

        //video dome
        new VideoDome("video dome", "./video.mp4" ,{autoPlay:true},scene)

		// create primitive mesh
		var options = { radius: 2, subdivisions: 3 }
		MeshBuilder.CreateSphere("sphere", options, scene)

        var plane = MeshBuilder.CreatePlane("hello plane",{size:10},scene)
        plane.position.y = 2

        var texture = new AdvancedDynamicTexture("hello texture")
        texture.attachToMesh(plane)

        var message = "Hello, XR!"
        var text1 = new TextBlock("hello text", message)
        text1.text = message
        text1.color = "white"
        text1.fontSize = 24
        texture.addControl(text1)
        
        createHelloMessage("XR")

       
       

		// return modified scene
		return scene
	}

	/**
	 * Makes the first mesh in a scene rotate on changing axes over time.
	 */	
	async updateScene() {
		this.appTimer += this.engine.getTimeStep()

		var meshArray = this.engine.scenes[0].getActiveMeshes()
		var firstMesh = meshArray.data[0]

		const start: Vector3 = new Vector3(-0.5, 0.5, 0)
		const end: Vector3 = new Vector3(0.5, 0.5, 0)

		const period: number = 350
		const lerpValue: number = Math.sin(this.appTimer / period)
		const rotAxis: Vector3 = Vector3.Lerp(start, end, lerpValue)

		const rotSpeed: number = -0.05
		firstMesh.rotate(rotAxis, rotSpeed)
	}
}
