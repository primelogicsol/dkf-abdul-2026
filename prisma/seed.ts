import 'dotenv/config';
import prisma from '../lib/prisma';

async function main() {
  // Seed regions data
  const regions = [
    // North America
    { continent: 'North America', country: 'United States' },
    { continent: 'North America', country: 'Canada' },
    { continent: 'North America', country: 'Mexico' },
    
    // Europe
    { continent: 'Europe', country: 'United Kingdom' },
    { continent: 'Europe', country: 'Germany' },
    { continent: 'Europe', country: 'France' },
    { continent: 'Europe', country: 'Italy' },
    { continent: 'Europe', country: 'Spain' },
    { continent: 'Europe', country: 'Netherlands' },
    { continent: 'Europe', country: 'Switzerland' },
    { continent: 'Europe', country: 'Austria' },
    { continent: 'Europe', country: 'Belgium' },
    { continent: 'Europe', country: 'Sweden' },
    { continent: 'Europe', country: 'Norway' },
    { continent: 'Europe', country: 'Denmark' },
    { continent: 'Europe', country: 'Finland' },
    { continent: 'Europe', country: 'Poland' },
    { continent: 'Europe', country: 'Portugal' },
    { continent: 'Europe', country: 'Greece' },
    { continent: 'Europe', country: 'Ireland' },
    
    // Asia
    { continent: 'Asia', country: 'India' },
    { continent: 'Asia', country: 'China' },
    { continent: 'Asia', country: 'Japan' },
    { continent: 'Asia', country: 'South Korea' },
    { continent: 'Asia', country: 'Singapore' },
    { continent: 'Asia', country: 'Malaysia' },
    { continent: 'Asia', country: 'Thailand' },
    { continent: 'Asia', country: 'Indonesia' },
    { continent: 'Asia', country: 'Philippines' },
    { continent: 'Asia', country: 'Vietnam' },
    { continent: 'Asia', country: 'Pakistan' },
    { continent: 'Asia', country: 'Bangladesh' },
    { continent: 'Asia', country: 'Sri Lanka' },
    { continent: 'Asia', country: 'Nepal' },
    { continent: 'Asia', country: 'United Arab Emirates' },
    { continent: 'Asia', country: 'Israel' },
    
    // Africa
    { continent: 'Africa', country: 'South Africa' },
    { continent: 'Africa', country: 'Nigeria' },
    { continent: 'Africa', country: 'Kenya' },
    { continent: 'Africa', country: 'Egypt' },
    { continent: 'Africa', country: 'Ghana' },
    
    // Oceania
    { continent: 'Oceania', country: 'Australia' },
    { continent: 'Oceania', country: 'New Zealand' },
    
    // South America
    { continent: 'South America', country: 'Brazil' },
    { continent: 'South America', country: 'Argentina' },
    { continent: 'South America', country: 'Chile' },
    { continent: 'South America', country: 'Colombia' },
    { continent: 'South America', country: 'Peru' },
  ];

  console.log('Seeding regions...');
  
  for (const region of regions) {
    await prisma.region.upsert({
      where: { country: region.country },
      update: {},
      create: region,
    });
  }
  
  console.log('Seeding completed successfully!');
  console.log(`Added ${regions.length} regions.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
