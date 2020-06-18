import { DashboardService } from './../dashboard.service';
import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor(private dashboard: DashboardService,
              private decimalPipe: DecimalPipe) { }

  pieChartData: any;
  lineChartData: any;

  // Formatacao dos numeros
  // Ver na documentacao do chart-js
  options = {
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const valor = dataset.data[tooltipItem.index];
          const label = dataset.label ? (dataset.label + ': ') : '';

          //Ver aqui por que nao formata real BR no grafico de linhas
          return this.decimalPipe.transform(valor, '1.2-2');
        }
      }
    }
  };

  ngOnInit() {
    this.configurarGraficoPizza();
    this.configurarGraficoLinha();
  }

  configurarGraficoPizza() {
      this.dashboard.lancamentosPorCategoria().
      then(dados => {
        this.pieChartData = {
          labels: dados.map(dado => dado.categoria.nome),
          datasets: [
            {
              data: dados.map(dado => dado.total),
              backgroundColor: ['#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6',
                                  '#DD4477', '#3366CC', '#DC3912']
            }
          ]
        };
      });
  }


  configurarGraficoLinha() {
    this.dashboard.lancamentosPorDia()
    .then(dados => {
    const diasDoMes = this.configurarDiasMes();

    const totaisReceitas = this.totaisPorCadaDiaMes(
      dados.filter(dado => dado.tipo === 'RECEITA'), diasDoMes);

    const totaisDespesas = this.totaisPorCadaDiaMes(
        dados.filter(dado => dado.tipo === 'DESPESA'), diasDoMes);

    this.lineChartData = {
        labels: diasDoMes,
        datasets: [
          {
            label: 'Receitas',
            data: totaisReceitas,
            borderColor: '#3366CC'
          }, {
            label: 'Despesas',
            data: totaisDespesas,
            borderColor: '#D62B00'
          }
        ]
      };
    });
  }

  // Pega todos os dias do mes, dependendo o mês, pega 30 ou 31
  private configurarDiasMes() {
      const mesReferencia = new Date();
      mesReferencia.setMonth(mesReferencia.getMonth() + 1);
      mesReferencia.setDate(0);   //Seta para o ultimo dia do mes corrente e pega a data abaixo
      const quantidade = mesReferencia.getDate();

      const dias: number[] = [];

      for (let i = 1; i <= quantidade; i ++){
        dias.push(i);
      }
      return dias;
  }

  // Cria uma lista com todos os dias dos meses, e adiciona 0 quando não tem nada de lancamento no dia
  private totaisPorCadaDiaMes(dados, diaDoMes) {
    const totais: number [] = [];
    for (const dia of diaDoMes) {
      let total = 0;

      for (const dado of dados) {
        if (dado.dia.getDate() === dia) {
          total = dado.total;
          break;
        }
      }

      totais.push(total);

    }

    return totais;

  }

}
