'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import Link from "next/link";

export function WelcomeBanner() {
  return (
    <Card className="relative overflow-hidden bg-gradient-to-r from-primary/80 to-primary shadow-lg border-none my-8">
      <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between text-white">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <Rocket className="h-12 w-12 hidden md:block" />
          <div>
            <h2 className="font-headline font-bold text-2xl">Your first treat is on us!</h2>
            <p className="font-body">Get FREE delivery + ₹50 OFF on your first order.</p>
          </div>
        </div>
        <Button asChild variant="outline" className="text-primary font-bold bg-white/90 hover:bg-white">
          <Link href="/offers">Order Now</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
