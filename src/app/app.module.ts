import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { AppComponent } from './app.component';
import { TasksModule } from './tasks/tasks.module';
import { HttpClientModule } from '@angular/common/http';
import { NavBarModule } from './components/components.module';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { tasksReducer } from './tasks/task.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		AuthModule,
		TasksModule,
		HttpClientModule,
		NavBarModule,
		RouterModule,
		FontAwesomeModule,
		BrowserAnimationsModule,
		StoreModule.forRoot({ tasks: tasksReducer }),
		//StoreRouterConnectingModule.forRoot(),
		StoreDevtoolsModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
