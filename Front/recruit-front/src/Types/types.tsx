export interface Project {
  id: number;
  name: string;
  description: string;
  responsiblePersonEmail: string;
  product: NordProduct;
  image: string;
}

export interface Position {
  id: number;
  projectId: number;
  name: string;
  description: string;
  deadline: Date;
  isOpen: boolean;
  location: JobLocation;
  workTime: WorkTime;
  field: Field;
  salaryRange: string;
  duties: string;
  expectations: string;
  offers: string;
}

export enum NordProduct {
  NordVPN,
  NordPass,
  NordLocker,
  NordLayer,
  NordSecurity,
}

export enum JobLocation {
  Kaunas,
  Vilnius,
  Berlin,
  Warsaw,
  WashingtonDC,
}

export enum WorkTime {
  Fulltime,
  Parttime,
}

export enum Field {
  Administration,
  Architecture,
  Backend,
  Bussiness,
  Communications,
  Data,
  DesktopApps,
  Leadership,
  Finance,
  Frontend,
  HR,
  Infrastructure,
  Legal,
  Marketing,
  Mobile,
  Payments,
  Design,
  QA,
  Risk,
  Sales,
}
