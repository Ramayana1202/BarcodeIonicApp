import { InventoryTranfer_LineImpl } from './InventoryTranfer_LineImpl';
import { UserFieldsImpl } from './UserFieldsImpl';
import { StockTransferLinesBinAllocationsImpl } from './StockTransferLinesBinAllocationsImpl';

export class InventoryTranferImpl {

    DocEntry: number;
    DocNum: number;
    DocType: string;
    CANCELED: string;
    Handwrtten: string;
    Printed: string;
    DocStatus: string;
    ObjType: string;
    DocDate: any;
    DocDueDate: any;
    CardCode: string;
    CardName: string;
    Address: string;
    NumAtCard: string;
    VatSum: number;
    VatSumFC: number;
    DiscPrcnt: number;
    DiscSum: number;
    DiscSumFC: number;
    DocCur: string;
    DocRate: number;
    DocTotal: number;
    DocTotalFC: number;
    PaidToDate: number;
    PaidFC: number;
    GrosProfit: number;
    GrosProfFC: number;
    Ref1: string;
    Ref2: string;
    Comments: string;
    JrnlMemo: string;
    TransId: number;
    ReceiptNum: number;
    GroupNum: number;
    DocTime: number;
    SlpCode: number;
    TrnspCode: number;
    CntctCode: number;
    VatSumSy: number;
    DiscSumSy: number;
    DocTotalSy: number;
    PaidSys: number;
    UpdateDate: any;
    IsICT: string;
    CreateDate: any;
    Series: string;
    TaxDate: any;
    FinncPriod: string;
    UserSign: string;
    UserSign2: string;
    VatDate: any;
    PaidSum: number;
    PaidSumFc: number;
    PaidSumSc: number;
    Filler: string;
    CurSource: string;
    Cashremainder: number;
    isIns: string;
    Cancelled: string;
    Lines: Array<InventoryTranfer_LineImpl>;
    ObjTypes: number;
    ObjTypeFrom: number;

    UserFields: Array<UserFieldsImpl>;
    BinAllocations: Array<StockTransferLinesBinAllocationsImpl>;

    PriceList: string;
    SeriesName: string;

    ToWhsCode: string;

    TransportationCode: number;
    Address2: string;
    ShipToCode: string;
    PayToCode: string;
    Confirmeds: boolean;

    OriginType: string;

}