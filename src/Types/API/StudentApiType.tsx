export interface StudentRequest {
    "fullName":string,
    "email":string,
    "password":string,
    "semester":number, 
    "departmentName":string, 
    "enrollmentNumber":string, 
    "collegeName":string, 
    "collegeJoiningDate":Date
}

export interface StudentResponse {
    success:boolean,
    message:string
}

export interface StudentReducerInitialState {
    student:StudentRequest | null;
    loading:boolean
}