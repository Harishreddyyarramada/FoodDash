
import { cn } from '@/lib/utils';

export function VegNonVegIndicator({ isVegetarian }: { isVegetarian: boolean }) {
    const color = isVegetarian ? 'border-green-600' : 'border-red-600';
    const bgColor = isVegetarian ? 'bg-green-600' : 'bg-red-600';
    return (
        <div className={cn("h-5 w-5 p-0.5 border-2 rounded-sm flex items-center justify-center", color)}>
            <div className={cn("h-2.5 w-2.5 rounded-full", bgColor)}></div>
        </div>
    )
}
