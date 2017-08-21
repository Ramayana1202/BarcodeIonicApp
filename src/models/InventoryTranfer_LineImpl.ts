import { BatchNumbersImpl } from './BatchNumbersImpl';
import { SerialNumbersImpl } from './SerialNumbersImpl';
import { UserFieldsImpl } from './UserFieldsImpl';

export class InventoryTranfer_LineImpl {
    DocEntry: number;
    LineNum: number;
    TargetType: number;
    TrgetEntry: number;

    BaseRef: string;
    BaseType: number;
    BaseEntry: number;
    BaseLine: number;
    LineStatus: string;
    ItemCode: string;

    Dscription: string;
    Quantity: number;
    OpenQty: number;
    Price: number;
    Currency: string;

    Rate: number;
    DiscPrcnt: number;
    LineTotal: number;
    TotalFrgn: number;
    OpenSum: number;
    OpenSumFC: number;
    WhsCode: string;
    SlpCode: number;
    AcctCode: string;
    PriceBefDi: number;
    DocDate: Date;
    OcrCode: string;
    Project: string;
    CodeBars: string;
    VatPrcnt: number;
    VatGroup: string;
    PriceAfVAT: number;
    BaseDocNum: number;
    VatSum: number;
    VatSumFrgn: number;
    VatSumSy: number;
    FinncPriod: number;
    ObjType: string;
    GrssProfit: number;
    GrssProfFC: number;
    TaxCode: string;
    BaseQty: number;
    BaseOpnQty: number;
    VatDscntPr: number;
    GTotal: number;
    GTotalFC: number;
    OcrCode2: string;
    OcrCode3: string;
    OcrCode4: string;
    CogsOcrCo2: string;
    CogsOcrCo3: string;
    CogsOcrCo4: string;
    CogsOcrCo5: string;
    Factor1: number;
    Factor2: number;
    Factor3: number;
    Factor4: number;
    UseBaseUn: string;
    unitMsr: string;
    NumPerMsr: number;
    FromWhsCod: string;
    BatchNumbers: Array<BatchNumbersImpl>;
    SerialNumbers: Array<SerialNumbersImpl>;

    UserFields: Array<UserFieldsImpl>;

    QuantityOnStock: number;
    UoMName: string;
    UoMCode: string;

    UoMEntry: number;
}