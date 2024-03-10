export type User = {
  _id: string
  username: string;
};

export interface Summary {
    creator: User;
    completed: string;
    totalPoints: string;
    hearts: string;
  }


  