import { BaseService } from "./BaseService";

export class ProjectService extends BaseService{
    constructor(){
        super();
    }
    deleteProject = (id) => {
       return this.delete(`Project/deleteProject?projectId=${id}`)
    }
    getProject = () => {
        return this.get(`Project/getAllProject`)
     }
    updateProject = (model) => {
        return this.put(`Project/updateProject?projectId=${model.id}`, model)
     }
    createProject = (model) => {
        return this.post("Project/createProject", model)
    }

}
export const projectService = new ProjectService()