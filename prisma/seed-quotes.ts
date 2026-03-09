import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const quotes = [
  {
    text: "The heart becomes clear when it stops arguing with truth.",
    category: "Self Awareness",
    is_featured: false,
    display_order: 1,
  },
  {
    text: "Peace begins when the mind becomes honest with itself.",
    category: "Peace and Reflection",
    is_featured: false,
    display_order: 2,
  },
  {
    text: "Faith grows quietly where compassion becomes natural.",
    category: "Compassion",
    is_featured: false,
    display_order: 3,
  },
  {
    text: "Discipline is not punishment; it is the protection of the soul.",
    category: "Inner Discipline",
    is_featured: false,
    display_order: 4,
  },
  {
    text: "The world changes slowly, but the heart can change in a single moment.",
    category: "Self Awareness",
    is_featured: false,
    display_order: 5,
  },
  {
    text: "Human beings search across the world for meaning, yet the doorway is always within their own awareness.",
    category: "Self Awareness",
    is_featured: true, // Featured quote
    display_order: 0,
  },
  {
    text: "Compassion is not an act of will but a quality of understanding.",
    category: "Compassion",
    is_featured: false,
    display_order: 6,
  },
  {
    text: "True discipline arises from love of the goal, not fear of failure.",
    category: "Inner Discipline",
    is_featured: false,
    display_order: 7,
  },
  {
    text: "Ethical conduct is not following rules but living from clarity.",
    category: "Ethical Conduct",
    is_featured: false,
    display_order: 8,
  },
  {
    text: "We are not separate beings seeking connection; we are connection expressing as separate beings.",
    category: "Human Unity",
    is_featured: false,
    display_order: 9,
  },
  {
    text: "In silence, the mind finds its natural rhythm and the heart its native language.",
    category: "Peace and Reflection",
    is_featured: false,
    display_order: 10,
  },
  {
    text: "Awareness is the mirror in which truth recognizes itself.",
    category: "Self Awareness",
    is_featured: false,
    display_order: 11,
  },
  {
    text: "To be ethical is to act from understanding rather than from impulse.",
    category: "Ethical Conduct",
    is_featured: false,
    display_order: 12,
  },
  {
    text: "Unity is not something to achieve; it is something to recognize.",
    category: "Human Unity",
    is_featured: false,
    display_order: 13,
  },
  {
    text: "Compassion begins where judgment ends.",
    category: "Compassion",
    is_featured: false,
    display_order: 14,
  },
  {
    text: "The quiet mind hears what the busy mind cannot imagine.",
    category: "Peace and Reflection",
    is_featured: false,
    display_order: 15,
  },
  {
    text: "Self-observation is the first act of freedom.",
    category: "Self Awareness",
    is_featured: false,
    display_order: 16,
  },
  {
    text: "Consistency in small things creates the capacity for greatness in all things.",
    category: "Inner Discipline",
    is_featured: false,
    display_order: 17,
  },
];

async function main() {
  console.log('🌱 Seeding quotes...');

  for (const quote of quotes) {
    await prisma.quote.create({
      data: quote,
    });
    console.log(`✓ Added quote: "${quote.text.substring(0, 50)}..."`);
  }

  console.log(`\n✅ Successfully added ${quotes.length} quotes to the database!`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding quotes:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
