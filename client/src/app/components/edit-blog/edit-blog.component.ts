import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { OperationResult } from 'src/app/objects/OperationResult';
import { Blog } from 'src/app/objects/Blog';
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { windowWhen } from 'rxjs/operators';
import { serverBlog } from 'src/app/objects/serverBlog';

@Component({
	selector: 'app-edit-blog',
	templateUrl: './edit-blog.component.html',
	styleUrls: ['./edit-blog.component.css'],
})
export class EditBlogComponent implements OnInit {
	public Editor = ClassicEditor;
	form: any;
	processing = false;
	currentUrl: any;
	loading = true;

	singleBlog: OperationResult<serverBlog>;

	constructor(
		private formBuilder: FormBuilder,
		private blogService: BlogService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
	) {}

	createNewBlogForm() {
		this.form = this.formBuilder.group({
			title: [
				this.singleBlog.data.title,
				Validators.compose([Validators.required]),
			],
			description: [this.singleBlog.data.description],
			markdown: [
				this.singleBlog.data.markdown,
				Validators.compose([Validators.required]),
			],
			createdAt: [''],
		});
	}

	onBlogSubmit() {
		this.processing = true; // Disable submit button
		const blog = {
			_id: this.currentUrl.id,
			title: this.form.get('title').value,
			description: this.form.get('description').value,
			markdown: this.form.get('markdown').value,
			createdAt: Date.now(),
		};

		this.blogService.editBlog(blog).subscribe((res) => {
			window.alert(res.message);
			this.processing = false;
			if (res.isSuccess) this.router.navigate(['/']);
			else this.router.navigate(['/edit-blog', this.currentUrl.id]);
		});
		this.form.reset();
	}

	ngOnInit(): void {
		this.currentUrl = this.activatedRoute.snapshot.params;

		this.blogService.getSingleBlog(this.currentUrl.id).subscribe((res) => {
			if (!res.isSuccess) {
				window.alert(res.message);
				this.router.navigate(['/']);
			} else {
				this.singleBlog = res;
				this.loading = false;
				this.createNewBlogForm();
			}
		});
	}
}
