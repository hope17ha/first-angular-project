import { Comment } from "./comment";

export interface Tattoo {
  _ownerId: string;
  ownerName: string;
  type: string;
  img: string;
  description: string;
  _createdOn: number;
  likes: string[];
  _id: string;
  
}
