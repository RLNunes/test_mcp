import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export interface Brand {
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

// Service layer - Single Responsibility Principle
class BrandService {
  async getAllBrands(): Promise<Brand[]> {
    const brands = await prisma.brand.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    
    // Transform database model to API response format
    return brands.map(brand => ({
      id: brand.id,
      name: brand.name,
      description: brand.description,
      category: brand.category,
      founded: brand.founded,
      headquarters: brand.headquarters,
      location: {
        lat: brand.lat,
        lng: brand.lng,
        address: brand.address,
      },
      image: brand.image,
    }));
  }

  async getBrandById(id: string): Promise<Brand | null> {
    const brand = await prisma.brand.findUnique({
      where: { id },
    });
    
    if (!brand) return null;
    
    // Transform database model to API response format
    return {
      id: brand.id,
      name: brand.name,
      description: brand.description,
      category: brand.category,
      founded: brand.founded,
      headquarters: brand.headquarters,
      location: {
        lat: brand.lat,
        lng: brand.lng,
        address: brand.address,
      },
      image: brand.image,
    };
  }
}

const brandService = new BrandService();

export async function GET() {
  try {
    const brands = await brandService.getAllBrands();
    return NextResponse.json({ success: true, data: brands });
  } catch (error) {
    console.error('Error fetching brands:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch brands' },
      { status: 500 }
    );
  }
}
