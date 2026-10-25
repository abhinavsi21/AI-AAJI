/**
 * Workflow Architect for AI Aaji Assistant
 * Orchestrates intent recognition, intelligent tool selection, execution, and safe response formatting.
 */

import { TOOL_REGISTRY, ToolDefinition } from './toolRegistry.js';
import { PRODUCT_IDENTITY } from '../data/productData.js';

export interface WorkflowResult {
  reply: string;
  toolUsed?: string;
  toolStatus?: string;
  mode: 'workflow-gemini' | 'workflow-tool';
}

export class WorkflowArchitect {
  /**
   * Determine the most appropriate tool based on user query intent
   */
  static selectTool(message: string): { tool: ToolDefinition; args: Record<string, any> } | null {
    const q = (typeof message === 'string' ? message : '').toLowerCase().trim();
    if (!q) {
      return { tool: TOOL_REGISTRY.lookupProductKnowledge, args: { topic: 'overview' } };
    }

    // 1. Download / Install / Setup / Folder
    if (
      q.includes('download') ||
      q.includes('install') ||
      q.includes('drive') ||
      q.includes('installer') ||
      q.includes('get free') ||
      q.includes('where to get')
    ) {
      const os = q.includes('windows')
        ? 'windows'
        : q.includes('mac')
        ? 'macos'
        : q.includes('linux')
        ? 'linux'
        : 'general';
      return { tool: TOOL_REGISTRY.getDownloadAccessInfo, args: { os } };
    }

    // 2. Pricing / Purchase / Cost / Base / Premium / Buy
    if (
      q.includes('price') ||
      q.includes('pricing') ||
      q.includes('cost') ||
      q.includes('purchase') ||
      q.includes('buy') ||
      q.includes('how much') ||
      q.includes('base') ||
      q.includes('premium') ||
      q.includes('edition')
    ) {
      const edition = q.includes('base')
        ? 'base'
        : q.includes('premium')
        ? 'premium'
        : q.includes('free')
        ? 'free'
        : 'all';
      return { tool: TOOL_REGISTRY.getPricingAndPurchaseInfo, args: { edition } };
    }

    // 3. Founders / Who built / Created / Abhinav / Tanisha / Background / Education
    if (
      q.includes('founder') ||
      q.includes('who built') ||
      q.includes('who created') ||
      q.includes('who made') ||
      q.includes('who is abhinav') ||
      q.includes('who is tanisha') ||
      q.includes('abhinav') ||
      q.includes('tanisha') ||
      q.includes('kolhar') ||
      q.includes('team') ||
      q.includes('study') ||
      q.includes('college') ||
      q.includes('education') ||
      q.includes('background') ||
      q.includes('airport') ||
      q.includes('emersion') ||
      q.includes('agnel') ||
      q.includes('aiem')
    ) {
      return { tool: TOOL_REGISTRY.getFounderStory, args: {} };
    }

    // 4. Social media / Instagram / Follow
    if (q.includes('instagram') || q.includes('social') || q.includes('follow') || q.includes('handle')) {
      return { tool: TOOL_REGISTRY.getOfficialSocialLinks, args: {} };
    }

    // 5. Desktop actions / System controls / Screen / App automation
    if (
      q.includes('control my') ||
      q.includes('open app') ||
      q.includes('my screen') ||
      q.includes('close window') ||
      q.includes('automate') ||
      q.includes('device control') ||
      q.includes('volume') ||
      q.includes('shut down')
    ) {
      return { tool: TOOL_REGISTRY.explainDesktopCapabilities, args: { featureRequested: message } };
    }

    // 6. Capabilities / Features / What can you do / Voice / Audio
    if (
      q.includes('feature') ||
      q.includes('what can you do') ||
      q.includes('capability') ||
      q.includes('aoede') ||
      q.includes('voice') ||
      q.includes('realtime')
    ) {
      return { tool: TOOL_REGISTRY.lookupProductKnowledge, args: { topic: 'features' } };
    }

    // Default to general product knowledge lookup
    return { tool: TOOL_REGISTRY.lookupProductKnowledge, args: { topic: 'overview' } };
  }

  /**
   * Execute the workflow deterministically using registered tools
   */
  static async executeWorkflow(message: string): Promise<WorkflowResult> {
    const selection = this.selectTool(message);

    if (!selection) {
      return {
        reply: `Hello! I am AI Aaji, your everyday AI personal assistant created by Abhinav Singh and Tanisha Kolhar. I'm here to help with real-time voice, task assistance, and verified product information. How can I assist you?`,
        mode: 'workflow-tool',
      };
    }

    const { tool, args } = selection;

    try {
      const executePromise = tool.execute(args);
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error(`Tool ${tool.name} execution timed out`)), 2500)
      );
      const toolOutput = await Promise.race([executePromise, timeoutPromise]);

      // Synthesize high-quality answer based on verified tool output
      let reply = '';

      switch (tool.name) {
        case 'getDownloadAccessInfo':
          reply = `You can access the official AI Aaji installer packages directly from our Google Drive folder:\n\n🔗 ${toolOutput.downloadUrl}\n\n• Current Release: ${toolOutput.downloadVersion}\n• Supported Systems: ${toolOutput.supportedPlatforms}\n\nSimply open the folder in your browser, select the installer matching your OS, and download. No background software downloads occur automatically.`;
          break;

        case 'getPricingAndPurchaseInfo':
          reply = `AI Aaji is available in three editions:\n\n• Free (₹0): Public release to explore conversational voice AI via our official Google Drive folder.\n• Base (₹399): Essential everyday assistant featuring real-time voice with Aoede persona, digital task workflows, and core device controls.\n• Premium (₹699): Maximum capability edition adding multimodal screen/camera understanding, advanced automation, and priority engineering support.\n\n📧 How to Purchase: Purchases are processed via direct email enquiry to ${PRODUCT_IDENTITY.contactEmail}. Clicking "Purchase Base" or "Purchase Premium" in our Pricing section opens a prefilled email draft with payment instructions.`;
          break;

        case 'getFounderStory':
          reply = `AI Aaji was created by developer-founders Abhinav Singh and Tanisha Kolhar:\n\n• Abhinav Singh — Co-Founder & Product Lead (Product & Experience). He is a 4th year student pursuing Electronics and Computer Engineering (EComp) at Agnel Institute of Engineering and Design, Goa (AIEM Goa). He completed an internship at GMR Mopa Airport (Goa) and leads AI Aaji's product vision, design, and practical usability.\nInstagram: https://www.instagram.com/abhinavsinghofficial21/ (@abhinavsinghofficial21)\n\n• Tanisha Kolhar — Co-Founder & Technical Lead (Engineering & Systems). She studied Electronics and Computer Engineering (EComp) at Agnel Institute of Engineering and Design, Goa (AIEM Goa) and is currently working with Emersion as a BMS (Building Management Systems) Engineer. She engineers the core systems, architecture, and voice intelligence.\nInstagram: https://www.instagram.com/tanu_here_10/ (@tanu_here_10)\n\nTheir shared philosophy: "We believe technology should work around people, not the other way around. AI Aaji is our step towards making AI more natural, accessible, and useful in everyday life."\n\nOfficial project Instagram: ${PRODUCT_IDENTITY.officialInstagramUrl}`;
          break;

        case 'explainDesktopCapabilities':
          reply = `Here is how AI Aaji's platforms differ:\n\n• Website Demo: Provides a real-time conversational voice experience using the aiaaji live engine (Aoede voice) and interactive product previews within your browser sandbox.\n• Desktop Software: Performs actual system-level actions (application switching, device shortcuts, audio levels) and visual context analysis (camera/screen understanding) because it runs natively with user-granted operating system permissions.\n\nTo try desktop capabilities, open our Free Software Download section to access the installer from Google Drive.`;
          break;

        case 'getOfficialSocialLinks':
          reply = `Here are the official coordinates and Instagram profiles for AI Aaji:\n\n• Official AI Aaji Instagram: ${PRODUCT_IDENTITY.officialInstagramUrl} (${PRODUCT_IDENTITY.officialInstagramHandle})\n• Abhinav Singh — Co-Founder & Product Lead: https://www.instagram.com/abhinavsinghofficial21/ (@abhinavsinghofficial21)\n• Tanisha — Co-Founder & Technical Lead: https://www.instagram.com/tanu_here_10/ (@tanu_here_10)\n• Contact Email: ${PRODUCT_IDENTITY.contactEmail}\n• Pricing: Free (₹0), Base (₹399), Premium (₹699)\n\nFeel free to reach out to founders Abhinav Singh and Tanisha directly via email or Instagram!`;
          break;

        case 'lookupProductKnowledge':
        default:
          reply = `AI Aaji is an intelligent personal assistant designed to bring real-time voice, multimodal understanding, and desktop task assistance together. Key capabilities include:\n\n1. Real-Time Voice AI (powered by aiaaji live with the Aoede voice)\n2. Visual Understanding (contextual camera/screen assistance)\n3. Smart Task Assistance (everyday digital productivity)\n4. Device & Application Controls (workstation shortcuts)\n5. Intelligent Information Access & Personalized Conversations\n\nCreated by developers Abhinav Singh and Tanisha. You can test live voice speaking right above in our Live Demo section!`;
          break;
      }

      return {
        reply,
        toolUsed: tool.name,
        toolStatus: tool.statusMessage,
        mode: 'workflow-tool',
      };
    } catch (err: any) {
      console.error(`Error executing tool ${tool.name}:`, err);
      return {
        reply: `AI Aaji is an everyday personal assistant created by Abhinav Singh and Tanisha. For pricing, free downloads, or purchase enquiries, you can contact us at ${PRODUCT_IDENTITY.contactEmail}.`,
        toolUsed: tool.name,
        toolStatus: 'Execution fallback',
        mode: 'workflow-tool',
      };
    }
  }
}
