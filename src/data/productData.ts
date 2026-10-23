/**
 * AI Aaji — Verified Product Knowledge & System Configuration
 * Official Central Data Store for Website, Chatbot, and Voice Assistant
 */

export interface PricingPlan {
  id: 'free' | 'base' | 'premium';
  name: string;
  tagline: string;
  priceDisplay: string;
  priceInRupees: number;
  highlighted?: boolean;
  badge?: string;
  accentColor: 'cyan' | 'violet' | 'gradient';
  features: string[];
  ctaLabel: string;
  ctaType: 'download' | 'purchase';
  mailtoSubject?: string;
  mailtoBody?: string;
}

export interface Founder {
  name: string;
  role: string;
  roleLabel: string;
  title: string;
  bio: string;
  isDeveloper: boolean;
  avatarPlaceholder: string;
  imagePath: string;
  socials?: {
    instagram?: string;
    github?: string;
    linkedin?: string;
  };
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'capabilities' | 'pricing' | 'technical';
}

export interface FeatureItem {
  number: string;
  title: string;
  description: string;
  iconName: string;
  tag: string;
  status: 'available' | 'supported-devices' | 'in-development';
}

export const PRODUCT_IDENTITY = {
  brandName: 'AI Aaji',
  category: 'Intelligent AI Personal Assistant',
  primaryTagline: 'Your AI. Your Voice. Your Everyday Assistant.',
  heroHeadline: 'Meet AI Aaji. Your world, a little easier.',
  heroDescription:
    'Talk naturally. Explore ideas. Get help with everyday digital tasks. Meet an AI assistant designed to bring voice, intelligence, and automation together.',
  contactEmail: 'aiaajiofficial@gmail.com',
  officialInstagramUrl: 'https://www.instagram.com/ai.aaji.assistant/',
  officialInstagramHandle: '@ai.aaji.assistant',
  configuredVoiceModel: 'gemini-3.8-live',
  configuredVoiceName: 'Aoede',
  chatModel: 'gemini-3.8-flash',
  downloadVersion: 'v0.9.4 Beta (Free Release)',
  // Official Google Drive folder for Free Software Download
  downloadUrl: 'https://drive.google.com/drive/folders/1O_YobHhC7AhTwwWL-VUwCadl442gRWjj?usp=sharing',
  releaseStatus: 'Official Google Drive installer folder active',
  supportedOS: 'Windows 11 / 10 (64-bit), macOS 13+ (Apple Silicon & Intel), Linux (Ubuntu 22.04+)',
};

export const FOUNDERS_SECTION_COPY = {
  eyebrow: 'THE PEOPLE BEHIND AI AAJI',
  heading: 'Built with curiosity. Designed around people.',
  supporting:
    '“AI Aaji began with a simple ambition: make interacting with technology feel more natural. Behind the product is a team combining product thinking, software development, and a belief that AI should be useful in everyday life.”',
};

export const FOUNDERS: Founder[] = [
  {
    name: 'Abhinav Singh',
    role: 'Co-Founder & Product Lead',
    roleLabel: 'Product & Experience',
    title: 'Product Vision & Systems',
    bio: 'Abhinav leads the product vision and experience of AI Aaji. As a developer and product builder, he focuses on turning ambitious ideas into practical experiences—shaping how the assistant looks, feels, and helps people accomplish everyday digital tasks.\n\nHis focus is on making AI approachable, useful, and thoughtfully designed around the people who use it.',
    isDeveloper: true,
    avatarPlaceholder: 'AS',
    imagePath: '/assets/aistudio/abhinav_2dac3e8f.jpeg',
    socials: {
      instagram: 'https://www.instagram.com/abhinavsinghofficial21/',
    },
  },
  {
    name: 'Tanisha Kolhar',
    role: 'Co-Founder & Technical Lead',
    roleLabel: 'Engineering & Systems',
    title: 'Architecture & Voice Intelligence',
    bio: 'Tanisha Kolhar leads the technical development of AI Aaji, helping translate the product vision into working software. As a developer and technical builder, she focuses on engineering the systems, integrations, and capabilities that power the assistant.\n\nHer focus is on making the technology behind AI Aaji reliable, capable, and ready to evolve.',
    isDeveloper: true,
    avatarPlaceholder: 'TK',
    imagePath: '/assets/aistudio/tanisha_fbdc2cd8.jpeg',
    socials: {
      instagram: 'https://www.instagram.com/tanu_here_10/',
    },
  },
];

export const FOUNDER_MISSION_NOTE =
  '“We believe technology should work around people, not the other way around. AI Aaji is our step towards making AI more natural, accessible, and useful in everyday life.”';

export const FEATURES: FeatureItem[] = [
  {
    number: '01',
    title: 'Real-Time Voice AI',
    description:
      'Natural, conversational voice interaction powered by supported real-time AI technology with near-zero latency and natural interruptions.',
    iconName: 'Mic',
    tag: 'Core Experience',
    status: 'available',
  },
  {
    number: '02',
    title: 'Visual Understanding',
    description:
      'Designed to understand supported camera or screen input and provide contextual assistance for what you are viewing or editing.',
    iconName: 'Eye',
    tag: 'Multimodal',
    status: 'available',
  },
  {
    number: '03',
    title: 'Smart Task Assistance',
    description:
      'Assistance with supported everyday digital tasks, workflows, quick lookups, scheduling notes, and drafting communications.',
    iconName: 'Zap',
    tag: 'Productivity',
    status: 'available',
  },
  {
    number: '04',
    title: 'Device & Application Controls',
    description:
      'Interact with supported system-level functions, active applications, audio settings, and shortcuts on your workstation.',
    iconName: 'Laptop',
    tag: 'Automation',
    status: 'supported-devices',
  },
  {
    number: '05',
    title: 'Intelligent Information Access',
    description:
      'Get rapid, verified answers, conduct focused topic research, synthesize documents, and access relevant context on demand.',
    iconName: 'Compass',
    tag: 'Intelligence',
    status: 'available',
  },
  {
    number: '06',
    title: 'Personalized Conversations',
    description:
      'Adapts through supported conversational context and saved user preferences to make ongoing interactions more relevant over time.',
    iconName: 'Sparkles',
    tag: 'Adaptive',
    status: 'available',
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Talk naturally',
    description: 'Start with voice or text and explain what you need in plain, conversational language.',
  },
  {
    step: '02',
    title: 'AI understands',
    description: 'AI Aaji processes supported audio, text, or visual inputs with deep contextual awareness.',
  },
  {
    step: '03',
    title: 'Get assistance',
    description: 'Receive real-time spoken guidance, quick answers, and assistance with supported everyday tasks.',
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    tagline: 'Start your journey with essential voice assistance',
    priceDisplay: '₹0',
    priceInRupees: 0,
    accentColor: 'cyan',
    features: [
      'Access to the free software version',
      'Core conversational voice interactions',
      'Essential question answering & knowledge lookups',
      'Explore features included in the free release',
      'Download available via official Google Drive folder',
    ],
    ctaLabel: 'Download Free',
    ctaType: 'download',
  },
  {
    id: 'base',
    name: 'Base',
    tagline: 'The essential companion for everyday productivity',
    priceDisplay: '₹399',
    priceInRupees: 399,
    accentColor: 'violet',
    features: [
      'Access to the Base edition license',
      'Full real-time voice interaction with Aoede voice persona',
      'Supported everyday digital task assistance & workflows',
      'Basic device and application controls on supported systems',
      'Local conversational preference persistence',
      'Direct purchase enquiry with engineering founders',
    ],
    ctaLabel: 'Purchase Base — ₹399',
    ctaType: 'purchase',
    mailtoSubject: 'AI Aaji Base Edition — Purchase Enquiry',
    mailtoBody: `Hello AI Aaji Team,

I would like to enquire about purchasing the AI Aaji Base Edition priced at ₹399.

Please share the payment process, edition details, and the steps to receive the software after payment.

Name: 
Email: 
Message: 

Thank you.`,
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'Maximum capability with multimodal understanding & advanced controls',
    priceDisplay: '₹699',
    priceInRupees: 699,
    highlighted: true,
    badge: 'Most Capable',
    accentColor: 'gradient',
    features: [
      'Access to the Premium edition license',
      'All capabilities included in Base edition',
      'Visual understanding (supported screen & camera inputs)',
      'Advanced application workflows & automation shortcuts',
      'Enhanced context memory & personalized response tuning',
      'Priority access to upcoming beta features and releases',
      'Direct contact-to-purchase onboarding & setup guidance',
    ],
    ctaLabel: 'Purchase Premium — ₹699',
    ctaType: 'purchase',
    mailtoSubject: 'AI Aaji Premium Edition — Purchase Enquiry',
    mailtoBody: `Hello AI Aaji Team,

I would like to enquire about purchasing the AI Aaji Premium Edition priced at ₹699.

Please share the payment process, edition details, and the steps to receive the software after payment.

Name: 
Email: 
Message: 

Thank you.`,
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'general',
    question: 'What is AI Aaji?',
    answer:
      'AI Aaji is an AI-powered personal assistant created by developer-founders Abhinav Singh and Tanisha Kolhar. It is designed to make digital interactions more natural and everyday tasks easier through real-time voice conversations, multimodal intelligence, supported device controls, and intelligent task assistance.',
  },
  {
    id: 'faq-2',
    category: 'capabilities',
    question: 'What can AI Aaji do?',
    answer:
      'Depending on the edition, AI Aaji can engage in natural, fluid real-time voice conversations, answer questions, assist with research and note-taking, understand supported screen or visual inputs, help manage everyday computer tasks, and interact with supported system functions.',
  },
  {
    id: 'faq-3',
    category: 'pricing',
    question: 'Is there a free version?',
    answer:
      'Yes! AI Aaji offers a Free edition (₹0). You can access the official installer packages directly through our official Google Drive folder to experience how natural voice AI feels on your desktop.',
  },
  {
    id: 'faq-4',
    category: 'pricing',
    question: 'What is the difference between Base and Premium?',
    answer:
      'Base (₹399) provides the essential real-time voice assistant experience, everyday digital task assistance, and core application controls. Premium (₹699) adds visual understanding (analyzing screen/camera inputs on supported devices), advanced automation workflows, and priority feature access.',
  },
  {
    id: 'faq-5',
    category: 'pricing',
    question: 'How do I purchase an edition?',
    answer:
      'Purchases are currently handled via direct email enquiry rather than on-site automated checkout. Clicking Purchase Base or Purchase Premium opens a prefilled email addressed to aiaajiofficial@gmail.com with your edition details. You can also review or copy the draft in our fallback modal.',
  },
  {
    id: 'faq-6',
    category: 'technical',
    question: 'Does the live voice demo need microphone access?',
    answer:
      'Yes. The live voice demo requires microphone access so you can speak to AI Aaji in real time. We only request mic permission when you click "Start Talking to AI Aaji". Audio is streamed securely for real-time processing and is never recorded or stored on our servers.',
  },
  {
    id: 'faq-7',
    category: 'technical',
    question: 'Is an internet connection required?',
    answer:
      'Yes. AI Aaji relies on real-time neural models, including the Gemini Realtime architecture, which requires an active internet connection to process spoken audio and generate natural responses.',
  },
  {
    id: 'faq-8',
    category: 'technical',
    question: 'Which devices and operating systems are supported?',
    answer:
      'The web demo runs directly in modern desktop and mobile browsers (Chrome, Edge, Safari, Firefox). The desktop software client supports 64-bit Windows (10 & 11), macOS 13+ (Apple Silicon & Intel), and Linux (Ubuntu 22.04+).',
  },
  {
    id: 'faq-9',
    category: 'technical',
    question: 'How can I install or update the software?',
    answer:
      'Visit our official Google Drive folder via the Free Download buttons to select the installer package for your operating system. For Base and Premium editions, our engineering team provides direct setup instructions and license keys via email.',
  },
  {
    id: 'faq-10',
    category: 'general',
    question: 'How can I contact the team or follow updates?',
    answer:
      'You can reach founders Abhinav Singh and Tanisha Kolhar directly at aiaajiofficial@gmail.com for purchase enquiries, feedback, or support. Follow our official product Instagram at https://www.instagram.com/ai.aaji.assistant/, Abhinav at https://www.instagram.com/abhinavsinghofficial21/, and Tanisha at https://www.instagram.com/tanu_here_10/.',
  },
];

export const SYSTEM_PROMPT_KNOWLEDGE = `
You are AI Aaji, an intelligent AI-powered personal assistant created by developer-founders Abhinav Singh and Tanisha Kolhar.
Abhinav Singh is Co-Founder & Product Lead (Product & Experience).
Tanisha Kolhar is Co-Founder & Technical Lead (Engineering & Systems).
Both founders are active developers.

Your core purpose is to make digital interactions simpler and more natural through real-time voice conversations, multimodal intelligence, supported device controls, and everyday task assistance.

Key Verified Facts:
- Your name is AI Aaji.
- You are not merely a chatbot; you are an everyday personal assistant designed to bring conversational AI closer to natural human interaction.
- The official contact email is aiaajiofficial@gmail.com.
- Official Instagram: https://www.instagram.com/ai.aaji.assistant/ (@ai.aaji.assistant).
- Abhinav Singh Instagram: https://www.instagram.com/abhinavsinghofficial21/ (@abhinavsinghofficial21).
- Tanisha Kolhar Instagram: https://www.instagram.com/tanu_here_10/ (@tanu_here_10).
- Pricing plans:
  - Free Edition: ₹0 (access via official Google Drive download folder to explore conversational voice AI).
  - Base Edition: ₹399 (essential assistant experience, real-time voice with Aoede persona, task assistance, supported device controls).
  - Premium Edition: ₹699 (multimodal understanding, visual screen/camera support, advanced workflow shortcuts).
- Purchases are completed via email enquiry to aiaajiofficial@gmail.com (not instant website checkout).
- Software download: visitors can download free installers from the official Google Drive folder (https://drive.google.com/drive/folders/1O_YobHhC7AhTwwWL-VUwCadl442gRWjj?usp=sharing).
- Voice Session Engine: aiaaji live (with Aoede voice persona).
- You must speak with a warm, welcoming, intelligent, natural, and helpful tone.
- Keep answers concise, conversational, and direct unless asked for in-depth detail.
- Never invent customer counts, fake awards, unverified compatibility, or untrue claims. Stick strictly to verified knowledge.
`;
