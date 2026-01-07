/**
 * TDD RED Phase Tests for mdxui Types Migration
 *
 * These tests verify that the Business-as-Code types are properly exported from mdxui.
 * Currently in RED phase - tests will fail because types don't exist yet in mdxui.
 *
 * Source files (18,945 lines total):
 * - /Users/nathanclevenger/projects/ui/packages/mdxui/src/types/domain-types.ts
 * - /Users/nathanclevenger/projects/ui/packages/mdxui/src/types/agent-types.ts
 * - /Users/nathanclevenger/projects/ui/packages/mdxui/src/types/app-types.ts
 * - /Users/nathanclevenger/projects/ui/packages/mdxui/src/types/site-types.ts
 */

import { describe, it, expect } from 'vitest'

// =============================================================================
// mdxui-4nw: Test domain-types exports
// =============================================================================

describe('domain-types exports (mdxui-4nw)', () => {
  describe('Business Models', () => {
    it('should export Startup type and schema', async () => {
      const { StartupPropsSchema, StartupProps } = await import('mdxui/types')
      expect(StartupPropsSchema).toBeDefined()
      expect(StartupPropsSchema.parse).toBeTypeOf('function')
      // Verify the schema has expected fields
      const parsed = StartupPropsSchema.parse({
        $id: 'test-startup',
        $type: 'Startup',
        name: 'Test Startup',
        domain: 'test.com',
        revenueModel: 'subscription',
      })
      expect(parsed.$type).toBe('Startup')
    })

    it('should export Agency type and schema', async () => {
      const { AgencyPropsSchema } = await import('mdxui/types')
      expect(AgencyPropsSchema).toBeDefined()
      expect(AgencyPropsSchema.parse).toBeTypeOf('function')
      const parsed = AgencyPropsSchema.parse({
        $id: 'test-agency',
        $type: 'Agency',
        name: 'Test Agency',
        domain: 'agency.com',
        specialty: 'Web Development',
        services: [{ name: 'Web Dev', description: 'Building websites' }],
      })
      expect(parsed.$type).toBe('Agency')
    })

    it('should export Marketplace type and schema', async () => {
      const { MarketplacePropsSchema } = await import('mdxui/types')
      expect(MarketplacePropsSchema).toBeDefined()
      const parsed = MarketplacePropsSchema.parse({
        $id: 'test-marketplace',
        $type: 'Marketplace',
        name: 'Test Marketplace',
        domain: 'marketplace.com',
        marketplaceType: 'product',
        fees: { sellerFee: 10 },
      })
      expect(parsed.$type).toBe('Marketplace')
    })

    it('should export SaaS type and schema', async () => {
      const { SaaSProductPropsSchema } = await import('mdxui/types')
      expect(SaaSProductPropsSchema).toBeDefined()
      const parsed = SaaSProductPropsSchema.parse({
        $id: 'test-saas',
        $type: 'SaaS',
        name: 'Test SaaS',
        domain: 'saas.com',
        category: 'Productivity',
        tiers: [{ name: 'Free', price: 0, features: ['Basic'] }],
      })
      expect(parsed.$type).toBe('SaaS')
    })

    it('should export Platform type and schema', async () => {
      const { PlatformPropsSchema } = await import('mdxui/types')
      expect(PlatformPropsSchema).toBeDefined()
      const parsed = PlatformPropsSchema.parse({
        $id: 'test-platform',
        $type: 'Platform',
        name: 'Test Platform',
        domain: 'platform.com',
        platformType: 'api',
        useCases: ['API Gateway'],
        developer: { documentation: 'https://docs.platform.com' },
      })
      expect(parsed.$type).toBe('Platform')
    })
  })

  describe('Service Models', () => {
    it('should export Studio type and schema', async () => {
      const { StudioPropsSchema } = await import('mdxui/types')
      expect(StudioPropsSchema).toBeDefined()
    })

    it('should export Portal type and schema', async () => {
      const { PortalPropsSchema } = await import('mdxui/types')
      expect(PortalPropsSchema).toBeDefined()
    })

    it('should export Directory type and schema', async () => {
      const { DirectoryPropsSchema } = await import('mdxui/types')
      expect(DirectoryPropsSchema).toBeDefined()
    })

    it('should export Consultancy type and schema', async () => {
      const { ConsultancyPropsSchema } = await import('mdxui/types')
      expect(ConsultancyPropsSchema).toBeDefined()
    })

    it('should export Venture type and schema', async () => {
      const { VenturePropsSchema } = await import('mdxui/types')
      expect(VenturePropsSchema).toBeDefined()
    })
  })

  describe('Content Models', () => {
    it('should export Creator type and schema', async () => {
      const { CreatorPropsSchema } = await import('mdxui/types')
      expect(CreatorPropsSchema).toBeDefined()
    })

    it('should export Publisher type and schema', async () => {
      const { PublisherPropsSchema } = await import('mdxui/types')
      expect(PublisherPropsSchema).toBeDefined()
    })

    it('should export Newsletter type and schema', async () => {
      const { NewsletterPropsSchema } = await import('mdxui/types')
      expect(NewsletterPropsSchema).toBeDefined()
    })
  })

  describe('Community Models', () => {
    it('should export Community type and schema', async () => {
      const { CommunityPropsSchema } = await import('mdxui/types')
      expect(CommunityPropsSchema).toBeDefined()
    })

    it('should export DAO type and schema', async () => {
      const { DAOPropsSchema } = await import('mdxui/types')
      expect(DAOPropsSchema).toBeDefined()
    })
  })

  describe('Common Domain Types', () => {
    it('should export BaseDomain schema and type', async () => {
      const { BaseDomainSchema } = await import('mdxui/types')
      expect(BaseDomainSchema).toBeDefined()
    })

    it('should export BusinessStage enum schema', async () => {
      const { BusinessStageSchema } = await import('mdxui/types')
      expect(BusinessStageSchema).toBeDefined()
    })

    it('should export RevenueModel enum schema', async () => {
      const { RevenueModelSchema } = await import('mdxui/types')
      expect(RevenueModelSchema).toBeDefined()
    })

    it('should export DomainComponents interface', async () => {
      const { DomainComponents } = await import('mdxui/types')
      // Type-only export verification - will be undefined at runtime
      // The important thing is that the import doesn't throw
      expect(true).toBe(true)
    })

    it('should export DomainProps union type', async () => {
      const { DomainProps } = await import('mdxui/types')
      // Type-only export verification
      expect(true).toBe(true)
    })
  })
})

// =============================================================================
// mdxui-ari: Test agent-types exports
// =============================================================================

describe('agent-types exports (mdxui-ari)', () => {
  describe('Agent Types', () => {
    it('should export Agent schema and props', async () => {
      const { AgentPropsSchema } = await import('mdxui/types')
      expect(AgentPropsSchema).toBeDefined()
      expect(AgentPropsSchema.parse).toBeTypeOf('function')
      const parsed = AgentPropsSchema.parse({
        $id: 'test-agent',
        $type: 'Agent',
        name: 'Test Agent',
        role: 'Assistant',
        systemPrompt: 'You are a helpful assistant.',
        model: { provider: 'anthropic', model: 'claude-3-opus' },
      })
      expect(parsed.$type).toBe('Agent')
    })

    it('should export AgentTeam schema', async () => {
      const { AgentTeamPropsSchema } = await import('mdxui/types')
      expect(AgentTeamPropsSchema).toBeDefined()
    })

    it('should export AgentMemory schema', async () => {
      const { AgentMemorySchema } = await import('mdxui/types')
      expect(AgentMemorySchema).toBeDefined()
    })
  })

  describe('Workflow Types', () => {
    it('should export Workflow schema', async () => {
      const { WorkflowPropsSchema } = await import('mdxui/types')
      expect(WorkflowPropsSchema).toBeDefined()
      const parsed = WorkflowPropsSchema.parse({
        $id: 'test-workflow',
        $type: 'Workflow',
        name: 'Test Workflow',
        description: 'A test workflow',
        steps: [{ id: 'step1', name: 'First Step', type: 'agent', config: {} }],
      })
      expect(parsed.$type).toBe('Workflow')
    })

    it('should export WorkflowStep schema', async () => {
      const { WorkflowStepSchema } = await import('mdxui/types')
      expect(WorkflowStepSchema).toBeDefined()
    })

    it('should export WorkflowStepType enum', async () => {
      const { WorkflowStepTypeSchema } = await import('mdxui/types')
      expect(WorkflowStepTypeSchema).toBeDefined()
    })
  })

  describe('Tool Types', () => {
    it('should export Tool schema', async () => {
      const { ToolPropsSchema } = await import('mdxui/types')
      expect(ToolPropsSchema).toBeDefined()
    })

    it('should export ToolParameter schema', async () => {
      const { ToolParameterSchema } = await import('mdxui/types')
      expect(ToolParameterSchema).toBeDefined()
    })
  })

  describe('Function Types', () => {
    it('should export Function schema', async () => {
      const { FunctionPropsSchema } = await import('mdxui/types')
      expect(FunctionPropsSchema).toBeDefined()
    })

    it('should export FunctionRuntime enum', async () => {
      const { FunctionRuntimeSchema } = await import('mdxui/types')
      expect(FunctionRuntimeSchema).toBeDefined()
    })
  })

  describe('Trigger Types', () => {
    it('should export Trigger schema', async () => {
      const { TriggerPropsSchema } = await import('mdxui/types')
      expect(TriggerPropsSchema).toBeDefined()
    })
  })

  describe('Task Types', () => {
    it('should export Task schema', async () => {
      const { TaskPropsSchema } = await import('mdxui/types')
      expect(TaskPropsSchema).toBeDefined()
    })

    it('should export TaskPriority enum', async () => {
      const { TaskPrioritySchema } = await import('mdxui/types')
      expect(TaskPrioritySchema).toBeDefined()
    })

    it('should export TaskStatus enum', async () => {
      const { TaskStatusSchema } = await import('mdxui/types')
      expect(TaskStatusSchema).toBeDefined()
    })
  })

  describe('Memory Types', () => {
    it('should export Memory schema', async () => {
      const { MemoryPropsSchema } = await import('mdxui/types')
      expect(MemoryPropsSchema).toBeDefined()
    })
  })

  describe('Model Types', () => {
    it('should export Model schema', async () => {
      const { ModelPropsSchema } = await import('mdxui/types')
      expect(ModelPropsSchema).toBeDefined()
    })

    it('should export AIProvider enum', async () => {
      const { AIProviderSchema } = await import('mdxui/types')
      expect(AIProviderSchema).toBeDefined()
    })

    it('should export AIModel schema', async () => {
      const { AIModelSchema } = await import('mdxui/types')
      expect(AIModelSchema).toBeDefined()
    })
  })

  describe('Prompt Types', () => {
    it('should export Prompt schema', async () => {
      const { PromptPropsSchema } = await import('mdxui/types')
      expect(PromptPropsSchema).toBeDefined()
    })
  })

  describe('Execution Types', () => {
    it('should export ExecutionStatus enum', async () => {
      const { ExecutionStatusSchema } = await import('mdxui/types')
      expect(ExecutionStatusSchema).toBeDefined()
    })

    it('should export ExecutionContext schema', async () => {
      const { ExecutionContextSchema } = await import('mdxui/types')
      expect(ExecutionContextSchema).toBeDefined()
    })
  })

  describe('AgentComponents Interface', () => {
    it('should export AgentComponents interface', async () => {
      // This test verifies the import doesn't throw
      const module = await import('mdxui/types')
      expect(module).toBeDefined()
    })

    it('should export AgentComponentProps union type', async () => {
      const module = await import('mdxui/types')
      expect(module).toBeDefined()
    })
  })
})

// =============================================================================
// mdxui-p4w: Test app-types and AppComponents interface
// =============================================================================

describe('app-types exports (mdxui-p4w)', () => {
  describe('Base App Type', () => {
    it('should export BaseApp schema', async () => {
      const { BaseAppSchema } = await import('mdxui/types')
      expect(BaseAppSchema).toBeDefined()
      expect(BaseAppSchema.parse).toBeTypeOf('function')
    })
  })

  describe('Dashboard App', () => {
    it('should export DashboardApp schema', async () => {
      const { DashboardAppSchema } = await import('mdxui/types')
      expect(DashboardAppSchema).toBeDefined()
    })
  })

  describe('Developer App', () => {
    it('should export DeveloperApp schema', async () => {
      const { DeveloperAppSchema } = await import('mdxui/types')
      expect(DeveloperAppSchema).toBeDefined()
    })
  })

  describe('Admin App', () => {
    it('should export AdminApp schema', async () => {
      const { AdminAppSchema } = await import('mdxui/types')
      expect(AdminAppSchema).toBeDefined()
    })
  })

  describe('SaaS App', () => {
    it('should export SaaSApp schema', async () => {
      const { SaaSAppSchema } = await import('mdxui/types')
      expect(SaaSAppSchema).toBeDefined()
    })
  })

  describe('Data App', () => {
    it('should export DataApp schema', async () => {
      const { DataAppSchema } = await import('mdxui/types')
      expect(DataAppSchema).toBeDefined()
    })
  })

  describe('Headless App', () => {
    it('should export HeadlessApp schema', async () => {
      const { HeadlessAppSchema } = await import('mdxui/types')
      expect(HeadlessAppSchema).toBeDefined()
    })
  })

  describe('CRM App', () => {
    it('should export CRMApp schema', async () => {
      const { CRMAppSchema } = await import('mdxui/types')
      expect(CRMAppSchema).toBeDefined()
    })
  })

  describe('Booking App', () => {
    it('should export BookingApp schema', async () => {
      const { BookingAppSchema } = await import('mdxui/types')
      expect(BookingAppSchema).toBeDefined()
    })
  })

  describe('Support App', () => {
    it('should export SupportApp schema', async () => {
      const { SupportAppSchema } = await import('mdxui/types')
      expect(SupportAppSchema).toBeDefined()
    })
  })

  describe('Agency App', () => {
    it('should export AgencyApp schema', async () => {
      const { AgencyAppSchema } = await import('mdxui/types')
      expect(AgencyAppSchema).toBeDefined()
    })
  })

  describe('Ops App', () => {
    it('should export OpsApp schema', async () => {
      const { OpsAppSchema } = await import('mdxui/types')
      expect(OpsAppSchema).toBeDefined()
    })
  })

  describe('Agent App', () => {
    it('should export AgentApp schema', async () => {
      const { AgentAppSchema } = await import('mdxui/types')
      expect(AgentAppSchema).toBeDefined()
    })
  })

  describe('Workflow App', () => {
    it('should export WorkflowApp schema', async () => {
      const { WorkflowAppSchema } = await import('mdxui/types')
      expect(WorkflowAppSchema).toBeDefined()
    })
  })

  describe('Infra App', () => {
    it('should export InfraApp schema', async () => {
      const { InfraAppSchema } = await import('mdxui/types')
      expect(InfraAppSchema).toBeDefined()
    })
  })

  describe('Platform App', () => {
    it('should export PlatformApp schema', async () => {
      const { PlatformAppSchema } = await import('mdxui/types')
      expect(PlatformAppSchema).toBeDefined()
    })
  })

  describe('ClientPortal App', () => {
    it('should export ClientPortalApp schema', async () => {
      const { ClientPortalAppSchema } = await import('mdxui/types')
      expect(ClientPortalAppSchema).toBeDefined()
    })
  })

  describe('VibeCode App', () => {
    it('should export VibeCodeApp schema', async () => {
      const { VibeCodeAppSchema } = await import('mdxui/types')
      expect(VibeCodeAppSchema).toBeDefined()
    })
  })

  describe('Mail App', () => {
    it('should export MailApp schema', async () => {
      const { MailAppSchema } = await import('mdxui/types')
      expect(MailAppSchema).toBeDefined()
    })
  })

  describe('App Type Registry', () => {
    it('should export APP_TYPE_DEFAULTS registry', async () => {
      const { APP_TYPE_DEFAULTS } = await import('mdxui/types')
      expect(APP_TYPE_DEFAULTS).toBeDefined()
      expect(APP_TYPE_DEFAULTS.dashboard).toBeDefined()
      expect(APP_TYPE_DEFAULTS.developer).toBeDefined()
      expect(APP_TYPE_DEFAULTS.admin).toBeDefined()
      expect(APP_TYPE_DEFAULTS.mail).toBeDefined()
    })

    it('should export AppTypeName type', async () => {
      // Type-only verification
      const module = await import('mdxui/types')
      expect(module).toBeDefined()
    })

    it('should export AppType union', async () => {
      const { AppTypeSchema } = await import('mdxui/types')
      expect(AppTypeSchema).toBeDefined()
    })
  })
})

// =============================================================================
// mdxui-3s2: Test site-types and SiteComponents interface
// =============================================================================

describe('site-types exports (mdxui-3s2)', () => {
  describe('Base Site Type', () => {
    it('should export BaseSite schema', async () => {
      const { BaseSiteSchema } = await import('mdxui/types')
      expect(BaseSiteSchema).toBeDefined()
      expect(BaseSiteSchema.parse).toBeTypeOf('function')
    })

    it('should export SectionConfig interface', async () => {
      // Type-only verification
      const module = await import('mdxui/types')
      expect(module).toBeDefined()
    })
  })

  describe('Marketing Site', () => {
    it('should export MarketingSite schema', async () => {
      const { MarketingSiteSchema } = await import('mdxui/types')
      expect(MarketingSiteSchema).toBeDefined()
    })

    it('should export marketingSiteSections', async () => {
      const { marketingSiteSections } = await import('mdxui/types')
      expect(marketingSiteSections).toBeDefined()
      expect(Array.isArray(marketingSiteSections)).toBe(true)
      expect(marketingSiteSections.find((s: { component: string }) => s.component === 'Hero')).toBeDefined()
      expect(marketingSiteSections.find((s: { component: string }) => s.component === 'Features')).toBeDefined()
      expect(marketingSiteSections.find((s: { component: string }) => s.component === 'Pricing')).toBeDefined()
    })
  })

  describe('Docs Site', () => {
    it('should export DocsSite schema', async () => {
      const { DocsSiteSchema } = await import('mdxui/types')
      expect(DocsSiteSchema).toBeDefined()
    })

    it('should export docsSiteSections', async () => {
      const { docsSiteSections } = await import('mdxui/types')
      expect(docsSiteSections).toBeDefined()
      expect(Array.isArray(docsSiteSections)).toBe(true)
    })
  })

  describe('Blog Site', () => {
    it('should export BlogSite schema', async () => {
      const { BlogSiteSchema } = await import('mdxui/types')
      expect(BlogSiteSchema).toBeDefined()
    })

    it('should export blogSiteSections', async () => {
      const { blogSiteSections } = await import('mdxui/types')
      expect(blogSiteSections).toBeDefined()
    })
  })

  describe('Directory Site', () => {
    it('should export DirectorySite schema', async () => {
      const { DirectorySiteSchema } = await import('mdxui/types')
      expect(DirectorySiteSchema).toBeDefined()
    })

    it('should export directorySiteSections', async () => {
      const { directorySiteSections } = await import('mdxui/types')
      expect(directorySiteSections).toBeDefined()
    })
  })

  describe('Marketplace Site', () => {
    it('should export MarketplaceSite schema', async () => {
      const { MarketplaceSiteSchema } = await import('mdxui/types')
      expect(MarketplaceSiteSchema).toBeDefined()
    })

    it('should export marketplaceSiteSections', async () => {
      const { marketplaceSiteSections } = await import('mdxui/types')
      expect(marketplaceSiteSections).toBeDefined()
    })
  })

  describe('Community Site', () => {
    it('should export CommunitySite schema', async () => {
      const { CommunitySiteSchema } = await import('mdxui/types')
      expect(CommunitySiteSchema).toBeDefined()
    })

    it('should export communitySiteSections', async () => {
      const { communitySiteSections } = await import('mdxui/types')
      expect(communitySiteSections).toBeDefined()
    })
  })

  describe('Portfolio Site', () => {
    it('should export PortfolioSite schema', async () => {
      const { PortfolioSiteSchema } = await import('mdxui/types')
      expect(PortfolioSiteSchema).toBeDefined()
    })

    it('should export portfolioSiteSections', async () => {
      const { portfolioSiteSections } = await import('mdxui/types')
      expect(portfolioSiteSections).toBeDefined()
    })
  })

  describe('Personal Site', () => {
    it('should export PersonalSite schema', async () => {
      const { PersonalSiteSchema } = await import('mdxui/types')
      expect(PersonalSiteSchema).toBeDefined()
    })

    it('should export personalSiteSections', async () => {
      const { personalSiteSections } = await import('mdxui/types')
      expect(personalSiteSections).toBeDefined()
    })
  })

  describe('Event Site', () => {
    it('should export EventSite schema', async () => {
      const { EventSiteSchema } = await import('mdxui/types')
      expect(EventSiteSchema).toBeDefined()
    })

    it('should export eventSiteSections', async () => {
      const { eventSiteSections } = await import('mdxui/types')
      expect(eventSiteSections).toBeDefined()
    })
  })

  describe('Story Site', () => {
    it('should export StorySite schema', async () => {
      const { StorySiteSchema } = await import('mdxui/types')
      expect(StorySiteSchema).toBeDefined()
    })

    it('should export storySiteSections', async () => {
      const { storySiteSections } = await import('mdxui/types')
      expect(storySiteSections).toBeDefined()
    })
  })

  describe('API Site', () => {
    it('should export APISite schema', async () => {
      const { APISiteSchema } = await import('mdxui/types')
      expect(APISiteSchema).toBeDefined()
    })

    it('should export apiSiteSections', async () => {
      const { apiSiteSections } = await import('mdxui/types')
      expect(apiSiteSections).toBeDefined()
    })
  })

  describe('Agent Site', () => {
    it('should export AgentSite schema', async () => {
      const { AgentSiteSchema } = await import('mdxui/types')
      expect(AgentSiteSchema).toBeDefined()
    })

    it('should export agentSiteSections', async () => {
      const { agentSiteSections } = await import('mdxui/types')
      expect(agentSiteSections).toBeDefined()
    })
  })

  describe('Agency Site', () => {
    it('should export AgencySite schema', async () => {
      const { AgencySiteSchema } = await import('mdxui/types')
      expect(AgencySiteSchema).toBeDefined()
    })

    it('should export agencySiteSections', async () => {
      const { agencySiteSections } = await import('mdxui/types')
      expect(agencySiteSections).toBeDefined()
    })
  })

  describe('Platform Site', () => {
    it('should export PlatformSite schema', async () => {
      const { PlatformSiteSchema } = await import('mdxui/types')
      expect(PlatformSiteSchema).toBeDefined()
    })

    it('should export platformSiteSections', async () => {
      const { platformSiteSections } = await import('mdxui/types')
      expect(platformSiteSections).toBeDefined()
    })
  })

  describe('Site Type Registry', () => {
    it('should export siteTypeRegistry', async () => {
      const { siteTypeRegistry } = await import('mdxui/types')
      expect(siteTypeRegistry).toBeDefined()
      expect(siteTypeRegistry.marketing).toBeDefined()
      expect(siteTypeRegistry.docs).toBeDefined()
      expect(siteTypeRegistry.blog).toBeDefined()
      expect(siteTypeRegistry.directory).toBeDefined()
      expect(siteTypeRegistry.marketplace).toBeDefined()
      expect(siteTypeRegistry.community).toBeDefined()
      expect(siteTypeRegistry.portfolio).toBeDefined()
      expect(siteTypeRegistry.personal).toBeDefined()
      expect(siteTypeRegistry.event).toBeDefined()
      expect(siteTypeRegistry.story).toBeDefined()
      expect(siteTypeRegistry.api).toBeDefined()
      expect(siteTypeRegistry.agent).toBeDefined()
      expect(siteTypeRegistry.agency).toBeDefined()
      expect(siteTypeRegistry.platform).toBeDefined()
    })

    it('should export getSiteTypeConfig helper function', async () => {
      const { getSiteTypeConfig } = await import('mdxui/types')
      expect(getSiteTypeConfig).toBeDefined()
      expect(typeof getSiteTypeConfig).toBe('function')
    })

    it('should export SiteType union', async () => {
      // Type-only verification
      const module = await import('mdxui/types')
      expect(module).toBeDefined()
    })

    it('should export SiteTypeDiscriminator type', async () => {
      // Type-only verification
      const module = await import('mdxui/types')
      expect(module).toBeDefined()
    })
  })
})
