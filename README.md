# UML class diagram editing application

A browser based graphical editor for creating and editing UML diagrams.

[demo website](https://richardinho.github.io/carracci/)

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

### building SCSS

```
sass web/sass/diagramMain.scss web/css/diagramMain.css
```

## Building

```
grunt build
```
