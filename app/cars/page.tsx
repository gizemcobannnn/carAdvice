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

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 ">
        {cars.map((car) => (
          <Link href={`/cars/${car.id}`} key={car.id} className='text-inherit no-underline flex flex-col w-full'>
            <div className="border rounded-xl p-4   cursor-pointer grid grid-rows-2 bg-purple-500 items-center text-center"> 
              <div>
                <h2 className="text-lg font-semibold">{car.title}</h2>
              </div>
              <div className='grid grid-cols-4 items-center'>
                              <p className="text-gray-500">{car.brands?.name}</p>
              <p className="text-gray-400 text-sm">{car.categories?.name}</p>
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