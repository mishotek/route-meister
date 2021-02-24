![alt text](https://raw.githubusercontent.com/mishotek/route-meister/main/about/package-logo.jpg)

Simple, lightweight router written to be used with web components. Supports lazy loading.

## Why RouteMeister
* All your routing is declarative and expressed with regular HTML
* No dependencies on other packages
* Uses plain WebComponents, meaning its framework agnostic

## Installation
```npm i route-meister```

## Usage
import rm-router and rm-route and use these components like this:
```html
<rm-router>
    <rm-route exact
              pattern="/"
              element="app-home"></rm-route>
    <rm-route exact
              pattern="/users"
              element="app-users"></rm-route>
    <rm-route pattern="/users/:id"
              element="app-user"></rm-route>
</rm-router>
```
```pattern``` is route, just like in express

```element``` is tag-name of component, that will be rendered when pattern matches url