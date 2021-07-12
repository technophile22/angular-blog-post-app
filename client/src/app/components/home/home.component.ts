import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/objects/Blog';
import { BlogService } from 'src/app/services/blog.service';
import { serverBlog } from 'src/app/objects/serverBlog';
import { OperationResult } from 'src/app/objects/OperationResult';
import { Router } from '@angular/router';
import { OperatorFunction } from 'rxjs';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
	blogPosts: serverBlog[] = [];
	singleBlog: OperationResult<Blog>;

	constructor(private blogService: BlogService, private router: Router) {}

	getAllBlogs() {}

	ngOnInit(): void {
		this.blogService.getAllBlogs().subscribe((res) => {
			if (res.status == 404) {
				//this.router.navigate(['/']);
				console.log('No blogs found');
			} else {
				this.blogPosts = res.data;
			}
		});
	}
}
