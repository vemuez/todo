import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TodoService
{
    public readonly base = '/todo';

    constructor(
        private _http: HttpClient
    ) { }

    public getTodos(params: any): Observable<any>
    {
        return this._http.get(this.base, { params });
    }

    public addTodo(todo: any): Observable<any>
    {
        return this._http.post(this.base, todo);
    }

    public updateTodo(id: string, todo: any): Observable<any>
    {
        return this._http.put(`${this.base}/${id}`, todo);
    }

    public deleteTodo(id: string): Observable<any>
    {
        return this._http.delete(`${this.base}/${id}`);
    }
}