import { Component, OnInit } from '@angular/core';

interface Feature {
  icon: string;
  title: string;
  info: string;
}

@Component({
  selector: 'lib-web-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {
  features: Feature[] = [
    {
      icon: 'sms_academic_student_form.png',
      title: `Students Managment`,
      info: `Marker allows the storage of student and necessary administrative
    functionality regarding student data.`
    },
    {
      icon: 'sms_academic_teachers_list.png',
      title: `Staff's Management`,
      info: `Marker controls staff's access on data, by making authentication part of the whole system.`
    },
    {
      icon: 'sms_academic_report_card.png',
      title: `Academic Recording`,
      info: `Marker provides functionalities regarding the recording of student academic data and result printing.`
    },
    // {
    //   icon: '',
    //   title: `Graphical Analysis`,
    //   info: `Marker provides graphical analysis of student data with charts.`
    // },
    // {
    //   icon: 'sms_mobile_login.png',
    //   title: `Data Storage and Privacy`,
    //   info: `Marker allows continuous storage of offline application data online for cloud storage,
    // dilta allow so has a high regard for data privacy concerns.`
    // },
    // {
    //   icon: 'sms_mobile_home.png',
    //   title: `Cross-Platform Accessiblity and Updates`,
    //   info: ` Data synced are available online and can be viewed with Marker's mobile application
    // and continuous update is guaranteed for the application.`
    // }
    // { icon: '', title: ``, info: `` },
  ];

  constructor() {}

  ngOnInit() {}
}
