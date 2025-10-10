import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

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

  getAllBrands(): Brand[] {
    return this.brands;
  }

  getBrandById(id: string): Brand | undefined {
    return this.brands.find(brand => brand.id === id);
  }
}

const brandService = new BrandService();

export async function GET() {
  try {
    const brands = brandService.getAllBrands();
    return NextResponse.json({ success: true, data: brands });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch brands' },
      { status: 500 }
    );
  }
}
