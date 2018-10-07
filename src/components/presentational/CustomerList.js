import React from 'react';
import CustomerItem from './CustomerItem';


//TODO: fix the layout so it is in rows and each panel has been restrcted

export default ({list, setCustomer, selected, locale})=>(
    <div>
        {list.map(item=><CustomerItem 
            title={item.name} 
            phone={item.phone} 
            wechat={item.wechat} 
            key={item._id} 
            id={item._id} 
            setCustomer={setCustomer} 
            selected={selected._id===item._id?true:false}
        />)}
    </div>
);


//TODO: sort the inventory by quantity
