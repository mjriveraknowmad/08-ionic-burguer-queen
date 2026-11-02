import { IProduct } from "../models/product.model";

export function calculateTotalPrice(product: IProduct, quantity: number): number {

    let priceProduct = product.price;

    if (product.extras) {

        let priceProductExtras = 0;
        for (const extra of product.extras) {
            const selectedOption = extra.options.find(option => option.selected);

            priceProductExtras += selectedOption ? selectedOption.price : 0;
        }

        priceProduct += priceProductExtras;

    }

    const total = priceProduct * quantity;

    return +total.toFixed(2);

}