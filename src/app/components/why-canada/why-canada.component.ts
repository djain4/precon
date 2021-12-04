import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'precon-why-canada',
  templateUrl: './why-canada.component.html',
  styleUrls: ['./why-canada.component.scss']
})
export class WhyCanadaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  onContactUs() {
    window.scrollTo(0, document.body.scrollHeight);
  }
}
