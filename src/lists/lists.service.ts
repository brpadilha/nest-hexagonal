import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { InjectModel } from '@nestjs/sequelize';
import { List } from './entities/list.entity';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ListsService {
  constructor(
    @InjectModel(List)
    private ListModel: typeof List,
    private httpService: HttpService,
  ) {}

  async create(createListDto: CreateListDto) {
    const list = await this.ListModel.create(createListDto);

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
    return this.ListModel.findAll();
  }

  async findOne(id: number) {
    console.log(id);
    const list = await this.ListModel.findByPk(id);
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
