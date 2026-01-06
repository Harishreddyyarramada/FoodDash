'use client';

import { useCart } from '@/components/cart/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, Landmark, Wallet, PartyPopper, Bike } from 'lucide-react';
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

const deliveryPartners = [
  { name: 'Ramesh', eta: 25 },
  { name: 'Suresh', eta: 30 },
  { name: 'Vijay', eta: 22 },
  { name: 'Deepa', eta: 28 },
];

export default function CheckoutPage() {
  const { cartTotal, itemCount, clearCart } = useCart();
  const router = useRouter();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderInfo, setOrderInfo] = useState({ orderId: '', partnerName: '', eta: 0 });

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !address || itemCount === 0) {
      alert('Please fill in all fields and make sure your cart is not empty.');
      return;
    }
    const orderId = Math.random().toString(36).substr(2, 9);
    const partner = deliveryPartners[Math.floor(Math.random() * deliveryPartners.length)];
    
    setOrderInfo({
        orderId,
        partnerName: partner.name,
        eta: partner.eta,
    });

    setShowConfirmation(true);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    clearCart();
    router.push(`/orders/${orderInfo.orderId}`);
  };


  if (itemCount === 0 && typeof window !== 'undefined') {
    router.push('/cart');
    return null;
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-headline font-bold mb-8">Checkout</h1>
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
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
            
             <Card className="mt-8">
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
                      <div className="p-4 space-y-4">
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
                      <div className="p-4 space-y-4">
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
                      <div className="p-4 text-sm text-muted-foreground">
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
            <Button type="submit" className="w-full mt-6" size="lg">
              Place Order
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
