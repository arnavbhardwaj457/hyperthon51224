export type ParkingSpotStatus = 'available' | 'reserved' | 'occupied';

export interface ParkingSpot {
  id: number;
  status: ParkingSpotStatus;
  reservedBy?: string;
}

export interface Reservation {
  spotId: number;
  userEmail: string;
}

