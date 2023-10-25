import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';

import * as pactum from 'pactum';
import { AuthDto, LoginDto } from '../src/auth/dto';
import { like } from 'pactum-matchers';

describe('App e2e ', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();
    await app.listen(9000);

    prisma = app.get(PrismaService);

    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:9000/');
    jest.setTimeout(30000);
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    describe('Signup', () => {
      const dto: AuthDto = {
        name: 'newname',
        email: 'newemail@gmail.com',
        password: 'mynewpass123',
      };

      it('it should throw if name empty', () => {
        return pactum
          .spec()
          .post('auth/signup')
          .withBody({ ...dto, name: '' })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('it should throw if email empty', () => {
        return pactum
          .spec()
          .post('auth/signup')
          .withBody({ ...dto, email: '' })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('it should throw if password empty', () => {
        return pactum
          .spec()
          .post('auth/signup')
          .withBody({ ...dto, password: '' })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('it should throw if no body', () => {
        return pactum
          .spec()
          .post('auth/signup')
          .withBody({})
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should signup', () => {
        return pactum
          .spec()
          .post('auth/signup')
          .withBody(dto)
          .expectStatus(HttpStatus.CREATED);
      });
    });

    describe('Login', () => {
      const dto: LoginDto = {
        email: 'newemail@gmail.com',
        password: 'mynewpass123',
      };

      it('it should throw if email empty', () => {
        return pactum
          .spec()
          .post('auth/login')
          .withBody({ password: dto.password })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('it should throw if password empty', () => {
        return pactum
          .spec()
          .post('auth/login')
          .withBody({ email: dto.email })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('it should throw if no body', () => {
        return pactum
          .spec()
          .post('auth/login')
          .withBody({})
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('it should Login', () => {
        return pactum
          .spec()
          .post('auth/login')
          .withBody(dto)
          .expectStatus(HttpStatus.CREATED)
          .stores('userToken', 'jwt');
      });
    });
  });

  describe('User', () => {
    //  can not implement the AdminGuard !!

    it('it should return user with id 1', () => {
      const expectedBody = {
        user: {
          id: like(1),
          name: like('abdo'),
          email: like('abdo@gmail.com'),
          password: like(
            '$2b$10$3GaHJ5b6hmsKjI400veSVuEDYXMT2bCwc3fOpVeKUgi7cvyQVYWCK',
          ),
        },
      };

      return pactum
        .spec()
        .get('user/1')
        .withBearerToken(`$S{userToken}`)
        .expectStatus(HttpStatus.OK)
        .expectJsonMatch(expectedBody);
    });
  });

  describe('category', () => {
    it('should throw if no body', () => {
      return pactum
        .spec()
        .post('category')
        .expectStatus(HttpStatus.BAD_REQUEST);
    });

    it('should throw if wrong dto', () => {
      const dto = {
        name: 2,
      };
      return pactum
        .spec()
        .withBody(dto)
        .post('category')
        .expectStatus(HttpStatus.BAD_REQUEST);
    });

    it('should add a category', () => {
      const dto = {
        name: 'new category',
      };

      return pactum
        .spec()
        .post('category')
        .withBody(dto)
        .expectStatus(HttpStatus.CREATED);
    });

    it('should edit a category', () => {
      const body = {
        name: 'updated category',
      };

      return pactum
        .spec()
        .put('category/1')
        .withBody(body)
        .expectBodyContains('updated category')
        .expectStatus(HttpStatus.OK);
    });

    it('should return all categories', () => {
      return pactum.spec().get('category').expectStatus(HttpStatus.OK);
    });
  });

  describe('Colors', () => {
    it('should throw if no body', () => {
      return pactum.spec().post('colors').expectStatus(HttpStatus.BAD_REQUEST);
    });

    it('should throw if missing element in dto', () => {
      const dto = {
        name: 'red',
      };
      return pactum
        .spec()
        .withBody(dto)
        .post('colors')
        .expectStatus(HttpStatus.BAD_REQUEST);
    });

    it('should throw if wrong dto', () => {
      const dto = {
        name: 'red',
        hex: 5,
      };
      return pactum
        .spec()
        .withBody(dto)
        .post('colors')
        .expectStatus(HttpStatus.BAD_REQUEST);
    });

    it('should add a color', () => {
      const dto = {
        name: 'red',
        hex: '#ffpvddc',
      };

      return pactum
        .spec()
        .post('colors')
        .withBody(dto)
        .expectStatus(HttpStatus.CREATED);
    });

    it('should delete the color with id 1', () => {
      return pactum.spec().delete('colors/1').expectStatus(HttpStatus.OK);
    });

    it('should return all colors', () => {
      return pactum.spec().get('colors').expectStatus(HttpStatus.OK);
    });
  });

  describe('Product', () => {
    describe('Get all products', () => {
      it('it should return no produts if token not found', () => {
        return (
          pactum
            .spec()
            .get('products')
            // .withBearerToken(`$S{userToken}`)
            .expectStatus(HttpStatus.UNAUTHORIZED)
        );
      });

      it('it should return no produts if token is not valid', () => {
        return pactum
          .spec()
          .get('products')
          .withBearerToken(`$S{userToken}+sdsdsd`)
          .expectStatus(HttpStatus.UNAUTHORIZED);
      });

      it('it should return all produts', () => {
        return pactum
          .spec()
          .get('products')
          .withBearerToken(`$S{userToken}`)
          .expectStatus(HttpStatus.OK);
      });
    });
    // describe('Add product', () => {});

    // describe('Get product by id', () => {});
    // describe('Edit product', () => {});
    // describe('Delete product', () => {});
  });
});
