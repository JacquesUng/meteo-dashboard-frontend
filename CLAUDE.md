# meteo-app-front

Angular 21 frontend for the météo dashboard project.

## Tech Stack

- **Framework**: Angular 21 (standalone components, signals)
- **UI Library**: Angular Material
- **HTTP**: Angular `HttpClient`
- **Test runner**: Vitest (`ng test`)
- **Language**: TypeScript

## Common Commands

```bash
ng serve        # Dev server at http://localhost:4200
ng build        # Production build → dist/
ng test         # Run unit tests (Vitest)
ng generate component <name>
```

## Conventions

- Standalone components (no NgModules)
- Use `inject()` for dependency injection
- Use `toSignal()` to convert observables to signals in components
- Services are `providedIn: 'root'`
- Route catch-all `**` redirects to `/orchestration`
