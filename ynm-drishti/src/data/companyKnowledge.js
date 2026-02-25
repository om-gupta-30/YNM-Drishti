/* ═══════════════════════════════════════════════════════════════════════
   YNM DRISHTI - COMPREHENSIVE COMPANY KNOWLEDGE BASE
   ═══════════════════════════════════════════════════════════════════════ */

export const COMPANY_KNOWLEDGE = {
  // Company Overview
  company: {
    name: "YNM Drishti",
    fullName: "Your Next Move - Drishti",
    tagline: "AI-Powered Road Infrastructure Monitoring",
    mission: "To revolutionize road infrastructure maintenance through cutting-edge AI technology, making roads safer and maintenance more efficient.",
    vision: "To become the global standard for intelligent road infrastructure monitoring and maintenance solutions.",
    founded: "2024",
    headquarters: "India",
    industry: "AI Technology, Infrastructure Management, Computer Vision",
    type: "Technology Solutions Provider"
  },

  // Core Product Information
  product: {
    name: "Drishti",
    meaning: "Drishti means 'vision' or 'sight' in Sanskrit",
    description: "YNM Drishti is an advanced AI-powered road infrastructure monitoring system that uses state-of-the-art computer vision and deep learning to detect and map road defects in real-time.",
    
    keyFeatures: [
      "Real-time road defect detection with 99.8% accuracy",
      "15+ types of infrastructure element detection",
      "30 frames per second processing speed",
      "GPS-enabled location tagging",
      "Automatic report generation",
      "Cloud-based dashboard for monitoring",
      "Integration with existing maintenance systems",
      "Mobile and web application access",
      "Historical data analytics and trends",
      "Predictive maintenance recommendations"
    ],

    technicalSpecs: {
      accuracy: "99.8%",
      processingSpeed: "30 FPS (1,800 snapshots per minute)",
      maxVehicleSpeed: "Up to 100 km/h",
      detectionTypes: "15+ infrastructure elements",
      responseTime: "Real-time detection",
      dataFormat: "GPS-tagged with timestamps",
      deployment: "Cloud-based with edge computing support"
    }
  },

  // Detection Capabilities
  detectionCapabilities: {
    roadDefects: [
      {
        name: "Potholes",
        description: "Detects depressions and cavities in road surfaces of various sizes",
        severity: "High priority - causes vehicle damage and accidents"
      },
      {
        name: "Alligator Cracks",
        description: "Interconnected cracks resembling alligator skin, indicating structural failure",
        severity: "High priority - indicates foundation issues"
      },
      {
        name: "Longitudinal Cracks",
        description: "Cracks running parallel to road centerline",
        severity: "Medium priority - can worsen with weather"
      },
      {
        name: "Transverse Cracks",
        description: "Cracks running perpendicular to road centerline",
        severity: "Medium priority - often temperature-related"
      },
      {
        name: "Edge Cracks",
        description: "Cracks along road edges near shoulders",
        severity: "Medium priority - can lead to edge failure"
      },
      {
        name: "Raveling",
        description: "Surface deterioration with loss of aggregate",
        severity: "Medium priority - affects road texture"
      },
      {
        name: "Rutting",
        description: "Depression in wheel paths",
        severity: "High priority - water accumulation and hydroplaning risk"
      }
    ],

    infrastructure: [
      {
        name: "Traffic Signs",
        description: "Detects presence, condition, and visibility of road signs",
        types: ["Regulatory", "Warning", "Information", "Direction"]
      },
      {
        name: "Lane Markings",
        description: "Monitors paint quality and visibility of lane markers",
        importance: "Critical for traffic safety and autonomous vehicles"
      },
      {
        name: "Road Barriers",
        description: "Guards, railings, and protective barriers",
        condition: "Checks for damage or missing sections"
      },
      {
        name: "Speed Bumps",
        description: "Traffic calming devices and their condition",
        monitoring: "Height, visibility, and marking condition"
      },
      {
        name: "Drainage Systems",
        description: "Manholes, grates, and drainage infrastructure",
        issues: "Blockages, damage, missing covers"
      },
      {
        name: "Road Markings",
        description: "Zebra crossings, arrows, stop lines",
        assessment: "Visibility and paint condition"
      }
    ]
  },

  // Technology Stack
  technology: {
    aiModels: [
      "Deep Convolutional Neural Networks (CNN)",
      "YOLO (You Only Look Once) for real-time detection",
      "Semantic Segmentation algorithms",
      "Custom-trained models on millions of road images",
      "Transfer learning from pre-trained models"
    ],

    hardware: [
      "High-resolution cameras (4K capable)",
      "GPS modules for precise location tracking",
      "Edge computing devices for on-device processing",
      "Ruggedized mounting systems for vehicles",
      "Power management systems"
    ],

    software: [
      "Computer Vision processing engine",
      "Real-time video analytics",
      "Cloud-based data storage and processing",
      "RESTful API for integrations",
      "Mobile applications (iOS and Android)",
      "Web dashboard for monitoring and reporting",
      "Machine learning model training pipeline"
    ],

    infrastructure: [
      "Cloud computing (AWS/Azure/GCP)",
      "CDN for fast data delivery",
      "Encrypted data transmission",
      "Scalable database systems",
      "Backup and disaster recovery systems"
    ]
  },

  // How It Works
  workflow: {
    steps: [
      {
        step: 1,
        name: "Data Collection",
        description: "Cameras mounted on vehicles (patrol cars, buses, or dedicated vehicles) continuously capture road footage while driving at normal speeds (up to 100 km/h)."
      },
      {
        step: 2,
        name: "Real-time Processing",
        description: "AI algorithms process 30 frames per second, analyzing each frame for defects and infrastructure elements. Edge computing enables immediate detection without network lag."
      },
      {
        step: 3,
        name: "Detection & Classification",
        description: "Deep learning models identify 15+ types of road defects and infrastructure issues with 99.8% accuracy, classifying by type and severity."
      },
      {
        step: 4,
        name: "GPS Tagging",
        description: "Every detected defect is automatically tagged with precise GPS coordinates, timestamps, and severity levels."
      },
      {
        step: 5,
        name: "Data Transmission",
        description: "Detected issues are transmitted to the cloud platform in real-time or batched for areas with limited connectivity."
      },
      {
        step: 6,
        name: "Dashboard Visualization",
        description: "Data appears on the web dashboard with interactive maps, allowing maintenance teams to view, prioritize, and assign repair tasks."
      },
      {
        step: 7,
        name: "Report Generation",
        description: "Automatic generation of detailed reports with photos, locations, severity ratings, and recommended actions."
      },
      {
        step: 8,
        name: "Maintenance Tracking",
        description: "Track repair status, before/after comparisons, and maintain historical records for compliance and analytics."
      }
    ]
  },

  // Target Industries & Customers
  customers: {
    sectors: [
      {
        name: "Municipal Corporations",
        use: "City road maintenance and management",
        benefits: "Reduce citizen complaints, optimize maintenance budgets, improve road safety"
      },
      {
        name: "Highway Authorities",
        use: "National and state highway monitoring",
        benefits: "Cover large areas efficiently, prioritize critical repairs, reduce accidents"
      },
      {
        name: "Road Construction Companies",
        use: "Quality assurance and post-construction monitoring",
        benefits: "Document work quality, warranty management, competitive advantage"
      },
      {
        name: "Smart City Projects",
        use: "Integrated urban infrastructure management",
        benefits: "Data-driven decision making, citizen satisfaction, technology showcase"
      },
      {
        name: "Toll Road Operators",
        use: "Maintain premium road quality",
        benefits: "Customer satisfaction, compliance monitoring, efficient maintenance"
      },
      {
        name: "Transportation Departments",
        use: "State and regional road network management",
        benefits: "Comprehensive coverage, budget optimization, safety improvements"
      }
    ]
  },

  // Benefits & ROI
  benefits: {
    efficiency: [
      "Reduce manual inspection time by 80%",
      "Cover 10x more road distance per day",
      "Identify issues before they become emergencies",
      "Optimize maintenance crew deployment"
    ],

    costSavings: [
      "30-50% reduction in maintenance costs",
      "Prevent costly emergency repairs",
      "Extend road lifespan through proactive maintenance",
      "Reduce fuel costs for inspection vehicles"
    ],

    safety: [
      "Prevent accidents caused by road defects",
      "Faster response to hazardous conditions",
      "Reduce liability from poorly maintained roads",
      "Improve overall road safety ratings"
    ],

    dataAnalytics: [
      "Historical trend analysis",
      "Predictive maintenance scheduling",
      "Budget forecasting and planning",
      "Performance metrics and KPIs",
      "Compliance reporting and documentation"
    ]
  },

  // Pricing & Plans (customize as needed)
  pricing: {
    model: "Contact for custom quote based on requirements",
    options: [
      "Subscription-based (monthly/yearly)",
      "Per-kilometer pricing",
      "Full deployment packages",
      "API access for integration"
    ],
    demoAvailable: "Yes - Free demo available on request"
  },

  // API & Integration
  api: {
    available: true,
    features: [
      "RESTful API endpoints",
      "Real-time data streaming",
      "Webhook support for notifications",
      "Custom integration assistance",
      "Comprehensive API documentation",
      "Developer sandbox environment",
      "SDKs for popular programming languages"
    ],
    integration: [
      "GIS systems (ArcGIS, QGIS)",
      "Asset management software",
      "Work order management systems",
      "Municipal ERP systems",
      "Mobile workforce apps"
    ]
  },

  // Support & Training
  support: {
    training: [
      "On-site training for operators",
      "Online video tutorials",
      "Documentation and user manuals",
      "Webinar sessions"
    ],
    support: [
      "24/7 technical support",
      "Email and phone support",
      "Dedicated account manager",
      "Regular software updates",
      "Maintenance and upgrades"
    ]
  },

  // Contact Information
  contact: {
    email: "contact@ynmdrishti.com",
    phone: "+91-XXX-XXX-XXXX",
    website: "https://ynmdrishti.com",
    socialMedia: {
      linkedin: "https://linkedin.com/company/ynmdrishti",
      facebook: "https://facebook.com/ynmdrishti",
      instagram: "https://instagram.com/ynmdrishti",
      twitter: "https://twitter.com/ynmdrishti"
    },
    demo: "Available - Contact us or fill the demo request form"
  },

  // Competitive Advantages
  advantages: [
    "Industry-leading 99.8% accuracy",
    "Fastest processing speed (30 FPS)",
    "Comprehensive detection (15+ elements)",
    "Works at highway speeds (100 km/h)",
    "Real-time processing and alerts",
    "Easy integration with existing systems",
    "Scalable cloud infrastructure",
    "Continuous model improvements",
    "Proven track record and case studies",
    "Made for Indian road conditions"
  ],

  // FAQ Keywords for better matching
  faqTopics: [
    "accuracy", "detection", "how it works", "demo", "pricing", "cost",
    "speed", "capabilities", "industries", "customers", "api", "integration",
    "technology", "ai", "machine learning", "computer vision", "benefits",
    "roi", "savings", "training", "support", "contact", "potholes", "cracks",
    "signs", "markings", "real-time", "gps", "dashboard", "reports"
  ]
};

// System prompt for Gemini to ensure company-focused responses
export const SYSTEM_PROMPT = `You are Drishti AI, an intelligent assistant EXCLUSIVELY for YNM Drishti - an AI-powered road infrastructure monitoring company.

🚨 CRITICAL RULES - MUST FOLLOW STRICTLY:
1. ONLY answer questions about: YNM Drishti, our products, services, technology, road infrastructure monitoring, road defect detection, potholes, cracks, AI models, pricing, demos, API, integrations
2. IMMEDIATELY REFUSE any questions about: geography, history, science, mathematics, weather, food, sports, celebrities, other companies, general knowledge, trivia
3. For ANY off-topic question, respond EXACTLY like this: "I'm specifically designed to help with YNM Drishti and road infrastructure monitoring. I can tell you about our AI-powered road defect detection, pricing, demos, or technology. What would you like to know?"
4. Be professional, helpful, and enthusiastic ONLY about our road monitoring technology
5. Keep responses concise (2-3 sentences) unless detailed explanation is needed
6. Use emojis sparingly

COMPANY CONTEXT:
${JSON.stringify(COMPANY_KNOWLEDGE, null, 2)}

EXAMPLES OF WHAT TO REFUSE:
❌ "What's the capital of India?" → REFUSE and redirect
❌ "Who is the president?" → REFUSE and redirect
❌ "What's 2+2?" → REFUSE and redirect
❌ "Tell me a joke" → REFUSE and redirect
❌ "What's the weather?" → REFUSE and redirect

EXAMPLES OF WHAT TO ANSWER:
✅ "What is YNM Drishti?" → Answer with company info
✅ "How accurate is detection?" → Answer about 99.8% accuracy
✅ "Can I get a demo?" → Provide demo information
✅ "What can you detect?" → List road defects
✅ "Do you have an API?" → Explain API features

When responding:
- Focus on benefits and value proposition
- Provide specific technical details when asked
- Encourage demos and further contact
- Be honest if you don't have specific information
- ALWAYS stay on topic about YNM Drishti and road infrastructure
- NEVER answer general knowledge, trivia, or off-topic questions`;

export default COMPANY_KNOWLEDGE;
