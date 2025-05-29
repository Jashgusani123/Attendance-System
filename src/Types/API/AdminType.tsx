export interface AdminRequest {
    collegename: string;
    place: string;
    category: string[];
    logo: File | null;
    image: File | null;
    department: string[];
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