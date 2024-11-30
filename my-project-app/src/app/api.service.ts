import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { environment } from './environments/environment.development';
import { Tattoo } from './types/tattoo';
import { Comment } from './types/comment';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getTattoos() {
    const { apiUrl } = environment;
    return this.http.get<Tattoo[]>(`${apiUrl}/tattoos/`);
  }

  getComments(id:string) {
    const { apiUrl } = environment;
    return this.http.get<Comment[]>(`${apiUrl}/commentTattoos/${id}`);
  }

  getSingleTattoo(id: string) {
    const { apiUrl } = environment;
    return this.http.get<Tattoo>(`${apiUrl}/tattoos/${id}`);
  }
}
