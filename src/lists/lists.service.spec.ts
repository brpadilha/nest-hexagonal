import { ListModel } from './entities/list.model';
import { ListsService } from './lists.service';

const mockList = {
  create: jest
    .fn()
    .mockReturnValue(Promise.resolve(new ListModel({ name: 'my list' }))),
};

const mockHttpService = {
  post: jest.fn(),
};

describe('ListsService', () => {
  let service: ListsService;

  beforeEach(() => {
    service = new ListsService(mockList as any, mockHttpService as any);
  });

  it('should create a list', async () => {
    const list = await service.create({ name: 'Test' });
    console.log(list);
  });

  // let service: ListsService;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [ListsService],
  //   }).compile();

  //   service = module.get<ListsService>(ListsService);
  // });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });
});
