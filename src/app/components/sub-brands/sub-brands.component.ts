import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { ActivatedRoute } from '@angular/router';
import { IsubBrand } from '../../core/interfaces/isub-brand';

@Component({
  selector: 'app-sub-brands',
  standalone: true,
  imports: [],
  templateUrl: './sub-brands.component.html',
  styleUrl: './sub-brands.component.scss'
})
export class SubBrandsComponent implements OnInit {
  private readonly _BrandsService = inject(BrandsService)
  private readonly _ActivatedRoute = inject(ActivatedRoute);

  subBrand:IsubBrand={} as IsubBrand
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
        let brandId= p.get('id');
        this._BrandsService.getSpecificBrands(brandId!).subscribe({
          next:(res)=>{
            this.subBrand=res.data;
            
          },
          error:(err)=>{
            console.log(err);
            
          }
        })
      }
    })
  }

}
