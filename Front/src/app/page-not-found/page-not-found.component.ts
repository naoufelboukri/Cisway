import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <div class="mt-5 w-100 text-center">
        <img src="https://img.freepik.com/vecteurs-libre/erreur-404-illustration-concept-paysage_114360-7898.jpg?w=750">
        <h1>Attention, cette page n'existe pas !</h1>
        <a routerLink="/" class="text-uppercase text-decoration-none text-black">Retourner à l'accueil</a>
    </div>
  `,
  styles: [
  ]
})
export class PageNotFoundComponent {

}
