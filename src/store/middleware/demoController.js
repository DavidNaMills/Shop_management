export const demo = store => next => action =>{
    console.log(action.payload);
}