export interface Profile {
    firstName: string;
    lastName: string;
    mobileNumber: string;
    email: string;
    city: string;
    state: string;
    country: string;
    [key:string]:string;
    profileImg:string;
  }

export interface updateProfile{
  updateKey:string;
  updateValue:string;
}
