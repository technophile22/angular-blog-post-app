import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormBuilder, Validators } from '@angular/forms';
import { BlogService } from 'src/app/services/blog.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
	public Editor = ClassicEditor;
	form: any;
	processing = false;

	constructor(
		private formBuilder: FormBuilder,
		private blogService: BlogService,
		private router: Router,
	) {
		this.createNewBlogForm();
	}
	goBack(): void {
		this.router.navigate(['/']);
	}
	createNewBlogForm() {
		this.form = this.formBuilder.group({
			title: ['', Validators.compose([Validators.required])],
			description: [''],
			markdown: ['', Validators.compose([Validators.required])],
			createdAt: [''],
		});
	}

	onBlogSubmit() {
		this.processing = true; // Disable submit button
		const blog = {
			title: this.form.get('title').value,
			description: this.form.get('description').value,
			markdown: this.form.get('markdown').value,
			createdAt: Date.now(),
		};

		this.blogService.addNewBlog(blog).subscribe((res) => {
			console.log(res);
			window.alert(res.message);
			this.processing = false;
			if (res.isSuccess) this.router.navigate(['/']);
			else this.router.navigate(['/create']);
		});
		this.form.reset();
	}

	ngOnInit(): void {}
}
