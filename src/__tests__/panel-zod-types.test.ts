/**
 * TDD RED Tests for mdxui Types Migration
 *
 * This file tests:
 * 1. Panel Types (navigation, collection, detail, form) - mdxui-dxt
 * 2. Zod Schema Exports (HeroPropsSchema, FeaturesPropsSchema, etc.) - mdxui-90w
 * 3. Widget, Input, Field, View, Collection Types - mdxui-ltd
 *
 * These tests will FAIL until the types are migrated from:
 * /Users/nathanclevenger/projects/ui/packages/mdxui/src/types/
 * /Users/nathanclevenger/projects/ui/packages/mdxui/src/zod.ts
 */

import { describe, it, expect } from 'vitest'
import { z } from 'zod'

// =============================================================================
// Task: mdxui-dxt - Panel Types for Navigation and Forms
// =============================================================================

describe('Panel Types - Navigation Panels', () => {
  it('should export NavPanelPropsSchema', async () => {
    const { NavPanelPropsSchema } = await import('../../types/panel-types')
    expect(NavPanelPropsSchema).toBeDefined()
    expect(NavPanelPropsSchema instanceof z.ZodObject).toBe(true)
  })

  it('should validate NavPanelProps with items and orientation', async () => {
    const { NavPanelPropsSchema } = await import('../../types/panel-types')
    const validProps = {
      items: [{ label: 'Home', href: '/' }],
      orientation: 'vertical',
    }
    const result = NavPanelPropsSchema.safeParse(validProps)
    expect(result.success).toBe(true)
  })

  it('should export TabsPanelPropsSchema', async () => {
    const { TabsPanelPropsSchema } = await import('../../types/panel-types')
    expect(TabsPanelPropsSchema).toBeDefined()
    expect(TabsPanelPropsSchema instanceof z.ZodObject).toBe(true)
  })

  it('should validate TabsPanelProps with tabs array', async () => {
    const { TabsPanelPropsSchema } = await import('../../types/panel-types')
    const validProps = {
      tabs: [
        { id: 'tab1', label: 'First Tab', content: 'Content 1' },
        { id: 'tab2', label: 'Second Tab', content: 'Content 2' },
      ],
    }
    const result = TabsPanelPropsSchema.safeParse(validProps)
    expect(result.success).toBe(true)
  })

  it('should export BreadcrumbPanelPropsSchema', async () => {
    const { BreadcrumbPanelPropsSchema } = await import('../../types/panel-types')
    expect(BreadcrumbPanelPropsSchema).toBeDefined()
  })

  it('should export SidebarPanelPropsSchema with nav items', async () => {
    const { SidebarPanelPropsSchema } = await import('../../types/panel-types')
    expect(SidebarPanelPropsSchema).toBeDefined()
    const validProps = {
      nav: [{ label: 'Dashboard', href: '/dashboard' }],
      position: 'left',
    }
    const result = SidebarPanelPropsSchema.safeParse(validProps)
    expect(result.success).toBe(true)
  })
})

describe('Panel Types - Collection Display Panels', () => {
  it('should export ListPanelPropsSchema', async () => {
    const { ListPanelPropsSchema } = await import('../../types/panel-types')
    expect(ListPanelPropsSchema).toBeDefined()
    const validProps = {
      items: [{ id: '1', name: 'Item 1' }],
      selectable: true,
    }
    const result = ListPanelPropsSchema.safeParse(validProps)
    expect(result.success).toBe(true)
  })

  it('should export TablePanelPropsSchema with columns', async () => {
    const { TablePanelPropsSchema } = await import('../../types/panel-types')
    expect(TablePanelPropsSchema).toBeDefined()
    const validProps = {
      columns: [
        { id: 'name', header: 'Name', accessor: 'name' },
        { id: 'email', header: 'Email', accessor: 'email' },
      ],
      data: [{ name: 'John', email: 'john@example.com' }],
    }
    const result = TablePanelPropsSchema.safeParse(validProps)
    expect(result.success).toBe(true)
  })

  it('should export CardsPanelPropsSchema', async () => {
    const { CardsPanelPropsSchema } = await import('../../types/panel-types')
    expect(CardsPanelPropsSchema).toBeDefined()
    const validProps = {
      items: [{ id: '1', title: 'Card 1' }],
      columns: 3,
      variant: 'default',
    }
    const result = CardsPanelPropsSchema.safeParse(validProps)
    expect(result.success).toBe(true)
  })

  it('should export KanbanPanelPropsSchema', async () => {
    const { KanbanPanelPropsSchema } = await import('../../types/panel-types')
    expect(KanbanPanelPropsSchema).toBeDefined()
    const validProps = {
      columns: [
        { id: 'todo', title: 'To Do', items: [] },
        { id: 'done', title: 'Done', items: [] },
      ],
    }
    const result = KanbanPanelPropsSchema.safeParse(validProps)
    expect(result.success).toBe(true)
  })

  it('should export CalendarPanelPropsSchema', async () => {
    const { CalendarPanelPropsSchema } = await import('../../types/panel-types')
    expect(CalendarPanelPropsSchema).toBeDefined()
  })

  it('should export TimelinePanelPropsSchema', async () => {
    const { TimelinePanelPropsSchema } = await import('../../types/panel-types')
    expect(TimelinePanelPropsSchema).toBeDefined()
  })

  it('should export TreePanelPropsSchema', async () => {
    const { TreePanelPropsSchema } = await import('../../types/panel-types')
    expect(TreePanelPropsSchema).toBeDefined()
  })

  it('should export GalleryPanelPropsSchema', async () => {
    const { GalleryPanelPropsSchema } = await import('../../types/panel-types')
    expect(GalleryPanelPropsSchema).toBeDefined()
  })
})

describe('Panel Types - Detail and Form Panels', () => {
  it('should export DetailPanelPropsSchema', async () => {
    const { DetailPanelPropsSchema } = await import('../../types/panel-types')
    expect(DetailPanelPropsSchema).toBeDefined()
    const validProps = {
      fields: [
        { label: 'Name', value: 'John Doe' },
        { label: 'Email', value: 'john@example.com' },
      ],
      layout: 'two-column',
    }
    const result = DetailPanelPropsSchema.safeParse(validProps)
    expect(result.success).toBe(true)
  })

  it('should export FormPanelPropsSchema', async () => {
    const { FormPanelPropsSchema } = await import('../../types/panel-types')
    expect(FormPanelPropsSchema).toBeDefined()
    const validProps = {
      fields: [
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'password', label: 'Password', type: 'password' },
      ],
      submitText: 'Login',
    }
    const result = FormPanelPropsSchema.safeParse(validProps)
    expect(result.success).toBe(true)
  })

  it('should export PreviewPanelPropsSchema', async () => {
    const { PreviewPanelPropsSchema } = await import('../../types/panel-types')
    expect(PreviewPanelPropsSchema).toBeDefined()
  })

  it('should export PropertiesPanelPropsSchema', async () => {
    const { PropertiesPanelPropsSchema } = await import('../../types/panel-types')
    expect(PropertiesPanelPropsSchema).toBeDefined()
  })

  it('should export InspectorPanelPropsSchema', async () => {
    const { InspectorPanelPropsSchema } = await import('../../types/panel-types')
    expect(InspectorPanelPropsSchema).toBeDefined()
  })
})

describe('Panel Types - Input/Editor Panels', () => {
  it('should export ChatPanelPropsSchema', async () => {
    const { ChatPanelPropsSchema } = await import('../../types/panel-types')
    expect(ChatPanelPropsSchema).toBeDefined()
    const validProps = {
      messages: [
        { id: '1', role: 'user', content: 'Hello' },
        { id: '2', role: 'assistant', content: 'Hi there!' },
      ],
    }
    const result = ChatPanelPropsSchema.safeParse(validProps)
    expect(result.success).toBe(true)
  })

  it('should export CodePanelPropsSchema', async () => {
    const { CodePanelPropsSchema } = await import('../../types/panel-types')
    expect(CodePanelPropsSchema).toBeDefined()
    const validProps = {
      code: 'const x = 1;',
      language: 'javascript',
    }
    const result = CodePanelPropsSchema.safeParse(validProps)
    expect(result.success).toBe(true)
  })

  it('should export EditorPanelPropsSchema', async () => {
    const { EditorPanelPropsSchema } = await import('../../types/panel-types')
    expect(EditorPanelPropsSchema).toBeDefined()
  })

  it('should export FilterPanelPropsSchema', async () => {
    const { FilterPanelPropsSchema } = await import('../../types/panel-types')
    expect(FilterPanelPropsSchema).toBeDefined()
  })

  it('should export QueryPanelPropsSchema', async () => {
    const { QueryPanelPropsSchema } = await import('../../types/panel-types')
    expect(QueryPanelPropsSchema).toBeDefined()
  })

  it('should export JSONPanelPropsSchema', async () => {
    const { JSONPanelPropsSchema } = await import('../../types/panel-types')
    expect(JSONPanelPropsSchema).toBeDefined()
  })

  it('should export MarkdownPanelPropsSchema', async () => {
    const { MarkdownPanelPropsSchema } = await import('../../types/panel-types')
    expect(MarkdownPanelPropsSchema).toBeDefined()
  })
})

describe('Panel Types - Visualization Panels', () => {
  it('should export MetricsPanelPropsSchema', async () => {
    const { MetricsPanelPropsSchema } = await import('../../types/panel-types')
    expect(MetricsPanelPropsSchema).toBeDefined()
  })

  it('should export ChartPanelPropsSchema', async () => {
    const { ChartPanelPropsSchema } = await import('../../types/panel-types')
    expect(ChartPanelPropsSchema).toBeDefined()
    const validProps = {
      chartType: 'line',
      data: [{ x: 1, y: 10 }],
    }
    const result = ChartPanelPropsSchema.safeParse(validProps)
    expect(result.success).toBe(true)
  })

  it('should export StatsPanelPropsSchema', async () => {
    const { StatsPanelPropsSchema } = await import('../../types/panel-types')
    expect(StatsPanelPropsSchema).toBeDefined()
  })

  it('should export WorkflowPanelPropsSchema', async () => {
    const { WorkflowPanelPropsSchema } = await import('../../types/panel-types')
    expect(WorkflowPanelPropsSchema).toBeDefined()
  })

  it('should export GanttPanelPropsSchema', async () => {
    const { GanttPanelPropsSchema } = await import('../../types/panel-types')
    expect(GanttPanelPropsSchema).toBeDefined()
  })

  it('should export GraphPanelPropsSchema', async () => {
    const { GraphPanelPropsSchema } = await import('../../types/panel-types')
    expect(GraphPanelPropsSchema).toBeDefined()
  })

  it('should export DiagramPanelPropsSchema', async () => {
    const { DiagramPanelPropsSchema } = await import('../../types/panel-types')
    expect(DiagramPanelPropsSchema).toBeDefined()
  })
})

describe('Panel Types - Comparison Panels', () => {
  it('should export ArenaPanelPropsSchema', async () => {
    const { ArenaPanelPropsSchema } = await import('../../types/panel-types')
    expect(ArenaPanelPropsSchema).toBeDefined()
  })

  it('should export DiffPanelPropsSchema', async () => {
    const { DiffPanelPropsSchema } = await import('../../types/panel-types')
    expect(DiffPanelPropsSchema).toBeDefined()
    const validProps = {
      original: 'old content',
      modified: 'new content',
    }
    const result = DiffPanelPropsSchema.safeParse(validProps)
    expect(result.success).toBe(true)
  })

  it('should export ComparePanelPropsSchema', async () => {
    const { ComparePanelPropsSchema } = await import('../../types/panel-types')
    expect(ComparePanelPropsSchema).toBeDefined()
  })

  it('should export LeaderboardPanelPropsSchema', async () => {
    const { LeaderboardPanelPropsSchema } = await import('../../types/panel-types')
    expect(LeaderboardPanelPropsSchema).toBeDefined()
  })
})

describe('Panel Types - Review (PR Pattern) Panels', () => {
  it('should export ReviewPanelPropsSchema', async () => {
    const { ReviewPanelPropsSchema } = await import('../../types/panel-types')
    expect(ReviewPanelPropsSchema).toBeDefined()
  })

  it('should export ReviewThreadPropsSchema', async () => {
    const { ReviewThreadPropsSchema } = await import('../../types/panel-types')
    expect(ReviewThreadPropsSchema).toBeDefined()
  })

  it('should export ChecksPanelPropsSchema', async () => {
    const { ChecksPanelPropsSchema } = await import('../../types/panel-types')
    expect(ChecksPanelPropsSchema).toBeDefined()
  })

  it('should export ApprovalPanelPropsSchema', async () => {
    const { ApprovalPanelPropsSchema } = await import('../../types/panel-types')
    expect(ApprovalPanelPropsSchema).toBeDefined()
  })

  it('should export DeliverablePanelPropsSchema', async () => {
    const { DeliverablePanelPropsSchema } = await import('../../types/panel-types')
    expect(DeliverablePanelPropsSchema).toBeDefined()
  })
})

describe('Panel Types - Execution Panels', () => {
  it('should export BrowserPanelPropsSchema', async () => {
    const { BrowserPanelPropsSchema } = await import('../../types/panel-types')
    expect(BrowserPanelPropsSchema).toBeDefined()
  })

  it('should export TerminalPanelPropsSchema', async () => {
    const { TerminalPanelPropsSchema } = await import('../../types/panel-types')
    expect(TerminalPanelPropsSchema).toBeDefined()
  })

  it('should export ConsolePanelPropsSchema', async () => {
    const { ConsolePanelPropsSchema } = await import('../../types/panel-types')
    expect(ConsolePanelPropsSchema).toBeDefined()
  })

  it('should export REPLPanelPropsSchema', async () => {
    const { REPLPanelPropsSchema } = await import('../../types/panel-types')
    expect(REPLPanelPropsSchema).toBeDefined()
  })

  it('should export SandboxPanelPropsSchema', async () => {
    const { SandboxPanelPropsSchema } = await import('../../types/panel-types')
    expect(SandboxPanelPropsSchema).toBeDefined()
  })
})

describe('Panel Types - Canvas/Workspace Panels', () => {
  it('should export CanvasPanelPropsSchema', async () => {
    const { CanvasPanelPropsSchema } = await import('../../types/panel-types')
    expect(CanvasPanelPropsSchema).toBeDefined()
  })

  it('should export WhiteboardPanelPropsSchema', async () => {
    const { WhiteboardPanelPropsSchema } = await import('../../types/panel-types')
    expect(WhiteboardPanelPropsSchema).toBeDefined()
  })

  it('should export MapPanelPropsSchema', async () => {
    const { MapPanelPropsSchema } = await import('../../types/panel-types')
    expect(MapPanelPropsSchema).toBeDefined()
  })

  it('should export FloorplanPanelPropsSchema', async () => {
    const { FloorplanPanelPropsSchema } = await import('../../types/panel-types')
    expect(FloorplanPanelPropsSchema).toBeDefined()
  })
})

describe('Panel Types - Trace Timeline Types', () => {
  it('should export TimelineItemStatusSchema', async () => {
    const { TimelineItemStatusSchema } = await import('../../types/panel-types')
    expect(TimelineItemStatusSchema).toBeDefined()
    const result = TimelineItemStatusSchema.safeParse('success')
    expect(result.success).toBe(true)
  })

  it('should export TraceTimelineItemSchema', async () => {
    const { TraceTimelineItemSchema } = await import('../../types/panel-types')
    expect(TraceTimelineItemSchema).toBeDefined()
  })

  it('should export TraceTimelineDataSchema', async () => {
    const { TraceTimelineDataSchema } = await import('../../types/panel-types')
    expect(TraceTimelineDataSchema).toBeDefined()
  })

  it('should export TraceTimelinePanelPropsSchema', async () => {
    const { TraceTimelinePanelPropsSchema } = await import('../../types/panel-types')
    expect(TraceTimelinePanelPropsSchema).toBeDefined()
  })
})

// =============================================================================
// Task: mdxui-90w - Zod Schema Exports
// =============================================================================

describe('Zod Schema Exports - Site Components', () => {
  it('should export HeroPropsSchema and validate hero props', async () => {
    const { HeroPropsSchema } = await import('../../zod')
    expect(HeroPropsSchema).toBeDefined()
    expect(HeroPropsSchema instanceof z.ZodObject).toBe(true)

    const validProps = {
      title: 'Welcome to Our Site',
      description: 'Build amazing things',
    }
    const result = HeroPropsSchema.safeParse(validProps)
    expect(result.success).toBe(true)
  })

  it('should export FeaturesPropsSchema and validate features props', async () => {
    const { FeaturesPropsSchema } = await import('../../zod')
    expect(FeaturesPropsSchema).toBeDefined()
    expect(FeaturesPropsSchema instanceof z.ZodObject).toBe(true)
  })

  it('should export PricingPropsSchema', async () => {
    const { PricingPropsSchema } = await import('../../zod')
    expect(PricingPropsSchema).toBeDefined()
  })

  it('should export TestimonialsPropsSchema', async () => {
    const { TestimonialsPropsSchema } = await import('../../zod')
    expect(TestimonialsPropsSchema).toBeDefined()
  })

  it('should export FAQPropsSchema', async () => {
    const { FAQPropsSchema } = await import('../../zod')
    expect(FAQPropsSchema).toBeDefined()
  })

  it('should export CTASectionPropsSchema', async () => {
    const { CTASectionPropsSchema } = await import('../../zod')
    expect(CTASectionPropsSchema).toBeDefined()
  })

  it('should export HeaderPropsSchema', async () => {
    const { HeaderPropsSchema } = await import('../../zod')
    expect(HeaderPropsSchema).toBeDefined()
  })

  it('should export FooterPropsSchema', async () => {
    const { FooterPropsSchema } = await import('../../zod')
    expect(FooterPropsSchema).toBeDefined()
  })

  it('should export SitePropsSchema', async () => {
    const { SitePropsSchema } = await import('../../zod')
    expect(SitePropsSchema).toBeDefined()
  })

  it('should export LandingPagePropsSchema', async () => {
    const { LandingPagePropsSchema } = await import('../../zod')
    expect(LandingPagePropsSchema).toBeDefined()
  })
})

describe('Zod Schema Exports - Site Types', () => {
  it('should export MarketingSiteSchema', async () => {
    const { MarketingSiteSchema } = await import('../../zod')
    expect(MarketingSiteSchema).toBeDefined()
  })

  it('should export DocsSiteSchema', async () => {
    const { DocsSiteSchema } = await import('../../zod')
    expect(DocsSiteSchema).toBeDefined()
  })

  it('should export BlogSiteSchema', async () => {
    const { BlogSiteSchema } = await import('../../zod')
    expect(BlogSiteSchema).toBeDefined()
  })

  it('should export DirectorySiteSchema', async () => {
    const { DirectorySiteSchema } = await import('../../zod')
    expect(DirectorySiteSchema).toBeDefined()
  })

  it('should export AgentSiteSchema', async () => {
    const { AgentSiteSchema } = await import('../../zod')
    expect(AgentSiteSchema).toBeDefined()
  })
})

describe('Zod Schema Exports - App Types', () => {
  it('should export AppPropsSchema', async () => {
    const { AppPropsSchema } = await import('../../zod')
    expect(AppPropsSchema).toBeDefined()
  })

  it('should export ShellPropsSchema', async () => {
    const { ShellPropsSchema } = await import('../../zod')
    expect(ShellPropsSchema).toBeDefined()
  })

  it('should export DashboardPropsSchema', async () => {
    const { DashboardPropsSchema } = await import('../../zod')
    expect(DashboardPropsSchema).toBeDefined()
  })

  it('should export SettingsPropsSchema', async () => {
    const { SettingsPropsSchema } = await import('../../zod')
    expect(SettingsPropsSchema).toBeDefined()
  })

  it('should export DashboardAppSchema', async () => {
    const { DashboardAppSchema } = await import('../../zod')
    expect(DashboardAppSchema).toBeDefined()
  })

  it('should export AgentAppSchema', async () => {
    const { AgentAppSchema } = await import('../../zod')
    expect(AgentAppSchema).toBeDefined()
  })
})

describe('Zod Schema Exports - Common Schemas', () => {
  it('should export CTASchema', async () => {
    const { CTASchema } = await import('../../zod')
    expect(CTASchema).toBeDefined()
    const validCTA = {
      text: 'Get Started',
      href: '/signup',
    }
    const result = CTASchema.safeParse(validCTA)
    expect(result.success).toBe(true)
  })

  it('should export NavItemSchema', async () => {
    const { NavItemSchema } = await import('../../zod')
    expect(NavItemSchema).toBeDefined()
  })

  it('should export ThemeModeSchema', async () => {
    const { ThemeModeSchema } = await import('../../zod')
    expect(ThemeModeSchema).toBeDefined()
  })

  it('should export ActionConfigSchema', async () => {
    const { ActionConfigSchema } = await import('../../zod')
    expect(ActionConfigSchema).toBeDefined()
  })
})

describe('Zod Schema Validation Behavior', () => {
  it('should reject invalid HeroProps', async () => {
    const { HeroPropsSchema } = await import('../../zod')
    const invalidProps = {
      title: 123, // should be string
    }
    const result = HeroPropsSchema.safeParse(invalidProps)
    expect(result.success).toBe(false)
  })

  it('should provide default values where defined', async () => {
    const { BasePanelPropsSchema } = await import('../../types/panel-types')
    const emptyProps = {}
    const result = BasePanelPropsSchema.safeParse(emptyProps)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.collapsible).toBe(false)
      expect(result.data.defaultCollapsed).toBe(false)
    }
  })
})

// =============================================================================
// Task: mdxui-ltd - Widget, Input, Field, View, Collection Types
// =============================================================================

describe('Widget Types', () => {
  it('should export WidgetSizeSchema', async () => {
    const { WidgetSizeSchema } = await import('../../types/widget-types')
    expect(WidgetSizeSchema).toBeDefined()
  })

  it('should export BaseWidgetSchema', async () => {
    const { BaseWidgetSchema } = await import('../../types/widget-types')
    expect(BaseWidgetSchema).toBeDefined()
    const validWidget = {
      title: 'My Widget',
      variant: 'default',
    }
    const result = BaseWidgetSchema.safeParse(validWidget)
    expect(result.success).toBe(true)
  })

  it('should export KPICardPropsSchema', async () => {
    const { KPICardPropsSchema } = await import('../../types/widget-types')
    expect(KPICardPropsSchema).toBeDefined()
    const validKPI = {
      label: 'Revenue',
      value: 10000,
      trend: 'up',
    }
    const result = KPICardPropsSchema.safeParse(validKPI)
    expect(result.success).toBe(true)
  })

  it('should export SparklineCardPropsSchema', async () => {
    const { SparklineCardPropsSchema } = await import('../../types/widget-types')
    expect(SparklineCardPropsSchema).toBeDefined()
  })

  it('should export LineChartPropsSchema', async () => {
    const { LineChartPropsSchema } = await import('../../types/widget-types')
    expect(LineChartPropsSchema).toBeDefined()
  })

  it('should export BarChartPropsSchema', async () => {
    const { BarChartPropsSchema } = await import('../../types/widget-types')
    expect(BarChartPropsSchema).toBeDefined()
  })

  it('should export PieChartPropsSchema', async () => {
    const { PieChartPropsSchema } = await import('../../types/widget-types')
    expect(PieChartPropsSchema).toBeDefined()
  })

  it('should export DataTablePropsSchema', async () => {
    const { DataTablePropsSchema } = await import('../../types/widget-types')
    expect(DataTablePropsSchema).toBeDefined()
  })

  it('should export StatusCardPropsSchema', async () => {
    const { StatusCardPropsSchema } = await import('../../types/widget-types')
    expect(StatusCardPropsSchema).toBeDefined()
  })

  it('should export ActivityFeedPropsSchema', async () => {
    const { ActivityFeedPropsSchema } = await import('../../types/widget-types')
    expect(ActivityFeedPropsSchema).toBeDefined()
  })

  it('should export QuickActionsPropsSchema', async () => {
    const { QuickActionsPropsSchema } = await import('../../types/widget-types')
    expect(QuickActionsPropsSchema).toBeDefined()
  })

  it('should export EventCalendarPropsSchema', async () => {
    const { EventCalendarPropsSchema } = await import('../../types/widget-types')
    expect(EventCalendarPropsSchema).toBeDefined()
  })

  it('should export TaskListPropsSchema', async () => {
    const { TaskListPropsSchema } = await import('../../types/widget-types')
    expect(TaskListPropsSchema).toBeDefined()
  })
})

describe('Input Types', () => {
  it('should export BaseInputPropsSchema', async () => {
    const { BaseInputPropsSchema } = await import('../../types/input-types')
    expect(BaseInputPropsSchema).toBeDefined()
  })

  it('should export TextInputPropsSchema', async () => {
    const { TextInputPropsSchema } = await import('../../types/input-types')
    expect(TextInputPropsSchema).toBeDefined()
    const validInput = {
      source: 'name',
      label: 'Name',
    }
    const result = TextInputPropsSchema.safeParse(validInput)
    expect(result.success).toBe(true)
  })

  it('should export NumberInputPropsSchema', async () => {
    const { NumberInputPropsSchema } = await import('../../types/input-types')
    expect(NumberInputPropsSchema).toBeDefined()
  })

  it('should export SelectInputPropsSchema', async () => {
    const { SelectInputPropsSchema } = await import('../../types/input-types')
    expect(SelectInputPropsSchema).toBeDefined()
    const validSelect = {
      source: 'status',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
      ],
    }
    const result = SelectInputPropsSchema.safeParse(validSelect)
    expect(result.success).toBe(true)
  })

  it('should export DateInputPropsSchema', async () => {
    const { DateInputPropsSchema } = await import('../../types/input-types')
    expect(DateInputPropsSchema).toBeDefined()
  })

  it('should export FileInputPropsSchema', async () => {
    const { FileInputPropsSchema } = await import('../../types/input-types')
    expect(FileInputPropsSchema).toBeDefined()
  })

  it('should export RichTextInputPropsSchema', async () => {
    const { RichTextInputPropsSchema } = await import('../../types/input-types')
    expect(RichTextInputPropsSchema).toBeDefined()
  })

  it('should export ReferenceInputPropsSchema', async () => {
    const { ReferenceInputPropsSchema } = await import('../../types/input-types')
    expect(ReferenceInputPropsSchema).toBeDefined()
  })

  it('should export TagsInputPropsSchema', async () => {
    const { TagsInputPropsSchema } = await import('../../types/input-types')
    expect(TagsInputPropsSchema).toBeDefined()
  })

  it('should export ColorInputPropsSchema', async () => {
    const { ColorInputPropsSchema } = await import('../../types/input-types')
    expect(ColorInputPropsSchema).toBeDefined()
  })
})

describe('Field Types', () => {
  it('should export BaseFieldPropsSchema', async () => {
    const { BaseFieldPropsSchema } = await import('../../types/field-types')
    expect(BaseFieldPropsSchema).toBeDefined()
  })

  it('should export TextFieldPropsSchema', async () => {
    const { TextFieldPropsSchema } = await import('../../types/field-types')
    expect(TextFieldPropsSchema).toBeDefined()
    const validField = {
      value: 'Hello World',
    }
    const result = TextFieldPropsSchema.safeParse(validField)
    expect(result.success).toBe(true)
  })

  it('should export NumberFieldPropsSchema', async () => {
    const { NumberFieldPropsSchema } = await import('../../types/field-types')
    expect(NumberFieldPropsSchema).toBeDefined()
  })

  it('should export DateFieldPropsSchema', async () => {
    const { DateFieldPropsSchema } = await import('../../types/field-types')
    expect(DateFieldPropsSchema).toBeDefined()
  })

  it('should export BooleanFieldPropsSchema', async () => {
    const { BooleanFieldPropsSchema } = await import('../../types/field-types')
    expect(BooleanFieldPropsSchema).toBeDefined()
  })

  it('should export ImageFieldPropsSchema', async () => {
    const { ImageFieldPropsSchema } = await import('../../types/field-types')
    expect(ImageFieldPropsSchema).toBeDefined()
  })

  it('should export ChipFieldPropsSchema', async () => {
    const { ChipFieldPropsSchema } = await import('../../types/field-types')
    expect(ChipFieldPropsSchema).toBeDefined()
  })

  it('should export StatusFieldPropsSchema', async () => {
    const { StatusFieldPropsSchema } = await import('../../types/field-types')
    expect(StatusFieldPropsSchema).toBeDefined()
  })

  it('should export ReferenceFieldPropsSchema', async () => {
    const { ReferenceFieldPropsSchema } = await import('../../types/field-types')
    expect(ReferenceFieldPropsSchema).toBeDefined()
  })

  it('should export JsonFieldPropsSchema', async () => {
    const { JsonFieldPropsSchema } = await import('../../types/field-types')
    expect(JsonFieldPropsSchema).toBeDefined()
  })

  it('should export CodeFieldPropsSchema', async () => {
    const { CodeFieldPropsSchema } = await import('../../types/field-types')
    expect(CodeFieldPropsSchema).toBeDefined()
  })
})

describe('View Types', () => {
  it('should export BaseViewPropsSchema', async () => {
    const { BaseViewPropsSchema } = await import('../../types/view-types')
    expect(BaseViewPropsSchema).toBeDefined()
  })

  it('should export DashboardViewPropsSchema', async () => {
    const { DashboardViewPropsSchema } = await import('../../types/view-types')
    expect(DashboardViewPropsSchema).toBeDefined()
  })

  it('should export SettingsViewPropsSchema', async () => {
    const { SettingsViewPropsSchema } = await import('../../types/view-types')
    expect(SettingsViewPropsSchema).toBeDefined()
  })

  it('should export ProfileViewPropsSchema', async () => {
    const { ProfileViewPropsSchema } = await import('../../types/view-types')
    expect(ProfileViewPropsSchema).toBeDefined()
  })

  it('should export APIKeysViewPropsSchema', async () => {
    const { APIKeysViewPropsSchema } = await import('../../types/view-types')
    expect(APIKeysViewPropsSchema).toBeDefined()
  })

  it('should export UsersViewPropsSchema', async () => {
    const { UsersViewPropsSchema } = await import('../../types/view-types')
    expect(UsersViewPropsSchema).toBeDefined()
  })

  it('should export TicketsViewPropsSchema', async () => {
    const { TicketsViewPropsSchema } = await import('../../types/view-types')
    expect(TicketsViewPropsSchema).toBeDefined()
  })

  it('should export AgentsViewPropsSchema', async () => {
    const { AgentsViewPropsSchema } = await import('../../types/view-types')
    expect(AgentsViewPropsSchema).toBeDefined()
  })

  it('should export VibeCodeViewPropsSchema', async () => {
    const { VibeCodeViewPropsSchema } = await import('../../types/view-types')
    expect(VibeCodeViewPropsSchema).toBeDefined()
  })

  it('should export WorkflowsViewPropsSchema', async () => {
    const { WorkflowsViewPropsSchema } = await import('../../types/view-types')
    expect(WorkflowsViewPropsSchema).toBeDefined()
  })
})

describe('Collection Types', () => {
  it('should export SortOrderSchema', async () => {
    const { SortOrderSchema } = await import('../../types/collection-types')
    expect(SortOrderSchema).toBeDefined()
    const result = SortOrderSchema.safeParse('asc')
    expect(result.success).toBe(true)
  })

  it('should export FilterOperatorSchema', async () => {
    const { FilterOperatorSchema } = await import('../../types/collection-types')
    expect(FilterOperatorSchema).toBeDefined()
  })

  it('should export PaginationSchema', async () => {
    const { PaginationSchema } = await import('../../types/collection-types')
    expect(PaginationSchema).toBeDefined()
    const validPagination = {
      page: 1,
      perPage: 25,
    }
    const result = PaginationSchema.safeParse(validPagination)
    expect(result.success).toBe(true)
  })

  it('should export DataProviderSchema', async () => {
    const { DataProviderSchema } = await import('../../types/collection-types')
    expect(DataProviderSchema).toBeDefined()
  })

  it('should export CollectionPropsSchema', async () => {
    const { CollectionPropsSchema } = await import('../../types/collection-types')
    expect(CollectionPropsSchema).toBeDefined()
  })

  it('should export ListViewPropsSchema', async () => {
    const { ListViewPropsSchema } = await import('../../types/collection-types')
    expect(ListViewPropsSchema).toBeDefined()
  })

  it('should export ShowViewPropsSchema', async () => {
    const { ShowViewPropsSchema } = await import('../../types/collection-types')
    expect(ShowViewPropsSchema).toBeDefined()
  })

  it('should export EditViewPropsSchema', async () => {
    const { EditViewPropsSchema } = await import('../../types/collection-types')
    expect(EditViewPropsSchema).toBeDefined()
  })

  it('should export CreateViewPropsSchema', async () => {
    const { CreateViewPropsSchema } = await import('../../types/collection-types')
    expect(CreateViewPropsSchema).toBeDefined()
  })

  it('should export GetListParamsSchema', async () => {
    const { GetListParamsSchema } = await import('../../types/collection-types')
    expect(GetListParamsSchema).toBeDefined()
  })

  it('should export RecordContextSchema', async () => {
    const { RecordContextSchema } = await import('../../types/collection-types')
    expect(RecordContextSchema).toBeDefined()
  })

  it('should export ListContextSchema', async () => {
    const { ListContextSchema } = await import('../../types/collection-types')
    expect(ListContextSchema).toBeDefined()
  })
})

// =============================================================================
// Additional Type Exports from zod.ts
// =============================================================================

describe('Additional Zod Exports - Stats and Team', () => {
  it('should export StatItemSchema', async () => {
    const { StatItemSchema } = await import('../../zod')
    expect(StatItemSchema).toBeDefined()
  })

  it('should export StatsPropsSchema', async () => {
    const { StatsPropsSchema } = await import('../../zod')
    expect(StatsPropsSchema).toBeDefined()
  })

  it('should export TeamMemberSchema', async () => {
    const { TeamMemberSchema } = await import('../../zod')
    expect(TeamMemberSchema).toBeDefined()
  })

  it('should export TeamSectionPropsSchema', async () => {
    const { TeamSectionPropsSchema } = await import('../../zod')
    expect(TeamSectionPropsSchema).toBeDefined()
  })
})

describe('Additional Zod Exports - Directory and Discovery', () => {
  it('should export ListingSchema', async () => {
    const { ListingSchema } = await import('../../zod')
    expect(ListingSchema).toBeDefined()
  })

  it('should export DiscoveryListingSchema', async () => {
    const { DiscoveryListingSchema } = await import('../../zod')
    expect(DiscoveryListingSchema).toBeDefined()
  })

  it('should export CardGridPropsSchema', async () => {
    const { CardGridPropsSchema } = await import('../../zod')
    expect(CardGridPropsSchema).toBeDefined()
  })
})

describe('Additional Zod Exports - Agent and Domain Types', () => {
  it('should export AgentPropsSchema', async () => {
    const { AgentPropsSchema } = await import('../../zod')
    expect(AgentPropsSchema).toBeDefined()
  })

  it('should export WorkflowPropsSchema', async () => {
    const { WorkflowPropsSchema } = await import('../../zod')
    expect(WorkflowPropsSchema).toBeDefined()
  })

  it('should export ToolPropsSchema', async () => {
    const { ToolPropsSchema } = await import('../../zod')
    expect(ToolPropsSchema).toBeDefined()
  })

  it('should export StartupPropsSchema', async () => {
    const { StartupPropsSchema } = await import('../../zod')
    expect(StartupPropsSchema).toBeDefined()
  })
})

describe('Additional Zod Exports - Service Types', () => {
  it('should export APIPropsSchema', async () => {
    const { APIPropsSchema } = await import('../../zod')
    expect(APIPropsSchema).toBeDefined()
  })

  it('should export WebhookPropsSchema', async () => {
    const { WebhookPropsSchema } = await import('../../zod')
    expect(WebhookPropsSchema).toBeDefined()
  })

  it('should export EndpointPropsSchema', async () => {
    const { EndpointPropsSchema } = await import('../../zod')
    expect(EndpointPropsSchema).toBeDefined()
  })
})

describe('Additional Zod Exports - Tremor Types', () => {
  it('should export DonutChartPropsSchema', async () => {
    const { DonutChartPropsSchema } = await import('../../zod')
    expect(DonutChartPropsSchema).toBeDefined()
  })

  it('should export TrackerPropsSchema', async () => {
    const { TrackerPropsSchema } = await import('../../zod')
    expect(TrackerPropsSchema).toBeDefined()
  })

  it('should export TremorMetricCardPropsSchema', async () => {
    const { TremorMetricCardPropsSchema } = await import('../../zod')
    expect(TremorMetricCardPropsSchema).toBeDefined()
  })
})

describe('Additional Zod Exports - GitHub Patterns', () => {
  it('should export IssuePropsSchema', async () => {
    const { IssuePropsSchema } = await import('../../zod')
    expect(IssuePropsSchema).toBeDefined()
  })

  it('should export PullRequestPropsSchema', async () => {
    const { PullRequestPropsSchema } = await import('../../zod')
    expect(PullRequestPropsSchema).toBeDefined()
  })

  it('should export ProjectPropsSchema', async () => {
    const { ProjectPropsSchema } = await import('../../zod')
    expect(ProjectPropsSchema).toBeDefined()
  })

  it('should export DiscussionPropsSchema', async () => {
    const { DiscussionPropsSchema } = await import('../../zod')
    expect(DiscussionPropsSchema).toBeDefined()
  })
})
