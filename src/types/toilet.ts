export interface Toilet {
  id: number;
  name: string;
  roadAddress: string;
  address: string;
  latitude: number;
  longitude: number;
  maleToiletCount: number;
  femaleToiletCount: number;
  disabledMaleToiletCount: number;
  disabledFemaleToiletCount: number;
  openTime: string | null;
  closeTime: string | null;
  isDisabledAvailable: boolean;
  managementAgency: string | null;
  phoneNumber: string | null;
}
