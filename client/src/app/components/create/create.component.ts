import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {
	FormControl,
	FormGroup,
	FormBuilder,
	Validators,
} from '@angular/forms';
import { BlogService } from 'src/app/services/blog.service';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
	messageClass = '';
	message = '';
	public Editor = ClassicEditor;
	form: any;
	processing = false;

	constructor(
		private formBuilder: FormBuilder,
		private blogService: BlogService,
	) {
		this.createNewBlogForm();
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
		const blog = {
			title: this.form.get('title').value, // Title field
			description: this.form.get('description').value, // Body field
			markdown: this.form.get('markdown').value,
			createdAt: Date.now(), // CreatedBy field
		};
		this.blogService.addNewBlog(blog).subscribe((data) => {
			console.log('Res', data);
		});
		this.form.reset();
	}

	ngOnInit(): void {}
}
