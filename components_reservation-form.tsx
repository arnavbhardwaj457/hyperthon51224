import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ReservationFormProps {
  onReserve: (email: string) => void;
  onCancel: () => void;
}

export function ReservationForm({ onReserve, onCancel }: ReservationFormProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onReserve(email);
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-grow"
      />
      <Button type="submit" className="bg-blue-500 hover:bg-blue-600">Reserve</Button>
      <Button type="button" onClick={onCancel} variant="outline">Cancel</Button>
    </form>
  );
}

