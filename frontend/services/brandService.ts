import { Brand, ApiResponse } from '@/types/brand';

// Interface for API client - Dependency Inversion Principle
interface IApiClient {
  get<T>(url: string): Promise<T>;
}

// Concrete implementation of API client
class ApiClient implements IApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(url: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${url}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
}

// Brand service - Single Responsibility Principle
class BrandService {
  private apiClient: IApiClient;

  constructor(apiClient: IApiClient) {
    this.apiClient = apiClient;
  }

  async getAllBrands(): Promise<Brand[]> {
    try {
      const response = await this.apiClient.get<ApiResponse<Brand[]>>('/api/brands');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching brands:', error);
      throw error;
    }
  }

  async getBrandById(id: string): Promise<Brand | null> {
    try {
      const response = await this.apiClient.get<ApiResponse<Brand>>(`/api/brands/${id}`);
      return response.data || null;
    } catch (error) {
      console.error('Error fetching brand:', error);
      throw error;
    }
  }
}

// Factory function to create brand service
export const createBrandService = (baseUrl: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'): BrandService => {
  const apiClient = new ApiClient(baseUrl);
  return new BrandService(apiClient);
};

export default createBrandService;
