/**
 * TDD RED Tests for studio.do Integration Types
 *
 * These tests define the type contracts for studio.do - a Durable Object-native
 * database management UI for AI agents. The types extend the base app-types
 * Shell pattern to provide database-specific functionality.
 *
 * @see mdxui-6tf - StudioShell type extends AppShell
 * @see mdxui-5ex - SchemaBrowser component types
 */

import { describe, it, expect, expectTypeOf } from 'vitest'
import type { z } from 'zod'

// =============================================================================
// Expected Type Imports (will fail until GREEN phase implements them)
// =============================================================================

import type {
  // StudioShell types (mdxui-6tf)
  StudioShellProps,
  StudioShellPropsSchema,
  DatabaseConnection,
  DatabaseConnectionSchema,
  SchemaViewState,
  SchemaViewStateSchema,
  QueryPaneState,
  QueryPaneStateSchema,
  ConnectionStatus,
  ConnectionStatusSchema,

  // SchemaBrowser types (mdxui-5ex)
  SchemaBrowserProps,
  SchemaBrowserPropsSchema,
  TableSchema,
  TableSchemaSchema,
  ColumnDefinition,
  ColumnDefinitionSchema,
  IndexDefinition,
  IndexDefinitionSchema,
  ForeignKeyDefinition,
  ForeignKeyDefinitionSchema,
  ERDiagramMode,
  ERDiagramModeSchema,
} from '../studio'

// Base ShellProps to verify extension
import type { ShellProps } from '@mdxui/app'

// =============================================================================
// mdxui-6tf: StudioShell Type Tests
// =============================================================================

describe('StudioShell Types (mdxui-6tf)', () => {
  describe('DatabaseConnection', () => {
    it('should have required connection properties', () => {
      const connection: DatabaseConnection = {
        id: 'conn-123',
        name: 'Production DB',
        type: 'sqlite',
        status: 'connected',
        durableObjectId: 'do-abc123',
      }

      expect(connection.id).toBe('conn-123')
      expect(connection.name).toBe('Production DB')
      expect(connection.type).toBe('sqlite')
      expect(connection.status).toBe('connected')
      expect(connection.durableObjectId).toBe('do-abc123')
    })

    it('should support optional connection metadata', () => {
      const connection: DatabaseConnection = {
        id: 'conn-456',
        name: 'Dev DB',
        type: 'd1',
        status: 'connecting',
        durableObjectId: 'do-def456',
        lastConnectedAt: new Date().toISOString(),
        databaseName: 'my-database',
        region: 'enam',
      }

      expectTypeOf(connection.lastConnectedAt).toEqualTypeOf<string | undefined>()
      expectTypeOf(connection.databaseName).toEqualTypeOf<string | undefined>()
      expectTypeOf(connection.region).toEqualTypeOf<string | undefined>()
    })

    it('should validate connection status enum values', () => {
      const statuses: ConnectionStatus[] = [
        'disconnected',
        'connecting',
        'connected',
        'error',
      ]

      expect(statuses).toHaveLength(4)
      statuses.forEach((status) => {
        expectTypeOf(status).toEqualTypeOf<ConnectionStatus>()
      })
    })

    it('should validate database types', () => {
      const types: DatabaseConnection['type'][] = [
        'sqlite',
        'd1',
        'durable-object',
        'external',
      ]

      types.forEach((type) => {
        const conn: DatabaseConnection = {
          id: 'test',
          name: 'test',
          type,
          status: 'connected',
          durableObjectId: 'do-test',
        }
        expect(conn.type).toBe(type)
      })
    })

    it('should have a valid zod schema', () => {
      expectTypeOf(DatabaseConnectionSchema).toEqualTypeOf<z.ZodType<DatabaseConnection>>()
    })
  })

  describe('SchemaViewState', () => {
    it('should track the current schema view configuration', () => {
      const state: SchemaViewState = {
        selectedTable: 'users',
        expandedTables: ['users', 'posts'],
        viewMode: 'tree',
        filterText: '',
        showSystemTables: false,
      }

      expect(state.selectedTable).toBe('users')
      expect(state.expandedTables).toContain('users')
      expect(state.viewMode).toBe('tree')
    })

    it('should support different view modes', () => {
      const modes: SchemaViewState['viewMode'][] = ['tree', 'list', 'diagram']

      modes.forEach((mode) => {
        const state: SchemaViewState = {
          expandedTables: [],
          viewMode: mode,
          filterText: '',
          showSystemTables: false,
        }
        expect(state.viewMode).toBe(mode)
      })
    })

    it('should have a valid zod schema', () => {
      expectTypeOf(SchemaViewStateSchema).toEqualTypeOf<z.ZodType<SchemaViewState>>()
    })
  })

  describe('QueryPaneState', () => {
    it('should track the query editor state', () => {
      const state: QueryPaneState = {
        query: 'SELECT * FROM users',
        selectedDatabase: 'conn-123',
        isExecuting: false,
        history: [],
        savedQueries: [],
      }

      expect(state.query).toBe('SELECT * FROM users')
      expect(state.selectedDatabase).toBe('conn-123')
      expect(state.isExecuting).toBe(false)
    })

    it('should track query history', () => {
      const state: QueryPaneState = {
        query: 'SELECT * FROM posts',
        selectedDatabase: 'conn-123',
        isExecuting: false,
        history: [
          {
            query: 'SELECT * FROM users',
            executedAt: new Date().toISOString(),
            duration: 45,
            rowCount: 100,
            success: true,
          },
          {
            query: 'SELECT * FROM invalid',
            executedAt: new Date().toISOString(),
            duration: 10,
            success: false,
            error: 'Table not found',
          },
        ],
        savedQueries: [],
      }

      expect(state.history).toHaveLength(2)
      expect(state.history[0].success).toBe(true)
      expect(state.history[1].success).toBe(false)
    })

    it('should support saved queries', () => {
      const state: QueryPaneState = {
        query: '',
        selectedDatabase: 'conn-123',
        isExecuting: false,
        history: [],
        savedQueries: [
          {
            id: 'sq-1',
            name: 'Get active users',
            query: 'SELECT * FROM users WHERE active = 1',
            createdAt: new Date().toISOString(),
          },
        ],
      }

      expect(state.savedQueries).toHaveLength(1)
      expect(state.savedQueries[0].name).toBe('Get active users')
    })

    it('should have a valid zod schema', () => {
      expectTypeOf(QueryPaneStateSchema).toEqualTypeOf<z.ZodType<QueryPaneState>>()
    })
  })

  describe('StudioShellProps', () => {
    it('should extend base ShellProps', () => {
      // StudioShellProps must include all ShellProps fields
      const props: StudioShellProps = {
        // Base ShellProps
        sidebar: true,
        header: true,
        sidebarCollapsed: false,
        children: null,

        // studio.do specific fields
        activeConnection: {
          id: 'conn-123',
          name: 'Production',
          type: 'sqlite',
          status: 'connected',
          durableObjectId: 'do-abc',
        },
        schemaView: {
          expandedTables: [],
          viewMode: 'tree',
          filterText: '',
          showSystemTables: false,
        },
        queryPane: {
          query: '',
          selectedDatabase: 'conn-123',
          isExecuting: false,
          history: [],
          savedQueries: [],
        },
      }

      // Verify it extends ShellProps
      const shellProps: ShellProps = props
      expect(shellProps.sidebar).toBe(true)

      // Verify studio-specific fields
      expect(props.activeConnection.status).toBe('connected')
      expect(props.schemaView.viewMode).toBe('tree')
      expect(props.queryPane.isExecuting).toBe(false)
    })

    it('should support optional connections list', () => {
      const props: StudioShellProps = {
        sidebar: true,
        header: true,
        sidebarCollapsed: false,
        children: null,
        activeConnection: {
          id: 'conn-1',
          name: 'Main',
          type: 'd1',
          status: 'connected',
          durableObjectId: 'do-1',
        },
        schemaView: {
          expandedTables: [],
          viewMode: 'tree',
          filterText: '',
          showSystemTables: false,
        },
        queryPane: {
          query: '',
          selectedDatabase: 'conn-1',
          isExecuting: false,
          history: [],
          savedQueries: [],
        },
        connections: [
          {
            id: 'conn-1',
            name: 'Main',
            type: 'd1',
            status: 'connected',
            durableObjectId: 'do-1',
          },
          {
            id: 'conn-2',
            name: 'Secondary',
            type: 'sqlite',
            status: 'disconnected',
            durableObjectId: 'do-2',
          },
        ],
      }

      expectTypeOf(props.connections).toEqualTypeOf<DatabaseConnection[] | undefined>()
      expect(props.connections).toHaveLength(2)
    })

    it('should support event handlers', () => {
      const props: StudioShellProps = {
        sidebar: true,
        header: true,
        sidebarCollapsed: false,
        children: null,
        activeConnection: {
          id: 'conn-1',
          name: 'Test',
          type: 'sqlite',
          status: 'connected',
          durableObjectId: 'do-1',
        },
        schemaView: {
          expandedTables: [],
          viewMode: 'tree',
          filterText: '',
          showSystemTables: false,
        },
        queryPane: {
          query: '',
          selectedDatabase: 'conn-1',
          isExecuting: false,
          history: [],
          savedQueries: [],
        },
        onConnectionChange: (connection) => {},
        onQueryExecute: (query) => {},
        onSchemaRefresh: () => {},
      }

      expectTypeOf(props.onConnectionChange).toEqualTypeOf<
        ((connection: DatabaseConnection) => void) | undefined
      >()
      expectTypeOf(props.onQueryExecute).toEqualTypeOf<((query: string) => void) | undefined>()
      expectTypeOf(props.onSchemaRefresh).toEqualTypeOf<(() => void) | undefined>()
    })

    it('should have a valid zod schema', () => {
      expectTypeOf(StudioShellPropsSchema).toEqualTypeOf<z.ZodType<StudioShellProps>>()
    })
  })
})

// =============================================================================
// mdxui-5ex: SchemaBrowser Component Type Tests
// =============================================================================

describe('SchemaBrowser Types (mdxui-5ex)', () => {
  describe('TableSchema', () => {
    it('should define table metadata', () => {
      const table: TableSchema = {
        name: 'users',
        type: 'table',
        rowCount: 1000,
        columns: [],
        indexes: [],
        foreignKeys: [],
      }

      expect(table.name).toBe('users')
      expect(table.type).toBe('table')
      expect(table.rowCount).toBe(1000)
    })

    it('should support views and virtual tables', () => {
      const types: TableSchema['type'][] = ['table', 'view', 'virtual']

      types.forEach((type) => {
        const table: TableSchema = {
          name: 'test',
          type,
          columns: [],
          indexes: [],
          foreignKeys: [],
        }
        expect(table.type).toBe(type)
      })
    })

    it('should include SQL definition for views', () => {
      const view: TableSchema = {
        name: 'active_users',
        type: 'view',
        columns: [],
        indexes: [],
        foreignKeys: [],
        sql: 'SELECT * FROM users WHERE active = 1',
      }

      expectTypeOf(view.sql).toEqualTypeOf<string | undefined>()
      expect(view.sql).toContain('SELECT')
    })

    it('should have a valid zod schema', () => {
      expectTypeOf(TableSchemaSchema).toEqualTypeOf<z.ZodType<TableSchema>>()
    })
  })

  describe('ColumnDefinition', () => {
    it('should define column properties', () => {
      const column: ColumnDefinition = {
        name: 'id',
        type: 'INTEGER',
        nullable: false,
        primaryKey: true,
        autoIncrement: true,
        position: 0,
      }

      expect(column.name).toBe('id')
      expect(column.type).toBe('INTEGER')
      expect(column.nullable).toBe(false)
      expect(column.primaryKey).toBe(true)
    })

    it('should support default values', () => {
      const column: ColumnDefinition = {
        name: 'created_at',
        type: 'TEXT',
        nullable: false,
        primaryKey: false,
        defaultValue: "datetime('now')",
        position: 1,
      }

      expectTypeOf(column.defaultValue).toEqualTypeOf<string | undefined>()
      expect(column.defaultValue).toBeDefined()
    })

    it('should support foreign key references', () => {
      const column: ColumnDefinition = {
        name: 'user_id',
        type: 'INTEGER',
        nullable: false,
        primaryKey: false,
        position: 2,
        references: {
          table: 'users',
          column: 'id',
        },
      }

      expect(column.references?.table).toBe('users')
      expect(column.references?.column).toBe('id')
    })

    it('should have a valid zod schema', () => {
      expectTypeOf(ColumnDefinitionSchema).toEqualTypeOf<z.ZodType<ColumnDefinition>>()
    })
  })

  describe('IndexDefinition', () => {
    it('should define index properties', () => {
      const index: IndexDefinition = {
        name: 'idx_users_email',
        columns: ['email'],
        unique: true,
        partial: false,
      }

      expect(index.name).toBe('idx_users_email')
      expect(index.columns).toContain('email')
      expect(index.unique).toBe(true)
    })

    it('should support compound indexes', () => {
      const index: IndexDefinition = {
        name: 'idx_posts_user_created',
        columns: ['user_id', 'created_at'],
        unique: false,
        partial: false,
      }

      expect(index.columns).toHaveLength(2)
    })

    it('should support partial indexes with WHERE clause', () => {
      const index: IndexDefinition = {
        name: 'idx_active_users',
        columns: ['email'],
        unique: true,
        partial: true,
        where: 'active = 1',
      }

      expectTypeOf(index.where).toEqualTypeOf<string | undefined>()
      expect(index.partial).toBe(true)
      expect(index.where).toBeDefined()
    })

    it('should have a valid zod schema', () => {
      expectTypeOf(IndexDefinitionSchema).toEqualTypeOf<z.ZodType<IndexDefinition>>()
    })
  })

  describe('ForeignKeyDefinition', () => {
    it('should define foreign key constraints', () => {
      const fk: ForeignKeyDefinition = {
        name: 'fk_posts_user',
        columns: ['user_id'],
        referencedTable: 'users',
        referencedColumns: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION',
      }

      expect(fk.name).toBe('fk_posts_user')
      expect(fk.referencedTable).toBe('users')
      expect(fk.onDelete).toBe('CASCADE')
    })

    it('should support compound foreign keys', () => {
      const fk: ForeignKeyDefinition = {
        name: 'fk_order_items_product',
        columns: ['product_id', 'variant_id'],
        referencedTable: 'product_variants',
        referencedColumns: ['product_id', 'id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      }

      expect(fk.columns).toHaveLength(2)
      expect(fk.referencedColumns).toHaveLength(2)
    })

    it('should support all referential action types', () => {
      const actions: ForeignKeyDefinition['onDelete'][] = [
        'CASCADE',
        'SET NULL',
        'SET DEFAULT',
        'RESTRICT',
        'NO ACTION',
      ]

      actions.forEach((action) => {
        const fk: ForeignKeyDefinition = {
          columns: ['ref_id'],
          referencedTable: 'refs',
          referencedColumns: ['id'],
          onDelete: action,
          onUpdate: action,
        }
        expect(fk.onDelete).toBe(action)
      })
    })

    it('should have a valid zod schema', () => {
      expectTypeOf(ForeignKeyDefinitionSchema).toEqualTypeOf<z.ZodType<ForeignKeyDefinition>>()
    })
  })

  describe('ERDiagramMode', () => {
    it('should define ER diagram display modes', () => {
      const modes: ERDiagramMode[] = [
        'simple',
        'detailed',
        'relationships-only',
      ]

      modes.forEach((mode) => {
        expectTypeOf(mode).toEqualTypeOf<ERDiagramMode>()
      })
    })

    it('should have a valid zod schema', () => {
      expectTypeOf(ERDiagramModeSchema).toEqualTypeOf<z.ZodType<ERDiagramMode>>()
    })
  })

  describe('SchemaBrowserProps', () => {
    it('should include all required schema properties', () => {
      const props: SchemaBrowserProps = {
        tables: [
          {
            name: 'users',
            type: 'table',
            columns: [],
            indexes: [],
            foreignKeys: [],
          },
        ],
        columns: [
          {
            name: 'id',
            type: 'INTEGER',
            nullable: false,
            primaryKey: true,
            position: 0,
          },
        ],
        indexes: [
          {
            name: 'idx_users_pk',
            columns: ['id'],
            unique: true,
            partial: false,
          },
        ],
        foreignKeys: [],
        erDiagramMode: false,
      }

      expect(props.tables).toHaveLength(1)
      expect(props.columns).toHaveLength(1)
      expect(props.indexes).toHaveLength(1)
      expect(props.erDiagramMode).toBe(false)
    })

    it('should support ER diagram mode with configuration', () => {
      const props: SchemaBrowserProps = {
        tables: [],
        columns: [],
        indexes: [],
        foreignKeys: [],
        erDiagramMode: true,
        erDiagramConfig: {
          mode: 'detailed',
          showColumnTypes: true,
          showIndexes: false,
          layout: 'hierarchical',
        },
      }

      expect(props.erDiagramMode).toBe(true)
      expect(props.erDiagramConfig?.mode).toBe('detailed')
    })

    it('should support table selection and expansion', () => {
      const props: SchemaBrowserProps = {
        tables: [],
        columns: [],
        indexes: [],
        foreignKeys: [],
        erDiagramMode: false,
        selectedTable: 'users',
        expandedTables: ['users', 'posts'],
        onTableSelect: (tableName) => {},
        onTableExpand: (tableName) => {},
      }

      expectTypeOf(props.selectedTable).toEqualTypeOf<string | undefined>()
      expectTypeOf(props.expandedTables).toEqualTypeOf<string[] | undefined>()
      expectTypeOf(props.onTableSelect).toEqualTypeOf<
        ((tableName: string) => void) | undefined
      >()
    })

    it('should support filtering and search', () => {
      const props: SchemaBrowserProps = {
        tables: [],
        columns: [],
        indexes: [],
        foreignKeys: [],
        erDiagramMode: false,
        filterText: 'user',
        showSystemTables: false,
        onFilterChange: (text) => {},
      }

      expectTypeOf(props.filterText).toEqualTypeOf<string | undefined>()
      expectTypeOf(props.showSystemTables).toEqualTypeOf<boolean | undefined>()
    })

    it('should have a valid zod schema', () => {
      expectTypeOf(SchemaBrowserPropsSchema).toEqualTypeOf<z.ZodType<SchemaBrowserProps>>()
    })
  })
})
