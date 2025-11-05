import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface Brand {
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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const brand = await brandService.getBrandById(id);
    
    if (!brand) {
      return NextResponse.json(
        { success: false, error: 'Brand not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: brand });
  } catch (error) {
    console.error('Error fetching brand:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch brand' },
      { status: 500 }
    );
  }
}
