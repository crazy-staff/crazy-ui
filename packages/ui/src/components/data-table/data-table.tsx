import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_arrIncludesSome,
  filterFn_equals,
  filterFn_includesString,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_basic,
  sortFn_datetime,
  sortFn_text,
  tableFeatures,
  useTable,
  type Column,
  type ColumnDef,
  type ReactTable,
  type Row,
  type RowData,
  type TableOptions,
} from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ChevronsUpDown, Search, Settings2 } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../lib/tv';
import { Button } from '../button/button';
import { Checkbox } from '../checkbox/checkbox';
import { DropdownMenu } from '../dropdown-menu/dropdown-menu';
import { InputGroup } from '../input-group/input-group';
import { Pagination } from '../pagination/pagination';
import { Table, type TableRootProps } from '../table/table';
import { dataTableStyles } from './data-table.styles';

const s = dataTableStyles();

/** What a column can tell the data table through `meta`. */
export interface DataTableColumnMeta {
  /**
   * A fixed width (px number or any CSS length). The table uses a fixed layout, so widths never jump
   * when sorting, paging or selecting; columns without a width share the space that's left.
   * Give one to short columns (status, numbers, dates).
   */
  width?: number | string;
}

/** Room a column without a width keeps before the table starts to scroll sideways. */
const MIN_FLEX_WIDTH = 140;
const SELECT_WIDTH = 48;

/**
 * The TanStack Table v9 features a data table uses: sorting, column + global filtering, column
 * visibility, row selection and pagination (client side). Pass it to `createColumnHelper` so column
 * definitions are typed against the same features.
 */
export const dataTableFeatures = tableFeatures({
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: { alphanumeric: sortFn_alphanumeric, basic: sortFn_basic, datetime: sortFn_datetime, text: sortFn_text },
  columnFilteringFeature,
  globalFilteringFeature,
  filteredRowModel: createFilteredRowModel(),
  filterFns: { includesString: filterFn_includesString, equals: filterFn_equals, arrIncludesSome: filterFn_arrIncludesSome },
  columnVisibilityFeature,
  rowSelectionFeature,
  rowPaginationFeature,
  paginatedRowModel: createPaginatedRowModel(),
  columnMeta: {} as DataTableColumnMeta,
});

export type DataTableFeatures = typeof dataTableFeatures;
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- columns of one table hold different value types
export type DataTableColumn<TData extends RowData> = ColumnDef<DataTableFeatures, TData, any>;
export type DataTableInstance<TData extends RowData> = ReactTable<DataTableFeatures, TData>;

/** A column helper typed for data tables: `const col = createDataTableColumns<Post>()`. */
export function createDataTableColumns<TData extends RowData>() {
  return createColumnHelper<DataTableFeatures, TData>();
}

type Options<TData extends RowData> = Omit<TableOptions<DataTableFeatures, TData>, 'features' | 'columns'>;

export interface UseDataTableOptions<TData extends RowData> extends Options<TData> {
  columns: DataTableColumn<TData>[];
  /** Add a checkbox column to select rows. */
  selectable?: boolean;
  /** Rows per page. @default 10 */
  pageSize?: number;
}

const selectColumn = <TData extends RowData>(): DataTableColumn<TData> => ({
  id: 'select',
  enableSorting: false,
  enableHiding: false,
  enableGlobalFilter: false,
  header: ({ table }) => (
    <Checkbox
      aria-label="Select all rows on this page"
      checked={table.getIsAllPageRowsSelected()}
      indeterminate={table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()}
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(value)}
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      aria-label="Select row"
      checked={row.getIsSelected()}
      disabled={!row.getCanSelect()}
      onCheckedChange={(_value, details) => row.getToggleSelectedHandler()(details.event)}
    />
  ),
});

/**
 * Creates the table instance for the compound form. Keep `columns` and `data` stable (module scope,
 * state or `useMemo`), otherwise the row models rebuild on every render.
 */
export function useDataTable<TData extends RowData>({ columns, selectable = false, pageSize = 10, initialState, ...options }: UseDataTableOptions<TData>) {
  const allColumns = React.useMemo(() => (selectable ? [selectColumn<TData>(), ...columns] : columns), [columns, selectable]);
  return useTable({
    features: dataTableFeatures,
    columns: allColumns,
    globalFilterFn: 'includesString',
    initialState: { pagination: { pageIndex: 0, pageSize }, ...initialState },
    ...options,
  } as TableOptions<DataTableFeatures, TData>);
}

const DataTableContext = React.createContext<{ table: DataTableInstance<RowData> } | null>(null);

/** The table instance inside `DataTable.Root`. */
export function useDataTableContext<TData extends RowData = RowData>() {
  const ctx = React.useContext(DataTableContext);
  if (!ctx) throw new Error('DataTable parts must be used inside <DataTable.Root>');
  return ctx.table as unknown as DataTableInstance<TData>;
}

/** The header text of a column, for menus: a string header, else the column id. */
function columnLabel<TData extends RowData>(column: Column<DataTableFeatures, TData>) {
  const header = column.columnDef.header;
  return typeof header === 'string' ? header : column.id;
}

export interface DataTableRootProps<TData extends RowData> extends React.ComponentPropsWithRef<'div'> {
  table: DataTableInstance<TData>;
}

function DataTableRoot<TData extends RowData>({ table, className, ...props }: DataTableRootProps<TData>) {
  // a fresh value each render, so parts follow the table state the owner re-renders with
  const value = { table: table as unknown as DataTableInstance<RowData> };
  return (
    <DataTableContext.Provider value={value}>
      <div className={cn(s.root(), className)} {...props} />
    </DataTableContext.Provider>
  );
}

const DataTableToolbar = ({ className, ...p }: React.ComponentPropsWithRef<'div'>) => <div className={cn(s.toolbar(), className)} {...p} />;

export interface DataTableSearchProps {
  placeholder?: string;
  /** Filter one column instead of all of them. */
  column?: string;
  className?: string;
  'aria-label'?: string;
}

/** A search field that filters the rows (all columns, or one with `column`). */
function DataTableSearch({ placeholder = 'Filter…', column, className, 'aria-label': label }: DataTableSearchProps) {
  const table = useDataTableContext();
  const target = column ? table.getColumn(column) : undefined;
  const value = (target ? target.getFilterValue() : table.state.globalFilter) as string | undefined;
  return (
    <InputGroup
      start={<Search aria-hidden />}
      size="sm"
      className={cn(s.search(), className)}
      placeholder={placeholder}
      aria-label={label ?? placeholder}
      value={value ?? ''}
      onChange={(event) => {
        const next = (event.target as HTMLInputElement).value;
        if (target) target.setFilterValue(next);
        else table.setGlobalFilter(next);
      }}
    />
  );
}

/** A "View" menu with one checkbox per column that can be hidden. */
function DataTableColumnToggle({ label = 'View', className }: { label?: React.ReactNode; className?: string }) {
  const table = useDataTableContext();
  const columns = table.getAllLeafColumns().filter((c) => c.getCanHide());
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger render={<Button variant="outline" size="sm" className={cn('ms-auto', className)} />}>
        <Settings2 aria-hidden />
        {label}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end" className="min-w-44">
        <DropdownMenu.Group>
          <DropdownMenu.GroupLabel>Columns</DropdownMenu.GroupLabel>
          {columns.map((column) => (
            <DropdownMenu.CheckboxItem
              key={column.id}
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(value)}
            >
              {columnLabel(column)}
            </DropdownMenu.CheckboxItem>
          ))}
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export interface DataTableContentProps extends Omit<TableRootProps, 'children' | 'layout'> {
  /** Shown in one row when no rows match. @default 'No results.' */
  empty?: React.ReactNode;
  /** Called when a row is clicked (open a post, a tester). */
  onRowClick?: (row: Row<DataTableFeatures, RowData>) => void;
}

/** The table: sortable headers, selectable rows, an empty row when nothing matches. */
function DataTableContent({ empty = 'No results.', onRowClick, hover, style, ...props }: DataTableContentProps) {
  const table = useDataTableContext();
  const rows = table.getRowModel().rows;
  // A fixed layout with one <col> per column: widths come from here, never from the rows on screen.
  const columns = table.getVisibleLeafColumns();
  const widthOf = (column: (typeof columns)[number]) =>
    column.id === 'select' ? SELECT_WIDTH : (column.columnDef.meta as DataTableColumnMeta | undefined)?.width;
  const minWidth = columns
    .map((c) => widthOf(c))
    .map((w) => (w === undefined ? `${MIN_FLEX_WIDTH}px` : typeof w === 'number' ? `${w}px` : w))
    .join(' + ');
  return (
    <Table.Root layout="fixed" hover={hover ?? Boolean(onRowClick)} style={{ minWidth: `calc(${minWidth})`, ...style }} {...props}>
      <colgroup>
        {columns.map((c) => {
          const width = widthOf(c);
          return <col key={c.id} style={width === undefined ? undefined : { width }} />;
        })}
      </colgroup>
      <Table.Header>
        {table.getHeaderGroups().map((group) => (
          <Table.Row key={group.id}>
            {group.headers.map((header) => {
              const sorted = header.column.getIsSorted();
              return (
                <Table.Head
                  key={header.id}
                  colSpan={header.colSpan}
                  aria-sort={sorted === 'asc' ? 'ascending' : sorted === 'desc' ? 'descending' : undefined}
                  className={cn(header.column.id === 'select' && s.selectCell())}
                >
                  {header.isPlaceholder ? null : header.column.getCanSort() ? (
                    <button
                      type="button"
                      className={s.sortButton()}
                      data-sorted={sorted || undefined}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <table.FlexRender header={header} />
                      {sorted === 'asc' ? (
                        <ArrowUp aria-hidden className={s.sortIcon()} />
                      ) : sorted === 'desc' ? (
                        <ArrowDown aria-hidden className={s.sortIcon()} />
                      ) : (
                        <ChevronsUpDown aria-hidden className={s.sortIcon()} />
                      )}
                    </button>
                  ) : (
                    <table.FlexRender header={header} />
                  )}
                </Table.Head>
              );
            })}
          </Table.Row>
        ))}
      </Table.Header>
      <Table.Body>
        {rows.length ? (
          rows.map((row) => (
            <Table.Row
              key={row.id}
              data-state={row.getIsSelected() ? 'selected' : undefined}
              aria-selected={row.getCanSelect() ? row.getIsSelected() : undefined}
              className={cn(row.getIsSelected() && s.selectedRow(), onRowClick && 'cursor-pointer')}
              onClick={onRowClick ? (event) => !(event.target as Element).closest('button,a,input,label') && onRowClick(row) : undefined}
            >
              {row.getVisibleCells().map((cell) => (
                <Table.Cell key={cell.id} className={cn(cell.column.id === 'select' && s.selectCell())}>
                  <table.FlexRender cell={cell} />
                </Table.Cell>
              ))}
            </Table.Row>
          ))
        ) : (
          <Table.Row>
            <Table.Cell colSpan={table.getVisibleLeafColumns().length} className={s.empty()}>
              {empty}
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table.Root>
  );
}

/** "2 of 12 selected" when rows can be selected, otherwise the number of rows. */
function DataTableCount({ className }: { className?: string }) {
  const table = useDataTableContext();
  const total = table.getFilteredRowModel().rows.length;
  const selectable = table.getAllLeafColumns().some((c) => c.id === 'select');
  return (
    <p className={cn(s.count(), className)} aria-live="polite">
      {selectable
        ? `${table.getFilteredSelectedRowModel().rows.length} of ${total} selected`
        : `${total} ${total === 1 ? 'row' : 'rows'}`}
    </p>
  );
}

/** Our Pagination bound to the table's pages. Hidden when everything fits on one page. */
function DataTablePagination({ className }: { className?: string }) {
  const table = useDataTableContext();
  const total = table.getPageCount();
  if (total <= 1) return null;
  return (
    <Pagination
      className={className}
      page={table.state.pagination.pageIndex + 1}
      total={total}
      onPageChange={(page) => table.setPageIndex(page - 1)}
    />
  );
}

const DataTableFooter = ({ className, ...p }: React.ComponentPropsWithRef<'div'>) => <div className={cn(s.footer(), className)} {...p} />;

export interface DataTableProps<TData extends RowData> extends UseDataTableOptions<TData> {
  /** Show the search field; a string sets its placeholder. @default true */
  search?: boolean | string;
  /** Filter only this column with the search field. */
  searchColumn?: string;
  /** Show the column visibility menu. @default true */
  columnToggle?: boolean;
  /** Extra controls in the toolbar (filters, a "New" button). */
  toolbar?: React.ReactNode;
  empty?: React.ReactNode;
  onRowClick?: (row: Row<DataTableFeatures, TData>) => void;
  /** Tighter rows. */
  dense?: boolean;
  className?: string;
}

/**
 * Sorting, filtering, row selection, column visibility and pagination on our Table.
 *   <DataTable columns={columns} data={posts} getRowId={(p) => p.id} selectable />
 * or compound: `useDataTable()` + DataTable.Root / Toolbar / Search / ColumnToggle / Content / Footer /
 * Count / Pagination.
 */
function DataTableSimple<TData extends RowData>({
  search = true,
  searchColumn,
  columnToggle = true,
  toolbar,
  empty,
  onRowClick,
  dense,
  className,
  ...options
}: DataTableProps<TData>) {
  const table = useDataTable(options);
  return (
    <DataTableRoot table={table} className={className}>
      {(search || columnToggle || toolbar) && (
        <DataTableToolbar>
          {search && <DataTableSearch column={searchColumn} placeholder={typeof search === 'string' ? search : undefined} />}
          {toolbar}
          {columnToggle && <DataTableColumnToggle />}
        </DataTableToolbar>
      )}
      <DataTableContent empty={empty} onRowClick={onRowClick as DataTableContentProps['onRowClick']} dense={dense} />
      <DataTableFooter>
        <DataTableCount />
        <DataTablePagination />
      </DataTableFooter>
    </DataTableRoot>
  );
}

export const DataTable = Object.assign(DataTableSimple, {
  Root: DataTableRoot,
  Toolbar: DataTableToolbar,
  Search: DataTableSearch,
  ColumnToggle: DataTableColumnToggle,
  Content: DataTableContent,
  Footer: DataTableFooter,
  Count: DataTableCount,
  Pagination: DataTablePagination,
});
