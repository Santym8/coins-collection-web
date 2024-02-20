import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faCross } from '@fortawesome/free-solid-svg-icons';
import { CoinFilters } from '../../models/CoinFilters';


@Component({
  selector: 'app-filters-bar',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './filters-bar.component.html',
  styleUrl: './filters-bar.component.css'
})
export class FiltersBarComponent {

  @Output() filters = new EventEmitter<CoinFilters>();

  filterValues: CoinFilters = {
    search: '',
  };

  icons = {
    search: faSearch,
  };

  onSearch() {
    this.filters.emit(this.filterValues);
  }

}
