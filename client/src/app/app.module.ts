import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';

const appRoutes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: '*', component: HomeComponent },
];

@NgModule({
	declarations: [AppComponent, NavbarComponent, HomeComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		RouterModule.forRoot(appRoutes, { enableTracing: true }),
	],
	providers: [],
	bootstrap: [AppComponent],
	exports: [RouterModule],
})
export class AppModule {}
