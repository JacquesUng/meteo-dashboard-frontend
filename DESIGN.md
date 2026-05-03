# Design

## Page layout

Every routed page wraps its content in `.page-content` (defined in `styles.scss`):

```html
<div class="page-content">
  <!-- page body -->
</div>
```

This provides consistent padding (`2rem`) and a maximum width (`1200px`). The space above `.page-content` is reserved for a future page header.

## Tables

Use `mat-table` inside a `mat-card` to give the table visual boundaries and prevent it from stretching to the full viewport width.

```html
<div class="page-content">
  <mat-card appearance="outlined">
    <mat-card-content>
      <mat-table [dataSource]="...">
        ...
      </mat-table>
    </mat-card-content>
  </mat-card>
</div>
```

The table itself uses `width: 100%` scoped to the component, so it fills the card rather than the page.
