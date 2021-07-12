import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { serverBlog } from 'src/app/objects/serverBlog';
import { BlogService } from 'src/app/services/blog.service';

@Component({
	selector: 'app-blogs',
	templateUrl: './blogs.component.html',
	styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent implements OnInit {
	@Input() blog!: serverBlog;
	@Output() onDeleteBlog: EventEmitter<serverBlog> = new EventEmitter();

	constructor(private blogService: BlogService, private router: Router) {}

	deleteFunction(blog: serverBlog) {
		this.onDeleteBlog.emit(blog);
	}

	ngOnInit(): void {}
}
