import { computed, Signal, signal, WritableSignal } from "@angular/core"
import { IQuantityProduct } from "./quantity-product.model"
import { IUser } from "./user.model"
import { IProduct } from "./product.model"
import { calculateTotalPrice } from "../utils/calculate-total.util"

export interface IOrder {
    _id?: string
    address?: string
    user: IUser
    products: IQuantityProduct[]
}

export class Order {
    
    private _productsSignal: WritableSignal<IQuantityProduct[]>
    private _userSignal: WritableSignal<IUser | null>
    private _addressSignal: WritableSignal<string>
    private _numProductsSignal: Signal<number>
    private _totalOrderSignal: Signal<number>
    
    constructor(
        products: IQuantityProduct[] = [],
        user: IUser | null = null,
        address: string = ''
    ){
        this._productsSignal = signal(products);
        this._userSignal = signal(user);
        this._addressSignal = signal(address)
        this._numProductsSignal = computed(() => this.numProducts());
        this._totalOrderSignal = computed(() => this.totalOrder())
    }

    public get productsSignal(): Signal<IQuantityProduct[]> {
        return this._productsSignal.asReadonly()
    }

    public get userSignal(): Signal<IUser | null> {
        return this._userSignal.asReadonly()
    }
    
    public get addressSignal(): Signal<string> {
        return this._addressSignal.asReadonly()
    }

    public get numProductsSignal(): Signal<number> {
        return this._numProductsSignal
    }

    public get totalOrderSignal(): Signal<number> {
        return this._totalOrderSignal
    }

    public addProduct(product: IProduct, quantity: number = 1){

        const products = this._productsSignal();
        const productFound = this.searchProduct(product);

        if(productFound){
            productFound.quantity += quantity;
        }else{
            products.push({
                product,
                quantity
            })
        }

        this._productsSignal.set([...products]);

    }

    public oneMoreProduct(product: IProduct){

        const productFound = this.searchProduct(product);

        if(productFound){
            productFound.quantity++;
            this._productsSignal.set([...this._productsSignal()]);
        }

    }
    
    public oneLessProduct(product: IProduct){
        const productFound = this.searchProduct(product);

        if(productFound){
            productFound.quantity--;
            if(productFound.quantity == 0){
                this.removeProduct(productFound.product);
            }else{
                this._productsSignal.set([...this._productsSignal()]);
            }
        }
    }

    public resetOrder(){
        this._productsSignal.set([]);
        this._addressSignal.set('');
    }

    public setUser(user: IUser | null){
        this._userSignal.set(user);
    }

    public setAddress(address: string){
        this._addressSignal.set(address);
    }

    private searchProduct(product: IProduct): IQuantityProduct | undefined{
        return this._productsSignal().find( (quantityProduct: IQuantityProduct) => JSON.stringify(product) === JSON.stringify(quantityProduct.product));
    }
    
    private numProducts(){
        return this._productsSignal().reduce( (sum: number, value: IQuantityProduct) => sum + value.quantity , 0)
    }

    private totalOrder(){
        return this._productsSignal().reduce( (sum: number, value: IQuantityProduct) => sum + calculateTotalPrice(value.product, value.quantity) , 0)
    }

    private removeProduct(product: IProduct){
        this._productsSignal.update( products => 
            products.filter( (quantityProduct: IQuantityProduct) => JSON.stringify(product) !== JSON.stringify(quantityProduct.product) )
        )
    }

}