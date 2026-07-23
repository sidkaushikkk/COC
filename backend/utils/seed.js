require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const Article = require('../models/Article');

const initialArticles = [
  {
    title: 'THE MENU and “eat the rich” Hollywood syndrome',
    slug: 'the-menu-and-eat-the-rich-hollywood-syndrome',
    coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Hollywood has appropriated more miniskirts and regional accents than its newly found passion of anti-capitalism which it wears like a swagger in tuxedo in old hotel bar smoking bourgeoisie cigars.',
    content: `Hollywood has appropriated more miniskirts and regional accents than its newly found passion of anti-capitalism which it wears like a swagger in tuxedo in old hotel bar smoking bourgeoisie cigars. This harps the infamous Joyce Messier quote popular among all defeated leftists- “Capital has the ability to subsume all critiques into itself. Even those who would critique capital end up reinforcing it instead.” Indeed, Barbie reinforced her corporate feminist ideals of “women empowerment in heels”, Fight Club became an anarchist laughing stock bordering as the satire of the amused right wing apologetics who call the film as a “frenzied attempt for childish revolution” and the 2006 film- “V for Vendetta” became another “train-wrecking” performance of teenage angst mixed with a taste for union politics and middle aged armory.

As Michele Bigoni and Sideeq Mohammed quote- “Consequently, we will argue that, given the inextricable imbrication of accounting and capitalism, without an impossible and unconceptualisable ‘post-capitalist accounting’, all notions of sustainable accounting are protracted exercises in futility that serve rather than abate ecological collapse. Paradoxically, any attempt to produce such accounting makes it harder to achieve.”

The movie in short depicts the suicidal artistry of well renowned chef Slowik killing alongside his high profile customers in an exotic island restaurant- “Hawthorne” including a popular actor, businessmen, corporate bandits and alto-rilievo food critics. Basically, a host of all types of individuals of high society who Slowik imminently hates for their classist repercussions in a society marked with great struggle and inequality for working class like Slowik himself.

> "You represent the ruin of my art and my life, and now you get to be a part of it. Part of what I hope is my... masterpiece."

The Menu, is the refreshing, macabre and poetically accurate prognosis of the capitalist problem, one meal courses at a time, dressing the unbaked cake of Marxist syndrome with butter, schizophrenic obsession to details and personal pain.`,
    category: 'Capitalism',
    author: {
      name: 'Anviksha Singh',
      role: 'Founder & Editor, Children of Capital',
      bio: 'The editor of Children of Capital writes about the systems that shape public life, with a focus on political economy, power, and social change.',
      photo: 'src/assets/author.webp',
      linkedin: 'https://www.linkedin.com/in/anviksha-singh-children-of-capital/'
    },
    featured: true,
    editorPick: true,
    readingTime: '8 min read',
    publishedAt: new Date('2025-02-01')
  },
  {
    title: 'The crude politics of subversion in Gig economy',
    slug: 'the-crude-politics-of-subversion-in-gig-economy',
    coverImage: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Bertrand Russell once remarked that thought is subversive and revolutionary. In 2025, capital itself has become the ultimate engine of hyper-subversion through the creator and gig economy.',
    content: `Bertrand Russell, a penchant apologetic of free speech once remarked in seemingly great hopes with public intelligence that- “Thought is subversive and revolutionary, destructive and terrible, Thought is merciless to privilege, established institutions, and comfortable habit. Thought is great and swift and free.” Indeed, thought is a great democratic rebellion of 21st century but do you know what else is “great and swift and free”? CAPITAL.

Capital is almost of indestructible nature, capable of cross national trade, it breaks through privileges, institutions and habits to make new and indeed very subversive. What is also interesting to note is how well capital time and again subverts through its earlier form making it override its own ideals of meaning, consumption and aesthetic.

In our postmodern times where ring lights, selfie stands and makeup filters abound in perceived affordable infinity in markets, people have begun subverting their human resource for a profitable capital- “themselves”. The result is now an alternative market of digital content creators who have their own distinctive liberalized sociological implications.

> “This is the problem with the gig economy, I think as I squirm around in the trunk. Everyone is so vulnerable and the rules for what constitutes civilized behaviour--well, they're coming apart so quickly I've decided those rules were illusions all along.” — Laura van den Berg`,
    category: 'Politics',
    author: {
      name: 'Anviksha Singh',
      role: 'Founder & Editor, Children of Capital',
      bio: 'The editor of Children of Capital writes about the systems that shape public life, with a focus on political economy, power, and social change.',
      photo: 'src/assets/author.webp',
      linkedin: 'https://www.linkedin.com/in/anviksha-singh-children-of-capital/'
    },
    featured: true,
    editorPick: false,
    readingTime: '6 min read',
    publishedAt: new Date('2025-02-10')
  }
];

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/children_of_capital';
    console.log(`Connecting to MongoDB at ${mongoUri}...`);
    await mongoose.connect(mongoUri);

    await Article.deleteMany({});
    console.log('Cleared existing articles');

    const createdArticles = await Article.insertMany(initialArticles);
    console.log(`Successfully seeded ${createdArticles.length} articles into MongoDB.`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
