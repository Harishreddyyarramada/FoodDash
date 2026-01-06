
'use client';

import { useCart } from '@/components/cart/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, Landmark, Wallet, PartyPopper, Bike, Loader, UserCheck, UserX } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { restaurants } from '@/lib/data';

// Mock data for delivery partners
const allDeliveryPartners = [
  { id: 'dp1', name: 'Ramesh', online: true, location: { lat: 12.9716, lon: 77.5946 }, capacity: 2, currentOrders: 1 },
  { id: 'dp2', name: 'Suresh', online: true, location: { lat: 12.9720, lon: 77.5950 }, capacity: 2, currentOrders: 0 },
  { id: 'dp3', name: 'Vijay', online: false, location: { lat: 12.9730, lon: 77.5960 }, capacity: 2, currentOrders: 0 },
  { id: 'dp4', name: 'Deepa', online: true, location: { lat: 12.9740, lon: 77.5970 }, capacity: 2, currentOrders: 2 }, // At capacity
  { id: 'dp5', name: 'Kiran', online: true, location: { lat: 12.9750, lon: 77.5980 }, capacity: 3, currentOrders: 1 },
  { id: 'dp6', name: 'Priya', online: true, location: { lat: 13.0000, lon: 77.6000 }, capacity: 2, currentOrders: 0 }, // Further away
];

// Haversine distance calculation
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Custom hook to simulate fetching delivery partner availability
function useDeliveryPartners(restaurantLocation: { lat: number; lon: number } | undefined) {
  const [loading, setLoading] = useState(true);
  const [availablePartners, setAvailablePartners] = useState(0);
  const [estimatedPickupTime, setEstimatedPickupTime] = useState<string | null>(null);
  const [assignedPartner, setAssignedPartner] = useState<{name: string, eta: number} | null>(null);

  useEffect(() => {
    if (!restaurantLocation) return;
    
    // Simulate API call
    const timer = setTimeout(() => {
      const partnersNearby = allDeliveryPartners.filter(p => {
        const distance = getDistance(restaurantLocation.lat, restaurantLocation.lon, p.location.lat, p.location.lon);
        return p.online && distance < 5 && p.currentOrders < p.capacity;
      });

      setAvailablePartners(partnersNearby.length);

      if (partnersNearby.length > 0) {
        setEstimatedPickupTime('5-7 mins');
        const randomPartner = partnersNearby[Math.floor(Math.random() * partnersNearby.length)];
        setAssignedPartner({name: randomPartner.name, eta: 20 + Math.floor(Math.random() * 15)});
      } else {
        setEstimatedPickupTime('15-20 mins');
        setAssignedPartner({name: "Special Assign", eta: 35 + Math.floor(Math.random() * 10)})
      }
      
      setLoading(false);
    }, 2000); // Simulate network delay

    return () => clearTimeout(timer);
  }, [restaurantLocation]);

  return { loading, availablePartners, estimatedPickupTime, assignedPartner };
}


export default function CheckoutPage() {
  const { cartItems, cartRestaurantId, cartTotal, itemCount, clearCart } = useCart();
  const router = useRouter();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderInfo, setOrderInfo] = useState({ orderId: '', partnerName: '', eta: 0 });

  const restaurant = restaurants.find(r => r.id === cartRestaurantId);
  const restaurantLocation = restaurant ? { lat: 12.9716, lon: 77.5946 } : undefined; // Mock location for the restaurant

  const { loading: loadingPartners, availablePartners, estimatedPickupTime, assignedPartner } = useDeliveryPartners(restaurantLocation);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !address || itemCount === 0 || !assignedPartner) {
      alert('Please fill in all fields and make sure your cart is not empty.');
      return;
    }
    const orderId = Math.random().toString(36).substr(2, 9);
    
    setOrderInfo({
        orderId,
        partnerName: assignedPartner.name,
        eta: assignedPartner.eta,
    });

    setShowConfirmation(true);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    clearCart();
    router.push(`/orders/${orderInfo.orderId}`);
  };


  if (itemCount === 0 && typeof window !== 'undefined' && !showConfirmation) {
    if (router) router.push('/cart');
    return null;
  }

  const DeliveryPartnerStatus = () => {
    if (loadingPartners) {
      return (
        <Card className='bg-muted/50'>
          <CardContent className="p-4 flex items-center gap-4 text-muted-foreground">
            <Loader className="h-10 w-10 animate-spin" />
            <div>
              <p className="font-semibold">Assigning a delivery partner...</p>
              <p className="text-sm">Finding available partners near the restaurant.</p>
            </div>
          </CardContent>
        </Card>
      );
    }

    if (availablePartners > 0) {
      return (
         <Card className='bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'>
          <CardContent className="p-4 flex items-center gap-4 text-green-800 dark:text-green-200">
            <UserCheck className="h-10 w-10" />
            <div>
              <p className="font-semibold">{availablePartners} delivery partner{availablePartners > 1 ? 's' : ''} available nearby</p>
              <p className="text-sm">Estimated pickup in {estimatedPickupTime}.</p>
            </div>
          </CardContent>
        </Card>
      )
    }

    return (
      <Card className='bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800'>
        <CardContent className="p-4 flex items-center gap-4 text-yellow-800 dark:text-yellow-200">
          <UserX className="h-10 w-10" />
          <div>
            <p className="font-semibold">No delivery partners available</p>
            <p className="text-sm">Delivery may be delayed. Estimated pickup in {estimatedPickupTime}.</p>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-headline font-bold mb-8">Checkout</h1>
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main St, Anytown" value={address} onChange={e => setAddress(e.target.value)} required />
                </div>
              </CardContent>
            </Card>

            <DeliveryPartnerStatus />
            
             <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  
                  {/* Credit/Debit Card */}
                  <Label htmlFor="card" className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                    <RadioGroupItem value="card" id="card" />
                    <CreditCard className="h-6 w-6" />
                    <span className="font-semibold">Credit/Debit Card</span>
                  </Label>
                  {paymentMethod === 'card' && (
                      <div className="p-4 space-y-4 border-t">
                          <div className="space-y-2">
                              <Label htmlFor="card-number">Card Number</Label>
                              <Input id="card-number" placeholder="**** **** **** 1234" required={paymentMethod === 'card'} />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                  <Label htmlFor="expiry">Expiry Date</Label>
                                  <Input id="expiry" placeholder="MM/YY" required={paymentMethod === 'card'} />
                              </div>
                              <div className="space-y-2">
                                  <Label htmlFor="cvc">CVC</Label>
                                  <Input id="cvc" placeholder="123" required={paymentMethod === 'card'} />
                              </div>
                          </div>
                      </div>
                  )}
                  
                  {/* Net Banking */}
                  <Label htmlFor="netbanking" className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                    <RadioGroupItem value="netbanking" id="netbanking" />
                    <Landmark className="h-6 w-6" />
                    <span className="font-semibold">Net Banking</span>
                  </Label>
                   {paymentMethod === 'netbanking' && (
                      <div className="p-4 space-y-4 border-t">
                          <Select required={paymentMethod === 'netbanking'}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a bank" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="bank1">Bank of Example</SelectItem>
                              <SelectItem value="bank2">Federal Bank of Studio</SelectItem>
                              <SelectItem value="bank3">National Bank of Code</SelectItem>
                              <SelectItem value="bank4">Digital Credit Union</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button className='w-full' variant={'outline'}>Pay Now</Button>
                      </div>
                  )}

                  {/* Cash on Delivery */}
                  <Label htmlFor="cod" className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                    <RadioGroupItem value="cod" id="cod" />
                    <Wallet className="h-6 w-6" />
                    <span className="font-semibold">Cash on Delivery</span>
                  </Label>
                   {paymentMethod === 'cod' && (
                      <div className="p-4 text-sm text-muted-foreground border-t">
                          You can pay in cash to the delivery agent upon receiving your order.
                      </div>
                   )}

                </RadioGroup>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>₹50.00</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{(cartTotal + 50.00).toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
            <Button type="submit" className="w-full mt-6" size="lg" disabled={loadingPartners || !assignedPartner}>
              {loadingPartners ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : null}
              {loadingPartners ? "Finding Partner..." : "Place Order"}
            </Button>
          </div>
        </form>
      </div>

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader className="items-center">
            <div className="relative">
              <PartyPopper className="h-20 w-20 text-primary animate-in zoom-in-50" />
            </div>
            <AlertDialogTitle className="text-2xl font-bold font-headline mt-4">
              Congratulations!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-base">
              Your order has been placed successfully.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="my-6">
            <Card className="bg-muted/50">
              <CardContent className="p-4 flex items-center gap-4">
                <Bike className="h-10 w-10 text-primary" />
                <div>
                  <p className="font-semibold">{orderInfo.partnerName} is on the way!</p>
                  <p className="text-sm text-muted-foreground">
                    Estimated arrival in {orderInfo.eta} minutes.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleConfirmationClose} className="w-full">
              Track Your Order
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
