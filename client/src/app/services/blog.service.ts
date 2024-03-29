import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../objects/Blog';
import { serverBlog } from '../objects/serverBlog';
import { OperationResult } from '../objects/OperationResult';

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

	addNewBlog(task: Blog): Observable<OperationResult<serverBlog>> {
		return this.http.post<OperationResult<serverBlog>>(
			this.domain + 'new',
			task,
			httpOptions,
		);
	}

	getAllBlogs(): Observable<OperationResult<serverBlog[]>> {
		return this.http.get<OperationResult<serverBlog[]>>(
			this.domain + 'getAllBlogs',
		);
	}

	getSingleBlog(id: string): Observable<OperationResult<serverBlog>> {
		return this.http.get<OperationResult<serverBlog>>(
			this.domain + 'getOneBlog/' + id,
		);
	}

	editBlog(task: serverBlog): Observable<OperationResult<serverBlog>> {
		return this.http.put<OperationResult<serverBlog>>(
			this.domain + 'editBlog/',
			task,
			httpOptions,
		);
	}

	deleteBlog(id: string): Observable<OperationResult<serverBlog>> {
		return this.http.delete<OperationResult<serverBlog>>(
			this.domain + 'deleteBlog/' + id,
		);
	}
}
