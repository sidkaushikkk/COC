// Mock data for Children of Capital Editorial Website
import authorPhoto from '../assets/author.webp';

export const CATEGORIES = [
  'Politics',
  'Economics',
  'Capitalism',
  'Global Affairs',
  'Society',
  'Education',
  'History',
  'Opinion',
  'Justice',
  'Climate',
  'Other'
];

export const AUTHORS = {
  'julian-vance': {
    id: 'julian-vance',
    name: 'The Editor',
    role: 'Writer & Editor, Children of Capital',
    bio: 'The editor of Children of Capital writes about the systems that shape public life, with a focus on political economy, power, and social change.',
    photo: authorPhoto,
    expertise: ['Sovereign Debt', 'Labor History', 'Macroeconomics', 'Climate Policy'],
    socials: {
      twitter: 'https://twitter.com/julianvance',
      linkedin: 'https://linkedin.com/in/julianvance',
      website: 'https://julianvance.org'
    },
    followers: '24,500'
  },
  'clara-alvarez': {
    id: 'clara-alvarez',
    name: 'Dr. Clara Alvarez',
    role: 'Senior Economics Editor',
    bio: 'Dr. Clara Alvarez holds a PhD in Economics from the London School of Economics, specializing in economic inequality and public policy. She advises progressive think tanks and has written extensively on capital gains taxes, social security systems, and wealth inheritance patterns.',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    expertise: ['Inequality', 'Fiscal Policy', 'Labor Markets', 'Welfare Economics'],
    socials: {
      twitter: 'https://twitter.com/claraalvarez',
      linkedin: 'https://linkedin.com/in/claraalvarez',
      website: 'https://claraalvarez.com'
    },
    followers: '18,200'
  },
  'marcus-chen': {
    id: 'marcus-chen',
    name: 'Marcus Chen',
    role: 'Global Policy Analyst',
    bio: 'Marcus Chen is an investigative journalist based in Singapore, covering industrial policy and technological supply chains in East Asia. He previously worked as a corporate risk analyst and uses that experience to trace the flow of strategic resources and capital across borders.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
    expertise: ['Supply Chains', 'Industrial Policy', 'East Asian Geopolitics', 'Technology Regulations'],
    socials: {
      twitter: 'https://twitter.com/marcuschen',
      linkedin: 'https://linkedin.com/in/marcuschen',
      website: 'https://marcuschen.me'
    },
    followers: '12,900'
  },
  'sarah-jenkins': {
    id: 'sarah-jenkins',
    name: 'Sarah Jenkins',
    role: 'Climate & Resource Correspondent',
    bio: 'Sarah Jenkins covers the intersection of financial capitalism and ecological collapse. With a background in environmental science and investigative reporting, she tracks carbon credit markets, resource extraction in the Global South, and climate change litigation.',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    expertise: ['Ecological Economics', 'Climate Finance', 'Resource Extractivism', 'Environmental Law'],
    socials: {
      twitter: 'https://twitter.com/sarahjenkins',
      linkedin: 'https://linkedin.com/in/sarahjenkins',
      website: 'https://sarahjenkins.org'
    },
    followers: '9,400'
  }
};

export const ARTICLES = [
  {
    id: 'algorithms-modern-labor',
    title: "The Invisible Hand's New Grip: How Algorithms Restructured Modern Labor",
    excerpt: "Behind the sleek interfaces of the gig economy lies a sophisticated system of algorithmic control that has quietly dismantled decades of hard-won labor protections.",
    content: `
### The Myth of Autonomy

In the early 2010s, the emergence of ride-sharing and food-delivery apps was heralded as the dawn of a new era of worker autonomy. Promoted under the banner of the "gig economy," these platforms promised individuals the freedom to "be their own boss," set their own hours, and achieve a perfect work-life balance. Yet, a decade later, the reality looks vastly different. The sleek interfaces do not represent liberation; they represent the infrastructure of algorithmic management—a system where human managers are replaced by code, and worker surveillance is continuous, automated, and invisible.

Unlike traditional workplaces where management decisions are subject to human negotiations and labor codes, algorithmic management operates through a digital black box. Workers are monitored via GPS, response rates, acceptance ratios, and customer ratings. These data points feed into proprietary machine learning models that decide who gets work, at what rate, and who gets deactivated. The promise of entrepreneurship has been replaced by a digital version of piece-rate work, optimized to extract maximum value from labor while shedding all employer liability.

> "The algorithm doesn't ask how your day was, nor does it care if you have a family to feed. It understands only two metrics: efficiency and conversion."
> — Julian Vance, Editor-in-Chief

### From Taylorism to Digital Control

To understand algorithmic management, we must look to the history of industrial capitalism. In the early 20th century, Frederick Winslow Taylor developed "Scientific Management," a methodology that broke down worker movements into discrete, timed tasks to maximize factory floor efficiency. Taylorism treated human beings as cogs in a larger machine, stripping them of autonomy in the name of output.

Algorithmic management is Taylorism on steroids. It is not limited by the walls of a factory. Because workers carry smartphones, the algorithm follows them into their cars, onto streets, and into their homes. It tracks not only the speed of a task, but the idle time between tasks, optimizing routes, predicting worker behavior, and implementing nudges to keep workers on the road.

Furthermore, these platforms exploit behavioral economics to manipulate worker behavior. By using gamified interfaces, quest rewards (e.g., "complete 10 trips for a $20 bonus"), and surge pricing warnings, platforms keep workers on the road during high-demand hours, shifting the financial risk of low demand entirely onto the contractor.

| Era of Capitalism | Management Method | Primary Control Tool | Worker Status | Risk Bearer |
| :--- | :--- | :--- | :--- | :--- |
| **Industrial (1900s)** | Taylorism | Time & Motion Studies, Human Foremen | Waged Employee | Factory Owner |
| **Corporate (1970s)** | Bureaucratic Control | Performance Reviews, Hierarchy | Salaried Employee | Corporation |
| **Platform (2020s)** | Algorithmic Management | Machine Learning, Digital Nudges | Independent Contractor | The Worker |

### The Legal Shell Game

The core business model of platform capitalism depends on a legal fiction: that workers are "independent contractors" rather than employees. By classifying workers as contractors, corporations avoid paying payroll taxes, workers' compensation, healthcare benefits, and minimum wage guarantees.

This classification has been challenged globally. From California's Proposition 22 battle to the European Union's Platform Work Directive, the legal landscape is shifting. Labor advocates argue that if a company sets the prices, controls the customer relationship, monitors worker behavior, and retains the power to fire (or "deactivate") workers, then those workers are employees under any reasonable definition of control.

Yet, platform companies spend hundreds of millions lobbying governments to create a third category of employment—one that locks in their structural advantages. This legal strategy represents a broader shift in late-stage capitalism: the privatization of profits and the socialization of risks.

### Reclaiming the Commons

How do workers resist an adversary made of code? Across the globe, new forms of resistance are emerging. Workers are sharing data, organizing "logout strikes" to trigger surge pricing, and building cooperative alternatives—platform cooperatives owned and operated by the workers themselves.

But grassroots organization is not enough. Reclaiming the digital workspace requires structural intervention:
1. **Algorithmic Transparency:** Legislation must force platforms to disclose the metrics and rules that govern dispatch and deactivation.
2. **True Employment Protections:** Courts and regulators must look past corporate marketing and enforce labor standards based on actual control.
3. **Data Sovereignty:** Workers must have ownership over the telemetry data they generate while working, enabling them to verify payouts and challenge automated decisions.

Until we confront the structural roots of algorithmic management, the digital workplace will continue to function as a laboratory for new forms of exploitation. The invisible hand has found a new grip, and it is tighter than ever.
    `,
    category: 'Capitalism',
    authorId: 'julian-vance',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200',
    readingTime: '12 min read',
    difficulty: 'Advanced',
    date: 'July 18, 2026',
    views: '15,420',
    likes: 843,
    isFeatured: true,
    isEditorsPick: true
  }
];

export const WHY_TIMELINE = [
  {
    phase: 'Problem',
    title: 'Symptom-Driven Journalism',
    description: 'Modern media reports headlines and triggers emotional reactions, leaving readers confused about the underlying socio-economic systems governing their daily realities.'
  },
  {
    phase: 'Vision',
    title: 'Systems-Thinking Citizens',
    description: 'We envision a society that does not just observe capital flow and policy decisions, but fully understands the structural history and institutional frameworks behind them.'
  },
  {
    phase: 'Mission',
    title: 'Long-Form Explanatory Journalism',
    description: 'We publish independent, rigorous, ad-free essays and research designed to demystify complex systems, prioritizing intellectual depth over rapid headline coverage.'
  },
  {
    phase: 'Today\'s Impact',
    title: 'Growing',
    description: 'Operating on a reader-supported, independent model, we try to reach policy makers, students, researchers, and citizens.'
  }
];

export const WORLD_TIMELINE = [
  {
    year: '1971',
    event: 'The Nixon Shock',
    description: 'President Richard Nixon takes the US dollar off the gold standard, initiating the modern era of floating fiat currencies and global financialization.'
  },
  {
    year: '1989',
    event: 'The Washington Consensus',
    description: 'A set of standard economic prescriptions (privatization, fiscal discipline, deregulation) becomes the structural adjustment model for developing nations.'
  },
  {
    year: '1999',
    event: 'Glass-Steagall Repeal',
    description: 'The US Clinton administration repeals the Glass-Steagall Act, tearing down the wall between commercial banking and investment banking.'
  },
  {
    year: '2008',
    event: 'The Great Financial Crisis',
    description: 'The collapse of subprime mortgage derivatives triggers a global economic meltdown, exposing structural vulnerabilities in banking regulation.'
  },
  {
    year: '2020',
    event: 'The Supply Chain Shock',
    description: 'The pandemic exposes the extreme vulnerabilities of hyper-globalized, just-in-time logistics, sparking a return to national industrial policy.'
  },
  {
    year: '2023',
    event: 'The Artificial Capital Rush',
    description: 'Generative AI prompts an inflow of venture capital, triggering intense debates on automation, labor rights, and digital monopolies.'
  }
];
