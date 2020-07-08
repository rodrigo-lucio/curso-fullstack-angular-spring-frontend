import { Title } from '@angular/platform-browser';
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
              private decimalPipe: DecimalPipe,
              private titulo: Title) { }

  pieChartData: any;
  lineChartData: any;
  barChartData: any;
  doughnutChartData: any;

  valorMes = 4;

  filtroMeses = [];
  filtroAnos = [];


  // Formatacao dos numeros
  // Ver na documentacao do chart-js
  options = {
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const valor = dataset.data[tooltipItem.index];
          const label = dataset.label ? (dataset.label + ': ') : '';

          // Ver aqui por que nao formata real BR no grafico de linhas
          return this.decimalPipe.transform(valor, '1.2-2');
        }
      }
    }
  };

  ngOnInit() {
    this.titulo.setTitle('Dashboard - Result Angular');
    this.carregarFiltro();
    this.configurarGraficoPizza();
    this.configurarGraficoLinha();
    this.configurarGraficoBarra();
    this.configurarGraficoDoughnut();

    this.dashboard.lancamentosPorAno(2020);
  }

  carregarFiltro() {

    this.filtroMeses = [
      {label: 'Janeiro', value: 1},
      {label: 'Fevereiro', value: 2},
      {label: 'Março', value: 3},
      {label: 'Abril', value: 4},
      {label: 'Maio', value: 5},
      {label: 'Junho', value: 6},
      {label: 'Junho', value: 7},
      {label: 'Agosto', value: 8},
      {label: 'Setembro', value: 9},
      {label: 'Outubro', value: 10},
      {label: 'Novembro', value: 11},
      {label: 'Dezembro', value: 12},
  ];


    this.filtroAnos.push({label: '2020', value: 2019});
    this.filtroAnos.push({label: '2019', value: 2019});

  }

  configurarGraficoPizza() {
      this.dashboard.lancamentosPorCategoria().
      then(dados => {
        this.pieChartData = {
          labels: dados.map(dado => dado.categoria.nome),
          datasets: [
            {
              data: dados.map(dado => dado.total),
              backgroundColor: ['#ffe74c', '#ff5964' , '#38618c', '#35a7ff',
                                  '#D37B99', '#C14846', '#66CC96']
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
            data: totaisReceitas ,
            borderColor: '#3951AB'
          }, {
            label: 'Despesas',
            data: totaisDespesas,
            borderColor: '#C04141'
          }
        ]
      };
    });
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

  private configurarDiasMes() {
    const mesReferencia = new Date();
    mesReferencia.setMonth(mesReferencia.getMonth() + 1);
    mesReferencia.setDate(0);   // Seta para o ultimo dia do mes corrente e pega a data abaixo
    const quantidade = mesReferencia.getDate();

    const dias: number[] = [];

    for (let i = 1; i <= quantidade; i ++) {
      dias.push(i);
    }
    return dias;
}

  configurarGraficoBarra() {

    const ano = 2020;

    this.dashboard.lancamentosPorAno(ano)
    .then(dados => {


    const totaisReceitas = dados.filter(dado => dado.tipo === 'RECEITA');

    const totaisDespesas = dados.filter(dado => dado.tipo === 'DESPESA');

    const dataAtual = new Date();
    const labelMeses = ['Jan.', 'Fev.', 'Mar.', 'Abr.', 'Mai.', 'Jun.', 'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez'];
    /*

    if(dataAtual.getFullYear() === ano) {

      labelMeses = this.filtroMeses.filter(mes => mes.value <= (dataAtual.getMonth() + 1)).map(mes => mes.label);

    } else {

      labelMeses = this.filtroMeses.map(mes => mes.label);

    }*/

    this.barChartData = {
      labels: labelMeses,
      datasets: [
          {
              label: 'Receitas',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
              data: this.popularMesesZerados(totaisReceitas, ano).map(dado => dado.total)
          },
          {
              label: 'Despesas',
              backgroundColor: '#9CCC65',
              borderColor: '#7CB342',
              data: this.popularMesesZerados(totaisDespesas, ano).map(dado => dado.total)
          }
      ]
   };
  });
  }

  private popularMesesZerados(dados: any, ano) {
    // Cria uma nova lista com os meses que não possuem registro e atribui valor 0
    let novaLista = [];

    const dataAtual = new Date();

    for (const mes of this.filtroMeses) {
      let totalNovo = 0;
      const mesNovo = mes.value;

      for (const dado of dados) {
        if (dado.mes === mesNovo) {
          totalNovo = dado.total;
          break;
        }
      }

      novaLista = [...novaLista, {mes: mesNovo, total: totalNovo }];

    }

    return novaLista;
  }


  configurarGraficoDoughnut() {
      this.dashboard.pessoasMaisDevem()
      .then(dados => {
        this.doughnutChartData = {
          labels: dados.map(dado => dado.pessoa.nome),
          datasets: [
              {
                  data: dados.map(dado => dado.total),
                  backgroundColor: [
                    '#7091CF',
                    '#C34B74',
                    '#43C05D',
                    '#D7A086',
                    '#9D38A7'

                  ],
                  hoverBackgroundColor: [
                    '#7091CF',
                    '#C34B74',
                    '#43C05D',
                    '#D7A086',
                    '#9D38A7'
                  ]
              }]
          };
        });
  }


}
