import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Tattoo } from './types/tattoo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getTattoos() {
    return this.http.get<Tattoo[]>(`/api/data/tattoos`);
  }

  getSingleTattoo(id: string) {
    return this.http.get<Tattoo>(`/api/data/tattoos/${id}`);
  }

  createTattoo(
    ownerName: string,
    type: string,
    description: string,
    img: string,
    price: string
  ) {
    const payload = { ownerName, type, description, img, price };

    return this.http.post<Tattoo>(`/api/data/tattoos`, payload);
  }

  deleteTattoo(id: string) {
    return this.http.delete(`/api/data/tattoos/${id}`);
  }

  updateTattoo(
    tattooId: string,
    type: string,
    img: string,
    description: string,
    price: string
  ) {
    const payload = { type, img, description, price };
    return this.http.put<Tattoo>(`/api/data/tattoos/${tattooId}`, payload);
  }

  likeTattoo<Tattoo>(tattooId: string) {
    const payload = { tattooId };

    return this.http.post<Tattoo>(`/api/data/likes`, payload);
  }

  getLikesOnTattoo(tattooId: string) {
    return this.http.get(`/api/data/likes?where=tattooId%3D"${tattooId}"`);
  }

  getCommentsById(tattooId: string): Observable<Comment[]> {
    
    return this.http.get<Comment[]>(`/api/data/comments?where=tattooId%3D"${tattooId}"`)
  }

  createComment(tattooId: string, content: string): Observable<Comment> {
    return this.http.post<Comment>('/api/data/comments', { tattooId, content });
  }

  updateComment(commentId: string, content: string): Observable<Comment> {
    return this.http.patch<Comment>(`/api/data/comments/${commentId}`, { content });
  }

  deleteComment(commentId: string): Observable<Comment> {
    return this.http.delete<Comment>(`/api/data/comments/${commentId}`)
  }
}


