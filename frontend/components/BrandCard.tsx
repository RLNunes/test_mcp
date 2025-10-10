'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Brand } from '@/types/brand';
import { Card, CardImage, CardBody, CardTitle, CardText } from './Card';
import { HiLocationMarker, HiCalendar } from 'react-icons/hi';

interface BrandCardProps {
  brand: Brand;
}

export const BrandCard: React.FC<BrandCardProps> = ({ brand }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/brands/${brand.id}`);
  };

  return (
    <Card hover onClick={handleClick}>
      <CardImage src={brand.image} alt={brand.name} />
      <CardBody>
        <CardTitle>{brand.name}</CardTitle>
        <CardText>
          {brand.description.substring(0, 120)}...
        </CardText>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <HiLocationMarker className="mr-2 text-blue-600" />
            {brand.headquarters}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <HiCalendar className="mr-2 text-blue-600" />
            Founded in {brand.founded}
          </div>
        </div>
        
        <div className="mt-4">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
            {brand.category}
          </span>
        </div>
      </CardBody>
    </Card>
  );
};
