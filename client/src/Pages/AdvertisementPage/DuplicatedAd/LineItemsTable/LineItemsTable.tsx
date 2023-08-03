import React from 'react';
import {lineItemColumns} from "../../columns/campaign";
import {useFilter} from "../Modal/useFilter";
import {Input,
    Table} from "antd"



export const LineItemsTable = ({lineItems, rowSelection, onRow}) => {
    const { filteredLineItems, onSearchFilter, value } = useFilter({ lineItems, isModalOpen: true });

    return (
        <>
            <Input value={value} onChange={onSearchFilter} />
            <Table dataSource={filteredLineItems} columns={lineItemColumns} rowKey="id" rowSelection={rowSelection} onRow={onRow} />
        </>
    );
};