export interface AdminRequest {
    "fullName":string,
    "email":string,
    "password":string,
    "collegeName":string, 
    "departmentName":string, 
}

export interface AdminReducerInitialState {
    admin:AdminRequest | null;
    loading:boolean
}