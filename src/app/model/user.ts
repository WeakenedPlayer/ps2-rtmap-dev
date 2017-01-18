
export class Permission {
  public uid: string;
  public eat: boolean;
  public sleep: boolean;
  
  constructor( eat: boolean, sleep: boolean ){
    this.eat = eat;
    this.sleep = sleep;
  }
  
  }