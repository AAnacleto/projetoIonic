import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import {Keyboard } from '@ionic-native/keyboard/ngx';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  public userLogin: User = {};
  public userRegister: User = {};
  private loading: any;
  
  constructor(private router: Router,
              public keyboard: Keyboard,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private authService: AuthService) {

               }

  ngOnInit() {
  }

  segmentChanged(event: any){
     if (event.detail.value === 'login'){
       this.slides.slidePrev();
     }else {
       this.slides.slideNext();
     }
  }

  entrar(){
  }
 
  async login(){
    await this.presentLoading();
    try{
      await this.authService.login(this.userLogin);
      this.router.navigate(['/home']);

    } catch (error){
      console.error(error);
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
    }
  }

  async register(){
    await this.presentLoading();
    try{
      await this.authService.register(this.userRegister);
    } catch (error){
      console.error(error);
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
    }
  }

  async presentLoading(){
    this.loading = await this.loadingCtrl.create({
      message: 'Por favor, aguarde...'
    });
    return this.loading.present();
  }

  async presentToast(message: string){
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

}
