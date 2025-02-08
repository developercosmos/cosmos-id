import { CampaignProduct } from '../types/campaign';
import { SERVER_URL } from '../config/serverConfig';

export const getCampaignProducts = async (): Promise<CampaignProduct[]> => {
  const response = await fetch(`${SERVER_URL}/src/server/campaign.php`);
  if (!response.ok) {
    throw new Error('Failed to fetch campaign products');
  }
  return response.json();
};

export const createCampaignProduct = async (product: Omit<CampaignProduct, 'id'>): Promise<CampaignProduct> => {
  const response = await fetch(`${SERVER_URL}/src/server/campaign.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error('Failed to create campaign product');
  }
  return response.json();
};

export const deleteCampaignProduct = async (id: number): Promise<void> => {
  const response = await fetch(`${SERVER_URL}/src/server/campaign.php?id=${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete campaign product');
  }
};