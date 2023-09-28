# UML class diagram editing application

A browser based graphical editor for creating and editing UML diagrams.

Use menu commands to create and delete diagrams and to create components.

Components can be moved around the canvas by clicking and dragging with the mouse.
To join a connector to a box hold down the shift button and click on a connector then click on the box that you want to connect to.
To change a connector line from solid to dashed hold down the alt button and click on a node on the connector.

shift and alt at the same time and click on an arrow head to change the type of arrow head.

### Technologies used

- HTML5
- SVG
- Raphael

[demo website](http://carracci.richardhunter.co.uk)

![screenshot](./screenshot.png)

## Development

to run server in development mode

```
npm start

```

navigate to localhost:3001 to view application

when updating packages, you need to run the following in order to copy over `BaseType.js` to the web folder

```
grunt copy:utils

```
