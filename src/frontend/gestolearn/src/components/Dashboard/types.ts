export type User = {
    _id: string
    username: string;
    profilePicture: string;
};

export interface Post {
    _id: string;
    creator: User;
    title: string;
    content: string;
    profilePicture: string;
    createdAt: string;
}

export interface Results {
    rank: number;
    hearts: number;
    totalPoints: number;
    totalXP: number;
    categoryTotalPoints: number[];
    completed: number;
    userId: User;
}