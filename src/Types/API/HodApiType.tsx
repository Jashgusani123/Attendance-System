export interface HodRequest {
    "fullName":string,
    "email":string,
    "password":string,
    "collegeName":string, 
    "departmentName":string, 
}

export interface HodReducerInitialState {
    hod:HodRequest | null;
    loading:boolean
}