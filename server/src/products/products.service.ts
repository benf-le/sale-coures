import {Injectable, NotFoundException} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {ProductDTO} from "./dto";
import {UserInfo} from "../auth/decorator";


@Injectable({})
export class ProductsService {
    constructor(private readonly prismaService: PrismaService) { //constructor: khởi tạo PrismaService khi một đối tượng của lớp được tạo.

    }

    async getProducts(productsDTO: ProductDTO) {
        try {
            const products = await this.prismaService.products.findMany({})
            return products
        } catch (error) {

            return error
        }
    }

    async getProductsById(id: string) {
        try {
            const productsById = await this.prismaService.products.findUnique({
                where: {
                    id
                }
            })
            return productsById
        } catch (error) {

            return error
        }
    }
    async getProductsByCollection(id: string) {
        try {
            const productsById = await this.prismaService.products.findMany({
                where: {
                      collection : id
                }
            })
            return productsById
        } catch (error) {

            return error
        }
    }

    async getProductsSale(productsDTO: ProductDTO) {
        try {
            const products = await this.prismaService.products.findMany({
                where: {
                    forSale: true
                }
            })
            return products
        } catch (error) {

            return error
        }
    }

    async creatProducts(productsDTO: ProductDTO, userId: string) {
        try {
            const productss = await this.prismaService.products.create({
                data: {
                    name: productsDTO.name,
                    descriptionShort: productsDTO.descriptionShort,
                    imageUrl: productsDTO.imageUrl,
                    price: productsDTO.price,
                    forSale: productsDTO.forSale,
                    type: productsDTO.type,
                    description: productsDTO.description,
                    countInStock: productsDTO.countInStock,
                    ingredient:productsDTO.ingredient,
                    reviews:productsDTO.reviews,
                    collection: productsDTO.collection



                }
            });

            return productss;
        } catch (error) {
            throw new Error(`Could not create product: ${error.message}`);
        }
    }



    async updateProducts(productsDTO: ProductDTO,id: string){
        try {
            const updateProductss = await this.prismaService.products.update({
                data: {
                    name: productsDTO.name,
                    descriptionShort: productsDTO.descriptionShort,
                    imageUrl: productsDTO.imageUrl,
                    price: productsDTO.price,
                    forSale: productsDTO.forSale,
                    type: productsDTO.type,
                    description: productsDTO.description,
                    countInStock: productsDTO.countInStock,
                    ingredient:productsDTO.ingredient,
                    reviews:productsDTO.reviews,
                    collection: productsDTO.collection
                },
                where: {id}
            });

            return updateProductss;
        } catch (error) {
            throw new Error(`Could not create product: ${error.message}`);
        }
    }


    async deleteProducts(id: string){
        try {
            const deleteProductss = await this.prismaService.products.delete({
                where: {id}
            });

            if( deleteProductss) {
                return 'Deleted Products'
            }
            else {return 'Error Delete Products'};
        } catch (error) {
            throw new Error(`Could not create product: ${error.message}`);
        }
    }
}