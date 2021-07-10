import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/Blog';
import { BlogService } from 'src/app/services/blog.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
	blogPosts: Blog[] = [];

	constructor(private blogService: BlogService) {}

	getAllBlogs() {}

	ngOnInit(): void {
		this.blogService.getAllBlogs().subscribe((blogPosts) => {
			console.log('blogs are ', blogPosts);
			this.blogPosts = blogPosts;
			console.log('this blog posts are', this.blogPosts);
		});
	}
}
