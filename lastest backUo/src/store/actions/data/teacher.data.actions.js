import https from '../../../helpers/https'
import * as actions from '../../types'


    export const handleSetTeacherData = (data) => (dispatch) => {
        console.log("&&&&&&&&&&&&&&&&&&",data)
        dispatch({
            type: actions.HANDLE_SET_DATA_TEACHER,
            payload : data
        })
    }

    export const handleFetchTeacherData = () => (dispatch) => {
        dispatch({
            type: actions.HANDLE_GET_DATA_TEACHER 
        })
    }