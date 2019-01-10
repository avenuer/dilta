import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'web-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit {
  images = [
    'setup_managers.png',
    'setup_liensce.png',
    'sms_academic_classes_statics.png',
    'sms_academic_dashboard.png',
    'sms_academic_full_report_card.png',
    'sms_academic_record_form.png',
    'sms_academic_report_card.png',
    'sms_academic_student_form.png',
    'sms_academic_students_page.png',
    'sms_academic_teachers_list.png'
  ];

  constructor() {}

  ngOnInit() {}
}
