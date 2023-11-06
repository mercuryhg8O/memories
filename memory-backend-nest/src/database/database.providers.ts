import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb+srv://MemoriesUser42:RYplRI3sbvyjHTNi@memoriescluster.tyrwq3x.mongodb.net/?retryWrites=true&w=majority'),
  },
];