import { PrismaClient } from '../app/generated/prisma';
const prisma = new PrismaClient();

async function main() {
  await prisma.incident.deleteMany({});
  await prisma.camera.deleteMany({});

  const camerasData = [
    { name: 'Camera 01', location: 'Shop Floor A' },
    { name: 'Camera 02', location: 'Vault' },
    { name: 'Camera 03', location: 'Entrance' },
    { name: 'Camera 04', location: 'Parking Lot' },
    { name: 'Camera 05', location: 'Server Room' },
  ];

  await prisma.camera.createMany({
    data: camerasData
  });

  const cameras = await prisma.camera.findMany();

  const getCameraId = (cameraName: string) => {
    const camera = cameras.find(c => c.name === cameraName);
    if (!camera) {
      throw new Error(`Camera with name "${cameraName}" not found.`);
    }
    return camera.id;
  };

  const incidentsData = [
    {
      cameraId: getCameraId('Camera 01'),
      type: 'Unauthorised Access',
      tsStart: new Date('2025-07-25T09:00:00Z'),
      tsEnd: new Date('2025-07-25T09:05:00Z'),
      thumbnailUrl: '/thumbnails/UnauthorisedAccess1.png',
      resolved: false
    },
    {
      cameraId: getCameraId('Camera 03'),
      type: 'Unauthorised Access',
      tsStart: new Date('2025-07-25T11:30:00Z'),
      tsEnd: new Date('2025-07-25T11:32:00Z'),
      thumbnailUrl: '/thumbnails/UnauthorisedAccess2.png',
      resolved: false
    },
    {
      cameraId: getCameraId('Camera 02'),
      type: 'Unauthorised Access',
      tsStart: new Date('2025-07-24T23:00:00Z'),
      tsEnd: new Date('2025-07-24T23:03:00Z'),
      thumbnailUrl: '/thumbnails/UnauthorisedAccess3.png',
      resolved: true
    },
    {
      cameraId: getCameraId('Camera 04'),
      type: 'Gun Threat',
      tsStart: new Date('2025-07-25T02:15:00Z'),
      tsEnd: new Date('2025-07-25T02:20:00Z'),
      thumbnailUrl: '/thumbnails/GunThreat1.png',
      resolved: false
    },
    {
      cameraId: getCameraId('Camera 05'),
      type: 'Gun Threat',
      tsStart: new Date('2025-07-25T16:00:00Z'),
      tsEnd: new Date('2025-07-25T16:08:00Z'),
      thumbnailUrl: '/thumbnails/GunThreat2.png',
      resolved: true
    },
    {
      cameraId: getCameraId('Camera 01'),
      type: 'Vandalism',
      tsStart: new Date('2025-07-24T18:00:00Z'),
      tsEnd: new Date('2025-07-24T18:05:00Z'),
      thumbnailUrl: '/thumbnails/Vandalism1.png',
      resolved: false
    },
    {
      cameraId: getCameraId('Camera 02'),
      type: 'Face Recognised',
      tsStart: new Date('2025-07-25T07:45:00Z'),
      tsEnd: new Date('2025-07-25T07:46:00Z'),
      thumbnailUrl: '/thumbnails/FaceRecognised1.png',
      resolved: false
    },
    {
      cameraId: getCameraId('Camera 04'),
      type: 'Face Recognised',
      tsStart: new Date('2025-07-25T10:00:00Z'),
      tsEnd: new Date('2025-07-25T10:01:00Z'),
      thumbnailUrl: '/thumbnails/FaceRecognised1.png',
      resolved: true
    },
    {
      cameraId: getCameraId('Camera 03'),
      type: 'Theft',
      tsStart: new Date('2025-07-24T20:00:00Z'),
      tsEnd: new Date('2025-07-24T20:02:00Z'),
      thumbnailUrl: '/thumbnails/Theft2.png',
      resolved: false
    },
    {
      cameraId: getCameraId('Camera 01'),
      type: 'Theft',
      tsStart: new Date('2025-07-25T13:00:00Z'),
      tsEnd: new Date('2025-07-25T13:10:00Z'),
      thumbnailUrl: '/thumbnails/Theft1.png',
      resolved: false
    },
    {
      cameraId: getCameraId('Camera 02'),
      type: 'Vandalism',
      tsStart: new Date('2025-07-25T01:00:00Z'),
      tsEnd: new Date('2025-07-25T01:03:00Z'),
      thumbnailUrl: '/thumbnails/Vandalism1.png',
      resolved: false
    },
    {
      cameraId: getCameraId('Camera 03'),
      type: 'Theft',
      tsStart: new Date('2025-07-25T05:00:00Z'),
      tsEnd: new Date('2025-07-25T05:07:00Z'),
      thumbnailUrl: '/thumbnails/Thef3.png',
      resolved: true
    },
    {
      cameraId: getCameraId('Camera 04'),
      type: 'Vandalism',
      tsStart: new Date('2025-07-24T17:00:00Z'),
      tsEnd: new Date('2025-07-24T17:01:00Z'),
      thumbnailUrl: '/thumbnails/Vandalism2.png',
      resolved: false
    },
  ];

  await prisma.incident.createMany({
    data: incidentsData
  });

  console.log('Seed data created successfully!');
}

main()
  .catch(e => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
