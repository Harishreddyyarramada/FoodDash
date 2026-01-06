
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { BookUser } from "lucide-react";

export default function HelpPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <BookUser className="h-10 w-10 text-primary" />
                    <div>
                        <h1 className="text-4xl font-headline font-bold">Help Center</h1>
                        <p className="text-muted-foreground">Find answers to your questions.</p>
                    </div>
                </div>

                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-lg font-semibold">How do I track my order?</AccordionTrigger>
                        <AccordionContent className="prose prose-lg max-w-none">
                            <p>Once your order is placed, you can track its live status by navigating to the "My Orders" section from your user profile menu. You will see the order progress in real-time from "Placed" all the way to "Delivered".</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="text-lg font-semibold">What payment methods do you accept?</AccordionTrigger>
                        <AccordionContent className="prose prose-lg max-w-none">
                            <p>We accept a wide range of payment options for your convenience, including Credit/Debit Cards, Net Banking, and Cash on Delivery (COD). You can select your preferred payment method during the checkout process.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="text-lg font-semibold">Can I cancel my order?</AccordionTrigger>
                        <AccordionContent className="prose prose-lg max-w-none">
                            <p>Orders can typically be canceled for a short period before the restaurant accepts them. If the option is available, you will see a "Cancel Order" button on the order tracking page. Once the restaurant starts preparing your food, cancellation is no longer possible.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger className="text-lg font-semibold">What should I do if my order is late?</AccordionTrigger>
                        <AccordionContent className="prose prose-lg max-w-none">
                            <p>You can see the real-time location of your delivery partner on the order tracking page. While we and our restaurant partners strive to deliver on time, unforeseen circumstances like traffic or weather can cause delays. If your order is significantly late, please contact our customer support.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                        <AccordionTrigger className="text-lg font-semibold">How do I apply a coupon or offer?</AccordionTrigger>
                        <AccordionContent className="prose prose-lg max-w-none">
                            <p>You can find available coupons and offers on our "Offers" page. Simply copy the code and apply it in the "Apply Coupon" section during checkout. The discount will be reflected in your order summary before you place the order.</p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-6">
                        <AccordionTrigger className="text-lg font-semibold">How is the delivery fee calculated?</AccordionTrigger>
                        <AccordionContent className="prose prose-lg max-w-none">
                            <p>A standard delivery fee is applied to each order. This fee helps us pay our delivery partners fairly and operate our service. From time to time, we may offer free delivery promotions, which you can find on the "Offers" page.</p>
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-7">
                        <AccordionTrigger className="text-lg font-semibold">What if I have an issue with my food order?</AccordionTrigger>
                        <AccordionContent className="prose prose-lg max-w-none">
                            <p>If you receive an incorrect item, have a quality concern, or find something missing from your order, please contact our customer support through the "Help" section on the order page within a few hours of delivery. We will do our best to resolve the issue with the restaurant.</p>
                        </AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="item-8">
                        <AccordionTrigger className="text-lg font-semibold">How can I see restaurants near me?</AccordionTrigger>
                        <AccordionContent className="prose prose-lg max-w-none">
                            <p>Click the "Near Me" button in the header. If you grant location access, our AI will find famous local dishes and restaurants in your immediate vicinity, helping you discover the best food your area has to offer.</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}
