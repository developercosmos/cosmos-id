import { Product } from '../../types/product';

export const transformProducts = (data: any[]): Product[] => {
  if (!Array.isArray(data)) {
    console.warn('Data is not an array:', data);
    return [];
  }

  return data.map((item: any) => {
    console.log('Transforming product item:', item);
    
    // Handle image URLs
    let images: string[] = [];
    if (item.image) {
      const imageUrl = item.image.startsWith('http') || item.image.startsWith('/') ? 
        item.image : 
        `/${item.image}`;
      images = [imageUrl];
      console.log('Processed image URL:', imageUrl);
    }

    // Ensure features is an array
    let features: string[] = [];
    try {
      if (Array.isArray(item.features)) {
        features = item.features;
      } else if (typeof item.features === 'string') {
        features = JSON.parse(item.features);
      }
    } catch (error) {
      console.warn('Error parsing features:', error);
      features = ['No features available'];
    }
    
    // Ensure whatsInTheBox is an array
    let whatsInTheBox: string[] = [];
    try {
      if (Array.isArray(item.whatsInTheBox)) {
        whatsInTheBox = item.whatsInTheBox;
      } else if (typeof item.whatsInTheBox === 'string') {
        whatsInTheBox = JSON.parse(item.whatsInTheBox);
      }
    } catch (error) {
      console.warn('Error parsing whatsInTheBox:', error);
      whatsInTheBox = ['Package contents not available'];
    }

    const transformedProduct = {
      id: item.id || 0,
      name: item.name || 'Unnamed Product',
      description: item.description || 'No description available',
      category: item.category || 'Uncategorized',
      price: item.price || '0',
      features: features,
      whatsInTheBox: whatsInTheBox,
      warranty: item.warranty || 'No warranty information available',
      manual: item.manual || '#',
      images: images,
    };

    console.log('Transformed product:', transformedProduct);
    return transformedProduct;
  });
};