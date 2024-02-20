import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faBook } from '@fortawesome/free-solid-svg-icons';
import { CoinFilters } from '../../models/CoinFilters';
import { StorageService } from '../../../_shared/services/storage/storage.service';


@Component({
  selector: 'app-filters-bar',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './filters-bar.component.html',
  styleUrl: './filters-bar.component.css'
})
export class FiltersBarComponent {

  constructor(
    private storageService: StorageService,
  ) { }

  @Output() filters = new EventEmitter<CoinFilters>();

  filterValues: CoinFilters = {
    search: '',
    found: ['found', 'notFound'],
  };

  ngOnInit(): void {
    this.userLoggedIn = this.storageService.isLoggedIn();
  }

  userLoggedIn: boolean = null!;


  foundCheckboxes = [
    true,
    true
  ];

  icons = {
    search: faSearch,
    book: faBook,
  };

  onSearch() {
    this.filters.emit(this.filterValues);
  }

  onFoundFilterChange() {
    const foundFlter: ('found' | 'notFound')[] = []
    if (this.foundCheckboxes[0]) {
      foundFlter.push('found');
    }
    if (this.foundCheckboxes[1]) {
      foundFlter.push('notFound');
    }
    this.filterValues.found = foundFlter;

    this.filters.emit(this.filterValues);
  }

}
