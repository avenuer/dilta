import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

/**
 * Stores and operate on the application router state
 *
 * @export
 */
@Injectable({
  providedIn: 'root'
})
export class RouterState {

  public appLink: string;

  /**
   * contains the app routes history
   *
   */
  private history = [];

  constructor(private router: Router) {}


  /**
   * it listens on events and add url to its histories
   */
  public loadRouting(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(({ urlAfterRedirects }: NavigationEnd) => {
        this.history = [...this.history, urlAfterRedirects];
      });
  }

  /**
   * it returns all the url histories
   */
  public getHistory(): string[] {
    return this.history;
  }

  /**
   * returns the previous url
   */
  public getPreviousUrl(): string {
    return this.history[this.history.length - 2] || '';
  }
}
