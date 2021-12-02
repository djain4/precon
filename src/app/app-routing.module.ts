import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreconBrowserComponent } from './components/precon-browser/precon-browser.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectDetailsComponent } from './components/projects/project-details/project-details.component';

import { WhyCanadaComponent } from './components/why-canada/why-canada.component';
import { WhyPreconstructionComponent } from './components/why-preconstruction/why-preconstruction.component';
import { MasterComponent } from './components/master/master.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

const routes: Routes = [
  {
    path: '',
    component: MasterComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: PreconBrowserComponent },
      { path: 'projects', children: [
        { path: '', component: ProjectsComponent, pathMatch: 'full' },
        { path: 'details', component: ProjectDetailsComponent,  pathMatch: 'full' },
      ] },
      { path: 'why-canada', component: WhyCanadaComponent },
      { path: 'pre-construction', component: WhyPreconstructionComponent },
      // { path: 'tnc', component: RootComponent, data: [{ 'showTnc': true }] },
      // { path: 'faqs', component: RootComponent, data: [{ 'showFaq': true }] },
      // { path: 'privacy-policy', component: RootComponent, data: [{ 'showPrivacyPolicy': true }] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const routingComponents = [
  MasterComponent,
  HeaderComponent,
  FooterComponent,
  PreconBrowserComponent,
  ProjectsComponent,
  ProjectDetailsComponent,
  WhyCanadaComponent,
  WhyPreconstructionComponent,
];
