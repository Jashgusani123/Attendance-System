export interface PandingRequest {
    "fullName":string,
    "email":string,
    "password":string,
    "departmentName":string, 
    "collegeName":string,
    "_id"?:string,
    "gender":string,
    "adminId":string,
    "accepted": boolean,
    "rejected": boolean,
}
export interface PandingReducerInitialState {
    panding:PandingRequest | null;
    loading:boolean
}