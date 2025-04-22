import { createContext, useMemo, useReducer } from "react";

const reducer = (state, action) => {
    switch (action.type) {
        case 'Add':
            return[...state,
                {
                    id:action.id,
                    tempId:action.tempId,
                    name:action.name,
                    price:action.price,
                    qty:action.qty,
                    size:action.priceOptions,
                    img: action.img
                }]
        
        case 'Update':        
                let arr = [...state]
                arr.find((food,i)=>{
                    if (food.tempId === action.tempId) {
                        arr[i] = {
                            ...food,
                            qty: parseInt(action.qty) + parseInt(food.qty),
                            price: action.price + food.price,
                        }
                    }
                })
                return arr

        case 'Remove':
            let Arr = [...state]
            Arr.splice(action.index,1)
            return Arr

        case 'Increment':
            let incArr = [...state]
            incArr.find((food,index)=>{
                if (food.tempId === action.tempId) {
                    incArr[index] = {
                        ...food,
                        qty: parseInt(food.qty) + 1,
                        price: food.price + action.unitPrice,
                    }
                }
            })
            return incArr
            
            case 'Decrement':
                let decArr = [...state]
                decArr.find((food,index)=>{
                    if (food.tempId === action.tempId) {
                        decArr[index] = {
                            ...food,
                            qty: parseInt(food.qty) - 1,
                            price: food.price - action.unitPrice,
                        }
                    }
                })
                return decArr
            
            case 'Drop':
                let empArr = []
                return empArr
            
        default:
            return console.log('Action type');
            
    }
}

export const CartContext = createContext()

export const CartProvider=({children})=>{
    const [state, dispatch] = useReducer(reducer,[])

    const contextValue = useMemo(()=>{
        return{state,dispatch}
    },[state,dispatch])

    return(
        <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
    )
}