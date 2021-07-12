import { Component, OnInit, Input } from '@angular/core';
import { serverBlog } from 'src/app/objects/serverBlog';

@Component({
	selector: 'app-blogs',
	templateUrl: './blogs.component.html',
	styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent implements OnInit {
	@Input() blog!: serverBlog;
	constructor() {}

	ngOnInit(): void {}
}
