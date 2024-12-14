import { Comment } from "./comment";

export interface Tattoo {
  _ownerId: string;
  ownerName: string;
  type: string;
  img: string;
  description: string;
  price: string;
  _createdOn: string;
  likes: string[];
  _id: string;
  comments: Comment[];
}
