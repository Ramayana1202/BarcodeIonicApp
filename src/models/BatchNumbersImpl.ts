import { UserFieldsImpl } from './UserFieldsImpl';

export class BatchNumbersImpl {

    AddmisionDate?: Date;

    BaseLineNumber: number;

    BatchNumber: string;

    Count: number;

    ExpiryDate?: Date;

    InternalSerialNumber: string;

    Location: string;

    ManufactureDate?: Date;

    ManufacturerSerialNumber: string;

    Notes: string;

    Quantity: number;

    TrackingNote: number;

    TrackingNoteLine: number;

    UserFields: Array<UserFieldsImpl>;

}