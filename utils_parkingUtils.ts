import { ParkingSpotStatus } from '../types/parking';

export function getSpotColor(status: ParkingSpotStatus): string {
  switch (status) {
    case 'available':
      return 'bg-green-500';
    case 'reserved':
      return 'bg-yellow-500';
    case 'occupied':
      return 'bg-red-500';
    default:
      return 'bg-gray-300';
  }
}

export function getSpotIcon(status: ParkingSpotStatus): string {
  switch (status) {
    case 'available':
      return '🅿️';
    case 'reserved':
      return '🚗';
    case 'occupied':
      return '🚙';
    default:
      return '❓';
  }
}

