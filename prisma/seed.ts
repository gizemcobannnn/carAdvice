import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // ── Brands ──────────────────────────────────────────
  const toyota = await prisma.brands.upsert({
    where: { name: 'Toyota' },
    update: {},
    create: { name: 'Toyota' },
  })
  const bmw = await prisma.brands.upsert({
    where: { name: 'BMW' },
    update: {},
    create: { name: 'BMW' },
  })
  const ford = await prisma.brands.upsert({
    where: { name: 'Ford' },
    update: {},
    create: { name: 'Ford' },
  })
  const mercedes = await prisma.brands.upsert({
    where: { name: 'Mercedes-Benz' },
    update: {},
    create: { name: 'Mercedes-Benz' },
  })
  const honda = await prisma.brands.upsert({
    where: { name: 'Honda' },
    update: {},
    create: { name: 'Honda' },
  })

  // ── Categories ───────────────────────────────────────
  const suv = await prisma.categories.upsert({
    where: { name: 'SUV' },
    update: {},
    create: { name: 'SUV' },
  })
  const sedan = await prisma.categories.upsert({
    where: { name: 'Sedan' },
    update: {},
    create: { name: 'Sedan' },
  })
  const truck = await prisma.categories.upsert({
    where: { name: 'Truck' },
    update: {},
    create: { name: 'Truck' },
  })
  const coupe = await prisma.categories.upsert({
    where: { name: 'Coupe' },
    update: {},
    create: { name: 'Coupe' },
  })

  // ── Features ─────────────────────────────────────────
  const sunroof = await prisma.features.upsert({
    where: { name: 'Sunroof' },
    update: {},
    create: { name: 'Sunroof', group_name: 'Comfort' },
  })
  const heatedSeats = await prisma.features.upsert({
    where: { name: 'Heated Seats' },
    update: {},
    create: { name: 'Heated Seats', group_name: 'Comfort' },
  })
  const bluetooth = await prisma.features.upsert({
    where: { name: 'Bluetooth' },
    update: {},
    create: { name: 'Bluetooth', group_name: 'Technology' },
  })
  const backupCamera = await prisma.features.upsert({
    where: { name: 'Backup Camera' },
    update: {},
    create: { name: 'Backup Camera', group_name: 'Safety' },
  })

  // ── Cars ─────────────────────────────────────────────
  const car1 = await prisma.cars.create({
    data: {
      title: 'Toyota RAV4 Hybrid',
      brand_id: toyota.id,
      category_id: suv.id,
      engine: '2.5L 4-cylinder',
      fuel_type: 'hybrid',
      transmission: 'automatic',
      body_style: 'suv',
      production_year: 2023,
      mileage_km: 15000,
      price_cents: 3200000,
      seat_count: 5,
      horsepower: 219,
    },
  })

  const car2 = await prisma.cars.create({
    data: {
      title: 'BMW 3 Series 330i',
      brand_id: bmw.id,
      category_id: sedan.id,
      engine: '2.0L Turbo',
      fuel_type: 'petrol',
      transmission: 'automatic',
      body_style: 'sedan',
      production_year: 2022,
      mileage_km: 30000,
      price_cents: 4500000,
      seat_count: 5,
      horsepower: 255,
    },
  })

  const car3 = await prisma.cars.create({
    data: {
      title: 'Ford F-150 XLT',
      brand_id: ford.id,
      category_id: truck.id,
      engine: '3.5L V6',
      fuel_type: 'petrol',
      transmission: 'automatic',
      body_style: 'truck',
      production_year: 2023,
      mileage_km: 8000,
      price_cents: 3800000,
      seat_count: 5,
      horsepower: 400,
    },
  })

  const car4 = await prisma.cars.create({
    data: {
      title: 'Mercedes-Benz C-Class',
      brand_id: mercedes.id,
      category_id: sedan.id,
      engine: '2.0L Turbo',
      fuel_type: 'petrol',
      transmission: 'automatic',
      body_style: 'sedan',
      production_year: 2023,
      mileage_km: 5000,
      price_cents: 5500000,
      seat_count: 5,
      horsepower: 255,
    },
  })

  const car5 = await prisma.cars.create({
    data: {
      title: 'BMW M4 Competition',
      brand_id: bmw.id,
      category_id: coupe.id,
      engine: '3.0L Twin-Turbo',
      fuel_type: 'petrol',
      transmission: 'automatic',
      body_style: 'coupe',
      production_year: 2023,
      mileage_km: 2000,
      price_cents: 8500000,
      seat_count: 4,
      horsepower: 503,
    },
  })

  const car6 = await prisma.cars.create({
    data: {
      title: 'Honda CR-V AWD',
      brand_id: honda.id,
      category_id: suv.id,
      engine: '1.5L Turbo',
      fuel_type: 'petrol',
      transmission: 'automatic',
      body_style: 'suv',
      production_year: 2022,
      mileage_km: 22000,
      price_cents: 2900000,
      seat_count: 5,
      horsepower: 190,
    },
  })

  // ── Car Features ─────────────────────────────────────
  await prisma.car_features.createMany({
    skipDuplicates: true,
    data: [
      { car_id: car1.id, feature_id: sunroof.id },
      { car_id: car1.id, feature_id: heatedSeats.id },
      { car_id: car1.id, feature_id: backupCamera.id },
      { car_id: car2.id, feature_id: sunroof.id },
      { car_id: car2.id, feature_id: bluetooth.id },
      { car_id: car3.id, feature_id: bluetooth.id },
      { car_id: car3.id, feature_id: backupCamera.id },
      { car_id: car4.id, feature_id: sunroof.id },
      { car_id: car4.id, feature_id: heatedSeats.id },
      { car_id: car4.id, feature_id: bluetooth.id },
      { car_id: car5.id, feature_id: bluetooth.id },
      { car_id: car6.id, feature_id: backupCamera.id },
      { car_id: car6.id, feature_id: bluetooth.id },
    ],
  })

  console.log('✅ Seed complete')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })