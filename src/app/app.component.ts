import { Component } from '@angular/core';
import { AppserviceService } from './appservice.service';
import { FormBuilder, FormGroup, FormControl,Validators} from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  monthlyCounts = new Map(); // To store counts by month
  public chartType: ChartType = 'bar';
  public chartOptions: ChartOptions = {
    responsive: true,
  };
  public chartData: any[] = [];
  public chartLabels: string[] = [];
  title = 'bcgassignment';
  searchText: string = "";
  editBcgForm:any = FormGroup;
  addBcgForm:any = FormGroup;
  idForm :any = FormGroup;
  getCompleteData :any  = [];
  searchString = '';
  fromDate : any;
  toDate : any = new Date();
  constructor(private appS:AppserviceService,private formB:FormBuilder){


  }

  ngOnInit(){
    this.getGraphqlData();
    this.AddFormData();

    this.editBcgForm = this.formB.group({
      applicantName: ['',Validators.required],
      status : ['',Validators.required],
      idNumber: ['',Validators.required],
      dateOfApplication: ['',Validators.required]
    });
  }

  private AddFormData() {
    this.addBcgForm = this.formB.group({
      applicantName: ['', Validators.required],
      status: ['', Validators.required],
      idNumber: [Math.floor(Math.random() * 10000), Validators.required],
      dateOfApplication: ['', Validators.required],
      dateOfApproval: ['', Validators.required],
      gender: ['', Validators.required],
      district: ['', Validators.required],
      state: ['', Validators.required],
      pincode: [1, Validators.required],
      ownership: ['', Validators.required],
      govtId: ['', Validators.required],
      category: ['', Validators.required],
      load_applied: [1, [Validators.required, Validators.max(200)]],
      modifiedDate: ['', Validators.required],
      reveiwerId: [145, Validators.required],
      reveiwerName: ['', Validators.required],
      reviewercomments: ['', Validators.required]
    });
  }

  clearData(){
    this.searchText = "";
    this.fromDate ="" ;
    this.toDate  = "";
  }

  getGraphqlData(){
       
       this.appS.getRecords().subscribe((data:any) => {
        this.getCompleteData = data;
        
        
        console.log(this.getCompleteData);

        

        this.getCompleteData.forEach((record:any) => {
          const date = new Date(record.dateOfApplication);
          const month = date.getMonth();
          const year = date.getFullYear();
          const key = `${year}-${month}`;
        
          if (this.monthlyCounts.has(key)) {
            this.monthlyCounts.set(key, this.monthlyCounts.get(key) + 1);
          } else {
            this.monthlyCounts.set(key, 1);
          }
        });
          this.chartData =[  { data: Array.from(this.monthlyCounts.values()),
             label: 'Connection Requests' },
        ];
        this.chartLabels = Array.from(this.monthlyCounts.values());

      });
      
       
  }

  getEmployeeByIdNumber(){
    let id = this.idForm.value.idNumber;
    console.log(id);
    this.appS.getRecordsById(id).subscribe((data:any) => {
      this.getCompleteData = data;
      console.log(this.getCompleteData);
      
    });

  }


  updateData(){
    let data= {
      applicantName: this.editBcgForm.value.applicantName,
      status: this.editBcgForm.value.status,
      idNumber: this.editBcgForm.value.idNumber,
      dateOfApplication: this.editBcgForm.value.dateOfApplication
    
    }
    this.appS.editRecords(data).subscribe((res:any) => {
      console.log(res,"Inside update data result "+res);
       this.getGraphqlData();
    })
  }

  patchValue(data:any){
    let vb= {...data};
    console.log(vb.dateOfApplication);
    vb.realDate = vb.dateOfApplication;
    const a = new Date(vb.dateOfApplication).getDate();
    const b = new Date(vb.dateOfApplication).getMonth()+1;
    const c = new Date(vb.dateOfApplication).getFullYear();
   
    console.log(a,b,c);
    
    vb.dateOfApplication = ( a + '-' + b + '-' + c).toString();
    console.log(vb);
    
    this.editBcgForm.patchValue(vb)
  }

  addData(){
    let data= {
      applicantName: this.addBcgForm.value.applicantName,
      status: this.addBcgForm.value.status,
      idNumber: this.addBcgForm.value.idNumber,
      dateOfApplication: this.addBcgForm.value.dateOfApplication,
      gender:this.addBcgForm.value.gender,
      district:this.addBcgForm.value.district,
      state:this.addBcgForm.value.state,
       pincode:this.addBcgForm.value.pincode,
       ownership:this.addBcgForm.value.ownership, 
       govtId:this.addBcgForm.value.govtId,
       category:this.addBcgForm.value.category,
        load_applied:this.addBcgForm.value.load_applied,
        modifiedDate:this.addBcgForm.value.modifiedDate,
        reveiwerId:this.addBcgForm.value.reveiwerId,
        reveiwerName:this.addBcgForm.value.reveiwerName,
        reviewercomments:this.addBcgForm.value.reviewercomments,
        dateOfApproval : this.addBcgForm.value.dateOfApproval
    
    }

    this.appS.addRecords(data).subscribe((res:any) => {
      console.log(res,"Inside Add App Component"+res);
      this.getGraphqlData();
      this.AddFormData();
    })
  }
 }
