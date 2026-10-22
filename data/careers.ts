export interface JobResponsibilityGroup {
  category: string;
  items: string[];
}

export interface JobPosting {
  id: string;
  title: string;
  badge: string;
  department: string;
  location: string;
  duration: string;
  schedule: string;
  stipend: string;
  incentives: string;
  certificate: boolean;
  applyUrl: string;
  summary: string;
  about: string;
  responsibilities: JobResponsibilityGroup[];
  requirements: string[];
  gains: string[];
  timeline?: string;
  accent: 'CYAN' | 'LIME' | 'AMBER' | 'VIOLET';
  tags: string[];
}

export const jobPostings: JobPosting[] = [
  {
    id: 'digital-marketing-growth-intern',
    title: 'Digital Marketing & Growth Intern',
    badge: 'MARKETING & BRAND',
    department: 'Marketing',
    location: 'Fully Remote',
    duration: '2–3 Months',
    schedule: 'Flexible Hours (Task-based responsibilities with agreed deadlines)',
    stipend: 'Unpaid',
    incentives: 'Performance-Based Incentives (Eligibility begins from the second month)',
    certificate: true,
    applyUrl: 'https://forms.gle/CNLBW6BbNk9ioJ228',
    accent: 'CYAN',
    tags: [
      'Digital Marketing',
      'Growth Marketing',
      'Content Creation',
      'Social Media',
      'Brand Strategy',
    ],
    summary:
      'Develop marketing strategies to boost brand visibility across LinkedIn and Instagram, produce high-impact social and video content, and identify creative growth & lead generation opportunities.',
    about:
      "Majin Studios is a technology-driven company building web applications, custom software, and AI-powered solutions that help businesses solve problems and grow.\n\nWe're looking for a creative, proactive, and entrepreneurial individual to help strengthen our brand, develop marketing strategies, explore growth opportunities, and attract potential clients.\n\nThis role goes beyond simply posting on social media. We're looking for someone who can generate ideas, understand audiences, identify opportunities, experiment with marketing approaches, and turn creative thinking into meaningful results. You'll work directly with our founding team and have the opportunity to contribute ideas and take ownership of marketing initiatives.",
    responsibilities: [
      {
        category: 'Digital Marketing & Brand Growth',
        items: [
          'Develop marketing strategies to increase Majin Studios\' visibility.',
          'Strengthen our presence across LinkedIn, Instagram, and other relevant platforms.',
          'Research competitors, industry trends, and target audiences.',
          'Identify opportunities to differentiate our brand and services.',
          'Suggest creative approaches to reach potential clients and grow our audience.',
        ],
      },
      {
        category: 'Content Creation & Social Media',
        items: [
          'Create engaging social media posts, carousels, graphics, and short-form videos.',
          'Showcase our projects, products, services, and technical capabilities.',
          'Plan content calendars and maintain consistent publishing.',
          'Write compelling captions, promotional content, and project descriptions.',
          'Experiment with content formats and evaluate their performance.',
        ],
      },
      {
        category: 'Growth Marketing & Lead Generation',
        items: [
          'Explore marketing channels that can generate qualified business enquiries.',
          'Develop campaigns to promote our services and products.',
          'Collaborate with the business development team to support client acquisition.',
          'Explore referral programmes, creator collaborations, and cross-promotional opportunities.',
          'Track engagement, enquiries, and relevant marketing metrics.',
        ],
      },
      {
        category: 'Partnerships & Growth Opportunities',
        items: [
          'Identify potential collaborations with creators, agencies, startups, and complementary businesses.',
          'Research opportunities for joint promotions and cross-platform visibility.',
          'Assist with outreach to potential marketing partners.',
          'Propose creative campaigns and mutually beneficial collaborations.',
          'Help build relationships that strengthen our reach and brand credibility.',
        ],
      },
      {
        category: 'Strategy & Execution',
        items: [
          'Bring forward new ideas to improve our marketing and growth.',
          'Research and recommend practical strategies based on available resources.',
          'Take ownership of approved initiatives from planning through execution.',
          'Analyse results, identify what works, and recommend improvements.',
          'Work independently on agreed deliverables while communicating progress consistently.',
        ],
      },
    ],
    requirements: [
      'Genuine interest in digital marketing, branding, content creation, or startup growth.',
      'Creativity and the ability to develop fresh, practical ideas.',
      'Good written communication and storytelling skills.',
      'Familiarity with platforms such as LinkedIn and Instagram.',
      'Basic graphic design or video editing skills are an advantage.',
      'Ability to research audiences, competitors, and marketing trends.',
      'Willingness to experiment, analyse results, and improve.',
      'A proactive attitude, sense of ownership, and ability to meet agreed deadlines.',
      'Experience with Canva, CapCut, AI-powered content tools, or social media analytics is a plus.',
      'Previous professional experience is not mandatory. We value creativity, initiative, consistency, and a willingness to learn.',
    ],
    gains: [
      'Hands-on experience in digital marketing and startup growth.',
      'Direct collaboration with the founding team.',
      'Opportunities to develop and execute marketing strategies.',
      'Practical experience in content creation, brand positioning, and growth marketing.',
      'An opportunity to build your portfolio through real marketing initiatives.',
      'Exposure to real-world startup challenges and business decision-making.',
      'An internship certificate upon successful completion.',
    ],
    timeline:
      'First Month — Learning & Evaluation: The first month focuses on understanding Majin Studios, our services, target audiences, existing marketing presence, and growth objectives. Interns will research opportunities, develop ideas, learn our workflow, and demonstrate initiative. From the second month onward, eligible interns may receive performance-based incentives according to their contributions and the applicable incentive policy.',
  },
  {
    id: 'business-development-growth-intern',
    title: 'Business Development & Growth Intern',
    badge: 'STRATEGY & PARTNERSHIPS',
    department: 'Business Development',
    location: 'Fully Remote',
    duration: '2–3 Months',
    schedule: 'Flexible Hours (Task-based responsibilities with agreed deadlines)',
    stipend: 'Unpaid',
    incentives: 'Performance-Based Incentives (Eligibility begins from the second month)',
    certificate: true,
    applyUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSf0UqttrNPnJg84lzRRzlmpWhn4FF4jvDlBb6hN0S8g3MUiJw/viewform',
    accent: 'LIME',
    tags: [
      'Business Development',
      'Partnerships',
      'Lead Generation',
      'Market Research',
      'Startup Growth',
    ],
    summary:
      'Work directly with the founding team to research new markets, forge agency and startup partnerships, identify client acquisition channels, and execute strategic growth plans.',
    about:
      "Majin Studios is a technology-driven company building digital solutions, custom software, web applications, and AI-powered products to help businesses solve problems and grow.\n\nWe're looking for a proactive, entrepreneurial individual to work directly with our founding team and help us discover new business opportunities, build strategic partnerships, acquire clients, and develop strategies for sustainable growth.\n\nThis isn't just a sales role. We're looking for someone who can think independently, identify opportunities, bring fresh ideas, build meaningful relationships, and turn ideas into action.",
    responsibilities: [
      {
        category: 'Business Growth & Strategy',
        items: [
          'Research new markets, industries, and business opportunities.',
          'Identify potential revenue streams and customer acquisition channels.',
          'Analyse competitors and discover opportunities for differentiation.',
          'Propose practical strategies to grow Majin Studios and expand its reach.',
          'Turn promising ideas into actionable plans and execute approved initiatives.',
        ],
      },
      {
        category: 'Strategic Partnerships & Collaborations',
        items: [
          'Identify potential partners, including startups, digital marketing agencies, branding studios, and consultants.',
          'Explore mutually beneficial partnerships, referral opportunities, and joint projects.',
          'Reach out to potential partners through LinkedIn, email, and other professional channels.',
          'Build relationships and initiate collaboration discussions.',
          'Help develop partnership proposals and explore opportunities for long-term collaboration.',
        ],
      },
      {
        category: 'Lead Generation & Client Acquisition',
        items: [
          'Identify businesses that could benefit from our web development, software, and AI solutions.',
          'Research potential clients and understand their business needs.',
          'Develop personalised approaches to connect with business owners and decision-makers.',
          'Initiate outreach, maintain follow-ups, and qualify potential leads.',
          'Coordinate meetings between interested prospects and the founding team.',
          'Explore creative ways to generate enquiries and acquire new clients.',
        ],
      },
      {
        category: 'Growth Initiatives & Execution',
        items: [
          'Bring forward ideas to improve our business development and growth strategies.',
          'Research and experiment with new approaches to customer acquisition.',
          'Identify networking opportunities and potential strategic alliances.',
          'Take ownership of assigned initiatives and track their progress.',
          'Evaluate results, learn from challenges, and recommend improvements.',
        ],
      },
    ],
    requirements: [
      'An entrepreneurial mindset and genuine interest in startups and business growth.',
      'Strong research, communication, and problem-solving skills.',
      'Confidence in approaching businesses and building professional relationships.',
      'The ability to identify opportunities and think beyond assigned tasks.',
      'A proactive attitude, sense of ownership, and willingness to take initiative.',
      'Good written and spoken English; Telugu or other Indian regional languages are an advantage.',
      'The ability to work independently, meet agreed deadlines, and communicate progress consistently.',
      'Previous experience in business development, sales, marketing, partnerships, or entrepreneurship is a plus, but not mandatory.',
    ],
    gains: [
      'Work directly with the founding team.',
      'Gain hands-on experience in startup growth and business development.',
      'Learn how to identify clients, develop partnerships, and explore new markets.',
      'Build practical skills in research, networking, communication, and strategic thinking.',
      'Take ownership of growth initiatives and see how ideas translate into real business opportunities.',
      'Gain exposure to real-world business challenges and startup decision-making.',
      'Receive an internship certificate upon successful completion.',
    ],
    timeline:
      'First Month — Learning & Evaluation: The first month focuses on understanding our services, researching potential markets, identifying business opportunities, and demonstrating initiative while working with the founding team. From the second month onward, eligible interns may receive performance-based incentives according to their contributions and the applicable incentive policy.',
  },
  {
    id: 'sales-business-development-intern',
    title: 'Sales & Business Development Intern',
    badge: 'SALES & CLIENT ACQUISITION',
    department: 'Sales',
    location: 'Fully Remote',
    duration: '2–3 Months',
    schedule: 'Flexible Hours (Target & Task-based responsibilities)',
    stipend: 'Unpaid',
    incentives: 'Performance-Based Incentives',
    certificate: true,
    applyUrl: 'https://lnkd.in/d2_fTQqH',
    accent: 'AMBER',
    tags: [
      'B2B Sales',
      'Cold Calling',
      'Lead Generation',
      'Client Acquisition',
      'Outreach',
    ],
    summary:
      'Join our core sales engine to conduct targeted outreach via LinkedIn, Email & WhatsApp, qualify high-value business leads, make professional cold calls, and schedule discovery meetings.',
    about:
      "Majin Studios is looking for confident, fluent, and result-oriented individuals to join our Sales & Business Development team.\n\nYou'll work directly with the founding team and gain hands-on experience in B2B sales, cold calling, lead generation, client acquisition, and startup growth. If you're confident talking to people, comfortable making cold calls, and ready to work toward real sales targets, we'd like to hear from you.",
    responsibilities: [
      {
        category: 'Cold Calling & Lead Outreach',
        items: [
          'Research and identify potential clients who could benefit from web development, custom software, and AI solutions.',
          'Make cold calls and communicate professionally and persuasively with prospects.',
          'Execute targeted outreach campaigns through LinkedIn, Email & WhatsApp.',
          'Generate, qualify, and manage incoming and outbound leads.',
          'Consistently follow up with prospects across channels.',
          'Schedule discovery calls and meetings directly with the founding team.',
          'Support client acquisition and active business development pipelines.',
        ],
      },
    ],
    requirements: [
      'Sales or Business Development experience is required.',
      'Strong communication and interpersonal skills.',
      'Fluency in English is required.',
      'Fluency in Telugu or another Indian regional language is preferred.',
      'Confident and comfortable with cold calling business decision-makers.',
      'Ability to communicate professionally with potential clients.',
      'Self-motivated, persistent, resilient, and target-oriented.',
      'Interest in startups, technology, and B2B sales.',
      'Experience in cold calling, lead generation, customer acquisition, or B2B sales is a strong advantage.',
    ],
    gains: [
      'Work directly with the founding team on revenue-generating initiatives.',
      'Hands-on experience in B2B sales, cold calling, lead generation, client acquisition, and startup growth.',
      'Performance-based incentive earnings.',
      'Internship certificate upon successful completion.',
    ],
    timeline:
      'Remote 2–3 Months internship with flexible hours and target-oriented milestones. Eligible for performance-based incentives throughout.',
  },
];
