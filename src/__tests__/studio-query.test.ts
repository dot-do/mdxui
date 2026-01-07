/**
 * TDD RED Tests for studio.do Query and Results Integration Types
 *
 * These tests define the contract for QueryEditor and ResultsPanel components
 * that studio.do will implement for database management UI.
 */

import { describe, it, expect, expectTypeOf } from 'vitest'
import type { ComponentType } from 'react'

// Import types that should exist but don't yet (will fail)
import type {
  // QueryEditor types
  QueryEditorProps,
  SchemaDefinition,
  QueryHistoryEntry,
  SavedQuery,

  // ResultsPanel types
  ResultsPanelProps,
  ColumnMetadata,
  PaginationState,
  ExportFormat,
} from '../../studio'

// ============================================================================
// mdxui-9ep: QueryEditor Component Types
// ============================================================================

describe('QueryEditorProps', () => {
  it('should include sql property for current query', () => {
    expectTypeOf<QueryEditorProps>().toHaveProperty('sql')
    expectTypeOf<QueryEditorProps['sql']>().toEqualTypeOf<string>()
  })

  it('should include onChange handler for query updates', () => {
    expectTypeOf<QueryEditorProps>().toHaveProperty('onChange')
    expectTypeOf<QueryEditorProps['onChange']>().toEqualTypeOf<(sql: string) => void>()
  })

  it('should include onExecute handler for running queries', () => {
    expectTypeOf<QueryEditorProps>().toHaveProperty('onExecute')
    // onExecute can be sync or async
    expectTypeOf<QueryEditorProps['onExecute']>().toEqualTypeOf<() => void | Promise<void>>()
  })

  it('should include schema for SQL autocomplete', () => {
    expectTypeOf<QueryEditorProps>().toHaveProperty('schema')
    expectTypeOf<QueryEditorProps['schema']>().toEqualTypeOf<SchemaDefinition>()
  })

  it('should include history of executed queries', () => {
    expectTypeOf<QueryEditorProps>().toHaveProperty('history')
    expectTypeOf<QueryEditorProps['history']>().toEqualTypeOf<QueryHistoryEntry[]>()
  })

  it('should include savedQueries for reusable queries', () => {
    expectTypeOf<QueryEditorProps>().toHaveProperty('savedQueries')
    expectTypeOf<QueryEditorProps['savedQueries']>().toEqualTypeOf<SavedQuery[]>()
  })
})

describe('SchemaDefinition', () => {
  it('should include tables with columns for autocomplete', () => {
    expectTypeOf<SchemaDefinition>().toHaveProperty('tables')
    // Tables should be a record of table names to column definitions
    type ExpectedTables = Record<string, {
      columns: Array<{
        name: string
        type: string
        nullable: boolean
        primaryKey?: boolean
        foreignKey?: { table: string; column: string }
      }>
    }>
    expectTypeOf<SchemaDefinition['tables']>().toMatchTypeOf<ExpectedTables>()
  })

  it('should optionally include views', () => {
    expectTypeOf<SchemaDefinition>().toHaveProperty('views')
  })

  it('should optionally include functions/procedures', () => {
    expectTypeOf<SchemaDefinition>().toHaveProperty('functions')
  })
})

describe('QueryHistoryEntry', () => {
  it('should include the executed SQL', () => {
    expectTypeOf<QueryHistoryEntry>().toHaveProperty('sql')
    expectTypeOf<QueryHistoryEntry['sql']>().toEqualTypeOf<string>()
  })

  it('should include execution timestamp', () => {
    expectTypeOf<QueryHistoryEntry>().toHaveProperty('executedAt')
    expectTypeOf<QueryHistoryEntry['executedAt']>().toEqualTypeOf<Date>()
  })

  it('should include execution duration in milliseconds', () => {
    expectTypeOf<QueryHistoryEntry>().toHaveProperty('durationMs')
    expectTypeOf<QueryHistoryEntry['durationMs']>().toEqualTypeOf<number>()
  })

  it('should include row count from results', () => {
    expectTypeOf<QueryHistoryEntry>().toHaveProperty('rowCount')
    expectTypeOf<QueryHistoryEntry['rowCount']>().toEqualTypeOf<number>()
  })

  it('should optionally include error if query failed', () => {
    expectTypeOf<QueryHistoryEntry>().toHaveProperty('error')
    expectTypeOf<QueryHistoryEntry['error']>().toEqualTypeOf<string | undefined>()
  })
})

describe('SavedQuery', () => {
  it('should include unique identifier', () => {
    expectTypeOf<SavedQuery>().toHaveProperty('id')
    expectTypeOf<SavedQuery['id']>().toEqualTypeOf<string>()
  })

  it('should include human-readable name', () => {
    expectTypeOf<SavedQuery>().toHaveProperty('name')
    expectTypeOf<SavedQuery['name']>().toEqualTypeOf<string>()
  })

  it('should include the SQL query', () => {
    expectTypeOf<SavedQuery>().toHaveProperty('sql')
    expectTypeOf<SavedQuery['sql']>().toEqualTypeOf<string>()
  })

  it('should optionally include description', () => {
    expectTypeOf<SavedQuery>().toHaveProperty('description')
    expectTypeOf<SavedQuery['description']>().toEqualTypeOf<string | undefined>()
  })

  it('should include created timestamp', () => {
    expectTypeOf<SavedQuery>().toHaveProperty('createdAt')
    expectTypeOf<SavedQuery['createdAt']>().toEqualTypeOf<Date>()
  })

  it('should include updated timestamp', () => {
    expectTypeOf<SavedQuery>().toHaveProperty('updatedAt')
    expectTypeOf<SavedQuery['updatedAt']>().toEqualTypeOf<Date>()
  })
})

// ============================================================================
// mdxui-qon: ResultsPanel Component Types
// ============================================================================

describe('ResultsPanelProps', () => {
  it('should include rows of query results', () => {
    expectTypeOf<ResultsPanelProps>().toHaveProperty('rows')
    expectTypeOf<ResultsPanelProps['rows']>().toEqualTypeOf<Record<string, unknown>[]>()
  })

  it('should include column metadata', () => {
    expectTypeOf<ResultsPanelProps>().toHaveProperty('columns')
    expectTypeOf<ResultsPanelProps['columns']>().toEqualTypeOf<ColumnMetadata[]>()
  })

  it('should include pagination state', () => {
    expectTypeOf<ResultsPanelProps>().toHaveProperty('pagination')
    expectTypeOf<ResultsPanelProps['pagination']>().toEqualTypeOf<PaginationState>()
  })

  it('should include export format options', () => {
    expectTypeOf<ResultsPanelProps>().toHaveProperty('exportOptions')
    expectTypeOf<ResultsPanelProps['exportOptions']>().toEqualTypeOf<ExportFormat[]>()
  })

  it('should optionally include onCellEdit for inline editing', () => {
    expectTypeOf<ResultsPanelProps>().toHaveProperty('onCellEdit')
    expectTypeOf<ResultsPanelProps['onCellEdit']>().toEqualTypeOf<
      ((row: number, col: string, value: unknown) => void) | undefined
    >()
  })
})

describe('ColumnMetadata', () => {
  it('should include column name', () => {
    expectTypeOf<ColumnMetadata>().toHaveProperty('name')
    expectTypeOf<ColumnMetadata['name']>().toEqualTypeOf<string>()
  })

  it('should include column type', () => {
    expectTypeOf<ColumnMetadata>().toHaveProperty('type')
    expectTypeOf<ColumnMetadata['type']>().toEqualTypeOf<string>()
  })

  it('should include nullable flag', () => {
    expectTypeOf<ColumnMetadata>().toHaveProperty('nullable')
    expectTypeOf<ColumnMetadata['nullable']>().toEqualTypeOf<boolean>()
  })

  it('should optionally include display width', () => {
    expectTypeOf<ColumnMetadata>().toHaveProperty('width')
    expectTypeOf<ColumnMetadata['width']>().toEqualTypeOf<number | undefined>()
  })

  it('should optionally include sortable flag', () => {
    expectTypeOf<ColumnMetadata>().toHaveProperty('sortable')
    expectTypeOf<ColumnMetadata['sortable']>().toEqualTypeOf<boolean | undefined>()
  })

  it('should optionally include editable flag', () => {
    expectTypeOf<ColumnMetadata>().toHaveProperty('editable')
    expectTypeOf<ColumnMetadata['editable']>().toEqualTypeOf<boolean | undefined>()
  })
})

describe('PaginationState', () => {
  it('should include current page number', () => {
    expectTypeOf<PaginationState>().toHaveProperty('page')
    expectTypeOf<PaginationState['page']>().toEqualTypeOf<number>()
  })

  it('should include page size', () => {
    expectTypeOf<PaginationState>().toHaveProperty('pageSize')
    expectTypeOf<PaginationState['pageSize']>().toEqualTypeOf<number>()
  })

  it('should include total row count', () => {
    expectTypeOf<PaginationState>().toHaveProperty('totalRows')
    expectTypeOf<PaginationState['totalRows']>().toEqualTypeOf<number>()
  })

  it('should include total page count', () => {
    expectTypeOf<PaginationState>().toHaveProperty('totalPages')
    expectTypeOf<PaginationState['totalPages']>().toEqualTypeOf<number>()
  })

  it('should include onPageChange handler', () => {
    expectTypeOf<PaginationState>().toHaveProperty('onPageChange')
    expectTypeOf<PaginationState['onPageChange']>().toEqualTypeOf<(page: number) => void>()
  })

  it('should include onPageSizeChange handler', () => {
    expectTypeOf<PaginationState>().toHaveProperty('onPageSizeChange')
    expectTypeOf<PaginationState['onPageSizeChange']>().toEqualTypeOf<(size: number) => void>()
  })
})

describe('ExportFormat', () => {
  it('should be a union of supported export formats', () => {
    // ExportFormat should support common data export formats
    expectTypeOf<ExportFormat>().toEqualTypeOf<'csv' | 'json' | 'xlsx' | 'sql' | 'markdown'>()
  })
})

// ============================================================================
// Integration Tests: Type Compatibility
// ============================================================================

describe('QueryEditor and ResultsPanel Integration', () => {
  it('should allow QueryEditor history entry row counts to match ResultsPanel row counts', () => {
    // QueryHistoryEntry.rowCount should be compatible with ResultsPanelProps.rows.length
    const historyEntry: QueryHistoryEntry = {} as QueryHistoryEntry
    const resultsPanel: ResultsPanelProps = {} as ResultsPanelProps

    // Type check: these should be compatible number types
    const rowCount: number = historyEntry.rowCount
    const actualRows: number = resultsPanel.rows.length
    expect(typeof rowCount).toBe('number')
    expect(typeof actualRows).toBe('number')
  })

  it('should allow schema columns to inform ResultsPanel column metadata', () => {
    // Schema definition columns should have compatible info for ColumnMetadata
    const schema: SchemaDefinition = {} as SchemaDefinition
    const columns: ColumnMetadata[] = [] as ColumnMetadata[]

    // Both should have name and type as strings
    type SchemaColumn = NonNullable<SchemaDefinition['tables']>[string]['columns'][number]
    expectTypeOf<SchemaColumn['name']>().toEqualTypeOf<string>()
    expectTypeOf<SchemaColumn['type']>().toEqualTypeOf<string>()
    expectTypeOf<ColumnMetadata['name']>().toEqualTypeOf<string>()
    expectTypeOf<ColumnMetadata['type']>().toEqualTypeOf<string>()
  })
})
