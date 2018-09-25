# Redux-Observable Test Project
This is a test project to play with Redux-Observables. It exhibits 2 'epics'  (btw. [why epic][1]?)

1. `fetchJokesEpic` - that calls `ajax` to get new joke
2. `pollJokesEpic` - that will call `FETCH_JOKES` action to retrieve jokes again

### Usage
Clone the repo then download dependencies
```
yarn install
```
or simply `yarn` or 
```
npm install
```

then run it by calling

```
yarn start
```



This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


  [1]: http://thebestpageintheuniverse.net/c.cgi?u=epic