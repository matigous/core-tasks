import { Component, signal } from '@angular/core';
import { ThemeService } from './shared/services/theme-service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: false
})
export class App {
  protected readonly title = signal('Gerenciador de Tarefas');
  protected readonly darkMode = signal(false);
  private destroy$ = new Subject<void>();

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.darkMode$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isDarkMode => {
        this.darkMode.set(isDarkMode);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleDarkMode(): void {
    this.themeService.toggleDarkMode();
  }
}
