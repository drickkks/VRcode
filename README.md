[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/mQ5MlN2d)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=18630991)
# WEEK08: Creating Virtual Environments

This assignment allows us to get familiar with creating virtual environments in a WebXR-based application primarily using BabylonJS.

Your goal is to get further acquainted with the BabylonJS framework by creating a simple virtual environment scene. It is a fairly straightforward exercise to complete, but the idea is to get you familiar with interacting with the framework. It is not a lot of code so do make an effort to understand every line of code and pick up any missing knowledge (e.g., TypeScript) as necessary.

# Tasks to complete in this lab

We will similarly follow the spirit of TDD (Test-Driven Development) in this lab. The tests are already written for you, and you will need to write the code to make the tests pass.

You can see that there is minimal skeleton code provided as you are expected to fully understand the project structure to create the app logic from scratch. You are also expected to analyse the test files to understand what you need to do exactly.

Note that in the process you will see that you need to create a VideoDome that is setup with a 360 video file named `video.mp4`. You can use any video file you like and rename it to `video.mp4` to ensure the tests pass. Do please make sure you have the rights to use the video. In WEEK06's coding video, we used [royalty-free 360 videos from Mettle](https://www.mettle.com/360vr-master-series-free-360-downloads-page/).

You will notice that the basic tests from the previous assignment are still there. This is because we are building on top of the previous assignment. This is to encourage you to do things progressively, and at the same time, simulate real DevOps where the tests are always cumulative. Passing new tests should not interfere with the success of previous tests, fostering a continuous development experience.

Do note that a proper TDD process in a "real" production team is much more than what we're doing here. If you wish to learn more about TDD, [Siggiqui's book](https://www.oreilly.com/library/view/learning-test-driven-development/9781098106461/) may be a good read and is available in the SIT library. However, this DIA module is not focused on software engineering (SE), so we will leave this topic here.

## Testing and Submission

For testing, perform the usual:
- `npm install` to install all the dependencies
- `npm test` to run the test files

For submission, it is similarly just a matter of committing (and pushing) your changes. The tests will be run automatically when you submit your solution.
