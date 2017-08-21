import { UserFieldsImpl } from './UserFieldsImpl';

export class SerialNumbersImpl {

    BaseLineNumber: number;

    BatchID: string;

    Count: number;

    ExpiryDate?: Date;

    InternalSerialNumber: string;

    Location: string;

    ManufactureDate?: Date;

    ManufacturerSerialNumber: string;

    Notes: string;

    Quantity: number;

    ReceptionDate?: Date;

    SystemSerialNumber: number;

    TrackingNote: number;

    TrackingNoteLine: number;

    UserFields: Array<UserFieldsImpl>;

    WarrantyEnd?: Date;

    WarrantyStart?: Date;
}