'use server'

import { ParkingSpot, Reservation, ParkingSpotStatus } from '../../types/parking';

function initializeParkingLot(): ParkingSpot[] {
  return Array(20).fill(null).map((_, index) => {
    const random = Math.random();
    let status: ParkingSpotStatus = 'available';
    let reservedBy: string | undefined = undefined;

    if (random < 0.2) {
      status = 'occupied';
    } else if (random < 0.4) {
      status = 'reserved';
      reservedBy = `user${index + 1}@example.com`;
    }

    return {
      id: index + 1,
      status,
      reservedBy
    };
  });
}

let parkingLot: ParkingSpot[] = initializeParkingLot();

export async function getParkingLot(): Promise<ParkingSpot[]> {
  return parkingLot;
}

export async function reserveSpot(reservation: Reservation): Promise<{ success: boolean; message: string }> {
  const spot = parkingLot.find(spot => spot.id === reservation.spotId);
  if (!spot || spot.status !== 'available') {
    return { success: false, message: 'Spot is not available' };
  }

  spot.status = 'reserved';
  spot.reservedBy = reservation.userEmail;
  return { success: true, message: 'Spot reserved successfully' };
}

export async function cancelReservation(spotId: number): Promise<{ success: boolean; message: string }> {
  const spot = parkingLot.find(spot => spot.id === spotId);
  if (!spot || spot.status !== 'reserved') {
    return { success: false, message: 'No reservation found for this spot' };
  }

  spot.status = 'available';
  spot.reservedBy = undefined;
  return { success: true, message: 'Reservation cancelled successfully' };
}

export async function simulateOccupancy(): Promise<void> {
  parkingLot = parkingLot.map(spot => {
    if (spot.status === 'reserved' && Math.random() < 0.3) {
      return { ...spot, status: 'occupied' };
    }
    return spot;
  });
}

