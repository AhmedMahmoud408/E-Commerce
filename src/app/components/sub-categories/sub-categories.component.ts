import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { ActivatedRoute } from '@angular/router';
import { ISubCate } from '../../core/interfaces/isub-cate';

@Component({
  selector: 'app-sub-categories',
  standalone: true,
  imports: [],
  templateUrl: './sub-categories.component.html',
  styleUrl: './sub-categories.component.scss'
})
export class SubCategoriesComponent implements OnInit {
  private readonly _CategoriesService = inject(CategoriesService)
  private readonly _ActivatedRoute = inject(ActivatedRoute);

  subCategoriesDetail:ISubCate[]= []
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
        let categorieId= p.get('id');
        this._CategoriesService.getSubCategories(categorieId).subscribe({
          next:(res)=>{
            this.subCategoriesDetail=res.data
          },
          error:(err)=>{
            console.log(err);
            
          }
        })
      }
    })
  }
}
