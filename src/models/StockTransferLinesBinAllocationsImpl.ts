export class StockTransferLinesBinAllocationsImpl {

    AllowNegativeQuantity: boolean;
    BaseLineNumber: number
    BinAbsEntry: number
    BinActionType: BinActionTypeEnum;
    Quantity: number;
    SerialAndBatchNumbersBaseLine: number;
}

export enum BinActionTypeEnum {
    batToWarehouse = 1,
    batFromWarehouse = 2,
}