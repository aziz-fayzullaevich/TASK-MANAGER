export type Status = 'new' | 'in_progress' | 'done';
export type Priority = 'low' | 'medium' | 'high';

export type Tasks = {
    id: string;
    title: string;
    description: string;
    status: Status;
    priority: Priority;
    deadline: string;
};

export type TaskParams = {
    _page?: number;
    _limit?: number;
    _sort?: string;
    _order?: 'asc' | 'desc';
    q?: string;
    status?: string;
    priority?: string;
};