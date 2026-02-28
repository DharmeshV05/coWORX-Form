export type MembershipType =
  | "Hot Desk"
  | "Dedicated Desk"
  | "Private Office"
  | "Virtual Office"
  | "Day Pass / Hourly Access"
  | "Weekly Plan"
  | "Monthly Plan";

export interface Inquiry {
  id: string;
  name: string;
  mobile: string;
  membershipType: MembershipType;
  startDate: string;
  notes?: string;
  createdAt: string;
}

export interface CreateInquiryInput {
  name: string;
  mobile: string;
  membershipType: MembershipType;
  startDate: string;
  notes?: string;
}
