import {gql} from 'apollo-angular'

const GET_RECORDS = gql`
  query {
    records{
        id 
        applicantName 
        gender 
        district 
        state 
        pincode 
        ownership 
        govtId 
        idNumber 
        category 
        load_applied 
        dateOfApplication 
        dateOfApproval 
        modifiedDate 
        status 
         reveiwerId 
        reveiwerName 
        reviewercomments 
      }
  }
`

const GET_RECORDS_ID = gql`
query($id: Float!){
  recordsById(id:$id){
      id 
      applicantName 
      gender 
      district 
      state 
      pincode 
      ownership 
      govtId 
      idNumber 
      category 
      load_applied 
      dateOfApplication 
      dateOfApproval 
      modifiedDate 
      status 
      reveiwerId 
      reveiwerName 
      reviewercomments 
    }
}
`

const GET_RECORDS_DATE = gql`
query($startDate: String!, $endDate: String!){
  recordsByApplicationDate(startDate:$startDate,endDate:$endDate){
      id 
      applicantName 
      gender 
      district 
      state 
      pincode 
      ownership 
      govtId 
      idNumber 
      category 
      load_applied 
      dateOfApplication 
      dateOfApproval 
      modifiedDate 
      status 
      reveiwerId 
      reveiwerName 
      reviewercomments 
    }
}
`

const SAVE_RECORDS = gql`
mutation saveRecord($recordsInput: RecordsInput){
  saveRecord(recordsInput : $recordsInput){
      value
  }
  
}
`

const UPDATE_RECORDS = gql`
  mutation updateRecord($recordsInput: RecordsInput){
  updateRecord(recordsInput : $recordsInput){
      value
  }
  
}
`



export {GET_RECORDS ,GET_RECORDS_ID,GET_RECORDS_DATE,SAVE_RECORDS,UPDATE_RECORDS}