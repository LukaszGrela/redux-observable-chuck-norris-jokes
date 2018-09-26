# Redux-Observable Test Project
This is a test project to play with Redux-Observables. There is one 'epic'  (btw. [why epic][1]?) that now does the polling heavy lifting.

- `pollFetchJokesEpic` - Starts ajax call, reacts to errors and to cancellation.

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