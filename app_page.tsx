'use client'

import { useState, useEffect } from 'react';
import { ParkingSpot as ParkingSpotType } from '../types/parking';
import { ParkingSpot } from '../components/parking-spot';
import { ReservationForm } from '../components/reservation-form';
import { getParkingLot, reserveSpot, cancelReservation, simulateOccupancy } from './actions/parkingActions';
import { Button } from '@/components/ui/button';

export default function ParkingLot() {
  const [parkingLot, setParkingLot] = useState<ParkingSpotType[]>([]);
  const [selectedSpot, setSelectedSpot] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    fetchParkingLot();
    const interval = setInterval(simulateAndFetch, 30000); // Simulate occupancy every 30 seconds
    return () => clearInterval(interval);
  }, []);

  async function fetchParkingLot() {
    const lot = await getParkingLot();
    setParkingLot(lot);
  }

  async function simulateAndFetch() {
    await simulateOccupancy();
    await fetchParkingLot();
  }

  const handleReserve = async (spotId: number) => {
    setSelectedSpot(spotId);
    setMessage(null);
  };

  const handleCancelReservation = async (spotId: number) => {
    const spot = parkingLot.find(s => s.id === spotId);
    if (spot && spot.reservedBy !== currentUser) {
      setMessage("You can only cancel your own reservations.");
      return;
    }
    const result = await cancelReservation(spotId);
    setMessage(result.message);
    if (result.success) {
      await fetchParkingLot();
    }
  };

  const handleReservationSubmit = async (email: string) => {
    setCurrentUser(email);
    if (selectedSpot) {
      const result = await reserveSpot({ spotId: selectedSpot, userEmail: email });
      setMessage(result.message);
      if (result.success) {
        await fetchParkingLot();
        setSelectedSpot(null);
      }
    }
  };

  const handleCancelForm = () => {
    setSelectedSpot(null);
    setMessage(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Smart Parking Finder</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
        {parkingLot.map((spot) => (
          <ParkingSpot
            key={spot.id}
            spot={spot}
            onReserve={handleReserve}
            onCancel={handleCancelReservation}
          />
        ))}
      </div>
      {selectedSpot && (
        <div className="mb-6 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Reserve Spot {selectedSpot}</h2>
          <ReservationForm onReserve={handleReservationSubmit} onCancel={handleCancelForm} />
        </div>
      )}
      {message && <p className="text-blue-500 mb-4">{message}</p>}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Legend</h2>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-green-500 rounded mr-2"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-yellow-500 rounded mr-2"></div>
            <span>Reserved</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-red-500 rounded mr-2"></div>
            <span>Occupied</span>
          </div>
        </div>
      </div>
      <Button onClick={simulateAndFetch} className="mt-6">
        Simulate Occupancy
      </Button>
    </div>
  );
}

