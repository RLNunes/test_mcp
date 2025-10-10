'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Brand } from '@/types/brand';
import { Loading } from '@/components/Loading';
import { Button } from '@/components/Button';
import { Map } from '@/components/Map';
import createBrandService from '@/services/brandService';
import { HiArrowLeft, HiLocationMarker, HiCalendar, HiOfficeBuilding } from 'react-icons/hi';

export default function BrandDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const id = params.id as string;
        const brandService = createBrandService();
        const data = await brandService.getBrandById(id);
        setBrand(data);
      } catch (err) {
        setError('Failed to load brand details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBrand();
  }, [params.id]);

  if (loading) {
    return <Loading message="Loading brand details..." />;
  }

  if (error || !brand) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error || 'Brand not found'}</p>
          <Button onClick={() => router.push('/')} className="mt-4">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Button
            onClick={() => router.push('/')}
            variant="outline"
            className="mb-4"
          >
            <HiArrowLeft className="inline mr-2" />
            Back to Brands
          </Button>
          <h1 className="text-4xl font-bold text-gray-900">{brand.name}</h1>
          <div className="mt-2">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm px-4 py-1 rounded-full">
              {brand.category}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Image and Details */}
          <div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <div className="w-full h-96 bg-gray-200">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {brand.description}
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <HiCalendar className="text-blue-600 text-xl mr-3 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Founded</p>
                    <p className="text-gray-600">{brand.founded}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <HiOfficeBuilding className="text-blue-600 text-xl mr-3 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Headquarters</p>
                    <p className="text-gray-600">{brand.headquarters}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <HiLocationMarker className="text-blue-600 text-xl mr-3 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Address</p>
                    <p className="text-gray-600">{brand.location.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Map */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Location</h2>
              <p className="text-gray-600 mb-4">
                Visit {brand.name} at their headquarters in {brand.headquarters}.
              </p>
              <Map location={brand.location} brandName={brand.name} />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-600">
          <p>© 2025 Luxury Brands. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
