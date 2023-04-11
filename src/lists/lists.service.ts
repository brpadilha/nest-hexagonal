import { Inject, Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';

import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ListGatewayInterface } from './gateways/list-gateway-interface';
import { List } from './entities/list.entity';

@Injectable()
export class ListsService {
  constructor(
    @Inject('ListGatewayInterface')
    private listGateway: ListGatewayInterface, // porta
    private httpService: HttpService,
  ) {}

  async create(createListDto: CreateListDto) {
    const list = new List(createListDto.name);
    await this.listGateway.create(list);

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

  findAll() {
    return this.listGateway.findAll();
  }

  async findOne(id: number) {
    const list = await this.listGateway.findById(id);
    if (!list) {
      throw new Error('List not found');
    }
    return list;
  }

  update(id: number, updateListDto: UpdateListDto) {
    return `This action updates a #${id} list`;
  }

  remove(id: number) {
    return `This action removes a #${id} list`;
  }
}
