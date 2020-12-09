import React from 'react'; 
const initialState = {
    visible: false,
    ComponentDrawerContent: <p>Xin Chào Thanh Thoa</p>, 
    callBackSubmit: () => {
        alert("click demo")
    }
}

const DrawerReducer = (state = initialState, action) => {
    switch (action.type) {
    case "OPEN_DRAWER":
        return { ...state, visible: true }
    case "CLOSE_DRAWER": 
    return { ...state, visible: false } 
    case "OPEN_FORM_EDIT_PROJECT": 
    return { ...state, visible: true, ComponentDrawerContent: action.Component }
    case "SET_SUBMIT_EDIT_PROJECT": 
     state.callBackSubmit = action.submitFunction
    return {...state}
    default:
        return state
    }
}
export default DrawerReducer
