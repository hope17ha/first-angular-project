import { Comment } from "./comment";

export interface Tattoo {
  _ownerId: string;
  ownerName: string;
  type: string;
  img: string;
  description: string;
  _createdOn: number;
  comments: Comment[];
  _id: string;
  
}

