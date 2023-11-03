import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Product } from './entities/product.entity';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    description: 'Created user object as response',
    type: Product,
  })
  @ApiBadRequestResponse({
    description: 'Could not create product. Try again!',
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiCreatedResponse({
    description: 'Get all products.',
    type: [Product],
  })
  @ApiBadRequestResponse({
    description: 'Could not fetch products. Try again!',
  })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({
    description: 'Get product by id',
    type: Product,
  })
  @ApiBadRequestResponse({
    description: 'Could not find product. Try again!',
  })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    description: 'Update product information.',
    type: Product,
  })
  @ApiBadRequestResponse({
    description: 'Could not update product. Try again!',
  })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @ApiCreatedResponse({
    description: 'Delete product.',
    type: Product,
  })
  @ApiBadRequestResponse({
    description: 'Could not delete product. Try again!',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
