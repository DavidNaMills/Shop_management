import React from 'react';
import InventoryItem from './InventoryItem';
import InventoryTable from './InventoryTable';

import {Col, Grid} from 'react-bootstrap';

export default ({list, selectItem, compiledList})=>(
    <Grid>
        <Col md={8}>
        {list.map(item=><InventoryItem 
            key={item._id}
            title={item.name} 
            description={item.description} 
            price={item.retailPrice}
            quantity={item.quantity}
            id={item._id}
            selectItem={selectItem}
        />)}
        </Col>

        <Col md={4}>
            <InventoryTable compiledList={compiledList}/>
        </Col>
    </Grid>
);