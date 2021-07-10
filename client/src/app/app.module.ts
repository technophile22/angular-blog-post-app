import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { BlogService } from './services/blog.service';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { CreateComponent } from './components/create/create.component';
import { BlogsComponent } from './components/blogs/blogs.component';

const appRoutes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'create', component: CreateComponent },
	{ path: '*', component: HomeComponent },
];

@NgModule({
	declarations: [AppComponent, NavbarComponent, HomeComponent, CreateComponent, BlogsComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		RouterModule.forRoot(appRoutes, { enableTracing: true }),
		FormsModule,
		ReactiveFormsModule,
		CKEditorModule,
		HttpClientModule,
	],
	providers: [BlogService],
	bootstrap: [AppComponent],
	exports: [RouterModule],
})
export class AppModule {}
