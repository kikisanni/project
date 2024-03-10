export type User = {
  _id: string
  username: string;
  profilePicture: string;
};

export interface Post {
    _id: string;
    username?: string;
    creator: User;
    title: string;
    content: string;
    profilePicture: string;
    createdAt: string;
  }

export interface Comment {
    _id: string;
    creator: User;
    content: string;
    createdAt: string;
  }

export interface EditPostModalProps {
    isOpen: boolean;
    onClose: () => void;
    post: Post | null;
    onSave: (updatedPost: Post) => void;
  }

export interface CommentModalProps {
    isOpen: boolean;
    onClose: () => void;
    postId: string | null;
  }

  