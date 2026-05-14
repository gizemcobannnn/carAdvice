import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const cars = await prisma.cars.findMany({
    include: {
      brands:     true,  // joins the brands table
      categories: true,  // joins the categories table
    },
  })
  return NextResponse.json(cars)
}