
export interface Creator {
  _id: string;
  email: string;
  username: string;
}

export interface Comment {
  _ownerId: string;
  ownerName: string;
  content: string;
  tattooId: string;
  _createdOn: number;
  _id: string;
  creator: Creator;
}
