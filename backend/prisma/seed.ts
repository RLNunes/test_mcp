import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { join } from 'path';

const prisma = new PrismaClient();

interface BrandData {
  id: string;
  name: string;
  description: string;
  category: string;
  founded: number;
  headquarters: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  image: string;
}

async function main() {
  console.log('Starting database seed...');

  // Read existing brands from JSON file
  const brandsPath = join(process.cwd(), '..', 'database', 'brands.json');
  const brandsData: BrandData[] = JSON.parse(readFileSync(brandsPath, 'utf-8'));

  // Seed brands
  for (const brand of brandsData) {
    await prisma.brand.upsert({
      where: { id: brand.id },
      update: {
        name: brand.name,
        description: brand.description,
        category: brand.category,
        founded: brand.founded,
        headquarters: brand.headquarters,
        lat: brand.location.lat,
        lng: brand.location.lng,
        address: brand.location.address,
        image: brand.image,
      },
      create: {
        id: brand.id,
        name: brand.name,
        description: brand.description,
        category: brand.category,
        founded: brand.founded,
        headquarters: brand.headquarters,
        lat: brand.location.lat,
        lng: brand.location.lng,
        address: brand.location.address,
        image: brand.image,
      },
    });
    console.log(`✓ Seeded brand: ${brand.name}`);
  }

  // Seed sample agents
  const sampleAgents = [
    {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@luxury.com',
      phone: '+1-555-0101',
      expertise: 'Fashion & Leather Goods',
    },
    {
      name: 'Michael Chen',
      email: 'michael.chen@luxury.com',
      phone: '+1-555-0102',
      expertise: 'Watches & Jewelry',
    },
    {
      name: 'Emma Wilson',
      email: 'emma.wilson@luxury.com',
      phone: '+1-555-0103',
      expertise: 'Fashion & Accessories',
    },
  ];

  for (const agent of sampleAgents) {
    const createdAgent = await prisma.agent.upsert({
      where: { email: agent.email },
      update: agent,
      create: agent,
    });
    console.log(`✓ Seeded agent: ${agent.name}`);

    // Associate agents with brands based on expertise
    const brandsToAssociate = await prisma.brand.findMany({
      where: {
        category: {
          contains: agent.expertise.split(' & ')[0],
        },
      },
    });

    for (const brand of brandsToAssociate) {
      await prisma.agentBrand.upsert({
        where: {
          agentId_brandId: {
            agentId: createdAgent.id,
            brandId: brand.id,
          },
        },
        update: {},
        create: {
          agentId: createdAgent.id,
          brandId: brand.id,
        },
      });
    }
  }

  console.log('✓ Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
