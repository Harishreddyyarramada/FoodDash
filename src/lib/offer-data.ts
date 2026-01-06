
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => {
  const image = PlaceHolderImages.find(img => img.id === id);
  return image ? { url: image.imageUrl, hint: image.imageHint } : { url: 'https://placehold.co/600x400', hint: 'placeholder' };
};

export const offersData = {
  festivalBanners: [
    {
      id: 'banner-diwali',
      title: 'Diwali Feastival',
      description: 'Celebrate the festival of lights with dazzling discounts on your favorite foods.',
      imageUrl: getImage('offer-banner-diwali').url,
      imageHint: getImage('offer-banner-diwali').hint,
      gradientFrom: 'rgba(255, 153, 51, 0.8)',
      gradientTo: 'rgba(255, 94, 5, 0.2)',
    }
  ],
  couponCarousel: [
    {
        title: "FLAT ₹125 OFF",
        code: "TREAT125"
    },
    {
        title: "UPTO 50% OFF",
        code: "BIGBITE"
    },
    {
        title: "FREE DELIVERY",
        code: "FREEDEL"
    },
    {
        title: "20% OFF PARTIES",
        code: "PARTYTIME"
    },
    {
        title: "GET EXTRA ₹50",
        code: "EXTRA50"
    }
  ],
  bankOffers: [
      {
          bankName: "HDFC Bank",
          bankLogoUrl: getImage('bank-logo-hdfc').url,
          title: "Get 20% OFF up to ₹100 on HDFC Bank Credit Cards",
          code: "HDFC20"
      },
      {
          bankName: "ICICI Bank",
          bankLogoUrl: getImage('bank-logo-icici').url,
          title: "Flat ₹150 OFF on ICICI Bank Debit Cards",
          code: "ICICI150"
      },
      {
          bankName: "PayTM",
          bankLogoUrl: getImage('bank-logo-paytm').url,
          title: "Upto ₹200 cashback via Paytm Wallet",
          code: "PAYTMCB"
      },
  ],
  restaurantOffers: [
    {
      title: 'The Pizza Palace',
      description: 'BOGO on all medium pizzas. Celebrate with a slice!',
      discount: '50% OFF',
      imageUrl: getImage('offer-pizza').url,
      imageHint: getImage('offer-pizza').hint,
      cuisine: 'Italian',
      location: 'Anytown'
    },
    {
      title: 'Green Goodness',
      description: 'Get a free smoothie with every salad bowl purchase.',
      discount: 'FREE SMOOTHIE',
      imageUrl: getImage('offer-salad').url,
      imageHint: getImage('offer-salad').hint,
      cuisine: 'Healthy',
      location: 'Anytown'
    },
    {
      title: 'Biryani House',
      description: 'Family pack biryani at a special festive price of ₹599.',
      discount: 'SPECIAL PRICE',
      imageUrl: getImage('offer-biryani').url,
      imageHint: getImage('offer-biryani').hint,
      cuisine: 'Indian',
      location: 'Anytown'
    },
  ]
};
