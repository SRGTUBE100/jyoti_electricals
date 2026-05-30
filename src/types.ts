export interface Product {
  id: string;
  name: string;
  category: 'fans_coolers' | 'solar_power' | 'repair_parts' | 'lighting_fixtures';
  description: string;
  price: number;
  rating: number;
  brand: string;
  image: string;
  specifications: string[];
  inStock: boolean;
  tag?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  baseDiagnosticsPrice: number;
  estimatedTime: string;
  details: string[];
}

export interface BookingDetails {
  fullName: string;
  phone: string;
  email: string;
  serviceId: string;
  deviceModel: string;
  issueDescription: string;
  preferredDate: string;
  preferredTimeSlot: string;
  pincode: string; // Service available around Kaimganj area, e.g., 209630
}

export interface InquiryDetails {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
