'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { findFamousDishesByLocation, type FamousDishesOutput } from '@/ai/flows/famous-dishes-by-location';
import { Button } from '../ui/button';
import { Loader, MapPin, UtensilsCrossed, Frown } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from '../ui/badge';

interface NearbyDishesProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type GeolocationState = 'idle' | 'prompting' | 'loading' | 'success' | 'error';
type GeolocationError = { code: number; message: string; } | null;

export function NearbyDishes({ open, onOpenChange }: NearbyDishesProps) {
  const [state, setState] = useState<GeolocationState>('idle');
  const [results, setResults] = useState<FamousDishesOutput | null>(null);
  const [error, setError] = useState<GeolocationError | string | null>(null);

  useEffect(() => {
    if (open && state === 'idle') {
      handleFindDishes();
    } else if (!open) {
      // Reset state when dialog is closed
      setState('idle');
      setResults(null);
      setError(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, state]);

  const handleFindDishes = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setState('error');
      return;
    }
    
    setState('prompting');
    setError(null);
    setResults(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState('loading');
        const { latitude, longitude } = position.coords;
        findFamousDishesByLocation({ latitude, longitude })
          .then((response) => {
            setResults(response);
            setState('success');
          })
          .catch((err) => {
            console.error('Error fetching famous dishes:', err);
            setError('Could not fetch recommendations at this time.');
            setState('error');
          });
      },
      (err) => {
        setError(err);
        setState('error');
      }
    );
  };
  
  const renderContent = () => {
    switch(state) {
      case 'prompting':
        return (
          <div className="text-center py-10">
            <MapPin className="mx-auto h-16 w-16 text-primary animate-bounce" />
            <h3 className="mt-4 text-lg font-medium">Waiting for Location</h3>
            <p className="mt-1 text-sm text-muted-foreground">Please allow location access to find dishes near you.</p>
          </div>
        );
      case 'loading':
        return (
          <div className="text-center py-10">
            <Loader className="mx-auto h-16 w-16 text-primary animate-spin" />
            <h3 className="mt-4 text-lg font-medium">Finding Famous Dishes...</h3>
            <p className="mt-1 text-sm text-muted-foreground">Our AI is searching for the best food in your area.</p>
          </div>
        );
      case 'error':
        let errorTitle = 'An Error Occurred';
        let errorMessage = 'Something went wrong. Please try again later.';
        if (typeof error === 'string') {
          errorMessage = error;
        } else if (error) {
           switch (error.code) {
             case error.PERMISSION_DENIED:
               errorTitle = 'Location Access Denied';
               errorMessage = 'To find dishes near you, please enable location permissions for this site in your browser settings.';
               break;
             case error.POSITION_UNAVAILABLE:
                errorTitle = 'Location Unavailable';
                errorMessage = 'We couldn\'t determine your location. Please check your device settings.';
                break;
            case error.TIMEOUT:
                errorTitle = 'Location Request Timed Out';
                errorMessage = 'We couldn\'t get your location in time. Please try again.';
                break;
           }
        }
        return (
          <div className="text-center py-10">
             <Frown className="mx-auto h-16 w-16 text-destructive" />
             <h3 className="mt-4 text-lg font-medium">{errorTitle}</h3>
             <p className="mt-1 text-sm text-muted-foreground">{errorMessage}</p>
             <Button onClick={handleFindDishes} className="mt-6">Try Again</Button>
          </div>
        );
      case 'success':
        if (!results || results.dishes.length === 0) {
          return (
            <div className="text-center py-10">
              <Frown className="mx-auto h-16 w-16 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No Famous Dishes Found</h3>
              <p className="mt-1 text-sm text-muted-foreground">Our AI couldn't find specific recommendations for your area right now.</p>
            </div>
          );
        }
        return (
            <div className="space-y-4">
              {results.areaName && (
                <div className="text-center">
                  <Badge variant="secondary" className="text-base">
                    <MapPin className="h-4 w-4 mr-2"/>
                    {results.areaName}
                  </Badge>
                </div>
              )}
              {results.dishes.map((dish, index) => (
                  <Alert key={index}>
                      <UtensilsCrossed className="h-4 w-4" />
                      <AlertTitle className='font-bold'>{dish.dishName} <span className='font-normal text-muted-foreground'>from {dish.restaurantName}</span></AlertTitle>
                      <AlertDescription>
                          {dish.description}
                      </AlertDescription>
                  </Alert>
              ))}
            </div>
        );

      default:
        return null;
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Famous Dishes Near You</DialogTitle>
          <DialogDescription>
            Discover must-try dishes in your area, recommended by our AI.
          </DialogDescription>
        </DialogHeader>
        <div className="min-h-[200px] flex items-center justify-center">
            {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
