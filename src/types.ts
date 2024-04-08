export interface Group {
    group_uid: string;
    group_id: string;
    group_name: string;
    professors_ids: string[];
    levels: Record<string, boolean>;
    signed_ups?: number;
    type?: string;
}

export interface Student {
    uuid?: string;
    name: string;
    lastName: string;
    email: string;
    group_id: string;
    progress: Record<string, any>;
    status?: string;
    demo?: boolean;
    validated?: boolean;
}

export interface Professor {
    uuid?: string;
    name: string;
    lastName: string;
    email: string;
    firstLogTime?: string;
    status?: string;
}

// external data

export interface globalValues {
    values: Record<string, number>;
}

export interface Solver {
    level_id: string;
    url: string;
}

export interface download {
    platform: string;
    guide: string;
    url: string;
}

export interface Media {
    levelSolvers: Solver[];
    galactic_marker: string;
    global_tolerance: number;
    downloads: download[];
}

export interface FirebaseError {
    code: string;
    message: string;
}