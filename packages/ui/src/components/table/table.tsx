import * as React from 'react';
import { cn, type VariantProps } from '../../lib/tv';
import { tableStyles } from './table.styles';

type Options = VariantProps<typeof tableStyles>;
const OptionsContext = React.createContext<Options>({});
const useS = () => tableStyles(React.useContext(OptionsContext));

export interface TableRootProps extends React.ComponentPropsWithRef<'table'>, Options {
  classNames?: { wrapper?: string };
}

/** The table in a rounded, horizontally scrolling frame (like the docs tables of crazy-hub). */
function TableRoot({ className, classNames, hover, dense, ...props }: TableRootProps) {
  const s = tableStyles({ hover, dense });
  return (
    <OptionsContext.Provider value={{ hover, dense }}>
      <div className={cn(s.wrapper(), classNames?.wrapper)}>
        <table className={cn(s.table(), className)} {...props} />
      </div>
    </OptionsContext.Provider>
  );
}
const TableHeader = ({ className, ...p }: React.ComponentPropsWithRef<'thead'>) => <thead className={cn(useS().header(), className)} {...p} />;
const TableBody = ({ className, ...p }: React.ComponentPropsWithRef<'tbody'>) => <tbody className={cn(useS().body(), className)} {...p} />;
const TableFooter = ({ className, ...p }: React.ComponentPropsWithRef<'tfoot'>) => <tfoot className={cn(useS().footer(), className)} {...p} />;
const TableRow = ({ className, ...p }: React.ComponentPropsWithRef<'tr'>) => <tr className={cn(useS().row(), className)} {...p} />;
const TableHead = ({ className, ...p }: React.ComponentPropsWithRef<'th'>) => <th className={cn(useS().head(), className)} {...p} />;
const TableCell = ({ className, ...p }: React.ComponentPropsWithRef<'td'>) => <td className={cn(useS().cell(), className)} {...p} />;
const TableCaption = ({ className, ...p }: React.ComponentPropsWithRef<'caption'>) => <caption className={cn(useS().caption(), className)} {...p} />;

export interface TableColumn<Row> {
  key: string;
  header: React.ReactNode;
  cell?: (row: Row) => React.ReactNode;
  className?: string;
}

export interface TableProps<Row> extends Omit<TableRootProps, 'children'> {
  columns: TableColumn<Row>[];
  rows: Row[];
  /** Stable key per row. @default index */
  rowKey?: (row: Row, index: number) => React.Key;
  caption?: React.ReactNode;
}

/** One-line form for simple data: `<Table columns={…} rows={…} />`. For sorting/filtering see Data Table. */
function TableSimple<Row extends Record<string, unknown>>({ columns, rows, rowKey, caption, ...props }: TableProps<Row>) {
  return (
    <TableRoot {...props}>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow>
          {columns.map((c) => (
            <TableHead key={c.key} className={c.className}>
              {c.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, i) => (
          <TableRow key={rowKey ? rowKey(row, i) : i}>
            {columns.map((c) => (
              <TableCell key={c.key} className={c.className}>
                {c.cell ? c.cell(row) : (row[c.key] as React.ReactNode)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </TableRoot>
  );
}

export const Table = Object.assign(TableSimple, {
  Root: TableRoot,
  Header: TableHeader,
  Body: TableBody,
  Footer: TableFooter,
  Row: TableRow,
  Head: TableHead,
  Cell: TableCell,
  Caption: TableCaption,
});
