import { Component, OnInit, Input } from '@angular/core';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string;

  biometricType;
  biometricSecret;

  constructor(private faio: FingerprintAIO, private platform: Platform, private iab: InAppBrowser) { }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.checkBiometric();
    });
  }

  checkBiometric() {
    this.faio.isAvailable().then(res => {
      console.log('isAvailable', res);
      this.biometricType = res;
      this.loadBiometricSecret();
    }).catch(error => {
      console.log('isAvailable', error);
      // if(error.code === this.faio.BIOMETRIC_NOT_ENROLLED) {
      //   this.biometricType = 'biometric';
      // }
    });
  }

  loadBiometricSecret() {
    this.faio.loadBiometricSecret({
      title: 'Login using Biometric', // (Android Only) | optional | Default: "<APP_NAME> Biometric Sign On"
      // subtitle: 'Coolest Plugin ever', // (Android Only) | optional | Default: null
      description: 'Please authenticate', // optional | Default: null
      fallbackButtonTitle: 'Use Password', // optional | When disableBackup is false defaults to "Use Pin".
      // When disableBackup is true defaults to "Cancel"
      disableBackup: false,  // optional | default: false
    }).then(res => {
      console.log('loadBiometricSecret', res);
      this.biometricSecret = res;
    }).catch(error => {
      console.log('loadBiometricSecret error', error);
    });

  }

  registerBiometric() {
    return this.faio.registerBiometricSecret({
      title: 'Login using Biometric', // (Android Only) | optional | Default: "<APP_NAME> Biometric Sign On"
      // subtitle: 'Coolest Plugin ever', // (Android Only) | optional | Default: null
      description: 'Please authenticate', // optional | Default: null
      fallbackButtonTitle: 'Use Password', // optional | When disableBackup is false defaults to "Use Pin".
      // When disableBackup is true defaults to "Cancel"
      disableBackup: true,  // optional | default: false,
      secret: 'dummysecret'
    }).then(res => {
      console.log('registerBiometricSecret', res);
      this.biometricSecret = 'dummysecret';
    }).catch(error => console.log('registerBiometricSecret error', error));
  }

  openInAppBrowser() {
    // eslint-disable-next-line max-len
    this.iab.create('https://connect2-tsvs.finicity.com?analytics=google%3AUA-106817000-1&consumerId=ccf455ee6a22adc7f93f195316da44ab&customerId=5009772484&experience=f46795ba-8364-4c60-aabc-370761153487&fromDate=1622606400&partnerId=2445582371628&redirectUri=https%3A%2F%2Fcpuat.newrez.com%2F%23%2F&signature=5c72bf5638f320a25fa6273ac7a507c639080bf7425612e086aa76ff75f22585&timestamp=1627915832565&ttl=1627923032565', '_blank', { usewkwebview: 'yes', location: 'no', hidenavigationbuttons: 'yes', toolbar: 'no', zoom: 'no', enableViewportScale: 'yes' });
  }

}
