import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

/**
 * Stores and operate on the application router state
 *
 * @export
 * @class RouterStateService
 */
@Injectable({
  providedIn: 'root'
})
export class RouterState {

  public appLink: string;

  /**
   * contains the app routes history
   *
   * @private
   * @memberof RouterState
   */
  private history = [];

  constructor(private router: Router) {}

  public loadRouting(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(({ urlAfterRedirects }: NavigationEnd) => {
        this.history = [...this.history, urlAfterRedirects];
      });
  }

  public getHistory(): string[] {
    return this.history;
  }

  public getPreviousUrl(): string {
    return this.history[this.history.length - 2] || '';
  }
}
