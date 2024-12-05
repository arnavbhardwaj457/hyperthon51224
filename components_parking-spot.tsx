import { ParkingSpot } from '../types/parking';
import { getSpotColor, getSpotIcon } from '../utils/parkingUtils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ParkingSpotProps {
  spot: ParkingSpot;
  onReserve: (spotId: number) => void;
  onCancel: (spotId: number) => void;
}

export function ParkingSpot({ spot, onReserve, onCancel }: ParkingSpotProps) {
  const spotColor = getSpotColor(spot.status);
  const spotIcon = getSpotIcon(spot.status);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className={`w-24 h-24 ${spotColor} rounded-lg flex flex-col items-center justify-center text-white font-bold relative transition-all duration-300 ease-in-out transform hover:scale-105`}>
            <span className="text-2xl mb-2">{spotIcon}</span>
            <span>{spot.id}</span>
            {spot.status === 'available' && (
              <button
                onClick={() => onReserve(spot.id)}
                className="absolute bottom-1 right-1 bg-blue-500 text-white text-xs p-1 rounded hover:bg-blue-600 transition-colors duration-300"
              >
                Reserve
              </button>
            )}
            {spot.status === 'reserved' && (
              <button
                onClick={() => onCancel(spot.id)}
                className="absolute bottom-1 right-1 bg-red-500 text-white text-xs p-1 rounded hover:bg-red-600 transition-colors duration-300"
              >
                Cancel
              </button>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          {spot.status === 'reserved' ? `Reserved by: ${spot.reservedBy}` : 
           spot.status === 'occupied' ? 'Occupied' : 'Available'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

