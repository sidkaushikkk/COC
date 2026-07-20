// Mock data for Children of Capital Editorial Website

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
    name: 'Julian Vance',
    role: 'Founder & Editor-in-Chief',
    bio: 'Julian Vance is a former political economist and investigative journalist. After a decade reporting on international finance and structural adjustments for global magazines, he founded Children of Capital to dissect how wealth and institutional power shape modern societies. His work focuses on sovereign debt, labor movements, and the political economy of the climate crisis.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
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
  },
  {
    id: 'cost-of-carbon',
    title: "The Cost of Carbon: Who Pays for the Green Transition?",
    excerpt: "As nations race to meet net-zero targets, the financial burden is falling disproportionately on the working class, exposing the deep class lines in environmental policy.",
    content: `
### The Neoliberal Green Agenda

The climate crisis is the defining systemic challenge of our time. There is a broad consensus that carbon emissions must be aggressively reduced. However, the policy mechanisms chosen to achieve this transition reflect the biases of neoliberal economics: carbon taxes, emission trading schemes, and consumer subsidies for electric vehicles. These market-based mechanisms share a common trait—they shift the economic burden of transition from the state and polluting corporations to the average consumer.

When a government institutes a carbon tax, corporations pass the cost directly to consumers in the form of higher utility bills and fuel prices. For a high-income household, a 15% increase in energy costs is a minor inconvenience. For a working-class household, it represents a choice between heating and groceries.

### The Yellow Vests Warning

The political danger of regressive environmental taxation is not theoretical. In 2018, France was paralyzed by the *Gilets Jaunes* (Yellow Vests) movement. Triggered by a proposed increase in fuel taxes, the protests drew support from working-class communities in rural and semi-rural areas who rely on diesel cars for daily survival.

Their slogan captured the core contradiction of neoliberal climate policy: *"You worry about the end of the world. We worry about the end of the month."*

The French government argued that the tax was necessary to incentivize carbon reduction. But without affordable public transit alternatives or subsidies for cleaner vehicles, the tax functioned simply as a penalty on poverty. If the green transition is framed as a struggle between working-class survival and ecological sustainability, it is destined to fail politically, paving the way for climate-denialist populism.

> "A green transition that ignores class struggle will merely paint the exploitation of the Global South green."
> — Sarah Jenkins, Climate Correspondent

### The Global Extraction Frontier

The inequity of the green transition is even more stark when viewed globally. The demand for electric vehicles, wind turbines, and solar panels has triggered a new global resource rush for critical minerals: lithium, cobalt, nickel, and copper.

Much of this extraction occurs in the Global South under conditions of extreme exploitation. In the Democratic Republic of Congo, cobalt is mined by artisanal miners—including children—working in hazardous conditions for subsistence wages. In South America's "Lithium Triangle" (Chile, Argentina, and Bolivia), water tables are being depleted to extract lithium, threatening the survival of indigenous farming communities.

The Global North is outsourcing the ecological and human costs of its green transition to the same regions it historically colonized. We are witnessing the emergence of "green colonialism," where wealthy nations clean up their local environments at the expense of the resource-rich but economically impoverished Global South.

### A Just Transition

To build a politically viable and morally defensible green transition, we must center climate policies on economic justice:
1. **Public Goods over Private Subsidies:** Instead of subsidizing private $50,000 electric vehicles for wealthy suburbanites, public capital should build free, zero-emission mass transit systems connecting rural and urban centers.
2. **Windfall Taxes on Carbon Profits:** The transition should be funded by taxing the record profits of fossil fuel corporations and the hyper-wealthy, who are responsible for the vast majority of cumulative historical emissions.
3. **Global Tech Transfer:** Wealthy nations must share green technologies with the Global South free of patent restrictions, allowing developing economies to industrialize cleanly without falling into debt traps.

The green transition cannot simply be an investment opportunity for venture capitalists. It must be a structural restructuring of global economic relations.
    `,
    category: 'Climate',
    authorId: 'sarah-jenkins',
    coverImage: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=800',
    readingTime: '9 min read',
    difficulty: 'Intermediate',
    date: 'July 15, 2026',
    views: '11,240',
    likes: 612,
    isFeatured: false,
    isEditorsPick: true
  },
  {
    id: 'silent-collapse-education',
    title: "The Silent Collapse of Public Education Infrastructure",
    excerpt: "Decades of underfunding, administrative bloat, and creeping privatization are transforming education from a public good into a commercial commodity.",
    content: `
### The Erosion of the Classroom

Across the democratic world, public education is in a state of quiet crisis. While media attention focus on cultural debates in curriculum, the structural foundation of public schools is decaying. Buildings are falling apart, class sizes are expanding, and qualified teachers are leaving the profession in historic numbers.

This is not an accident of history or the result of simple budget deficits. It is the consequence of a decades-long political project that seeks to marketize and privatize public education. By systematically underfunding schools, policymakers create the very conditions of failure that they then use to justify charter schools, voucher systems, and private contracting.

### The Business of Learning

In many jurisdictions, public education has been restructured around the principles of corporate management. School boards are run like businesses, focusing on standardized metrics, audit culture, and cost-efficiency.

This administrative bloat has diverted funds from classrooms to management consultants, testing corporations, and digital platform licensing fees. Teachers find themselves buried under bureaucratic reporting requirements, leaving them with less time to teach. Meanwhile, educational outcomes stall, and the gap between wealthy school districts (funded by local property taxes) and low-income districts widens.

### The Charter and Voucher Threat

The push for "school choice" has become a dominant political narrative. Advocates argue that vouchers and charter schools foster competition, forcing public systems to improve.

However, the empirical evidence points to a different outcome. Vouchers siphon public funds out of the public school system and redirect them to private, often religious, institutions. Charter schools, which operate with public funds but private management, frequently select the highest-performing students and discard those with special needs or behavioral challenges. The result is a two-tiered system: a well-resourced private tier for the privileged, and a neglected, under-resourced public tier for the rest.

### Restoring the Promise

Education is the bedrock of a democratic society. If we allow it to be fully marketized, we lock in class divisions for generations. Saving public education requires:
1. **Federal Funding Equality:** School funding must be decoupled from local property values, ensuring that a child's education quality is not determined by their zip code.
2. **Restoring Teacher Dignity:** Teachers must be compensated as highly skilled professionals, and their workloads must be reduced to allow for mentorship and deep teaching.
3. **Halting Public Divestment:** We must ban the use of public vouchers for private schools and halt the expansion of corporate-run charter networks.
    `,
    category: 'Education',
    authorId: 'clara-alvarez',
    coverImage: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800',
    readingTime: '8 min read',
    difficulty: 'Introductory',
    date: 'July 10, 2026',
    views: '8,920',
    likes: 423,
    isFeatured: false,
    isEditorsPick: false
  },
  {
    id: 'geopolitics-semiconductors',
    title: "The Geopolitics of Semiconductors: Capitalizing on the Silicon Shield",
    excerpt: "How a tiny island nation became the indispensable chokepoint of global technology, and why major powers are spending hundreds of billions to break the monopoly.",
    content: `
### The Silicon Chokepoint

Modern civilization runs on semiconductors. They power everything from smartphones and medical equipment to fighter jets and artificial intelligence clusters. Yet, the global supply of the most advanced microchips depends on a single company in a single, geopolitically vulnerable location: TSMC in Taiwan.

This concentrated supply chain represents a unique vulnerability in global capital. For decades, the "Silicon Shield"—the idea that China would not invade Taiwan because it would destroy the global chip supply—has maintained a fragile peace. But as tensions rise between the United States and China, the semiconductor supply chain has become the primary battleground of a new cold war.

### The Chip Acts Arms Race

Recognizing the danger of dependency, major economies are launching massive industrial policies. The United States passed the CHIPS and Science Act, committing $52 billion in subsidies to build domestic fabrication plants (fabs). The European Union followed with its own €43 billion chip initiative.

However, building a semiconductor industry is not simply a matter of writing checks. A modern chip fab is the most complex manufacturing facility on earth, requiring specialized cleanrooms, chemical supplies, extreme ultraviolet lithography (EUV) machines from the Netherlands, and a highly specialized workforce. It takes years to bring a fab online, and the economics of chip manufacturing rely on scale that domestic markets cannot easily replicate.

### Technonationalism vs. Global Capital

The semiconductor crisis highlights a fundamental tension in late capitalism: the conflict between globalized capital and national security. For thirty years, capital chased efficiency, outsourcing manufacturing to Asia to cut costs. This created an incredibly efficient, just-in-time global supply chain.

But security state planners have realized that efficiency is the enemy of resilience. The return of industrial policy and tariff walls represents the end of the hyper-globalization era. We are entering an era of "technonationalism," where governments actively direct capital, restrict exports, and build redundant local supply networks, even if it raises costs for consumers.
    `,
    category: 'Global Affairs',
    authorId: 'marcus-chen',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    readingTime: '11 min read',
    difficulty: 'Advanced',
    date: 'July 05, 2026',
    views: '12,980',
    likes: 710,
    isFeatured: false,
    isEditorsPick: false
  },
  {
    id: 'neoliberalism-ghost-eastern-europe',
    title: "Neoliberalism's Ghost in Eastern European Markets",
    excerpt: "Thirty years after the fall of the Berlin Wall, the shock therapy policies implemented in the 1990s continue to shape the political instability of the region.",
    content: `
### The Shock Therapy Experiment

Following the collapse of the Soviet Union, Eastern European nations were subjected to "shock therapy"—a rapid, simultaneous transition from state-run economies to free-market capitalism. Designed by Western economists from the IMF and Harvard, the package demanded immediate price deregulation, privatization of state enterprises, and deep cuts to social spending.

The goal was to make the transition to capitalism irreversible. It succeeded in that goal, but the social cost was catastrophic. The sudden dismantling of social safety nets, hyperinflation, and mass unemployment plunged millions into poverty, while state assets were sold off for pennies to a new class of oligarchs.

### The Rise of Illiberalism

The trauma of the 1990s created a deep-seated cynicism toward Western-style democracy and economic integration. In countries like Hungary and Poland, populist politicians successfully weaponized this trauma, blaming foreign capital and international institutions for the decline in living standards.

The rise of "illiberal democracy" in the region is directly linked to the failures of shock therapy. When democratic institutions are associated with poverty and economic insecurity, voters are willing to trade political freedoms for promises of national protection and social stability.
    `,
    category: 'Politics',
    authorId: 'julian-vance',
    coverImage: 'https://images.unsplash.com/photo-1547483238-f400e65ccd56?auto=format&fit=crop&q=80&w=800',
    readingTime: '10 min read',
    difficulty: 'Intermediate',
    date: 'June 28, 2026',
    views: '9,810',
    likes: 498,
    isFeatured: false,
    isEditorsPick: false
  },
  {
    id: 'gig-economy-illusion',
    title: "The Gig Economy and the Illusion of Entrepreneurship",
    excerpt: "How platforms rebranded insecure labor as 'flexibility' and 'self-employment,' shifting all operational risks onto the backs of individual workers.",
    content: `
### The Flexibility Trap

The central marketing claim of gig platforms is "flexibility." Drivers and delivery workers are told they can choose their own shifts, work when they want, and fit their jobs around their lives.

But this flexibility is largely an illusion. To earn a living wage, gig workers must work during peak hours (surges), which are determined by customer demand, not worker choice. Platforms use dynamic pricing and algorithmically determined bonuses to dictate when and where workers must be active. The worker has the "freedom" to decline a trip, but doing so lowers their acceptance rate, which leads to fewer high-paying offers in the future—a classic shadow disciplinary system.

### Capital Expenditure Outsourced

In traditional service industries, the company owns the capital equipment (vehicles, kitchen equipment, offices) and covers maintenance, depreciation, and insurance.

Gig platforms have outsourced these massive capital expenses to the workers themselves. The worker must supply the car, pay for gas, cover insurance, and absorb the vehicle's rapid depreciation. When these hidden costs are calculated, many gig workers earn net wages that fall well below the legal minimum wage. The platform operates as a rent-collecting intermediary, taking 20-30% of each transaction while bearing none of the physical depreciation costs of the service.
    `,
    category: 'Economics',
    authorId: 'clara-alvarez',
    coverImage: 'https://images.unsplash.com/photo-1521791136364-7286472b315c?auto=format&fit=crop&q=80&w=800',
    readingTime: '7 min read',
    difficulty: 'Introductory',
    date: 'June 22, 2026',
    views: '14,100',
    likes: 789,
    isFeatured: false,
    isEditorsPick: true
  },
  {
    id: 'privatization-urban-space',
    title: "Who Owns the Night? The Privatization of Urban Space",
    excerpt: "From business improvement districts to corporate plazas, our cities are being carved up into private enclaves where public life is heavily policed and monetized.",
    content: `
### The Shrinking Public Realm

Cities have historically been spaces of shared public life—parks, plazas, and streets where citizens could gather, protest, and interact without commercial pressure. Today, however, these public spaces are disappearing.

Across major metropolitan areas, public spaces are being transferred to private developers or managed by Business Improvement Districts (BIDs). BIDs are private non-profits funded by property assessments that take over the cleaning, marketing, and security of public corridors. While BIDs often make areas cleaner, they also implement aggressive anti-homeless architecture and security measures that target marginalized groups, turning public streets into sanitised shopping centers.

### The Pseudo-Public Plaza

When a developer builds a new office tower or luxury residential complex, they are often required to include a public plaza or park. These spaces, known as Privately Owned Public Spaces (POPS), look like public parks but are governed by private rules.

In a POPS, activities that are protected in public spaces—such as taking photographs, protesting, or even sitting without making a purchase—can be banned by private security guards. The public is welcome only as long as they behave as consumers. This carving up of the city represents a fundamental loss of the civic commons, transforming citizens into customers and reducing the space available for democratic expression.
    `,
    category: 'Society',
    authorId: 'marcus-chen',
    coverImage: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=800',
    readingTime: '8 min read',
    difficulty: 'Intermediate',
    date: 'June 15, 2026',
    views: '7,430',
    likes: 382,
    isFeatured: false,
    isEditorsPick: false
  },
  {
    id: 'de-globalization-supply-chains',
    title: "The Great De-globalization: Supply Chains in the Multipolar Era",
    excerpt: "The hyper-efficient supply chains built during the era of US hegemony are cracking under the weight of geopolitical rivalry and resource nationalism.",
    content: `
### The Death of Just-In-Time

For three decades, global trade was governed by the logic of "Just-in-Time" (JIT) inventory management. Inventories were kept to a minimum, and components were shipped across multiple borders to exploit fractional differences in labor costs.

This hyper-optimized model assumed a politically stable, frictionless world. That world no longer exists. The combination of the COVID-19 pandemic, the war in Ukraine, and the US-China decoupling has exposed the fragility of global supply chains. A delay in a single port can shut down manufacturing plants half a world away. We are witnessing the death of JIT and the rise of "Just-in-Case" logistics, where companies accumulate large stockpiles and prioritize resilience over efficiency.

### Friend-Shoring and Supply Security

To navigate this multipolar world, multinational corporations are shifting from "offshoring" to "friend-shoring"—moving supply chains to countries that are politically aligned with their home states.

This restructuring of trade is not driven by the market alone; it is actively shaped by state subsidies, export controls, and tariff regimes. The global economy is fragmenting into rival blocks, each seeking to secure access to critical inputs: energy, food, and high-tech components. This de-globalization will likely lead to structural inflation, as manufacturing moves to higher-cost but more secure locations, signaling a permanent end to the era of cheap consumer goods.
    `,
    category: 'Global Affairs',
    authorId: 'marcus-chen',
    coverImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800',
    readingTime: '10 min read',
    difficulty: 'Advanced',
    date: 'June 08, 2026',
    views: '11,040',
    likes: 540,
    isFeatured: false,
    isEditorsPick: false
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
