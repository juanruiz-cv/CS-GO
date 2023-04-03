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

  private items: { name: string; imgURL: string }[] = [];

  public search: string = '';
  public itemsAux: { name: string; imgURL: string }[] = [];
  public itemsSearch: { name: string; imgURL: string }[] = [];
  public page: number = 1;
  public pageSize: number = 10;
  public totalPages: number = 1;

  public startIndex = (this.page - 1) * this.pageSize;
  public endIndex = this.startIndex + this.pageSize;

  public searchItems(value: string) {
    let searchItem: { name: string; imgURL: string }[] = [];
    if (value) {
      this.items.forEach((data) => {
        if (data.name?.toLowerCase().includes(value.toLowerCase()))
          searchItem.push(data);
      });
      this.totalPages = Math.ceil(searchItem.length / this.pageSize) - 1;
      this.itemsAux = searchItem.slice(this.startIndex, this.endIndex);
    } else {
      this.totalPages = Math.ceil(this.items.length / this.pageSize) - 1;
      this.itemsAux = this.items.slice(this.startIndex, this.endIndex);
    }
    this.changePage(1);
  }

  getItems() {
    this._weaponsService.getItems().subscribe({
      next: (response) => {
        for (const [key, value] of Object.entries(response)) {
          this.items.push({ name: key, imgURL: (value as string) ?? '' });
        }
        this.itemsAux = this.items.slice(this.startIndex, this.endIndex);
        this.totalPages = Math.ceil(this.items.length / this.pageSize) - 1;
      },
      complete() {},
    });
  }
  changePage(value: number) {
    this.page = value;
    this.startIndex = this.page * this.pageSize;
    this.endIndex = this.startIndex + this.pageSize;
    this.itemsAux = this.items.slice(this.startIndex, this.endIndex);
    console.log(
      '\nTotal: ',
      this.totalPages,
      '\nActual: ',
      this.page,
      '\nTamaño: ',
      this.pageSize,
      '\nListado:\n ',
      this.itemsAux
    );
  }
}
