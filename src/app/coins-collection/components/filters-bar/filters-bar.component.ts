import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faBook, faSliders } from '@fortawesome/free-solid-svg-icons';
import { CoinFilters } from '../../models/CoinFilters';
import { StorageService } from '../../../_shared/services/storage/storage.service';
import { ProgramService } from '../../services/program/program.service';
import { Program } from '../../models/Program';


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
    private programService: ProgramService,
  ) { }

  @Output() filters = new EventEmitter<CoinFilters>();

  filterValues: CoinFilters = {
    search: '',
    found: ['found', 'notFound'],
    programs: []
  };

  userLoggedIn: boolean = null!;

  foundCheckboxes = [
    true,
    true
  ];

  icons = {
    search: faSearch,
    book: faBook,
    sliders: faSliders
  };

  programs: Program[] = [];


  ngOnInit(): void {
    this.userLoggedIn = this.storageService.isLoggedIn();
    this.getPrgorams();

  }

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

  onProgramFilterChange(program: Program) {
    if (this.filterValues.programs.includes(program._id)) {
      this.filterValues.programs = this.filterValues.programs.filter((programId) => programId !== program._id);
    } else {
      this.filterValues.programs = [...this.filterValues.programs, program._id];
    }

    console.log(this.filterValues.programs);
    this.filters.emit(this.filterValues);
  }


  getPrgorams() {
    this.programService.getPrograms().subscribe({
      next: res => {
        this.programs = res as Program[];
        this.programs.forEach((program) => {
          this.filterValues.programs.push(program._id);
        });
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
