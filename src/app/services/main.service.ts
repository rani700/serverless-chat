import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor() { }

  testService(){
  	console.log("Test SuccessFul");
  }
}
