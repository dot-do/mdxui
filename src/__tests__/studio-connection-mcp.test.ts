/**
 * studio.do Integration Types - TDD RED Tests
 *
 * These tests verify the type definitions for:
 * - ConnectionManager: Database connection management for Turso, D1, Supabase.do
 * - MCPToolsPanel: MCP (Model Context Protocol) tool integration for AI-native operations
 *
 * TDD RED Phase: Tests are designed to FAIL until types are properly implemented.
 * Using expectTypeOf().not.toBeNever() to ensure types are not stub `never` types.
 *
 * @see https://studio.do
 */

import { describe, it, expect, expectTypeOf } from 'vitest'

// =============================================================================
// Connection Types - To be implemented in studio/index.ts
// =============================================================================

import type {
  // Core connection types
  DatabaseConnection,
  ConnectionConfig,
  ConnectionStatus,
  TestResult,

  // Adapter-specific configs
  TursoConnectionConfig,
  D1ConnectionConfig,
  SupabaseConnectionConfig,

  // Component props
  ConnectionManagerProps,
  ConnectionFormProps,
  ConnectionSelectorProps,

  // MCP tool types
  MCPToolDefinition,
  MCPToolParameter,
  ToolInvocation,
  InvocationResult,

  // Natural language query types
  NaturalLanguageQueryProps,

  // MCP Component props
  MCPToolsPanelProps,
  ToolListProps,
  ToolInvocationFormProps,
  ToolHistoryProps,
} from '../studio'

import {
  // Zod schemas for runtime validation
  TursoConnectionConfigSchema,
  D1ConnectionConfigSchema,
  SupabaseConnectionConfigSchema,
  ConnectionConfigSchema,
  TestResultSchema,
  ConnectionManagerPropsSchema,
  ConnectionFormPropsSchema,
  ConnectionSelectorPropsSchema,
  MCPToolParameterSchema,
  MCPToolDefinitionSchema,
  InvocationResultSchema,
  ToolInvocationSchema,
  NaturalLanguageQueryPropsSchema,
  MCPToolsPanelPropsSchema,
  ToolListPropsSchema,
  ToolInvocationFormPropsSchema,
  ToolHistoryPropsSchema,
} from '../studio'

// =============================================================================
// mdxui-6ol: [RED] Test ConnectionManager types
// =============================================================================

describe('ConnectionManager Types (mdxui-6ol)', () => {
  describe('ConnectionStatus', () => {
    it('should not be never type', () => {
      // RED: Will fail until ConnectionStatus is properly defined
      expectTypeOf<ConnectionStatus>().not.toBeNever()
    })

    it('should be a union of connection states', () => {
      // RED: Will fail until ConnectionStatus is a proper union type
      expectTypeOf<ConnectionStatus>().toEqualTypeOf<
        'connected' | 'disconnected' | 'connecting' | 'error'
      >()
    })
  })

  describe('TursoConnectionConfig', () => {
    it('should not be never type', () => {
      expectTypeOf<TursoConnectionConfig>().not.toBeNever()
    })

    it('should have a valid zod schema', () => {
      expect(TursoConnectionConfigSchema).toBeDefined()
      expect(TursoConnectionConfigSchema.safeParse).toBeTypeOf('function')
    })

    it('should have Turso-specific properties', () => {
      // Verify the type has required properties
      expectTypeOf<TursoConnectionConfig>().toMatchTypeOf<{
        adapter: 'turso'
        url: string // libsql:// URL
        authToken: string
      }>()
    })

    it('should support optional sync properties for embedded replicas', () => {
      expectTypeOf<TursoConnectionConfig>().toMatchTypeOf<{
        syncUrl?: string
        syncInterval?: number
      }>()
    })
  })

  describe('D1ConnectionConfig', () => {
    it('should not be never type', () => {
      expectTypeOf<D1ConnectionConfig>().not.toBeNever()
    })

    it('should have a valid zod schema', () => {
      expect(D1ConnectionConfigSchema).toBeDefined()
      expect(D1ConnectionConfigSchema.safeParse).toBeTypeOf('function')
    })

    it('should have Cloudflare D1-specific properties', () => {
      expectTypeOf<D1ConnectionConfig>().toMatchTypeOf<{
        adapter: 'd1'
        databaseId: string
        accountId: string
        apiToken: string
      }>()
    })

    it('should support optional binding name', () => {
      expectTypeOf<D1ConnectionConfig>().toMatchTypeOf<{
        binding?: string // Wrangler binding name
      }>()
    })
  })

  describe('SupabaseConnectionConfig', () => {
    it('should not be never type', () => {
      expectTypeOf<SupabaseConnectionConfig>().not.toBeNever()
    })

    it('should have a valid zod schema', () => {
      expect(SupabaseConnectionConfigSchema).toBeDefined()
      expect(SupabaseConnectionConfigSchema.safeParse).toBeTypeOf('function')
    })

    it('should have Supabase.do-specific properties', () => {
      expectTypeOf<SupabaseConnectionConfig>().toMatchTypeOf<{
        adapter: 'supabase'
        projectUrl: string
        anonKey: string
      }>()
    })

    it('should support optional service role key and schema', () => {
      expectTypeOf<SupabaseConnectionConfig>().toMatchTypeOf<{
        serviceRoleKey?: string // For admin operations
        schema?: string // Default: 'public'
      }>()
    })
  })

  describe('ConnectionConfig', () => {
    it('should not be never type', () => {
      expectTypeOf<ConnectionConfig>().not.toBeNever()
    })

    it('should have a valid zod schema', () => {
      expect(ConnectionConfigSchema).toBeDefined()
      expect(ConnectionConfigSchema.safeParse).toBeTypeOf('function')
    })

    it('should be a discriminated union of adapter configs', () => {
      // ConnectionConfig should be usable as any of its constituent types
      expectTypeOf<TursoConnectionConfig>().toMatchTypeOf<ConnectionConfig>()
      expectTypeOf<D1ConnectionConfig>().toMatchTypeOf<ConnectionConfig>()
      expectTypeOf<SupabaseConnectionConfig>().toMatchTypeOf<ConnectionConfig>()
    })
  })

  describe('TestResult', () => {
    it('should not be never type', () => {
      expectTypeOf<TestResult>().not.toBeNever()
    })

    it('should have a valid zod schema', () => {
      expect(TestResultSchema).toBeDefined()
      expect(TestResultSchema.safeParse).toBeTypeOf('function')
    })

    it('should have required result properties', () => {
      expectTypeOf<TestResult>().toMatchTypeOf<{
        success: boolean
        latencyMs: number
      }>()
    })

    it('should support optional error and metadata properties', () => {
      expectTypeOf<TestResult>().toMatchTypeOf<{
        error?: string
        serverVersion?: string
        tables?: string[]
      }>()
    })
  })

  describe('ConnectionManagerProps', () => {
    it('should not be never type', () => {
      expectTypeOf<ConnectionManagerProps>().not.toBeNever()
    })

    it('should have a valid zod schema', () => {
      expect(ConnectionManagerPropsSchema).toBeDefined()
      expect(ConnectionManagerPropsSchema.safeParse).toBeTypeOf('function')
    })

    it('should have connections array', () => {
      expectTypeOf<ConnectionManagerProps>().toMatchTypeOf<{
        connections: DatabaseConnection[]
      }>()
    })

    it('should have optional active connection', () => {
      expectTypeOf<ConnectionManagerProps>().toMatchTypeOf<{
        activeConnection?: DatabaseConnection
      }>()
    })

    it('should have required connection callbacks', () => {
      expectTypeOf<ConnectionManagerProps>().toMatchTypeOf<{
        onConnect: (config: ConnectionConfig) => Promise<void>
        onDisconnect: (connectionId: string) => void
        onTestConnection: (config: ConnectionConfig) => Promise<TestResult>
      }>()
    })

    it('should have optional CRUD callbacks', () => {
      expectTypeOf<ConnectionManagerProps>().toMatchTypeOf<{
        onSaveConnection?: (connection: DatabaseConnection) => Promise<void>
        onDeleteConnection?: (connectionId: string) => Promise<void>
        onSelectConnection?: (connectionId: string) => void
      }>()
    })

    it('should have optional UI customization props', () => {
      expectTypeOf<ConnectionManagerProps>().toMatchTypeOf<{
        showTestButton?: boolean
        showConnectionStatus?: boolean
        className?: string
      }>()
    })
  })

  describe('ConnectionFormProps', () => {
    it('should not be never type', () => {
      expectTypeOf<ConnectionFormProps>().not.toBeNever()
    })

    it('should have a valid zod schema', () => {
      expect(ConnectionFormPropsSchema).toBeDefined()
      expect(ConnectionFormPropsSchema.safeParse).toBeTypeOf('function')
    })

    it('should have required adapter and callbacks', () => {
      expectTypeOf<ConnectionFormProps>().toMatchTypeOf<{
        adapter: 'turso' | 'd1' | 'supabase'
        onSubmit: (config: ConnectionConfig) => void
        onCancel: () => void
      }>()
    })

    it('should have optional initial config and state', () => {
      expectTypeOf<ConnectionFormProps>().toMatchTypeOf<{
        initialConfig?: ConnectionConfig
        onAdapterChange?: (adapter: 'turso' | 'd1' | 'supabase') => void
        isLoading?: boolean
        error?: string
      }>()
    })
  })

  describe('ConnectionSelectorProps', () => {
    it('should not be never type', () => {
      expectTypeOf<ConnectionSelectorProps>().not.toBeNever()
    })

    it('should have a valid zod schema', () => {
      expect(ConnectionSelectorPropsSchema).toBeDefined()
      expect(ConnectionSelectorPropsSchema.safeParse).toBeTypeOf('function')
    })

    it('should have required connections and callback', () => {
      expectTypeOf<ConnectionSelectorProps>().toMatchTypeOf<{
        connections: DatabaseConnection[]
        onSelect: (connectionId: string) => void
      }>()
    })

    it('should have optional UI props', () => {
      expectTypeOf<ConnectionSelectorProps>().toMatchTypeOf<{
        selectedId?: string
        placeholder?: string
        disabled?: boolean
      }>()
    })
  })
})

// =============================================================================
// mdxui-qb4: [RED] Test MCPToolsPanel types for AI integration
// =============================================================================

describe('MCPToolsPanel Types (mdxui-qb4)', () => {
  describe('MCPToolParameter', () => {
    it('should not be never type', () => {
      expectTypeOf<MCPToolParameter>().not.toBeNever()
    })

    it('should have a valid zod schema', () => {
      expect(MCPToolParameterSchema).toBeDefined()
      expect(MCPToolParameterSchema.safeParse).toBeTypeOf('function')
    })

    it('should have type property as union', () => {
      expectTypeOf<MCPToolParameter>().toMatchTypeOf<{
        type: 'string' | 'number' | 'boolean' | 'array' | 'object'
      }>()
    })

    it('should have optional schema properties', () => {
      expectTypeOf<MCPToolParameter>().toMatchTypeOf<{
        description?: string
        enum?: readonly string[]
        default?: unknown
        items?: MCPToolParameter // For array types
      }>()
    })
  })

  describe('MCPToolDefinition', () => {
    it('should not be never type', () => {
      expectTypeOf<MCPToolDefinition>().not.toBeNever()
    })

    it('should have a valid zod schema', () => {
      expect(MCPToolDefinitionSchema).toBeDefined()
      expect(MCPToolDefinitionSchema.safeParse).toBeTypeOf('function')
    })

    it('should have required name and description', () => {
      expectTypeOf<MCPToolDefinition>().toMatchTypeOf<{
        name: string
        description: string
      }>()
    })

    it('should have inputSchema following JSON Schema format', () => {
      expectTypeOf<MCPToolDefinition>().toMatchTypeOf<{
        inputSchema: {
          type: 'object'
          properties: Record<string, MCPToolParameter>
          required?: string[]
        }
      }>()
    })
  })

  describe('InvocationResult', () => {
    it('should not be never type', () => {
      expectTypeOf<InvocationResult>().not.toBeNever()
    })

    it('should have a valid zod schema', () => {
      expect(InvocationResultSchema).toBeDefined()
      expect(InvocationResultSchema.safeParse).toBeTypeOf('function')
    })

    it('should have required success flag', () => {
      expectTypeOf<InvocationResult>().toMatchTypeOf<{
        success: boolean
      }>()
    })

    it('should have optional result data and error', () => {
      expectTypeOf<InvocationResult>().toMatchTypeOf<{
        data?: unknown
        error?: string
      }>()
    })

    it('should have optional database-specific properties', () => {
      expectTypeOf<InvocationResult>().toMatchTypeOf<{
        rowsAffected?: number
        rows?: unknown[]
      }>()
    })
  })

  describe('ToolInvocation', () => {
    it('should not be never type', () => {
      expectTypeOf<ToolInvocation>().not.toBeNever()
    })

    it('should have a valid zod schema', () => {
      expect(ToolInvocationSchema).toBeDefined()
      expect(ToolInvocationSchema.safeParse).toBeTypeOf('function')
    })

    it('should have required invocation tracking properties', () => {
      expectTypeOf<ToolInvocation>().toMatchTypeOf<{
        id: string
        toolName: string
        params: Record<string, unknown>
        result: InvocationResult
        timestamp: Date
        durationMs: number
      }>()
    })
  })

  describe('NaturalLanguageQueryProps', () => {
    it('should not be never type', () => {
      expectTypeOf<NaturalLanguageQueryProps>().not.toBeNever()
    })

    it('should have a valid zod schema', () => {
      expect(NaturalLanguageQueryPropsSchema).toBeDefined()
      expect(NaturalLanguageQueryPropsSchema.safeParse).toBeTypeOf('function')
    })

    it('should have required query input props', () => {
      expectTypeOf<NaturalLanguageQueryProps>().toMatchTypeOf<{
        query: string
        onQueryChange: (query: string) => void
        onExecute: () => Promise<void>
      }>()
    })

    it('should have optional SQL generation props', () => {
      expectTypeOf<NaturalLanguageQueryProps>().toMatchTypeOf<{
        generatedSQL?: string
        model?: string
        systemPrompt?: string
      }>()
    })

    it('should have optional state props', () => {
      expectTypeOf<NaturalLanguageQueryProps>().toMatchTypeOf<{
        isGenerating?: boolean
        isExecuting?: boolean
        error?: string
      }>()
    })
  })

  describe('MCPToolsPanelProps', () => {
    it('should not be never type', () => {
      expectTypeOf<MCPToolsPanelProps>().not.toBeNever()
    })

    it('should have a valid zod schema', () => {
      expect(MCPToolsPanelPropsSchema).toBeDefined()
      expect(MCPToolsPanelPropsSchema.safeParse).toBeTypeOf('function')
    })

    it('should have required tools array', () => {
      expectTypeOf<MCPToolsPanelProps>().toMatchTypeOf<{
        tools: MCPToolDefinition[]
      }>()
    })

    it('should have required invoke callback', () => {
      expectTypeOf<MCPToolsPanelProps>().toMatchTypeOf<{
        onInvoke: (toolName: string, params: Record<string, unknown>) => Promise<unknown>
      }>()
    })

    it('should have required history array', () => {
      expectTypeOf<MCPToolsPanelProps>().toMatchTypeOf<{
        history: ToolInvocation[]
      }>()
    })

    it('should have optional natural language query support', () => {
      expectTypeOf<MCPToolsPanelProps>().toMatchTypeOf<{
        naturalLanguageQuery?: NaturalLanguageQueryProps
      }>()
    })

    it('should have optional search and UI props', () => {
      expectTypeOf<MCPToolsPanelProps>().toMatchTypeOf<{
        searchQuery?: string
        onSearchChange?: (query: string) => void
        onClearHistory?: () => void
        showHistory?: boolean
        showNaturalLanguage?: boolean
        className?: string
      }>()
    })
  })

  describe('ToolListProps', () => {
    it('should not be never type', () => {
      expectTypeOf<ToolListProps>().not.toBeNever()
    })

    it('should have a valid zod schema', () => {
      expect(ToolListPropsSchema).toBeDefined()
      expect(ToolListPropsSchema.safeParse).toBeTypeOf('function')
    })

    it('should have required tools and selection callback', () => {
      expectTypeOf<ToolListProps>().toMatchTypeOf<{
        tools: MCPToolDefinition[]
        onSelectTool: (toolName: string) => void
      }>()
    })

    it('should have optional selection and search state', () => {
      expectTypeOf<ToolListProps>().toMatchTypeOf<{
        selectedTool?: string
        searchQuery?: string
      }>()
    })
  })

  describe('ToolInvocationFormProps', () => {
    it('should not be never type', () => {
      expectTypeOf<ToolInvocationFormProps>().not.toBeNever()
    })

    it('should have a valid zod schema', () => {
      expect(ToolInvocationFormPropsSchema).toBeDefined()
      expect(ToolInvocationFormPropsSchema.safeParse).toBeTypeOf('function')
    })

    it('should have required tool and invoke callback', () => {
      expectTypeOf<ToolInvocationFormProps>().toMatchTypeOf<{
        tool: MCPToolDefinition
        onInvoke: (params: Record<string, unknown>) => Promise<unknown>
      }>()
    })

    it('should have optional state props', () => {
      expectTypeOf<ToolInvocationFormProps>().toMatchTypeOf<{
        isLoading?: boolean
        error?: string
      }>()
    })
  })

  describe('ToolHistoryProps', () => {
    it('should not be never type', () => {
      expectTypeOf<ToolHistoryProps>().not.toBeNever()
    })

    it('should have a valid zod schema', () => {
      expect(ToolHistoryPropsSchema).toBeDefined()
      expect(ToolHistoryPropsSchema.safeParse).toBeTypeOf('function')
    })

    it('should have required history array', () => {
      expectTypeOf<ToolHistoryProps>().toMatchTypeOf<{
        history: ToolInvocation[]
      }>()
    })

    it('should have optional callbacks and config', () => {
      expectTypeOf<ToolHistoryProps>().toMatchTypeOf<{
        onRerun?: (invocation: ToolInvocation) => void
        onClear?: () => void
        maxItems?: number
      }>()
    })
  })
})

// =============================================================================
// Integration Tests - Verify types work together
// =============================================================================

describe('Integration', () => {
  it('should support adapter-specific connection creation via type guards', () => {
    // Type guard functions should narrow ConnectionConfig to specific adapter
    const isTursoConfig = (config: ConnectionConfig): config is TursoConnectionConfig =>
      config.adapter === 'turso'

    const isD1Config = (config: ConnectionConfig): config is D1ConnectionConfig =>
      config.adapter === 'd1'

    const isSupabaseConfig = (config: ConnectionConfig): config is SupabaseConnectionConfig =>
      config.adapter === 'supabase'

    // These should compile without errors
    expectTypeOf(isTursoConfig).toBeFunction()
    expectTypeOf(isD1Config).toBeFunction()
    expectTypeOf(isSupabaseConfig).toBeFunction()
  })

  it('should allow MCP tools to work with database connections', () => {
    // Example: A database query tool that uses the active connection
    type DatabaseQueryTool = MCPToolDefinition & {
      name: 'database_query'
      inputSchema: {
        type: 'object'
        properties: {
          sql: { type: 'string'; description: 'SQL query to execute' }
          connectionId: { type: 'string'; description: 'Connection to use' }
        }
        required: ['sql', 'connectionId']
      }
    }

    // This should be a valid MCPToolDefinition
    expectTypeOf<DatabaseQueryTool>().toMatchTypeOf<MCPToolDefinition>()
  })
})
