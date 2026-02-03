import kids from '../asserts/kids.webp';
import watchesSunglassesJewellery from '../asserts/watches-sunglasses-jewellery.webp';
import toolsDiyOutdoor from '../asserts/tools-diy-outdoor.webp';
import motors from '../asserts/motors.webp';
import laundryCleaning from '../asserts/laundry-cleaning.webp';
import kitchenDining from '../asserts/kitchen-dining.webp';
import homeAppliances from '../asserts/home-appliances.webp';
import homeAndLifestyle from '../asserts/home-and-lifestyle.webp';
import sportsOutdoors from '../asserts/sports-outdoors.webp';
import tvAudioVideoGamingWearables from '../asserts/tv-audio-video-gaming-wearables.webp';
import stationeryCraft from '../asserts/stationery-craft.webp';
import furnitureDecor from '../asserts/furniture-decor.webp';
import fashion from '../asserts/fashion.webp';
import healthBeauty from '../asserts/health-beauty.webp';
import computersLaptops from '../asserts/computers-laptops.webp';
import cameras from '../asserts/cameras.webp';
import beddingBath from '../asserts/bedding-bath.webp';
import toysGames from '../asserts/toys-games.webp';
import bagsAndTravel from '../asserts/bags-and-travel.webp';
import mobilesTablets from '../asserts/mobiles-tablets.webp';

const categori = [
  {
    name: "Mobiles & Tablets",
    pic: mobilesTablets,
    subcategories: [
      { name: "Mobile" },
      { name: "Like New Phones" },
      { name: "Tablets" },
      { name: "Gadgets" },
      { name: "Feature Phones" },
      {
        name: "Mobile Accessories",
        subSubcategories: [
          { name: "Wall Chargers" }, { name: "Wireless Chargers" }, { name: "Selfie Sticks" },
          { name: "Phone Camera Flash Lights" }, { name: "Docks & Stands" }, { name: "Car Chargers" },
          { name: "Fashion Mobile Accessories" }, { name: "Cables & Converters" }, { name: "Car Mounts" },
          { name: "Phone Cases" }, { name: "Screen Protectors" }, { name: "Prepaid Cards" },
          { name: "Phone Batteries" }, { name: "Power Bank" }, { name: "App-Enabled Gadgets" },
          { name: "Parts & Tools" }, { name: "Camera & Storage" }, { name: "Mobile Broadcast" },
          { name: "Cables" }, { name: "Car Accessories" }, { name: "Cases and Covers" },
          { name: "Memory Cards" }, { name: "Screen Guards" }, { name: "Replacement Parts" },
          { name: "Phone Charms" }, { name: "SIM Adaptors" }, { name: "SIM Cutters" },
          { name: "Stylus Pens" }, { name: "Headphones and Headsets" }, { name: "Speakers" },
          { name: "Wearables & Accessories" }
        ]
      }
    ]
  },
  {
    name: "Bags and Travel",
    pic: bagsAndTravel,
    subcategories: [
      {
        name: "Mens Bags",
        subSubcategories: [
          { name: "Backpacks" }, { name: "Wallets & Accessories" }, { name: "Messenger Bags" },
          { name: "Business Bags" }, { name: "Crossbody Bags" }, { name: "Tote Bags" }
        ]
      }
    ]
  },
  {
    name: "Toys & Games",
    pic: toysGames,
    subcategories: [{ name: "Stuffed Toys" }]
  },
  { name: "Bedding & Bath", pic: beddingBath },
  { name: "Cameras", pic: cameras },
  {
    name: "Computers & Laptops",
    pic: computersLaptops,
    subcategories: [
      { name: "Monitors" }, { name: "Like New Laptops" }
    ]
  },
  {
    name: "Health & Beauty",
    pic: healthBeauty,
    subcategories: [
      {
        name: "Skin Care",
        subSubcategories: [
          { name: "Face Mask & Packs" }, { name: "Face Scrubs & Exfoliators" }, { name: "Facial Cleansers" },
          { name: "Gifts & Value Sets" }, { name: "Scar Cream" }, { name: "Sunscreen and Aftersun" },
          { name: "Toner & Mists" }, { name: "Serum & Essence" }, { name: "Lip Balm and Treatment" },
          { name: "Dermacare" }, { name: "Moisturizers and Cream" }, { name: "Eye Care" }
        ]
      },
      {
        name: "Gift Sets",
        subSubcategories: [
          { name: "Makeup Kits Sets & Palettes" }, { name: "Hampers" }, { name: "Bath & Body Sets" },
          { name: "Facial Sets" }, { name: "Fragrances" }
        ]
      },
      {
        name: "Hair Care",
        subSubcategories: [
          { name: "Shampoo" }, { name: "Hair Coloring" }, { name: "Hair Styling" },
          { name: "Hair Treatments" }, { name: "Oil & Serums" }, { name: "Gifts & Value Sets" },
          { name: "Conditioner" }, { name: "Hair Care Accessories" }
        ]
      },
      {
        name: "Medicines",
        subSubcategories: [
          { name: "Prescription Medicines" }, { name: "Over the Counter Medicines" }
        ]
      }
    ]
  },
  {
    name: "Fashion",
    pic: fashion,
    subcategories: [
      {
        name: "Women",
        subSubcategories: [
          { name: "Fashion Masks" }, { name: "Clothing" }, { name: "Shoes" },
          { name: "Bags" }, { name: "Accessories" }, { name: "Muslim Wear" },
          { name: "Lingerie, Sleep & Lounge" }
        ]
      },
      {
        name: "New Born Unisex (0-6 months)",
        subSubcategories: [
          { name: "Bodysuits & One-Pieces" }, { name: "Accessories" },
          { name: "Sets & Packs" }, { name: "Bottoms" }, { name: "Sweaters & Fleece" }
        ]
      },
      {
        name: "Girls",
        subSubcategories: [
          { name: "Shoes" }, { name: "Accessories" }, { name: "Clothing" }
        ]
      }
    ]
  },
  {
    name: "Furniture & Decor",
    pic: furnitureDecor,
    subcategories: [
      {
        name: "Storage and Organisation",
        subSubcategories: [
          { name: "Storage Bins & Baskets" }, { name: "Shoe Organisers" }, { name: "Space Savers" },
          { name: "Wardrobe Organisers" }, { name: "Medicine & First Aid Storage" },
          { name: "Bike & Sports Racks" }, { name: "Deck Boxes & Balcony Storage" }
        ]
      }
    ]
  },
  {
    name: "Stationery & Craft",
    pic: stationeryCraft,
    subcategories: [{ name: "Religious Items" }]
  },
  { name: "Kids", pic: kids },
  { name: "Watches, Sunglasses & Jewellery", pic: watchesSunglassesJewellery },
  { name: "Tools, DIY & Outdoor", pic: toolsDiyOutdoor },
  { name: "Motors", pic: motors },
  { name: "Laundry & Cleaning", pic: laundryCleaning },
  { name: "Kitchen & Dining", pic: kitchenDining },
  { name: "Home Appliances", pic: homeAppliances },
  { name: "Home & Lifestyle", pic: homeAndLifestyle },
  { name: "Sports & Outdoors", pic: sportsOutdoors },
  { name: "TV, Audio, Video, Gaming & Wearables", pic: tvAudioVideoGamingWearables }
];

export default categori;
