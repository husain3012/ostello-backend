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
import { CartItemsService } from './cart-items.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CartItem } from './entities/cart-item.entity';
import { CreateCartDto } from './dto/create-cart.dto';

@Controller('cart-items')
@ApiTags('Cart Items')
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    description: 'Created a new cart.',
    type: CartItem,
  })
  @ApiBadRequestResponse({
    description: 'Could not create a new cart. Try again!',
  })
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartItemsService.create(createCartDto);
  }

  @Post('/add')
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    description: 'Add an item to the cart.',
    type: CartItem,
  })
  @ApiBadRequestResponse({
    description: 'Could not create a new cart. Try again!',
  })
  add(@Body() createCartItemDto: CreateCartItemDto) {
    return this.cartItemsService.addItem(createCartItemDto);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    description: 'Update cart.',
    type: CartItem,
  })
  @ApiBadRequestResponse({
    description: 'Could not update the cart. Try again!',
  })
  update(
    @Param('id') id: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.cartItemsService.updateQuantity(+id, updateCartItemDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({
    description: 'Delete a cart.',
    type: CartItem,
  })
  @ApiBadRequestResponse({
    description: 'Could not delete the cart. Try again!',
  })
  remove(@Param('id') id: string) {
    return this.cartItemsService.removeItem(+id);
  }

  @Get(':cartId')
  @ApiCreatedResponse({
    description: 'Get card with products.',
    type: CartItem,
  })
  @ApiBadRequestResponse({
    description: 'Could not fetch cart info. Try again!',
  })
  getCartWithProductDetails(@Param('cartId') cartId: string) {
    return this.cartItemsService.getCartWithProductDetails(cartId);
  }
}
