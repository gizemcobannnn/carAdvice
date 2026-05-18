import {prisma} from '@/lib/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function CarDetailPage({ params }: { params: { id: string } }) {
    const car = await prisma.cars.findUnique({
      where: { id: params.id },
      include: {
        brands: true,
        categories: true,
        car_features: { include: { features: true } },
      },
    });
    if (!car) notFound();
// brand should be named by the category
    return (
      <main className="p-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-1">{car.title}</h1>
        <p className="text-gray-500 mb-6">
          {car.brands?.name} · {car.categories?.name}
        </p>

        <div className="grid grid-cols-2 gap-5 mb-10">
          <div className="border rounded-xl p-4">
            <p className="text-xs text-gray-400">Price</p>
            <p className="text-lg font-bold text-green-800">
              ${(Number(car.price_cents ?? 0) / 100).toLocaleString()}
            </p>
          </div>
          <div className="border rounded-xl p-4">
            <p className="text-xs text-gray-400">Fuel Type</p>
            <p className="text-lg font-semibold text-yellow-500">{car.fuel_type ?? "N/A"}</p>
          </div>
          <div className="border rounded-xl p-4">
            <p className="text-xs text-gray-400">Transmission</p>
            <p className="text-lg font-semibold text-purple-900">{car.transmission ?? "N/A"}</p>
          </div>
          <div className="border rounded-xl p-4">
            <p className="text-xs text-gray-400">Year</p>
            <p className="text-lg font-semibold text-pink-500">
              {car.production_year ?? "N/A"}
            </p>
          </div>
          <div className="border rounded-xl p-4">
            <p className="text-xs text-gray-400">Mileage</p>
            <p className="text-lg font-semibold text-amber-800">
              {car.mileage_km?.toLocaleString() ?? "N/A"} km
            </p>
          </div>
          <div className="border rounded-xl p-4">
            <p className="text-xs text-gray-400">Seats</p>
            <p className="text-lg font-semibold text-blue-400">{car.seat_count ?? "N/A"}</p>
          </div>
        </div>
        {car.car_features.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Features</h2>
            <div className="flex flex-wrap gap-2">
              {car.car_features.map((cf) => (
                <span
                  key={cf.feature_id}
                  className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                >
                  {cf.features.name}
                </span>
              ))}
            </div>
          </div>
        )}
        <a href="/cars" className="text-white-900 font-semibold  text-sm">
          ← Back to listings
        </a>
      </main>
    );

}