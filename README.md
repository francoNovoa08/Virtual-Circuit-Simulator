# Virtual Circuit Simulator
## Overview
This web application provides a front-end graphical user interface that allows users to select a number of electrical devices, including batteries, resistors, lamps and capacitors, and place them onto a digital canvas. Within that canvas, users can select components and connect them with lines, simulating wires, giving users the ability to build proper circuits. A backend component was implemented using Flask and Python, while the front-end was developed with the usual markup languages HTML and CSS, and JavaScript for scripting. The backend element allows users to save a circuit configuration as a PNG, which is downloaded to their device.

#### Technologies:
* Python
* Flask
* HTML & CSS
* JavaScript

## Features
1. ### Component selection

    Users can select from a variety of electrical components, including:
    * Battery
    * Resistor
    * Lamp
    * Capacitor
    
    Each component is represented by an icon and a corresponding label
2. ### Canvas circuit builder
    
    Once components are selected, users can freely place them in the large canvas. There is an option to remove unwanted components. 
3. ### Wiring

    After placing components in the canvas, users can connect them by clicking on them. A line, simulating a wire, will automatically be created and connect the two components together. Users can create multiple connections for a single component, allowing series and parallel circuit configurations. 
4. ### Downloadable circuits

    Once the circuit is built, users can download a PNG image of the completed circuit. This image captures every component and wire in the canvas. The backend, built with Flask, processes the canvas data and downloads the image to the user's device.
## Usage
The Virtual Circuit Simulator should be run in Flask in order to use the backend configurations. A flask server is intialised with the following command:
```
flask run
```
A web address should be provided, which when opened should display the application.
Afterwards, the circuit builder is free to use via the UI on the given address. Clicking on a component and then the canvas will produce that component on the canvas. There is a remove button to eliminate unwanted components. The remove button also removes all wires associated with the removed components. There is a button to save the circuit configuration, which will download a PNG of the canvas.
## Dependencies
#### Python
* Flask
Flask is a micro web framework for Python. This will handle the backend logic for this application of saving circuit images.
Install it with:
```
pip install flask
```
Documentation and additional information for Flask can be found [here](https://flask.palletsprojects.com/en/stable/installation/).
#### JavaScript
* html2canvas
The front-end of the application uses html2canvas, a JavaScript library that converts HTML elements into a downloadable image. This library is used to transfer the image of the canvas from the front-end to the backend.
Include in your project by adding the following tag to your HTML:
```
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
```
Documentation for html2canvas can be found [here](https://html2canvas.hertzen.com/documentation)

## Files
The project is organised into the following structure:
```
virtual-circuit-simulator/
│
├── static/
│   ├── images/
│   │   ├── Battery.png
│   │   ├── Capacitor.png
│   │   ├── Lamp.png
│   │   ├── Resistor.png
│   │   └── Trash_bin.png
│   ├── script.js
│   ├── style.css
│
├── templates/
│   └── index.html
│
└── app.py
```
* static/
    * images/
        
        This folder contains all assets for the circuit components, such as Battery, Capacitor, Resistor and Lamp.
    * script.js

        This JavaScript file handles front-end logic, including selecting components, placing them into the canvas and connecting components with wires.
    * style.css

        The styling of the HTML is contained within style.css
* templates
    * index.html
        
        The web application's UI is built in HTML. This file includes the component selection sidebar and the canvas.
* app.py

    Backend logic is handled in this file. The saving circuit images feature is handled by this file.

