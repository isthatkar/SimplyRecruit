export interface Project {
  id: number;
  name: string;
  description: string;
  responsiblePersonEmail: string;
  product: NordProduct;
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

export interface Meeting {
  id: number;
  title: string;
  description: string;
  finalTime: string;
  isFinalTime: boolean;
  attendees: string;
  meetingTimes: MeetingTime[];
  duration: number;
  schedulingUrl: string;
  meetingUrl: string;
  isCanceled: boolean;
}

export interface MeetingTime {
  id: number;
  startTime: string;
  selectedAttendees: string;
  meeting: Meeting;
}

export interface Review {
  id: number;
  userEmail: string;
  rating: number;
  comment: string;
}

export interface Task {
  id: number;
  title: string;
  goal: string;
  state: TaskStatus;
  deadline: Date;
  fileName: string | undefined;
  url: string | undefined;
  fileData: Uint8Array | undefined;
}

export interface TaskAnswer {
  id: number;
  comment: string | undefined;
  fileName: string | undefined;
  url: string | undefined;
  fileData: Uint8Array | undefined;
}

export interface Application {
  id: number;
  fullName: string;
  phoneNumber: string;
  profileUrl: string;
  coverLetter: string;
  contactEmail: string;
  stage: Stage;
  positionId: number;
  positionName: string;
  isArchived: boolean;
}

export interface Resume {
  file: Uint8Array;
  fileName: string;
}

export enum TaskStatus {
  Assigned,
  Completed,
  DeadLinePassed,
}

export enum Stage {
  New,
  PhoneScreen,
  FirstInterview,
  TechTask,
  TechnicalInterview,
  FinalInterview,
  Offer,
  Hired,
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
  All,
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
  All,
}
