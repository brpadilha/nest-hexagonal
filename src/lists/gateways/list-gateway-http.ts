import { Inject, Injectable } from '@nestjs/common';
import { ListGatewayInterface } from './list-gateway-interface';
import { HttpService } from '@nestjs/axios';
import { List } from '../entities/list.entity';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ListGatewayHttp implements ListGatewayInterface {
  constructor(
    @Inject(HttpService)
    private httpService: HttpService,
  ) {}

  async create(list: List): Promise<List> {
    // como é um observable
    // temos que passar essa função lastValueFrom do rxjs para que ele escute o ultimo valor da observable
    // com isso retorna uma promise do que vier do observable
    await lastValueFrom(
      this.httpService.post('lists', {
        name: list.name,
      }),
    );

    return list;
  }

  async findAll(): Promise<List[]> {
    const { data } = await lastValueFrom(this.httpService.get('lists'));
    return data.map((list) => new List(list.name, list.id));
  }

  async findById(id: number): Promise<List> {
    const { data } = await lastValueFrom(this.httpService.get(`lists/${id}`));
    return new List(data.name, data.id);
  }
}
