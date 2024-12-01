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

  createTattoo(tattooName: string, descriptionText: string, imgUrl: string) {


    const payload = { tattooName, descriptionText, imgUrl };
    return this.http.post<Tattoo>(`/api/data/tattoos`, payload);
  }



}
