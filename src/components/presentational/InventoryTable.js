import React from 'react';
import {Table} from 'react-bootstrap';
import AddLocale from '../../locales/Context';

const InventoryTable = ({compiledList, locale})=>{
    let total=0;

    return(
        <div>
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>{locale.purchase.item}</th>
                        <th>{locale.purchase.qtyS}</th>
                        <th>{locale.purchase.price}</th>
                        <th>{locale.purchase.ttlPrice}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        compiledList.map((item, val)=>{
                            total = total+(item.quantity*item.price);
    
                            return (
                                <tr key={val}>
                                    <td>{val+1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity*item.price}</td>
                                </tr>
                        )})
                    }
                    <tr>
                        <td colSpan={3}><b>{locale.purchase.total}</b></td>
                        <td colSpan={2}>{`${total} ${locale.commonInfo.rmb}`}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}

export default AddLocale(InventoryTable);