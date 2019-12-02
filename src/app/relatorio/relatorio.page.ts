import { Component, OnInit } from '@angular/core';
import { BuscaService } from '../buscaservice/busca.service';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.page.html',
  styleUrls: ['./relatorio.page.scss'],
})
export class RelatorioPage implements OnInit {

  listLocal:any [];

  constructor(
    public busca: BuscaService,
    ) { }

  ngOnInit() {
    this.getRelatorio();
  }


  getRelatorio(){
    this.busca.local().then((resp) => {
      if (resp) {
        this.listLocal = Array(resp.data);
        console.log('dados recebidos', resp)
      }
  
    }).catch((error) => {
      console.log('Error ao receber a localizacao', error);
    });
  }

 
}
