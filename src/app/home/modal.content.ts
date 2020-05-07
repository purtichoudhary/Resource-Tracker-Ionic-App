import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ResourceInfo } from './resourceInfoInterface';

import { ResourceService } from '../service';

@Component({
  selector: 'modal.content',
  templateUrl: './modal.content.html',
  styleUrls: ['./modal.content.scss'],
})
export class ModalContent implements OnInit {

    public title: string = null;
    public url: string = null;
    public keyword: string = null;
    public progress: number;
    public id: string;
    public color: string;

    constructor(private modalCtrl: ModalController,
                private rs: ResourceService) {
        
    }
    

    ngOnInit() {
        console.log("Page Loaded");
    }

    async dismissModal() {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        const onClosedData: {} = this.rs.getAllKeywords();
        await this.modalCtrl.dismiss(onClosedData);
        // this.modalCtrl.dismiss({
        // 'dismissed': true
        // });
    }

    isDisabled() {
        return this.isEmpty(this.title) || this.isEmpty(this.url)  ||
                this.isEmpty(this.keyword)  || this.isNumEmpty(this.progress);
    }

    isEmpty(value: string) : boolean {
        return value == null || value === '';
    }

    isNumEmpty(value: number) : boolean {
        return value == -1;
    }
    addEnteries() {

        const resourceInfo: ResourceInfo = {
            id: this.rs.generateUniqueId(),
            title : this.title,
            url: this.url,
            keyword: this.keyword,
            progress: this.progress/100,
            color: this.getRandomColor()
        }
       
        this.rs.storeResource(resourceInfo);
        this.dismissModal();


    }

    getRandomColor() {
      var colors = ['rgb(238, 133, 133)', 'rgb(233, 134, 94)', 'lightblue', 'rgb(203, 231, 137)', 
      'rgb(128, 241, 198)', 'rgb(112, 218, 236)', 'lightsalmon', 'rgb(117, 183, 245)', 'teal',
      'rgb(191, 143, 253)', 'rgb(245, 143, 248)', 'rgb(240, 102, 166)'];
      return colors[Math.floor(Math.random() * colors.length)];;
  }

}
