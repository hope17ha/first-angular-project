import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Tattoo } from './types/tattoo';


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
    img: string
  ) {
    const payload = { ownerName, type, description, img };

    return this.http.post<Tattoo>(`/api/data/tattoos`, payload);
  }

  deleteTattoo(id: string) {
    return this.http.delete(`/api/data/tattoos/${id}`);
  }

  updateTattoo(
    tattoId: string,
    type: string,
    img: string,
    description: string
  ) {
    const payload = { type, img, description };
    return this.http.put<Tattoo>(`/api/data/tattoos/${tattoId}`, payload);
  }

  likeTattoo<Tattoo>(tattoId: string) {
    const payload = { tattoId };
    
    
    return this.http.post<Tattoo>(`/api/data/likes`, payload);
  }

  getLikesOnTattoo(tattoId: string) {
     return this.http.get(
      `/api/data/likes?where=tattoId%3D"${tattoId}"`
    );
  }
}
