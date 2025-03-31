export interface TeacherRequest {
    "fullName":string,
    "email":string,
    "password":string,
    "departmentName":string, 
    "collegeName":string,
    "_id"?:string,
    "gender":string
}

export interface TeacherRequestForLogin {
    "fullName":string,
    "email":string,
    "password":string,
}

export interface TeacherResponse {
    success:boolean,
    message:string,
    user:TeacherRequest
}

export interface TeacherReducerInitialState {
    teacher:TeacherRequest | null;
    loading:boolean
}
export interface TeacherLogout {
    success:boolean,
    message:string
}