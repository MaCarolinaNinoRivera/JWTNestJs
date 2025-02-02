// const mockGetAll = jest.fn();

const request = require('supertest');
const { MongoClient } = require('mongodb');

const createApp = require('../src/app');
const { config } = require('../src/config');

const DB_NAME = config.dbName;
const MONGO_URI = config.dbUrl;
// const { generateManyBook } = require('../src/fakes/book.fake');

// jest.mock('../src/lib/mongo.lib.js', () => jest.fn().mockImplementation(() => ({
//   getAll: mockGetAll,
//   create: () => { },
// })));

describe('Test for books', () => {
  let app = null;
  let server = null;
  let database = null;
  beforeAll(async () => {
    app = createApp();
    server = app.listen(3001);
    const client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    database = client.db(DB_NAME);
  });

  afterAll(async () => {
    await server.close();
    await database.collection('books').drop();
    // await database.dropDatabase();
  });

  describe('test for GET /api/v1/books', () => {
    test('should return a list books', async () => {
      // Arrange
      // const fakeBooks = generateManyBook(3);
      // mockGetAll.mockResolvedValue(fakeBooks);
      const seedData = await database.collection('books').insertMany([
        {
          name: 'Book1',
          year: 2009,
          author: 'nikolas',
        },
        {
          name: 'Book2',
          year: 2016,
          author: 'kamila',
        },
      ]);
      console.log('seddata: ', seedData);
      // Act
      return request(app)
        .get('/api/v1/books')
        .expect(200)
        .then(({ body }) => {
          console.log(body);
          // Assert
          // expect(body.length).toEqual(fakeBooks.length);
          expect(body.length).toEqual(seedData.insertedCount);
        });
    });
  });
});
