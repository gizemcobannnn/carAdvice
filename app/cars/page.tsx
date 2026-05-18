import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function CarsPage() {
  const cars = await prisma.cars.findMany({
    include: {
      brands: true,
      categories: true,
    },
  })

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-6">Browse Cars</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <Link href={`/cars/${car.id}`} key={car.id}>
            <div className="border rounded-xl p-4 hover:shadow-lg transition cursor-pointer">
              <h2 className="text-lg font-semibold">{car.title}</h2>
              <p className="text-gray-500">{car.brands?.name}</p>
              <p className="text-gray-400 text-sm">{car.categories?.name}</p>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-green-800 font-bold text-3xl">
                  ${(Number(car.price_cents ?? 0) / 100).toLocaleString()}
                </span>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                  {car.fuel_type ?? 'N/A'}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}