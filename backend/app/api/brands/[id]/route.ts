import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

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
  private brands: Brand[] = [];

  constructor() {
    this.loadBrands();
  }

  private loadBrands(): void {
    try {
      const dbPath = join(process.cwd(), '..', 'database', 'brands.json');
      const data = readFileSync(dbPath, 'utf-8');
      this.brands = JSON.parse(data);
    } catch (error) {
      console.error('Error loading brands:', error);
      this.brands = [];
    }
  }

  getBrandById(id: string): Brand | undefined {
    return this.brands.find(brand => brand.id === id);
  }
}

const brandService = new BrandService();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const brand = brandService.getBrandById(id);
    
    if (!brand) {
      return NextResponse.json(
        { success: false, error: 'Brand not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: brand });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch brand' },
      { status: 500 }
    );
  }
}
