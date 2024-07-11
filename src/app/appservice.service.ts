import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { GET_RECORDS,GET_RECORDS_ID,SAVE_RECORDS,UPDATE_RECORDS,GET_RECORDS_DATE } from './graphql/GraphqlQueries';

@Injectable({
  providedIn: 'root'
})
export class AppserviceService {
  private postsUpdated = new Subject<any>();
    data = new Subject<any>();
    adddata = new Subject<any>();
    baseUrl : String;
    constructor(private apollo:Apollo) { 
    this.baseUrl = 'http://localhost:8080/graphql';

  }

  
  getRecords(){
       
     
      this.apollo.watchQuery({
        query: GET_RECORDS,
        fetchPolicy: "no-cache" 
      }).valueChanges.subscribe(({ data, error }: any) => {
        
        if (data) {
          console.log("From service original ");
        
        console.log(data);
          this.data.next(data.records);
        }
    }
    );
       
    return this.data;
  }

  getRecordsById(id:any){
       
   
    this.apollo.watchQuery({
      query: GET_RECORDS,
      variables:{
        id : id
      }
    }).valueChanges.subscribe(({ data, error }: any) => {
     
      if (data) {
        this.data.next(data.records);
      }
  }
 
  );
     
  return this.data.asObservable();
}

  addRecords(form:any){
    console.log(form);
    
    this.apollo.mutate({
      mutation: SAVE_RECORDS,
      variables:{
        recordsInput : form
      },
      fetchPolicy: "no-cache" ,
      refetchQueries: [{
        query: GET_RECORDS
      }]
    }).subscribe(({ data, error }: any) => {
      
      if (data) {
        this.adddata.next(data);
      }
  });
  return this.adddata.asObservable();
  }

  editRecords(form:any){
    console.log(form);
    
    this.apollo.mutate({
      mutation: UPDATE_RECORDS,
      variables:{
        recordsInput : form
      },
      fetchPolicy: "no-cache" ,
      refetchQueries: [{
        query: GET_RECORDS
      }]
    }).subscribe(({ data, error }: any) => {
      
      if (data) {
        console.log(data);
        
        this.adddata = data;
        console.log(this.adddata);
        this.getRecords();
      }
  });
  return this.adddata.asObservable();
  }

}
