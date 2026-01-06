import { OrderTracker } from '@/components/orders/OrderTracker';

interface OrderPageProps {
  params: { orderId: string };
}

export default function OrderPage({ params }: OrderPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-center text-4xl font-headline font-bold mb-2">Thank you for your order!</h1>
        <p className="text-center text-lg text-muted-foreground mb-8">
          Order ID: <span className="font-mono text-foreground font-semibold">{params.orderId}</span>
        </p>
        <OrderTracker />
      </div>
    </div>
  );
}
