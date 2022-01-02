import React, { useContext } from 'react'
import { ProductDataContext } from '../Context/context'
import SendProductInfo from '../Upload/SendProductInfo'

export default function Summery() {
    const { data, setReload } = useContext(ProductDataContext)
    let nameOfProducts = []
    data.map((item) => nameOfProducts.push(item.product_name))
    nameOfProducts = [...new Set(nameOfProducts)]
    const productSummery = nameOfProducts.map((item) => {
        const selectedProduct = data.filter((p) => p.product_name === item)
        const totalStoreProduct = selectedProduct.reduce((accumulator, currentValue) => (accumulator += currentValue.input_unit_value * parseFloat(currentValue.input_unit)), 0)
        const totalProductCost = selectedProduct.reduce((accumulator, currentValue) => (accumulator += currentValue.input_unit_value * currentValue.input_unit_price), 0)
        return {
            itemName: item,
            totalValue: totalStoreProduct,
            totalCost: totalProductCost
        }
    })



    return (
        <>
            <table className="min-w-full leading-normal">
                <thead>
                    <tr>
                        <th scope="col" className="table_head">
                            Product
                        </th>
                        <th scope="col" className="table_head">
                            Store Unit
                        </th>
                        <th scope="col" className="table_head">
                            Total cost
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {productSummery
                        ?.slice(0)
                        .reverse()
                        .map((item, index) => {
                            const { itemName, totalValue, totalCost } = item

                            return (
                                <tr key={index}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {itemName}
                                        </p>
                                    </td>

                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                            <span
                                                aria-hidden="true"
                                                className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                            ></span>
                                            <span className="relative">
                                                {`${totalValue.toLocaleString()} kg`}
                                            </span>
                                        </span>
                                    </td>

                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                            <span
                                                aria-hidden="true"
                                                className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                            ></span>
                                            <span className="relative">
                                                {`$${totalCost.toLocaleString()}`}
                                            </span>
                                        </span>
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
        </>
    )
}
