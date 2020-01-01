import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RoutingService {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  goToHome() {
    this.router.navigate(['home']);
  }

  goToRegister() {
    this.router.navigate(['register']);
  }

  goToSecretPage() {
    this.router.navigate(['secret']);
  }

  getHash(): Observable<string> {
    return this.activatedRoute.fragment;
  }
}
