import { Component, OnInit, ViewChild } from '@angular/core';

import { Hero } from '../shared/hero.model';
import { UserService } from '../../service/user.service';
import { HeroService } from '../shared/hero.service';
import { AppConfig } from '../../config/app.config';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { User } from '../../model/User.model';

@Component({
  selector: 'app-hero-top',
  templateUrl: './hero-top.component.html',
  styleUrls: ['./hero-top.component.scss']
})
export class HeroTopComponent implements OnInit {

  heroes: Hero[] = null;
  canVote = false;
  displayedColumns = ['id', 'firstName', 'username', 'userRole'];
  dataSource = new MatTableDataSource<User>(null);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private heroService: HeroService,
    private userService: UserService) {
    this.canVote = this.heroService.checkIfUserCanVote();

    this.heroService.getAllHeroes().subscribe((heroes) => {
      this.heroes = heroes.sort((a, b) => {
        return b.likes - a.likes;
      }).slice(0, AppConfig.topHeroesLimit);
    });
  }

  ngOnInit() {
    this.userService.getUsers().subscribe((response) => {
      this.dataSource = new MatTableDataSource(response);
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  like(hero: Hero): Promise<any> {
    return new Promise((resolve, reject) => {
      this.heroService.like(hero).subscribe(() => {
        this.canVote = this.heroService.checkIfUserCanVote();
        resolve(true);
      }, (error) => {
        reject(error);
      });
    });
  }
}
