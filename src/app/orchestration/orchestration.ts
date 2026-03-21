import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-orchestration',
  imports: [],
  templateUrl: './orchestration.html',
  styleUrl: './orchestration.scss',
})
export class Orchestration implements OnInit {
  private readonly http = inject(HttpClient);

  ngOnInit(): void {
    this.http.get("http://localhost:8080/api/collect-configuration/all").subscribe(res => console.log(res))
  }
}
