import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const minPrice = Number(searchParams.get('minPrice')) || 0;
    const maxPrice = Number(searchParams.get('maxPrice')) || 10000000;
    const propertyType = searchParams.get('propertyType');
    const bedrooms = searchParams.get('bedrooms');
    const bathrooms = searchParams.get('bathrooms');
    const searchTerm = searchParams.get('searchTerm');

    // Build the where clause based on filters
    let where: any = {};

    // Price filter using the direct price field
    if (minPrice || maxPrice) {
      where.price = {
        gte: minPrice,
        lte: maxPrice,
      };
    }

    // Add property type filter if not 'all'
    if (propertyType && propertyType !== 'all') {
      where.mainSummary = {
        path: '$.propertyType',
        string_contains: propertyType,
      };
    }

    // Add bedrooms filter if not 'all'
    if (bedrooms && bedrooms !== 'all') {
      where.mainSummary = {
        path: '$.bedrooms',
        equals: parseInt(bedrooms),
      };
    }

    // Add bathrooms filter if not 'all'
    if (bathrooms && bathrooms !== 'all') {
      where.mainSummary = {
        path: '$.bathrooms',
        equals: parseInt(bathrooms),
      };
    }

    // Add search term filter
    if (searchTerm) {
      where.OR = [
        { title: { contains: searchTerm } },
        { description: { contains: searchTerm } },
      ];
    }

    console.log('Query where clause:', JSON.stringify(where, null, 2));

    const listings = await prisma.listing.findMany({
      where,
      include: {
        photos: true,
      },
      orderBy: {
        title: 'asc',
      },
    });


    // Ensure we're returning an array
    if (!Array.isArray(listings)) {
      console.error('Prisma returned non-array result:', listings);
      return NextResponse.json([], { status: 500 });
    }

    return NextResponse.json(listings);
  } catch (error) {
    console.error('Error fetching listings:', error);
    // Always return an array, even in error cases
    return NextResponse.json([], { status: 500 });
  }
} 