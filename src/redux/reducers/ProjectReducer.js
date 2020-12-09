const initialState = {
    projectEdit: {
        "id": 0,
        "projectName": "string",
        "description": "string",
        "categoryId": "string"
}
    }

const ProjectReducer = (state = initialState, action) => {
    switch (action.type) {

    case "EDIT_PROJECT":
      
        state.projectEdit = action.projectEditDrawer; 
        return { ...state }

    default:
        return state
    }
}
export default ProjectReducer; 
