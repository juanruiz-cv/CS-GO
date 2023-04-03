import { Component } from '@angular/core';
import { WeaponsService } from 'src/app/services/modules/weapons.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private _weaponsService: WeaponsService) {}

  ngOnInit(): void {
    this.getItems();
  }

  items: { name: string; imgURL: string }[] = [];
  list: string[] = [];

  getItems() {
    this._weaponsService.getItems().subscribe({
      next: (response) => {
        for (const [key, value] of Object.entries(response)) {
          if (
            key.includes('(Factory New)') &&
            key.includes('Five') &&
            !key.includes('StatTrak™') &&
            !key.includes('Souvenir ')
          ) {
            this.items.push({ name: key, imgURL: (value as string) ?? '' });
            this.list.push(key?.split(' | ', 1)[0]?.split(' ')?.at(-1) ?? '');
          }
        }
        this.list = Array.from(new Set(this.list));
        console.log(this.list);
      },
    });
  }
}
