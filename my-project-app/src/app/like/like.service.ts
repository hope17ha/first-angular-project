import { Injectable } from '@angular/core';
import { Tattoo } from '../types/tattoo';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  private constructor(id: string, likedTattoo: Tattoo, likedComment: Comment, user:User) { }


}
