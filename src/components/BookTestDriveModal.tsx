import React, { useState } from 'react';
import { Vehicle, TestDriveRequest } from '../types';
import { X, CheckCircle2, Calendar, Clock, MapPin, User, ShieldCheck } from 'lucide-react';

interface BookTestDriveModalProps {
  vehicles: Vehicle[];
  initialVehicleId?: string;
  onClose: () => void;
  onConfirmBooking: (booking: TestDriveRequest) => void;
}

export const BookTestDriveModal: React.FC<BookTestDriveModalProps> = ({
  vehicles,
  initialVehicleId,
  onClose,
  onConfirmBooking,
}) => {
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(
    initialVehicleId || vehicles[0].id
  );
  const [deliveryType, setDeliveryType] = useState<'Showroom VIP Suite' | 'White-Glove Home Delivery'>('White-Glove Home Delivery');
  const [fullName, setFullName] = useState<string>('Lord Sterling');
  const [email, setEmail] = useState<string>('sterling@prestige.com');
  const [phone, setPhone] = useState<string>('+1 (415) 880-9912');
  const [date, setDate] = useState<string>('Thursday, Nov 14');
  const [timeSlot, setTimeSlot] = useState<string>('2:00 PM - 3:30 PM');
  const [address, setAddress] = useState<string>('450 Belvedere Ave, Belvedere Tiburon, CA');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) return;

    const newBooking: TestDriveRequest = {
      id: `td-${Date.now()}`,
      vehicleId: selectedVehicle.id,
      vehicleTitle: `${selectedVehicle.year} ${selectedVehicle.make} ${selectedVehicle.model}`,
      fullName,
      email,
      phone,
      date,
      timeSlot,
      deliveryType,
      address: deliveryType === 'White-Glove Home Delivery' ? address : undefined,
      status: 'Confirmed'
    };

    setIsSuccess(true);
    setTimeout(() => {
      onConfirmBooking(newBooking);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#13161c] border border-white/15 rounded-sm max-w-xl w-full text-white shadow-2xl my-6 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#181c24]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E5B869]" />
            <h3 className="text-base font-bold uppercase tracking-wider text-white">
              Schedule VIP Test Drive
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 text-lg font-bold"
          >
            ✕
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-[#E5B869]/20 text-[#E5B869] border border-[#E5B869]/40 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold uppercase tracking-tight text-white">
              VIP Drive Dispatched
            </h4>
            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              Your test drive for the <strong>{selectedVehicle.make} {selectedVehicle.model}</strong> is confirmed for {date} at {timeSlot}. An Elite Motors concierge specialist will arrive with the vehicle.
            </p>
            <div className="text-[11px] text-slate-500 font-mono">
              Confirmation Code: ELITE-DRV-{Math.floor(1000 + Math.random() * 9000)}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 text-xs">
            
            {/* Vehicle Selection with Preview Banner */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Target Allocation
              </label>
              <select
                value={selectedVehicleId}
                onChange={(e) => setSelectedVehicleId(e.target.value)}
                className="w-full bg-[#1b1f28] border border-white/15 text-white px-3 py-2.5 rounded-sm focus:outline-none focus:border-[#E5B869]"
              >
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.year} {v.make} {v.model} ({v.specs.horsepower} HP) — ${v.price.toLocaleString()}
                  </option>
                ))}
              </select>

              {/* Visual mini card */}
              <div className="mt-2 relative h-28 rounded-sm overflow-hidden border border-white/10 bg-black/60">
                <img
                  src={selectedVehicle.image}
                  alt={selectedVehicle.model}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-3 right-3 flex justify-between items-baseline text-white">
                  <span className="font-bold text-sm">{selectedVehicle.model}</span>
                  <span className="text-[11px] text-[#E5B869] font-mono-tabular font-bold">{selectedVehicle.specs.zeroToSixty} to 60 mph</span>
                </div>
              </div>
            </div>

            {/* Delivery Type */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Experience Format
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryType('White-Glove Home Delivery')}
                  className={`p-3 text-left border rounded-sm transition-all ${
                    deliveryType === 'White-Glove Home Delivery'
                      ? 'bg-[#E5B869]/15 border-[#E5B869] text-white'
                      : 'bg-[#1b1f28] border-white/10 text-slate-300 hover:border-white/20'
                  }`}
                >
                  <span className="font-bold block text-xs text-[#E5B869]">White-Glove Delivery</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Concierge brings vehicle to your estate</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryType('Showroom VIP Suite')}
                  className={`p-3 text-left border rounded-sm transition-all ${
                    deliveryType === 'Showroom VIP Suite'
                      ? 'bg-[#E5B869]/15 border-[#E5B869] text-white'
                      : 'bg-[#1b1f28] border-white/10 text-slate-300 hover:border-white/20'
                  }`}
                >
                  <span className="font-bold block text-xs text-[#E5B869]">Showroom VIP Suite</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Private hospitality salon & closed track</span>
                </button>
              </div>
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Preferred Date
                </label>
                <select
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#1b1f28] border border-white/15 px-3 py-2 rounded-sm text-white focus:outline-none focus:border-[#E5B869]"
                >
                  <option value="Today (Express Concierge)">Today (Express Concierge)</option>
                  <option value="Tomorrow, 10:00 AM">Tomorrow</option>
                  <option value="Thursday, Nov 14">Thursday, Nov 14</option>
                  <option value="Friday, Nov 15">Friday, Nov 15</option>
                  <option value="Saturday, Nov 16">Saturday, Nov 16</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Time Window
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-[#1b1f28] border border-white/15 px-3 py-2 rounded-sm text-white focus:outline-none focus:border-[#E5B869]"
                >
                  <option value="10:00 AM - 11:30 AM">10:00 AM - 11:30 AM</option>
                  <option value="2:00 PM - 3:30 PM">2:00 PM - 3:30 PM</option>
                  <option value="4:00 PM - 5:30 PM">4:00 PM - 5:30 PM</option>
                  <option value="6:30 PM - 8:00 PM (Twilight)">6:30 PM - 8:00 PM (Twilight)</option>
                </select>
              </div>
            </div>

            {/* Address if home delivery */}
            {deliveryType === 'White-Glove Home Delivery' && (
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Estate or Corporate Delivery Address
                </label>
                <input
                  type="text"
                  required
                  placeholder="Street Address, City, State, ZIP"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[#1b1f28] border border-white/15 px-3 py-2 rounded-sm text-white focus:outline-none focus:border-[#E5B869]"
                />
              </div>
            )}

            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#1b1f28] border border-white/15 px-3 py-2 rounded-sm text-white focus:outline-none focus:border-[#E5B869]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1b1f28] border border-white/15 px-3 py-2 rounded-sm text-white focus:outline-none focus:border-[#E5B869]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#1b1f28] border border-white/15 px-3 py-2 rounded-sm text-white focus:outline-none focus:border-[#E5B869]"
                />
              </div>
            </div>

            <div className="p-3 bg-[#181c24] border border-white/10 rounded-sm flex items-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-[#E5B869] shrink-0" />
              <span>Valid driver's license required at handover. Zero obligation, fully insured by Elite Motors.</span>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#E5B869] hover:bg-[#d6a555] active:scale-98 text-black text-xs font-bold tracking-wider uppercase rounded-sm transition-all"
              >
                CONFIRM RESERVATION
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
