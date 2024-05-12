import { UserService } from './../../services/user.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ClientsTableComponent, InfoComponent, PaginationPipe } from '@angular-monorepo/shared-ui';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-clients-container',
  standalone: true,
  imports: [CommonModule, ClientsTableComponent, InfoComponent, PaginationPipe],
  templateUrl: './clients-container.component.html',
  styleUrl: './clients-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsContainerComponent implements OnInit {
  constructor(private UserService: UserService, private router: Router){

  }
  users$ = this.UserService.getUsers();
  paginationData: PageEvent = {
    pageIndex: 0,
    pageSize: 8,
    length: 100
  }
  ngOnInit(): void {
    this.loadPaginationData()
  
  }
  deleteUser(id: number){
    this.UserService.deleteUser(id)
  }
  pageChanged(data: PageEvent){
    localStorage.setItem('paginationData', JSON.stringify(data));
     this.paginationData = data
  }
  editUser(id: number){
    this.UserService.editUser(id)
  } 
  openDetailPage(id: number){
    this.router.navigate([`/detail/${id}`])
  }

  openCreatePage(){
    this.router.navigate(['/add-client/0'])
  }
  loadPaginationData(){
    const data = JSON.parse(localStorage.getItem('paginationData')as any)
    if(data){
      this.paginationData= data as PageEvent
    }
  }
}
