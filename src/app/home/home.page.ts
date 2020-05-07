import { Component } from '@angular/core';

import { ModalContent } from './modal.content';
import { ModalController, NavController } from '@ionic/angular';

import { ResourceService } from '../service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public keywords: [];

  constructor(private modalCtrl: ModalController,
              private rs: ResourceService,
              private router: Router,
              public navCtrl: NavController) {}

  async createModal() {
    const modal = await this.modalCtrl.create({
      component: ModalContent,
      cssClass: 'my-custom-modal-css'
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.keywords = dataReturned.data;
        console.log("Keywords");
        console.log(this.keywords);
      }
    });

  
    await modal.present();
    
  }

  checkResource() : boolean {
    return this.rs.getAllKeywords().size == 0;
  }
  
  getResources(key) {
    console.log(key);
    this.router.navigate(['/resourcetab', key]);
  }

  getColor(key) {
      return this.rs.getKeywordColor(key);
  }

}
