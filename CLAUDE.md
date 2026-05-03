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

## Design

See [DESIGN.md](DESIGN.md) for UI and design guidelines.

## Conventions

- Standalone components (no NgModules)
- Use `inject()` for dependency injection
- Use `toSignal()` to convert observables to signals in components
- Services are `providedIn: 'root'`
- Route catch-all `**` redirects to `/orchestration`

## Testing (TDD)

Every component, service, directive, and pipe must have a `*.spec.ts` file alongside it. Write or update tests **before** implementing the feature (red → green → refactor).

**Rules:**
- Every new file gets a spec file at the same time. No implementation without a test.
- Run `ng test --no-watch` after each change to confirm tests pass before moving on.
- Never leave a spec with only an instantiation test (`should create`) — cover the actual behaviour of each public method.

**Patterns used in this project:**

*Components with dialogs* — Do NOT provide `MatDialog` via `useValue` in `TestBed`; Angular Material's module-level provider wins. Instead, spy on the injected instance after component creation:
```typescript
dialogOpenSpy = vi.spyOn((component as any).dialog, 'open').mockReturnValue(mockDialogRef as any);
```

*Dialog components* — Provide both `MatDialogRef` and `MatDialog` as `useValue` mocks so the `mat-dialog-close` directive can resolve its dependencies:
```typescript
providers: [
  { provide: MatDialogRef, useValue: { close: vi.fn() } },
  { provide: MatDialog, useValue: { open: vi.fn() } }
]
```

*Services using `fetch()`* — Spy on `globalThis.fetch` and restore in `afterEach`:
```typescript
const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ... } as Response);
// afterEach: vi.restoreAllMocks()
```

*Services using `httpResource`* — Add `provideHttpClient()` and `provideHttpClientTesting()` to TestBed providers.

*Mock resources* — Use `signal()` from `@angular/core` for the `value` property so `computed()` inside the component tracks it correctly:
```typescript
const mockResource = { value: signal<T[] | undefined>([]), reload: vi.fn() };
```

*Async component methods* — Use `async/await` in tests and `firstValueFrom` in the component (not `.subscribe()`). Mock dialog results with `of(...)` from `rxjs`.
