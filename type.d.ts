interface childrenType {
  children: ReactNode;
}
interface childrenType {
  children: ReactNode;
}
interface registerState {
  registerData: [];
}
interface loginState {
  loginData: string | null
}
interface loginType {
  email: string;
  password: string;
  remember:boolean;
}
interface RememberMeState {
  email: string;
  password: string;
  remember: boolean;
}
interface registerType {
  firstName: string;
  lastName: string;
  email:string;
  phoneNumber:string;
  password:string;
  confirm_password:string;
  gender:string;
  dob:string;
  status:string;
  role:string;
}
interface loaderState {
  loader: boolean;
}
interface activeState {
  activelogin: boolean;
}
interface modalType {
  show: boolean;
  onClose: () => void;
  UserID:string;
 
}

interface updateProfileType {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirm_password: string;
  gender: string;
  dob: string;
  role: string;
  status: string;
  profileImage: string;
  profileOldImage: string;
}
interface userUpadteType {
  UserID: string;
  _id:string;
  firstName: string;
  lastName: string;
  email:string;
  phoneNumber:string;
  password:string;
  confirm_password:string;
  gender:string;
  dob:string; 
  role:string;
  status:string;
}