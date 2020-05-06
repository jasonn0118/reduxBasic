const redux = require('redux')
const reduxLogger = require('redux-logger');

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMeiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();


const BUY_CAKE = 'BUY_CAKE';
const BUT_ICECREAM = 'BUY_ICECREAM';

function buyCake() {
    //first Action
    return {
        type: BUY_CAKE,
        info: 'First redux action'
    }
}

function buyIceCream() {
    return {
        type: 'BUY_ICECREAM',
    }
}
//(previousState, action) => newState


const initialCakeState = {
    numberOfCakes: 10
}
const initialIceCreamState = {
    numberOfIceCreams: 20
}

//only bother about cake state
const cakeReducer = (state= initialCakeState, action) => {
    switch(action.type){
        case 'BUY_CAKE':
            return {
                ...state,//copy of the object & only change numberOfCakes
                numberOfCakes: state.numberOfCakes - 1
            }
        default:
            return state;
    }
}
//only bother about iceCream state
const iceCreamReducer = (state= initialIceCreamState, action) => {
    switch(action.type){
        case 'BUY_ICECREAM':
            return {
                ...state,
                numberOfIceCreams: state.numberOfIceCreams -1
            }
        default:
            return state;
    }
}

//combine several reducers
const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})

const store = createStore(rootReducer, applyMeiddleware(logger)); //Create redux store.
console.log('initial state', store.getState());
const unsubscibe = store.subscribe(()=>{})
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
unsubscibe();
