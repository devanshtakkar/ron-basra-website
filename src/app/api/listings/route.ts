import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// todo: sort the listings by date correctly
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const minPrice = Number(searchParams.get('minPrice')) || 0;
    const maxPrice = Number(searchParams.get('maxPrice')) || 99999999;
    const propertyType = searchParams.get('propertyType');
    const bedrooms = searchParams.get('bedrooms');
    const bathrooms = searchParams.get('bathrooms');
    const searchTerm = searchParams.get('searchTerm');
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 9;
    const skip = (page - 1) * limit;

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
      if (bedrooms === '4plus') {
        where.OR = [
          {
            mainSummary: {
              path: '$.bedrooms',
              equals: 4
            }
          },
          {
            mainSummary: {
              path: '$.bedrooms',
              equals: 5
            }
          },
          {
            mainSummary: {
              path: '$.bedrooms',
              equals: 6
            }
          },
          {
            mainSummary: {
              path: '$.bedrooms',
              equals: 7
            }
          },
          {
            mainSummary: {
              path: '$.bedrooms',
              equals: 8
            }
          },
          {
            mainSummary: {
              path: '$.bedrooms',
              equals: 9
            }
          },
          {
            mainSummary: {
              path: '$.bedrooms',
              equals: 10
            }
          }
        ];
      } else {
        where.mainSummary = {
          path: '$.bedrooms',
          equals: parseInt(bedrooms)
        };
      }
    }

    // Add bathrooms filter if not 'all'
    if (bathrooms && bathrooms !== 'all') {
      if (bathrooms === '5plus') {
        const bathroomConditions = [
          {
            mainSummary: {
              path: '$.bathrooms',
              equals: 5
            }
          },
          {
            mainSummary: {
              path: '$.bathrooms',
              equals: 6
            }
          },
          {
            mainSummary: {
              path: '$.bathrooms',
              equals: 7
            }
          },
          {
            mainSummary: {
              path: '$.bathrooms',
              equals: 8
            }
          },
          {
            mainSummary: {
              path: '$.bathrooms',
              equals: 9
            }
          },
          {
            mainSummary: {
              path: '$.bathrooms',
              equals: 10
            }
          }
        ];

        // If we already have conditions from bedrooms, combine them
        if (where.OR) {
          // Create a cross product of bedroom and bathroom conditions
          const combinedConditions = where.OR.flatMap((bedroomCondition: { mainSummary: { path: string; equals: number } }) => 
            bathroomConditions.map(bathroomCondition => ({
              AND: [
                bedroomCondition,
                bathroomCondition
              ]
            }))
          );
          where.OR = combinedConditions;
        } else {
          where.OR = bathroomConditions;
        }
      } else {
        if (where.OR) {
          // If we have bedroom conditions, we need to add bathroom condition to each
          where.OR = where.OR.map((condition: { mainSummary: { path: string; equals: number } }) => ({
            AND: [
              condition,
              {
                mainSummary: {
                  path: '$.bathrooms',
                  equals: parseInt(bathrooms)
                }
              }
            ]
          }));
        } else {
          where.mainSummary = {
            path: '$.bathrooms',
            equals: parseInt(bathrooms)
          };
        }
      }
    }

    // Add search term filter
    if (searchTerm) {
      where.OR = [
        { title: { contains: searchTerm } },
        { description: { contains: searchTerm } },
      ];
    }

    console.log('Query where clause:', JSON.stringify(where, null, 2));

    // Get total count for pagination
    const totalCount = await prisma.listing.count({ where });

    const listings = await prisma.listing.findMany({
      where,
      include: {
        photos: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
      take: limit,
      skip: skip,
    });

    // Ensure we're returning an array
    if (!Array.isArray(listings)) {
      console.error('Prisma returned non-array result:', listings);
      return NextResponse.json({ listings: [], totalCount: 0 }, { status: 500 });
    }

    return NextResponse.json({
      listings,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit)
    });
  } catch (error) {
    console.error('Error fetching listings:', error);
    // Always return an array, even in error cases
    return NextResponse.json({ listings: [], totalCount: 0, currentPage: 1, totalPages: 0 }, { status: 500 });
  }
} 