export interface AdminRequest {
    _id: string,
    email: string,
    password: string,
    credentials: [],
}

export interface AdminResponse {
    success: boolean,
    message: string
}

export interface AdminReducerInitialState {
    admin: AdminRequest | null;
    loading: boolean
}

export interface College {
    _id: string,
    collegename: string,
    logoUrl: string,
    imageUrl: string,
    place: string,
    category: string[],
    department: string[]
}

export interface ResponseOfAllCollege {
    success: boolean;
    AllColleges: College[];
}

export interface ResponseForCollege {
    success: boolean,
    CollegeDetails: {
        _id: string,
        collegename: string,
        logoUrl: string,
        imageUrl: string,
        place: string,
        category: string[],
        department: string[],
        HodCount: number,
        TeacherCount: number,
        StudentCount: number,
        Hods: {
            fullName: string,
            email: string,
            departmentName: string
        }[],
        Teachers: {
            fullName: string,
            email: string,
            departmentName: string
        }[],
        Students: {
            fullName: string,
            email: string,
            departmentName: string
        }[]
    }
}

export interface FirstCard {
    success: boolean,
    Data: {
        cardFirst: {
            HODs: number,
            Teachers: number,
            Student: number
        },
        cardSecond:
        {
            date: string,
            PresentCount: number,
            CreatedClassCount: number
        }[],


        cardThird:
        {
            date: string,
            PandingRequestCount: number,
            NotificationRequestCount: number
        }[]

    }

}

export interface JoingTableDataResponse {
    success: boolean,
    tableData: [
        {
            college: string,
            departments: number,
            hods: number,
            teachers: number,
            students: number
        }
    ]
}

export interface Data {
    college: string;
    departments: number;
    hods: number;
    teachers: number;
    students: number;
}

export interface UsersResponse {
    success: true,
    Users: {
        Hods: {
            _id: string,
            fullName: string,
            email: string,
            departmentName: string
        }[],
        Teachers: {
            _id: string,
            fullName: string,
            email: string,
            departmentName: string
        }[],
        Students: {
            _id: string,
            fullName: string,
            email: string,
            departmentName: string
        }[],
    }
}

export interface SearchWordResponse {
    success: boolean,
    colleges: College[]
}

export interface Departments {
    success: true,
    data: {
        collegeName: String,
        departments: {
            name: String,
            hod: String
        }[]
    }[]
}

export interface ClassesResponse {
    success: true,
    data: {
        liveClasses: {
            title: string,
            college: string,
            department: string,
            teacher: string,
            time: string,
            status: string
        }[],
        lastClasses: {
            title: string,
            college: string,
            department: string,
            teacher: string,
            time: string,
            status: string
        }[]
    }
}

export interface RequestResponse {
    success: true,
    data: {
        id: String,
        title: String,
        college: String,
        department: String,
        reason: String,
        requestedTo: String,
        date: String,
        status: String
    }[]
}

export interface ResponseDeleteResponse {
    success: boolean
}
export interface ResponseOfNotification {
    success: boolean,
    message: string
}
export interface RequestNotification {
    type: string,
    upperHeadding: string,
    description: string,
    to: string
}

export interface AllNotificationsResponse {
    success: boolean,
    Notifications: {
        _id: string,
        upperHeadding: string,
        description: string,
        allUsers: string[]
        to: string
        userType: string
    }[]
}

export interface AdminCreatetationResponse {
    success: boolean,
    message: string,
    user: {
        _id: string,
        email: string,
        password: string,
        credentials: [],
    }
}
export interface AdminCreatetationRequest {
    email: string,
    password: string
}

export interface AdminLoginResponse {
    success: boolean,
    message: string,
    user: {
        _id: string,
        email: string,
        password: string,
        credentials: [],
    }
}

export interface AdminLoginRequest {
    email: string,
    password: string
}

export interface AdminLogoutRespose {
    success: boolean,
    message: string
}

export interface RegisterCredentialResponse {
    message: string,
    options: any
}
export interface RegisterCredentialRequest {
    Id: string
}
export interface LoginFingerprintVerificationRequest {
    email:string,
    cred:any
}
export interface LoginFingerprintVerificationRespose {
    success:boolean,
    user:AdminRequest
}