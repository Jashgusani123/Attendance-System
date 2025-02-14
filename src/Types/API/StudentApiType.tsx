export interface StudentRequest {
    "fullName":string,
    "email":string,
    "password":string,
    "semester":number, 
    "departmentName":string, 
    "enrollmentNumber":string, 
    "collegeName":string, 
    "collegeJoiningDate":string
}

export interface StudentRequestForLogin {
    "fullName":string,
    "email":string,
    "password":string,
    "enrollmentNumber":string
}

export interface StudentResponse {
    success:boolean,
    message:string,
    user:StudentRequest
}

export interface StudentReducerInitialState {
    student:StudentRequest | null;
    loading:boolean
}

export interface StudentLogout {
    success:boolean,
    message:string
}