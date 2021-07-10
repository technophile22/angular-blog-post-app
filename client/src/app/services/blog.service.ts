import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../Blog';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
	}),
};

@Injectable({
	providedIn: 'root',
})
export class BlogService {
	domain = 'http://localhost:5000/posts/';

	constructor(private http: HttpClient) {}

	addNewBlog(task: Blog): Observable<Blog> {
		console.log('task', task);
		console.log(httpOptions);
		return this.http.post<Blog>(this.domain + 'new', task, httpOptions);
	}

	getAllBlogs(): Observable<Blog[]> {
		return this.http.get<Blog[]>(this.domain + 'getAllBlogs');
	}
}
