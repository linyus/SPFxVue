import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import * as strings from 'VueDemoWebPartStrings';

// Importing Vue.js
import Vue from 'vue';
// Importing Vue.js SFC
import VueDemoComponent from './components/VueDemo.vue';

export interface IVueDemoWebPartProps {
  description: string;
}

export default class VueDemoWebPart extends BaseClientSideWebPart<IVueDemoWebPartProps> {

  public render(): void {
    const id: string = `wp-${this.instanceId}`;
    this.domElement.innerHTML = `<div id="${id}">
                                  <span>{{msg}}</span>
                                  <button v-on:click="clickMe">click me!</button>
                                </div>`;

    let el = new Vue({
      el: `#${id}`,
      data: {
        msg: "hello world"
      },
      methods: {
        clickMe: function () {
          alert(this.msg);
        }
      }
    })
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
