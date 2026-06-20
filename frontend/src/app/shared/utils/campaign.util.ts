import { Campaign } from '../interfaces/campaign.interface';

export function isCampaignActive(
  campaign: Campaign,
  referenceDate = new Date()
): boolean {
  const start = new Date(campaign.startDate);
  const end = new Date(campaign.endDate);

  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);

  return referenceDate >= start && referenceDate <= end;
}

export function getActiveCampaigns(campaigns: Campaign[]): Campaign[] {
  return campaigns
    .filter((campaign) => isCampaignActive(campaign))
    .sort(
      (left, right) =>
        new Date(left.startDate).getTime() - new Date(right.startDate).getTime()
    );
}

export function getFeaturedCampaign(campaigns: Campaign[]): Campaign | null {
  const activeCampaigns = getActiveCampaigns(campaigns);

  return (
    activeCampaigns.find((campaign) => campaign.featured) ??
    activeCampaigns[0] ??
    null
  );
}
