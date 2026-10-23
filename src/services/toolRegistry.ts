/**
 * Tool Registry for AI Aaji Workflow Architect
 * Central registry of verified, safe tools with input schemas and execution handlers.
 */

import { PRODUCT_IDENTITY, FOUNDERS, PRICING_PLANS, FAQ_ITEMS, FEATURES } from '../data/productData.js';

export interface ToolDefinition {
  name: string;
  description: string;
  parameters: {
    type: 'OBJECT';
    properties: Record<string, { type: string; description: string; enum?: string[] }>;
    required?: string[];
  };
  statusMessage: string;
  execute: (args: Record<string, any>) => Promise<any>;
}

export const TOOL_REGISTRY: Record<string, ToolDefinition> = {
  lookupProductKnowledge: {
    name: 'lookupProductKnowledge',
    description: 'Retrieve verified technical facts, features, and capabilities of AI Aaji.',
    statusMessage: 'Checking verified product knowledge...',
    parameters: {
      type: 'OBJECT',
      properties: {
        topic: {
          type: 'STRING',
          description: 'The specific topic to look up (e.g. "overview", "voice", "vision", "automation")',
        },
      },
    },
    execute: async (rawArgs = {}) => {
      const topic = typeof rawArgs?.topic === 'string' ? rawArgs.topic.slice(0, 100).trim() : 'overview';
      return {
        brand: PRODUCT_IDENTITY.brandName,
        category: PRODUCT_IDENTITY.category,
        voiceEngine: `${PRODUCT_IDENTITY.configuredVoiceModel} with ${PRODUCT_IDENTITY.configuredVoiceName} voice`,
        tagline: PRODUCT_IDENTITY.primaryTagline,
        verifiedFeatures: FEATURES.map((f) => ({
          number: f.number,
          title: f.title,
          description: f.description,
          status: f.status,
        })),
        queriedTopic: topic || 'overview',
      };
    },
  },

  getPricingAndPurchaseInfo: {
    name: 'getPricingAndPurchaseInfo',
    description: 'Get verified pricing tiers (Free, Base ₹399, Premium ₹699) and the official contact-to-purchase email workflow.',
    statusMessage: 'Retrieving edition details & purchase process...',
    parameters: {
      type: 'OBJECT',
      properties: {
        edition: {
          type: 'STRING',
          description: 'The edition to enquire about ("free", "base", "premium", or "all")',
          enum: ['free', 'base', 'premium', 'all'],
        },
      },
    },
    execute: async (rawArgs = {}) => {
      const rawEdition = typeof rawArgs?.edition === 'string' ? rawArgs.edition.toLowerCase().trim() : 'all';
      const validEditions = ['free', 'base', 'premium', 'all'];
      const edition = validEditions.includes(rawEdition) ? rawEdition : 'all';

      const selected =
        edition === 'all'
          ? PRICING_PLANS
          : PRICING_PLANS.filter((p) => p.id === edition);

      return {
        plans: selected.map((p) => ({
          name: p.name,
          price: p.priceDisplay,
          tagline: p.tagline,
          features: p.features,
          ctaLabel: p.ctaLabel,
        })),
        purchaseProcess:
          'Purchases occur via direct email enquiry to aiaajiofficial@gmail.com. We do not use automated on-site checkout. Clicking purchase opens an editable email draft with prefilled edition details.',
        contactEmail: PRODUCT_IDENTITY.contactEmail,
      };
    },
  },

  getDownloadAccessInfo: {
    name: 'getDownloadAccessInfo',
    description: 'Get the official Google Drive repository link for the free software installer and supported platforms.',
    statusMessage: 'Accessing official Google Drive repository...',
    parameters: {
      type: 'OBJECT',
      properties: {
        os: {
          type: 'STRING',
          description: 'The operating system (windows, macos, linux, or general)',
        },
      },
    },
    execute: async (rawArgs = {}) => {
      const rawOs = typeof rawArgs?.os === 'string' ? rawArgs.os.toLowerCase().trim().slice(0, 50) : 'general';
      const os = ['windows', 'macos', 'linux'].includes(rawOs) ? rawOs : 'general';

      return {
        downloadUrl: PRODUCT_IDENTITY.downloadUrl,
        downloadVersion: PRODUCT_IDENTITY.downloadVersion,
        releaseStatus: PRODUCT_IDENTITY.releaseStatus,
        supportedPlatforms: PRODUCT_IDENTITY.supportedOS,
        targetOS: os,
        instructions:
          'The installer packages are hosted in our official Google Drive folder. Users can select and download the installer matching their OS (Windows 10/11 64-bit, macOS 13+, or Linux). No automated direct download is initiated.',
      };
    },
  },

  explainDesktopCapabilities: {
    name: 'explainDesktopCapabilities',
    description: 'Explain differences between desktop software capabilities and web browser demo capabilities.',
    statusMessage: 'Analyzing platform capabilities...',
    parameters: {
      type: 'OBJECT',
      properties: {
        featureRequested: {
          type: 'STRING',
          description: 'The specific feature the user asked to perform (e.g., "control laptop", "screen analysis", "close app")',
        },
      },
    },
    execute: async (rawArgs = {}) => {
      const featureRequested =
        typeof rawArgs?.featureRequested === 'string' ? rawArgs.featureRequested.slice(0, 200).trim() : '';

      return {
        browserLimitations:
          'The website provides a live Gemini Realtime voice conversation demo and chatbot. Web browsers cannot execute system-level desktop actions or access local applications for security reasons.',
        desktopCapabilities:
          'System controls, application shortcuts, active window switching, and screen/camera visual understanding are implemented in the installed desktop software client.',
        recommendation:
          'To experience device automation and screen awareness, download the free software release or enquire about Base/Premium editions.',
        featureRequested,
      };
    },
  },

  getFounderStory: {
    name: 'getFounderStory',
    description: 'Retrieve verified biographical information and roles for founders Abhinav Singh and Tanisha Kolhar.',
    statusMessage: 'Loading founders background & mission...',
    parameters: {
      type: 'OBJECT',
      properties: {},
    },
    execute: async () => {
      return {
        founders: FOUNDERS.map((f) => ({
          name: f.name,
          role: f.role,
          roleLabel: f.roleLabel,
          designation: f.name.includes('Abhinav')
            ? 'Abhinav Singh — Co-Founder & Product Lead'
            : 'Tanisha — Co-Founder & Technical Lead',
          bio: f.bio,
          isDeveloper: f.isDeveloper,
          instagram: f.socials?.instagram,
        })),
        missionStatement:
          'We believe technology should work around people, not the other way around. AI Aaji is our step towards making AI more natural, accessible, and useful in everyday life.',
        officialInstagram: PRODUCT_IDENTITY.officialInstagramUrl,
        abhinavInstagram: 'https://www.instagram.com/abhinavsinghofficial21/',
        tanishaInstagram: 'https://www.instagram.com/tanu_here_10/',
      };
    },
  },

  getOfficialSocialLinks: {
    name: 'getOfficialSocialLinks',
    description: 'Get verified social channels and official contact coordinates.',
    statusMessage: 'Fetching official channels...',
    parameters: {
      type: 'OBJECT',
      properties: {},
    },
    execute: async () => {
      return {
        instagram: PRODUCT_IDENTITY.officialInstagramUrl,
        instagramHandle: PRODUCT_IDENTITY.officialInstagramHandle,
        founderInstagrams: {
          abhinavSingh: 'https://www.instagram.com/abhinavsinghofficial21/',
          tanishaKolhar: 'https://www.instagram.com/tanu_here_10/',
        },
        email: PRODUCT_IDENTITY.contactEmail,
        website: 'https://ais-dev-6374uudt5adcz62i4ghb57-928573906684.asia-southeast1.run.app',
      };
    },
  },
};
