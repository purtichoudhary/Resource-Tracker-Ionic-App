import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { ResourceInfo } from './home/resourceInfoInterface';

@Injectable()
export class ResourceService {

    private resources: {} = {};
    constructor() {}

    generateUniqueId(): string {
        return uuidv4();
    }

    storeResource(resourceInfo: ResourceInfo) {
        this.resources[resourceInfo.id] = resourceInfo;
    }

    getResource(id: string): ResourceInfo {
        return this.resources[id];
    }

    getAllResource(): {} {
        return this.resources;
    }

    getResourcesForKeyword(keyword: string): any[] {
        const keywordResources: any[] = [];
        Object.keys(this.resources).forEach(element => {
            if (this.resources[element].keyword === keyword) {
                keywordResources.push(this.resources[element]);
            }
        });
        return keywordResources;
    }

    getAllKeywords(): Set<any> {
        const keywordSet = new Set();

        Object.keys(this.resources).forEach(element => {
            keywordSet.add(this.resources[element].keyword);
        });
        return keywordSet;
    }

    getKeywordColor(keyword: string) : string {
        var keywordColor: string = null;

        Object.keys(this.resources).forEach(element => {
            if (this.resources[element].keyword === keyword) {
                keywordColor = this.resources[element].color;
            }
        });
        return keywordColor;
    }

    deleteKeywordResources(keyword: string, deleteRes: any[]) {
        console.log(deleteRes);
        for (let i = 0; i < deleteRes.length; i++) {
            Object.keys(this.resources).forEach(element => {
                if (this.resources[element].keyword === keyword && this.resources[element].title === deleteRes[i]) {
                    delete this.resources[element];
                }
            });
        }
        
    }

}