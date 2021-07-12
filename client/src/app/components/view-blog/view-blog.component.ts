import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { serverBlog } from 'src/app/objects/serverBlog';
import { BlogService } from 'src/app/services/blog.service';
import { OperationResult } from 'src/app/objects/OperationResult';

@Component({
	selector: 'app-view-blog',
	templateUrl: './view-blog.component.html',
	styleUrls: ['./view-blog.component.css'],
})
export class ViewBlogComponent implements OnInit {
	currentUrl: any;
	singleBlog: OperationResult<serverBlog>;
	loading = true;

	constructor(
		private activatedRoute: ActivatedRoute,
		private blogService: BlogService,
		private router: Router,
	) {}

	viewBlog() {}

	ngOnInit(): void {
		this.currentUrl = this.activatedRoute.snapshot.params;

		this.blogService.getSingleBlog(this.currentUrl.id).subscribe((res) => {
			if (!res.isSuccess) {
				window.alert(res.message);
				this.router.navigate(['/']);
			} else {
				this.singleBlog = res;
				this.loading = false;
				this.viewBlog();
			}
		});
	}
}
