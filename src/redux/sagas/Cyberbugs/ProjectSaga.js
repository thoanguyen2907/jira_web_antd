import { call, delay, put, takeLatest } from "redux-saga/effects";
import { cyberbugsService } from "../../../services/CyberbugsService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";
import {history} from '../../../util/history';
import { projectService } from "../../../services/ProjectService";
import { openNotificationWithIcon } from "../../../util/Notification/notificationCyberbugs";
function* createProjectSaga(action) {
    console.log(action)
    //HIỂN THỊ LOADING
    yield put({
        type: DISPLAY_LOADING
    })
    yield delay (500);

    try {
        //Gọi api lấy dữ liệu về
        const { data, status } = yield call(() => projectService.createProject(action.newProject));
        //Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUS_CODE.SUCCESS) {
            console.log(data)

            history.push('/projectmanagement');
        }
    } catch (err) {
        console.log(err.response.data);
    // }  
    yield put({
        type: HIDE_LOADING
    })
}
}


export function* theoDoiCreateProjectSaga() {
    yield takeLatest('CREATE_PROJECT_SAGA', createProjectSaga);
}

//Saga dùng để get all project từ api 
//Khải - Code ngày dd/MM/yyyy

function *getListProjectSaga(action) { 

    try {
        const {data,status} = yield call( () => cyberbugsService.getListProject());
 
        //Sau khi lấy dữ liệu từ api về thành công
        if(status === STATUS_CODE.SUCCESS) {
            yield put({
                type:'GET_LIST_PROJECT',
                projectList:data.content
            })
        }
    }catch(err) {
        console.log(err)
    }

}


export function* theoDoiGetListProjectSaga() {
    yield takeLatest('GET_LIST_PROJECT_SAGA', getListProjectSaga);
}

function * updateProjectSaga(action){
   
yield put({
    type: DISPLAY_LOADING
}); 

yield delay (500);

try {

    //Gọi api lấy dữ liệu về
    const { data, status } = yield call(() => cyberbugsService.updateProject(action.projectUpdate));
    //Gọi api thành công thì dispatch lên reducer thông qua put
    if (status === STATUS_CODE.SUCCESS) {
        console.log(data) 

    }
    yield put ({
        type: "GET_LIST_PROJECT_SAGA"
    })
    yield put({
        type: "CLOSE_DRAWER"
    })
} catch (err) {
    console.log(err.response.data);
}

yield put({
    type: HIDE_LOADING
})
}
//update project 
export function* theoDoiUpdateProjectSaga(){
    yield takeLatest("UPDATE_PROJECT_SAGA", updateProjectSaga); 
}
function * deleteProjectSaga (action){
    yield put({
        type: DISPLAY_LOADING
    }); 
    
    yield delay (500);  
    try {  
        
        //Gọi api lấy dữ liệu về
        const { data, status } = yield call(() => projectService.deleteProject(action.id)); 
        //Gọi api thành công thì dispatch lên reducer thông qua put
        if (status === STATUS_CODE.SUCCESS) {
            openNotificationWithIcon('success', 'Delete', 'Xoá Dự Án Thành Công !!')
    
        }
        yield put ({
            type: "GET_LIST_PROJECT_SAGA"
        })
    } catch (err) {
        openNotificationWithIcon('error', 'Error', 'Xảy ra lỗi khi xoá !!')
        console.log(err.response.data);
    }
    
    yield put({
        type: HIDE_LOADING
    })
}
export function* theoDoiDeleteProjectSaga(){
    yield takeLatest("DELETE_PROJECT_SAGA", deleteProjectSaga); 
}

