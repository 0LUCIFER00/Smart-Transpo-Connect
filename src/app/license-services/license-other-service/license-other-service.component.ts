import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BackBtnComponent } from "../../shared/back-btn/back-btn.component";

interface ServiceItem {
  title: string;
  iconUrl: string;
  bgColor: string;
  route?: string;
}

@Component({
  selector: 'app-license-other-service',
  imports: [CommonModule, RouterLink, BackBtnComponent],
  templateUrl: './license-other-service.component.html',
  styleUrl: './license-other-service.component.css',
})
export class LicenseOtherServiceComponent {
  constructor(private location: Location) {}

  services: ServiceItem[] = [
  {
    title: 'Apply for DL Renewal',
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/1099/1099183.png',
    bgColor: '#F15A3B',
    route: 'dl-renewal',
  },
  {
    title: 'Apply for Duplicate DL',
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/1828/1828961.png',
    bgColor: '#D94DB3',
    route: 'dl-duplicate',
  },
  {
    title: 'Apply for Changes in LL',
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2921/2921222.png',
    bgColor: '#00B0E8',
    route: 'll-changes',
  },
  {
    title: 'Apply for Changes in DL',
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2921/2921222.png',
    bgColor: '#00B0E8',
    route: 'dl-changes',
  },
  {
    title: 'Add Class of Vehicles to an Application',
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/7439/7439597.png',
    bgColor: '#F07A1B',
    route: 'add-class'
  },
  {
    title: 'Apply for International Driving Permit (IDP)',
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2038/2038854.png',
    bgColor: '#D93B4B',
    route: 'id-permit',
  },
  {
    title: 'Surrender Class of Vehicle',
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/427/427735.png',
    bgColor: '#1AB0B7',
    route: 'surrender-class',
  },
  {
    title: 'Endorsement to Drive Hazardous Material',
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/201/201614.png',
    bgColor: '#001A9E',
    route: 'endorsement',
  },
  {
    title: 'Issue of Badge',
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2907/2907762.png',
    bgColor: '#2E7D2E',
    route: 'issue-badge',
  },
  {
    title: 'DL Extract Request',
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/5610/5610944.png',
    bgColor: '#0B5DAA',
    route: 'dlextract-request',
  },
  {
    title: 'LL Retest or Reappear',
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/1149/1149168.png',
    bgColor: '#001A9E',
    route: 'll-retest',
  },
  {
    title: 'DL Reallocate Test Slot',
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3063/3063824.png',
    bgColor: '#9B8EDB',
    route: 'reallocate-slot',
  },
  {
    title: 'Cancel DL Application',
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/753/753345.png',
    bgColor: '#8AA62B',
    route: 'cancel-dl',
  },
  {
    title: 'Tutorial for LL Test',
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3686/3686989.png',
    bgColor: '#0B5DAA',
    route: 'll-tutorial',
  },
  {
    title: 'Tutorial for DL Test',
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3686/3686989.png',
    bgColor: '#0B5DAA',
    route: 'dl-tutorial',
  },
  {
    title: 'Complete your Pending Application',
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/6134/6134065.png',
    bgColor: '#F02B0B',
    route: 'complete-pending',
  },
  {
    title: 'Upload Document',
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/1828/1828911.png',
    bgColor: '#0091D1',
    route: 'upload-doc',
  },
];


  trackByFn(index: number, item: ServiceItem): string {
    return item.title;
  }
}
