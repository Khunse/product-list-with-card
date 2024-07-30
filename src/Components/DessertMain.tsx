import { Dessert, DessertProp, Order } from "../Common/types";
import {  useCartContext } from "../Common/DessertContext";
import data from '../External/data.json';

export default function DessertMain()
{
   
    //  const [ orderItems,setOrderItems ] = useState<Order[] | null>(null);
     const { setCartItem} = useCartContext();

    return (
        <section className="text-xs lg:basis-6/12">
            <h1 className="font-bold text-4xl">Desserts</h1>
            <div className="my-4 lg:flex lg:flex-wrap lg:gap-5">
                {
                    data.length > 0 ?
                    <>
                    {
                        data.map((w,i) => {
                            return <DessertItem key={i} dessert={w} dessertHandler={setCartItem}/>
                        })
                    }
                    </>
                    :
                    <h1>
                        No Desserts, LOL!
                    </h1>
                }
            </div>
        </section>
    )
}


function DessertItem({dessert} : DessertProp)
{
    const { cartItem } = useCartContext();

    return (
        <div className="flex flex-col gap-10 dessert py-5 basis-1/4 flex-grow">
            <div className="flex flex-col items-center relative">
            <img src={dessert.image.mobile} alt={dessert.name} className={`rounded-xl ${ cartItem.items.find(w => w.itemName == dessert.name) ? 'border-2 border-orange-700' : ''}`}/>
                <div className="absolute -bottom-6">
                     <DButton dessert={dessert}/>
                </div>
            </div>

           <div className="dessert_description">
            <p className="text-gray-400 text-lg">{dessert.category}</p>
            <h1 className="text-xl">{dessert.name}</h1>
            <b className="text-orange-600 text-lg">${dessert.price.toString()}</b>
           </div>
        </div>
    )
}

function DButton({dessert} : {dessert: Dessert})
{
    const {cartItem,setCartItem} = useCartContext();

    const iteminCart = cartItem.items.find(w => w.itemName == dessert.name);
    const itemCart = (btnType : number) => {
    

        if( btnType == 1)
    {
        const totalPrice = cartItem.totalPrice + dessert.price;
        if(cartItem.items.length == 0 )  {
            const items : Order[]= [...cartItem.items,{
                image: dessert.image.mobile,
                itemName: dessert.name,
                itemPrice: dessert.price,
                quantity: 1,
                totalItemPrice: dessert.price
            }]
            setCartItem({items,totalPrice});
        }
        else{
            const itemIn = cartItem.items.findIndex(w => w.itemName == dessert.name);
            if(itemIn >= 0)
            {
                const item = cartItem.items;
                item[itemIn].quantity++;
                item[itemIn].totalItemPrice += dessert.price;
                console.log('new item;: ',item)
                setCartItem({items:item,totalPrice})
            }
            else{
                const items : Order[]= [...cartItem.items,{
                    image: dessert.image.mobile,
                    itemName: dessert.name,
                    itemPrice: dessert.price,
                    quantity: 1,
                    totalItemPrice: dessert.price
                }];
            setCartItem({items,totalPrice});

            }
            console.log("out of ifelse cae:")
        }

    }
    else if( btnType ==2 )
    {
        if(cartItem.items.length == 0) return;
        else{
            const itemIn = cartItem.items.findIndex(w => w.itemName == dessert.name);
            const totalPrice = cartItem.totalPrice - dessert.price;
            const itemslist = cartItem.items;

            if(itemIn >= 0)
            {
                itemslist[itemIn].quantity--;
                itemslist[itemIn].totalItemPrice -= dessert.price;
                if(itemslist[itemIn].quantity == 0) itemslist.splice(itemIn,1);
                setCartItem({items: itemslist,totalPrice});
            }
            else
            {
            
            }
            // setCartItem({items,totalPrice});
        }
    }
    else
    {
        console.log('totalprice :: ',cartItem.totalPrice);
    }
        
    };

    return (
        <>
        {
            !iteminCart ?
            <button onClick={()=>itemCart(1)} className={`flex gap-3 p-3 rounded-full w-40 justify-center border border-gray-500 bg-white items-center  dessertB`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clipPath="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg>
            <b>Add to Cart</b>
            </button>
                :
                <div className={`flex gap-3 p-3 rounded-full w-40 text-white justify-between bg-orange-700 text-white' items-center`}>
                <div className="border-2 rounded-full p-1 iButton" onClick={()=>itemCart(2)}>
                    <svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" width="7" height="7" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg>
                </div>
                    {
                        iteminCart.quantity
                    }
                <div className="border-2 rounded-full p-1 iButton" onClick={() => itemCart(1)}>
                    <svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" width="7" height="7" fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
                </div>
                </div>
        }
       </> 
    )
}

