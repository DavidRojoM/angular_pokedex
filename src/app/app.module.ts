import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { HeaderComponent } from './components/header/header.component'
import { ContentComponent } from './components/content/content.component'
import { FooterComponent } from './components/footer/footer.component'
import { HttpClientModule } from '@angular/common/http'
import { HeadComponent } from './components/head/head.component'
import { NgxPaginationModule } from 'ngx-pagination'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    HeadComponent
  ],
  imports: [BrowserModule, HttpClientModule, NgxPaginationModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
