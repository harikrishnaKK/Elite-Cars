export type Brand = 'AUDI' | 'BMW' | 'VOLVO';

export type NavTab = 'showroom' | 'audi' | 'bmw' | 'volvo' | 'financing' | 'concierge' | 'portal';

export interface Vehicle {
  id: string;
  make: Brand;
  model: string;
  year: number;
  trim: string;
  badge?: string;
  tagline: string;
  price: number;
  leaseMonthly: number;
  image: string;
  category: 'SUV' | 'Gran Coupe / Sedan' | 'Avant / Wagon' | 'Electric Grand Tourer';
  isElectric?: boolean;
  specs: {
    horsepower: number;
    torque: string;
    zeroToSixty: string;
    topSpeed: string;
    engine: string;
    transmission: string;
    drivetrain: string;
    efficiency: string;
    exteriorColor: string;
    interiorColor: string;
    vin: string;
    mileage: string;
  };
  features: string[];
  status: 'In Stock' | 'Exclusive Allocation' | 'Arriving Soon';
}

export interface TestDriveRequest {
  id: string;
  vehicleId: string;
  vehicleTitle: string;
  fullName: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  deliveryType: 'Showroom VIP Suite' | 'White-Glove Home Delivery';
  address?: string;
  notes?: string;
  status: 'Confirmed' | 'Pending Concierge Dispatch';
}

export interface FinanceOption {
  type: 'lease' | 'finance';
  monthlyPayment: number;
  downPayment: number;
  termMonths: number;
  aprOrFactor: number;
  totalCost: number;
}
