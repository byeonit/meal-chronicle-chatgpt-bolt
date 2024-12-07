import { Component } from '@angular/core';
import { PredefinesIngredientsComponent } from './predefines-ingredients/predefines-ingredients.component';

@Component({
  selector: 'app-culinary-alchemy',
  standalone: true,
  imports: [PredefinesIngredientsComponent],
  templateUrl: './culinary-alchemy.component.html',
  styleUrl: './culinary-alchemy.component.css'
})
export class CulinaryAlchemyComponent {

}
