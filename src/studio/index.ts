/**
 * studio.do Integration Types
 *
 * Type definitions for studio.do - a Durable Object-native database management UI.
 * These types are intentionally incomplete stubs for TDD RED phase.
 *
 * The GREEN phase will implement these types to make tests pass.
 *
 * @module studio
 */

import { z } from 'zod'

// =============================================================================
// Stub exports - these will fail type tests until GREEN phase
// =============================================================================

// StudioShell types (mdxui-6tf) - STUBS
export type ConnectionStatus = never
export const ConnectionStatusSchema = z.never()

export type DatabaseConnection = never
export const DatabaseConnectionSchema = z.never()

export type SchemaViewState = never
export const SchemaViewStateSchema = z.never()

export type QueryPaneState = never
export const QueryPaneStateSchema = z.never()

export type StudioShellProps = never
export const StudioShellPropsSchema = z.never()

// SchemaBrowser types (mdxui-5ex) - STUBS
export type TableSchema = never
export const TableSchemaSchema = z.never()

export type ColumnDefinition = never
export const ColumnDefinitionSchema = z.never()

export type IndexDefinition = never
export const IndexDefinitionSchema = z.never()

export type ForeignKeyDefinition = never
export const ForeignKeyDefinitionSchema = z.never()

export type ERDiagramMode = never
export const ERDiagramModeSchema = z.never()

export type SchemaBrowserProps = never
export const SchemaBrowserPropsSchema = z.never()

// =============================================================================
// ConnectionManager types (mdxui-6ol) - STUBS
// =============================================================================

/**
 * Turso (libSQL) database connection configuration
 * RED: Missing url, authToken, syncUrl, syncInterval
 */
export type TursoConnectionConfig = never
export const TursoConnectionConfigSchema = z.never()

/**
 * Cloudflare D1 database connection configuration
 * RED: Missing databaseId, accountId, apiToken, binding
 */
export type D1ConnectionConfig = never
export const D1ConnectionConfigSchema = z.never()

/**
 * Supabase.do database connection configuration
 * RED: Missing projectUrl, anonKey, serviceRoleKey, schema
 */
export type SupabaseConnectionConfig = never
export const SupabaseConnectionConfigSchema = z.never()

/**
 * Union type for all supported database connection configs
 */
export type ConnectionConfig = never
export const ConnectionConfigSchema = z.never()

/**
 * Result of a connection test
 * RED: Missing latencyMs, error, serverVersion, tables
 */
export type TestResult = never
export const TestResultSchema = z.never()

/**
 * Props for ConnectionManager component
 * RED: Missing activeConnection, onConnect, onDisconnect, onTestConnection, etc.
 */
export type ConnectionManagerProps = never
export const ConnectionManagerPropsSchema = z.never()

/**
 * Props for ConnectionForm component
 * RED: Missing initialConfig, onSubmit, onCancel, onAdapterChange, isLoading, error
 */
export type ConnectionFormProps = never
export const ConnectionFormPropsSchema = z.never()

/**
 * Props for ConnectionSelector component
 * RED: Missing selectedId, onSelect, placeholder, disabled
 */
export type ConnectionSelectorProps = never
export const ConnectionSelectorPropsSchema = z.never()

// =============================================================================
// MCP Types (mdxui-qb4) - STUBS for AI-native tool integration
// =============================================================================

/**
 * MCP tool parameter schema
 * RED: Missing type union, description, enum, default, items
 */
export type MCPToolParameter = never
export const MCPToolParameterSchema = z.never()

/**
 * MCP tool definition following Model Context Protocol spec
 * RED: Missing description, inputSchema
 */
export type MCPToolDefinition = never
export const MCPToolDefinitionSchema = z.never()

/**
 * Result of an MCP tool invocation
 * RED: Missing data, error, rowsAffected, rows
 */
export type InvocationResult = never
export const InvocationResultSchema = z.never()

/**
 * Record of an MCP tool invocation
 * RED: Missing toolName, params, result, timestamp, durationMs
 */
export type ToolInvocation = never
export const ToolInvocationSchema = z.never()

/**
 * Props for natural language query input
 * RED: Missing onQueryChange, generatedSQL, onExecute, model, systemPrompt, etc.
 */
export type NaturalLanguageQueryProps = never
export const NaturalLanguageQueryPropsSchema = z.never()

/**
 * Props for MCPToolsPanel component
 * RED: Missing onInvoke, history, naturalLanguageQuery, searchQuery, etc.
 */
export type MCPToolsPanelProps = never
export const MCPToolsPanelPropsSchema = z.never()

/**
 * Props for ToolList component
 * RED: Missing selectedTool, onSelectTool, searchQuery
 */
export type ToolListProps = never
export const ToolListPropsSchema = z.never()

/**
 * Props for ToolInvocationForm component
 * RED: Missing onInvoke, isLoading, error
 */
export type ToolInvocationFormProps = never
export const ToolInvocationFormPropsSchema = z.never()

/**
 * Props for ToolHistory component
 * RED: Missing onRerun, onClear, maxItems
 */
export type ToolHistoryProps = never
export const ToolHistoryPropsSchema = z.never()
